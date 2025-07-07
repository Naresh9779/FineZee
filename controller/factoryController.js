const AppError = require("../middleware/AppError");
const asyncHandler = require("../middleware/asyncHandler");



exports.createOne=Model=>asyncHandler(async(req,res)=>{
    
    const doc=await Model.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
            doc,
        }

    });

});


exports.deleteOne=Model=>asyncHandler(async(req,res,next)=>{
   
    const doc= await Model.findByIdAndDelete(req.params.id);
    if (!doc) {

        return next(new AppError( 'No doc found ',404));
       }
  res.status(204).json({
      status:"success",
  data:null
  });

});

exports.updateOne=Model=>asyncHandler(async(req,res,next)=>{
         if (req.body.password || req.body.passwordConfirm) {
    return next (new AppError('Use /update_password',400))
  }
    
    const doc= await Model.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true
      });

  
      if (!doc) {

          return next(new AppError( 'No doc found ',404));
         }
  res.status(200).json({
      status:"success",
  data:{
      doc
  }
  });

});
exports.getOne=(Model,popOptions)=>asyncHandler(async(req,res,next)=>{

let query=Model.findById(req.params.id);
if(popOptions) query.populate(popOptions);
const doc =await query
if(!doc){
    return next(new AppError( 'No Document found ',404));
}

res.status(200).json({
status: "success",
data:{
    data:doc
}
})
});

exports.getAll=Model=>asyncHandler(async(req,res)=>{
   
 const doc=await Model.find().select('-role');

    // eXecute Query
    //  .filter()
    //  .sort()
    //  .fieldLimiting()
    //  .pagination();
    // const doc= await features.query;

  
    res.status(200).json({
        status:"success",
        results: doc.length,
        data:{
            data:doc
        }

    });

});