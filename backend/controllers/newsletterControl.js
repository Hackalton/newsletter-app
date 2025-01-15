const newsletter = require('../models/newsletter');
const NewsletterModel = require('../models/newsletter');

module.exports = {
    create: async (req, res)=>{
        try{
            let newsletter = new NewsletterModel({
                title: req.body.title,
                content: req.body.content,
                author: req.body.author
    
            });
            const result = await newsletter.save();
            if(!result){
                res.json({success: false, result: 'Error saving the newsletter'})
            }
            res.json({success: true, result: result})
        }
        catch(err){
            res.json({success: false, result: err});
        }
    },
    retrieve: (req, res)=>{
        NewsletterModel.find()
            .then(newsletter =>{
                if(!newsletter) res.json({success: false, result: 'no newsletter found!'});
                res.json({success: true, result: newsletter})
            })
            .catch(err=>{
            res.json({success: false, result: err})
            });
    },
    get: (req, res)=>{
        NewsletterModel.findById(req.params._id)
            .then(newsletter =>{
                if(!newsletter) return res.json({success: false, result: 'newsletter with this id is not found!'});
                res.json({success: true, result: newsletter})
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
        NewsletterModel.findByIdAndDelete({_id: req.params._id})
            .then(result=>{
                if(!result) res.json({success: false, result: 'Newsletter not deleted'});
                res.json({success: true, result: result})
            })
            .catch(err=>{
                res.json({success:false, result: err})
            })
    }
}