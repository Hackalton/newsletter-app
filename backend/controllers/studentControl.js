const userModel = require('../models/student');

module.exports = {
    create: (req, res)=>{
        let student = new userModel({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role
        })
        console.log('about to save student')
        student.save()
        .then(result =>{
                console.log('student saving...')
                if(!result) res.json({success: false, result: 'error saving student'});
                res.json({success: true, result: result})
                
            })
        .catch(err =>{
            console.log('Saving student skipped...')
            res.json({success: false, result: 'err saving student'})
        })
    },
    retrieve: (req, res)=>{
        userModel.find()
            .then(students =>{
                if(!students) res.json({success: false, result: 'no students found!'});
                res.json({success: true, result: students})
            })
            .catch(err=>{
            res.json({success: false, result: err})
            })
    },
    get: (req, res)=>{
        userModel.findById(req.params._id)
            .then(student =>{
                if(!student) return res.json({success: false, result: 'student with this id is not found!'});
                res.json({success: true, result: student})
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
        userModel.findByIdAndDelete({_id: req.params._id})
            .then(result=>{
                if(!result) res.json({success: false, result: 'Student not deleted'});
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success:false, result: err})
            })
    }
}