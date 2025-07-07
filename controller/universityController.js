const University = require('../models/universityModel'); 

const asyncHandler=require('../middleware/asyncHandler');

const factory=require('../controller/factoryController')

exports.getUniversities = asyncHandler(async (req, res) => {


 
    const all_universities=await University.find();
      console.log("✅ Universities retrieved:", all_universities.length);

    res.status(200).json(all_universities)

    
});


exports.addUniversity = asyncHandler(async (req, res) => {
  const payload = req.body;

  let result;

  if (Array.isArray(payload)) {

    result = await University.insertMany(payload, { ordered: false });
    res.status(201).json({
      message: 'Universities added successfully',
      count: result.length,
      data: result
    });
  } else {
    
    const newUniversity = await University.create(payload);
    res.status(201).json({
      message: 'University added successfully',
      data: newUniversity
    });
  }
});



const allowedFields = [
  'name',
  'location',
  'description',
  'tuitionFee',
  'establishedYear',
  'ranking',
  'contactInfo'
];

exports.updateUniversity = asyncHandler(async (req, res) => {
  const universityId = req.params.id;

 
  const updates = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'No valid fields provided for update' });
  }

  const updatedUniversity = await University.findByIdAndUpdate(
    universityId,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedUniversity) {
    return res.status(404).json({ message: 'University not found' });
  }

  res.status(200).json({
    message: 'University updated successfully',
    data: updatedUniversity
  });
});


exports.getUniversity=factory.getOne(University);