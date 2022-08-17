const Product = require('../models/product');
const client = require('../config/mongoose');

// const collection = client.collection('products');

module.exports.product = async function(req,res) {
    try{
        let product;
        console.log(req.body);
        
        Product.uploadedProduct(req,res, async function(err){
            console.log(req.body);
            if(err){
                console.log('***Multer Error:',err);
            }
            product = await Product.create({
                productName: req.body.productName,
                qty: req.body.qty,
                price: req.body.price
            });

            console.log(req.file);
            if(req.file){
                // first it will go ProductSchema.uploadedProduct function and save 
                // the file destination and filename in the localstorage/multer storage
                product.image = Product.productPath + '/' + req.file.filename;
            }
            product.save();
         
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        product: product
                    },
                    message: 'Product Created!'
                });
            }

            return res.redirect('back');
        });
    }catch(err){
        console.log(err.message);
        return res.redirect('back'); 
    }
}


module.exports.fetchProduct = function(req,res){
   try{
        Product.find({},function(err, tasks){
            if(err){
                res.send(err);
            }else{
                res.json(tasks);
            }
        });
   }catch(err){
        console.log(err.message);
        return res.redirect('back'); 
    }
}

module.exports.searchProduct = async function(req,res){
    try{
        console.log(req.query)
        if(req.query.search.length > 1){
            const regex = new RegExp(escapeRegex(req.query.search),'gi');
            // console.log('hello');
            let found = Product.find({productName: {$regex: regex}}) 

            found.then(foundProduct => res.json(foundProduct));

        }else{
            Product.find({}) 
                .then(foundProduct => res.json(foundProduct));
        }
        
            
    }catch(err){
         console.log(err.message);
         return res.redirect('back'); 
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};