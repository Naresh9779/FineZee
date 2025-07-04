const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const studentSchema = new mongoose.Schema(
  {
    role: {
  type: String,
  enum: ['student', 'admin'],
  default: 'student',
  select: false
},
    image: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone number'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: function () {
        return this.isNew || this.isModified('password');
      },
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match'
      }
    },
    documents: {
      type: [String],
      default: []
    },
    interestedCountries: {
      type: [String],
      default: []
    },
    interestedCourses: {
      type: [String],
      default: []
    },
    bookmarkedUniversities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
      }
    ],
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
      code: { type: String },
      expiresAt: { type: Date }
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active'
    },
    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    resetTokenExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

studentSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

studentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  studentPassword
) {
  return await bcrypt.compare(candidatePassword, studentPassword);
};

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

studentSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('Student', studentSchema);
