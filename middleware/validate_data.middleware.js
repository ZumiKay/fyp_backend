const { body, validationResult } = require('express-validator');

export const validate_registerInput = [
        body('fullname').isString().notEmpty(),
        body('studentID').isNumeric().notEmpty(),
        body('department').isString().notEmpty(),
        body('phone_number').isNumeric().notEmpty(),
        body('email').isEmail().notEmpty(),
        (req, res ,next) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({erros: errors.array()})
            }
            next()
        }
    ]
