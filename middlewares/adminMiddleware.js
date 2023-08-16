const User = require("../models/user");

const adminMiddleware =async (req,res,next)=>{
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user){
        res.status(400).send("User does not exist");
    }
    if(user.role==="admin"){
        next();
    }
     res.status(400).send("User not authorised to use the resorces.");   
}
module.exports = adminMiddleware;