const {validatetoken}= require("../service/auth")
async function restrict(req,res,next){
    const token = req.cookies.token;
    if(!token){
       return res.render('home')
    }
    try{
        const userpayload = validatetoken(token);
        req.user=userpayload;
        console.log(req.user);
    }catch(error){}
    return next();
}

module.exports={
    restrict,
}