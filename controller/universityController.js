const University = require('../models/universityModel'); 

const asyncHandler=require('../middleware/asyncHandler')

exports.getUniversities = asyncHandler(async (req, res) => {
 
    const all_universities=await University.find();
    console.log("Hurrryyyyyyyyyy.......")

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
