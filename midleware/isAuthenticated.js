
const isAuthenticated = (req,res)=>{
    const token = req.cookies.token
    if(!token || token === null){
        return res.send("Please")
    }
    JsonWebTokenError.verify(token,process.env.SERECT,(err,result)=>{
        if(err){
            res.send("Invalid Token")
        }
        else{
            console.log("valid token",result)
        }

    })
    next()
}