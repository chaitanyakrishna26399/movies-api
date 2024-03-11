
const joi = require('joi')

class Validations {

static async Addmovie(req, res, next) {
    // validate the input body value. 
    const validation = joi.object({
        moviename: joi.string().required().label('moviename'),
        hero: joi.string().required(),
        genre: joi.string().required(),
        director: joi.string().required(),
        type:joi.string().required()
    })
    //  below options are used to remove the qoutes in the validation response.
    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };
    const response = {
        error: (message) => {
            return { error: message };
        },
        // other response methods...
    };
    const err = validation.validate(req.body, options);
    if (err.error) {
        //return error message.
        res.status(200).json(response.error(err.error.details[0].message));
    } else {
        //moves to next method.
        next();
    }
}
static async Updatemovie(req, res, next) {
    // validate the input body value. 
    const validation = joi.object({
        id:joi.string().required(),
        moviename: joi.string(),
        hero: joi.string(),
        genre: joi.string(),
        director: joi.string(),
        type:joi.string().required()
        })
    //  below options are used to remove the qoutes in the validation response.
    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };
    const response = {
        error: (message) => {
            return { error: message };
        },
        // other response methods...
    };
    const err = validation.validate(req.body, options);
    if (err.error) {
        //return error message.
        res.status(200).json(response.error(err.error.details[0].message));
    } else {
        //moves to next method.
        next();
    }
}
static async Deletemovie(req, res, next) {
    // validate the input body value. 
    const validation = joi.object({
        id:joi.string().required(),
        type:joi.string().required()
        })
    //  below options are used to remove the qoutes in the validation response.
    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };
    const response = {
        error: (message) => {
            return { error: message };
        },
        // other response methods...
    };
    const err = validation.validate(req.body, options);
    if (err.error) {
        //return error message.
        res.status(200).json(response.error(err.error.details[0].message));
    } else {
        //moves to next method.
        next();
    }
}
}
module.exports=Validations