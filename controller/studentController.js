

const Student=require('../models/studentModel')
const University = require('../models/universityModel');

const factory=require('../controller/factoryController')
const asyncHandler=require('../middleware/asyncHandler')





// Profile 


exports.updateStudent = factory.updateOne(Student);
  exports.deleteStudent =factory.deleteOne(Student);
  exports.getStudent = factory.getOne(Student);
  // exports.getAllStudents=factory.getAll(Student);
  exports.getMe=(req,res,next)=>{
    req.params.id=req.student.id;
    next();
  }


//BookMark


exports.getBookmarkedUniversities = asyncHandler(async (req, res) => {
  const studentId = res.locals.student.id;

  const student = await Student.findById(studentId).populate({
    path: 'bookmarkedUniversities',
    select: 'name location tuitionFee ranking description' // fields to include
  });

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json({
    count: student.bookmarkedUniversities.length,
    bookmarkedUniversities: student.bookmarkedUniversities
  });
});





exports.toggleBookmarkUniversity = asyncHandler(async (req, res) => {
  const studentId = res.locals.student.id;
  const { universityId } = req.body;

  if (!universityId) {
    return res.status(400).json({ message: 'University ID is required' });
  }

  const university = await University.findById(universityId);
  if (!university) {
    return res.status(404).json({ message: 'University not found' });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const isAlreadyBookmarked = student.bookmarkedUniversities.includes(universityId);

  if (isAlreadyBookmarked) {
    student.bookmarkedUniversities.pull(universityId);
    await student.save();
    return res.status(200).json({
      message: 'University unbookmarked successfully',
      action: 'unbookmarked',

    });
  } else {
    student.bookmarkedUniversities.push(universityId);
    await student.save();
    return res.status(200).json({
      message: 'University bookmarked successfully',
      action: 'bookmarked',
     
    });
  }
});