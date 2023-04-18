import db from "../model"

export const isLibrarain = (req , res , next) => {
    if(req.user && req.user.role === 'librarian' && db.librarian.find(({fullname}) => fullname === req.user.fullname)) {
        next()
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
}
export const isStudent = (req, res , next) => {
    if(req.user && req.user.role === 'student') {
        next()
    } else {
        res.status(401).json({message:"Unauthorized"})
    }
}