

export  const generateToken  = (userId , res) =>{
    const token  = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn: '30d' // it tells  us  in how  many  days  we need to  login Again ...
    });

    res.cookie('token' ,token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly:true, // it prevents  us from  XSS attacks  cross -site scripting  attacks ...
        sameSite : "strict",  // it prevents  us from CSRF attacks  cross - site  request forgery attacks ...
        secure : process.env.NODE_ENV !== 'development' ? true : false // it  tells  us  that  we are  in  development  mode  or  production  mode ...
    } )

    return  token ;
}