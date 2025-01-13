const userModel = require('../models/admin');

module.exports = {
    create: (req, res)=>{
        let admin = new userModel({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        })
        
        admin.save()
        .then(result =>{
            if(!result) res.json({success: false, result: 'error saving admin'});
            res.json({success: true, result: result});
        })
        .catch(err =>{
            res.json({success: false, result: 'err saving admin', err})
        })
        
    },
    retrieve: (req, res)=>{
        userModel.find()
            .then(admin =>{
                if(!admin) res.json({success: false, result: 'no admin found!'});
                res.json({success: true, result: admin})
            })
        .catch(err=>{
            res.json({success: false, result: err})
        })
    },
    get: (req, res)=>{
        userModel.findOne(req.params._id)
            .then(admin =>{
                if(!admin) res.json({success: false, result: 'admin with this id is not found!'});
                res.json({success: true, result: admin})
            })
            .catch(err=>{
            res.json({success: false, result: err})
            })
    },
    update: (req, res)=>{
        userModel.updateOne({_id: req.body._id}, req.body)
            .then((result)=>{
                if(!result) res.json({success: false, result: 'No student with this id found!'});
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success: false, result: err})
            })
    },
    delete: (req, res)=>{
        userModel.deleteOne({_id: req.body._id})
            .then(result=>{
                if(!result) res.json({success: false, result: 'Student no deleted'});
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success:false, result: err})
            })
    }
}