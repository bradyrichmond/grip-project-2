'use strict'

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Category = require('./model/categories');
var MenuItem = require('./model/menuItems');
var Token = require('./model/tokens');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    //and remove cacheing so we get the most recent
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}

const createToken = (jwt) => {
    return new Promise((res, rej) => {
        Token.findOne(jwt, (err, result) => {
            if (!result) {
                var newToken = new Token(jwt);
                newToken.save((err) => {
                    if (err) {
                        rej('Error adding token to mongodb');
                    }
                    res();
                });
            } else {
                console.log(`Token already exists for ${jwt.name}`);
                res();
            }
        });
    });
}

const isUserAdmin = (email) => {
    if (process.env.APP_ADMINS.includes(email)) {
        console.log('User is an admin');
        return true;
    }
    console.log('User is not an admin');
    return false;
}

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!' });
});

//adding the /tokensignin route to our /api router
router.route('/tokensignin')
    .post(function (req, res) {
        verify(req.body.tokenId)
        .then((jwt) => {
            createToken(jwt)
            .then(() => {
                const isAdmin = isUserAdmin(jwt.email);
                res.send({accessToken: req.body.accessToken, isAdmin});
            })
            .catch((response) => {
                res.send(response);
            });
        })
        .catch((error) => {
            console.log(error);
            res.send(`Verify fail: ${JSON.stringify(req.body)}`);
        });
    })

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

router.route('/category/:_id')
    .put(function (req, res) {
        Category.findByIdAndUpdate(req.params._id, {text: req.body.text}, {new: true}, function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'category has been updated' })
        });
    })
    .delete(function (req, res) {
        //remove all menu items in this category
        Category.findById(req.params._id, function(findById_err, category) {
            if (findById_err)
                res.send(findById_err);

            var lowerCaseCategory = category.text.toLowerCase();

            MenuItem.find({category: lowerCaseCategory}, function(find_error, menuItems) {
                if (find_error)
                    res.send(find_error);
                
                var deleteList = menuItems.map((menuItem) => {
                    return menuItem._id;
                });

                MenuItem.deleteMany({_id: { $in: deleteList}}, function(deleteMany_error) {
                    if (deleteMany_error)
                        res.send(deleteMany_error);
                    //selects the category by its ID, then removes it.
                    Category.deleteOne({ _id: req.params._id }, function (deleteOne_error) {
                        if (deleteOne_error)
                            res.send(deleteOne_error);
                        res.json({ message: 'category has been deleted' })
                    });
                })
            });

            
        });
    });
  
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
      menuItem.toGo = req.body.toGo;
      menuItem.save(function (err) {
          if (err)
              res.send(err);
          res.json({ message: 'MenuItem successfully added!' });
      });
  })

router.route('/menuitem/:_id')
    .delete(function (req, res) {
        //selects the menuitem by its ID, then removes it.
        MenuItem.deleteOne({ _id: req.params._id }, function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'menuItem has been deleted' })
        })
    });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});