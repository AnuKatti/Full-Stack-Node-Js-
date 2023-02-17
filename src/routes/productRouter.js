let express = require('express');
let productRouter = express.Router()
let mongodb = require('mongodb').MongoClient
let url = process.env.Mongo_Url;

function router(menu){
    productRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error while connecting')
            } else{
                let dbObj = dc.db('janmrng')
                dbObj.collection('product').find().toArray(function(err, product){
                    if (err){
                        res.status(203).send('Error while Fetching');
                    } else {
                        res.render('product',{product,title:'Products Page',menu})
                    }
                })
            }
        })
    })

    productRouter.route('/category/:id')
    .get(function(req,res){
        // let id = req.params.id
        let {id} = req.params
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error while connecting')
            } else{
                let dbObj = dc.db('janmrng')
                dbObj.collection('product').find({category_id:Number(id)}).toArray(function(err, product){
                    if (err){
                        res.status(203).send('Error while Fetching');
                    } else {
                        res.render('product',{product,title:'Products Page',menu})
                    }
                })
            }
        })
    })
    
    productRouter.route('/details')
    .get(function(req,res){
        res.send("Products Details")
    }) 

    return productRouter
}

module.exports = router;
