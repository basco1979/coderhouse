export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
} 

export const checkExistingUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    next();
}

export const isAdmin = (req, res, next) =>{
    if(req.session?.user?.role !== "admin"){
        req.logger.warning()
        return res.status(403).json({error : 'Forbidden'})
    }else{
        next()
    }
}

export const isUser = (req, res, next) =>{
    if(req.session?.user?.role !== "user"){
        return res.status(403).json({error : 'Forbidden'})
    }else{
        next()
    }
}

export const isUserOrAdmin = (req, res, next) =>{
    if(req.session?.user?.role !== "user" && req.session?.user?.role !== "admin"){
        return res.status(403).json({error : 'Forbidden'})
    }else{
        next()
    }
}

