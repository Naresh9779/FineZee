

const Student=require('../models/studentModel')

const asyncHandler=require('../middleware/asyncHandler')

exports.getStudents = asyncHandler(async (req, res) => {
 
    const all_students=await Student.find();
    console.log("Hurrryyyyyyyyyy.......")

    res.status(200).json(all_students)

    
});


