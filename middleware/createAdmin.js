
module.exports = async function createAdminIfNotExists() {
  const bcrypt = require('bcryptjs');
  const Student = require('../models/studentModel');

  const adminExists = await Student.findOne({ role: 'admin' });

  if (!adminExists) {
   

    await Student.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD,
      passwordConfirm: process.env.ADMIN_PASSWORD,
      role: 'admin',
      isVerified: true
    });

    console.log('✅ Super Admin created');
  } else {
    console.log('🔒 Admin already exists:', adminExists.email);
  }
};
