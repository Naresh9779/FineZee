const Student = require("../models/studentModel");

const jwt = require("jsonwebtoken");
const AppError = require("../middleware/AppError");
const crypto = require("crypto");
const asyncHandler = require("../middleware/asyncHandler");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (student, statusCode, res) => {
  const token = signToken(student._id);

  console.log(student);
  cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_JWT_EXPIRES_IN * 24 * 60 * 60 * 100,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  Student.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    student,
  });
};
exports.signUp = asyncHandler(async (req, res, next) => {
  if (req.body.role) {
    return res.status(400).json({
      status: "fail",
      message: "You are not allowed to set a role",
    });
  }

  const newStudent = await Student.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createAndSendToken(newStudent, 201, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please Provide Email And Password ", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError("Incorrect Password Or Email", 400));
  }
  // send token
  createAndSendToken(student, 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie("jwt", "LoggedOut", {
    expires: new Date(Date.now() * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};

exports.LoggedIn = async (req, res, next) => {
  // Get Token And Check Of it There
  if (req.cookies.jwt)
    try {
      {
        // Token Validation
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET,
        );

        //Check Student Exist
        const currentStudent = await Student.findById(decoded.id);
        if (!currentStudent) {
          return next();
        }

        //check if Student changed password after token
        if (currentStudent.changedPasswordAfter(decoded.iat)) {
          return next();
        }

        res.locals.student = currentStudent;
        console.log(currentStudent);
        return next();
      }
    } catch (error) {
      return next();
    }

  next();
};

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // Get Token And Check Of it There

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You Are Not Logged In", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentStudent = await Student.findById(decoded.id);
  if (!currentStudent) {
    return next(new AppError("This Token No Longer Exist", 401));
  }

  if (currentStudent.changedPasswordAfter(decoded.iat)) {
    return next(new AppError(" Student changed password ", 401));
  }

  // console.log(currentStudent);
  req.student = currentStudent;
  res.locals.student = currentStudent;

  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.student);
    if (!roles.includes(req.student.role)) {
      return next(new AppError("Do not Have Acess", 403));
    }
    next();
  };
};
// exports.forgotPassword=asyncHandler(async(req,res,next)=>{
//     const Student = await Student.findOne({email:req.body.email});
//     if(!Student) {
//         return next(new AppError('Email Not Found',404));
//     }
//     const resetToken=Student.createPasswordResetToken();

//     await Student.save({validateBeforeSave:false});

//  try{// await sendEmail({
// //         email : Student.email,
// //         subject: 'Link Will Expire In 10 Min',
// //         message
//     //});

//     const resetURL=`${req.protocol}://${req.get('host')}/api/v1/Students/resetPassword/${resetToken}`;
//     await new Email(Student,resetURL).sendReset();
//     res.status(200).json({
//         status:"success",
//         message:'Reset Link Sent Sucessfully'

//        });
// }catch(err)
//     {
//         console.log(err);
//         Student.passwordResetToken=undefined,
//        Student.resetTokenExpires=undefined
//        await Student.save({validateBeforeSave:false});
//        return next(new AppError('Email Not Sent Try Again',500));
//     }

// });
// exports.resetPassword=asyncHandler(async(req,res,next)=>
// {
//     const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
//     console.log(hashedToken);
//   const Student =await Student.findOne({
//     passwordResetToken:hashedToken,
//     resetTokenExpires:{$gt:Date.now()}
//   });
//   if(!Student)
//   {
//     return next(new AppError(' Link Expired Or Invalid ! Please Try Again',401));
//   }

// Student.password=req.body.password;
// Student.passwordConfirm=req.body.passwordConfirm;
// Student.passwordResetToken=undefined;
// Student.resetTokenExpires=undefined;
// await Student.save();

// createAndSendToken(Student,200,res);

// });

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.student.id).select("+password");

  if (
    !(await student.correctPassword(req.body.passwordCurrent, student.password))
  ) {
    return next(new AppError("Invalid Password Try Agin", 401));
  }

  student.password = req.body.password;
  student.passwordConfirm = req.body.passwordConfirm;
  await student.save();

  createAndSendToken(student, 200, res);
});
