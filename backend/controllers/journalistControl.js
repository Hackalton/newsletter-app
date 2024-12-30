const userModel = require('../models/user');

module.exports ={
    create: (req, res)=>{
        let journalist = new userModel({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        })
        
        journalist.save()
        
        .then(
            result =>{
                res.json({success: true, result: result})
            }
        )
        .catch(err=>{
            res.json({success: false, result: err})
        })
    },
    update: (req, res)=>{
        userModel.updateOne({_id: req.body._id}, req.body)
            .then(journalist =>{
                if(!journalist){res.json({success: false, result: 'Journalist not found!'})};
                res.json({journalist})
            })
            .catch(err=>{
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res)=>{
        userModel.find()
            .then(journalists=>{
                if(!journalists) res.json({success: false, result:'No Journalists found!'});
                res.json({success: true, result: journalists})
            })
            .catch(err=>{
                res.json({success: false, result: err})
            })
    },
    delete: (req, res)=>{
        userModel.deleteOne({_id: req.body._id})
            .then(result=>{
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success: false, result: err})
            })
    }

}