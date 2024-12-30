const newsletter = require('../models/newsletter');
const NewsletterModel = require('../models/newsletter');

module.exports = {
    create: (req, res)=>{
        let newsletter = new NewsletterModel({
            title: req.body.title,
            content: req.body.content
        })
        
        newsletter.save()
            .then(result =>{
                if(!result) res.json({success: false, result: 'error saving newsletter'});
                res.json({success: true, result: result})
            })
            .catch(err =>{
            res.json({success: false, result: 'err saving newsletter'})
            })
    },
    retrieve: (req, res)=>{
        NewsletterModel.find()
            .then(newsletter =>{
                if(!newsletter) res.json({success: false, result: 'no newsletter found!'});
                res.json({success: false, result: newsletter})
            })
            .catch(err=>{
            res.json({success: false, result: err})
            })
    },
    update: (req, res)=>{
        NewsletterModel.updateOne({_id: req.body._id}, req.body)
            .then((result)=>{
                if(!result) res.json({success: false, result: 'No newsletter with this id found!'});
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success: false, result: err})
            })
    },
    delete: (req, res)=>{
        NewsletterModel.deleteOne({_id: req.body._id})
            .then(result=>{
                if(!result) res.json({success: false, result: 'newsletter not deleted'});
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success:false, result: err})
            })
    }
}