'use strict'

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Category = require('./model/categories');
var MenuItem = require('./model/menuItems');
require('dotenv').config();

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.GRIP_MONGO_URI);

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent tweets
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!' });
});

//adding the /categories route to our /api router
router.route('/categories')
    //retrieve all categories from the database
    .get(function (req, res) {
        //looks at our Category Schema
        Category.find(function (err, categories) {
            if (err)
                res.send(err);
            //responds with a json object of our database categories.
            res.json(categories)
        });
    })
    //post new category to the database
    .post(function (req, res) {
        var category = new Category();
        //body parser lets us use the req.body
        category.text = req.body.text;
        category.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Category successfully added!' });
        });
    })
  
  //adding the /categories route to our /api router
router.route('/menuitems')
  //retrieve all categories from the database
  .get(function (req, res) {
      //looks at our MenuItem Schema
      MenuItem.find(function (err, menuItems) {
          if (err)
              res.send(err);
          //responds with a json object of our database categories.
          res.json(menuItems)
      });
  })
  //post new menuitem to the database
  .post(function (req, res) {
      var menuItem = new MenuItem();
      //body parser lets us use the req.body
      menuItem.title = req.body.title;
      menuItem.description = req.body.description;
      menuItem.price = req.body.price;
      menuItem.category = req.body.category;
      menuItem.spiceLevel = req.body.spiceLevel;
      menuItem.bottle = req.body.bottle;
      menuItem.addOn = req.body.addOn;
      menuItem.save(function (err) {
          if (err)
              res.send(err);
          res.json({ message: 'MenuItem successfully added!' });
      });
  })

// router.route('/tweets/:tweet_id')
//     .delete(function (req, res) {
//         //selects the tweet by its ID, then removes it.
//         Tweet.remove({ _id: req.params.tweet_id }, function (err, tweet) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'Tweet has been deleted' })
//         })
//     });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});