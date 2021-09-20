const express=require('express')
const router= express.Router();

//root of appl
router.get('/',(req,res)=>{
    res.render("index")
})


//exporting router
module.exports=router;