const jwt = require("jsonwebtoken");
const user = require("../model/userModel");

const authUser = async (req, res, next) =>{
    const  {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: "Auth token required"});
    }

    const token = authorization.split(" ")[1];
    try{
        const {_id} = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await user.findOne({_id}).select("_id");
        next();
    }catch(err){
        res.status(401).json({ error: "Request is not autherized!"});
    }
}

module.exports = authUser;