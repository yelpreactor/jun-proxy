const _ = require('underscore');
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
let getRestaurantsById = require('./header-map-master/database/index.js').getRestaurantsById;
let getRestaurantsByName = require('./header-map-master/database/index.js').getRestaurantsByName;
var db = require('./photo-wheel-master/database/index.js');
const names = require('./sidebar-master/database/businessNames.js');
const router = require('./sidebar-master/server/routes.js');

app.use('/:id', express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/', router);

app.get('/:id/res', function (req, res) {
    let resIdOrName = req.param('id');
    if (isNaN(parseInt(resIdOrName))) {
      getRestaurantsByName(resIdOrName, (err, data) => {
        res.send(JSON.stringify(data[0]));
      });
    } else {
      getRestaurantsById(resIdOrName, (err, data)=>{
        res.send(JSON.stringify(data[0]));
      });
    }
});

app.get('/:idOrName/restaurants', (req, res) => {
    if(isNaN(parseInt(req.params.idOrName))) {
      console.log(req.params.idOrName)
      db.getAllPicturesByName(req.params.idOrName, (err,data) => {
        if(err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    } else {
      db.getAllPicturesById(req.params.idOrName, (err, data) => {
          if(err) {
              res.send(err);
          } else {
              res.send(data); 		
          }
      });   
    }
});

app.get('/:idOrName/users', (req, res) => {
    db.getAllUsers(req.query.users, (err, data) => {
        if(err) {
            res.send(err);
        } else {
            res.send(data); 		
        }
    });
});

app.get('/:nameOrId/restaurants', controller.restaurants.get);


let port = 1335;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});