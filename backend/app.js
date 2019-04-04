let express = require("express");
let app = express();
let port = 3000;

let bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));


let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/EMS-DB", {
    useNewUrlParser: true
});

mongoose.connection.on('connected', function () {
  console.log("Mongoose default connection open to mongodb://localhost:27017/EMS-DB");
});

let nameSchema = new mongoose.Schema({
    name: String,
    emailID: String,
    gstNumber: String,
    userName: String,
    passwordHash: String
});

let eventSchema = new mongoose.Schema({
    title: String,
    event_summary: String,
    duration: Number,
    description: String,
    price: Number,
    genre: String,
    start_date: Date,
    latitude: Number,
    longitude: Number,
    userID: String,
    image_url: String
});

let ImageSchema = new mongoose.Schema({
    category: String,
    image_url: String
});

let GSTSchema = new mongoose.Schema({
    GSTnumber: String
});

let User = mongoose.model("User", nameSchema);
let GSTid = mongoose.model("GSTid", GSTSchema);

let localEvents = mongoose.model('local-events', eventSchema);
let globalEvents = mongoose.model('global-events', eventSchema);

let Images = mongoose.model('images', ImageSchema);


function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;

        dist = dist * 1.609344;

        return dist;
    }
}

app.get('/', function (req, res) {
  res.status(200).send('EMS server running');
});

app.post("/adduser", (req, res) => {

    console.log('add user');
    //console.log(req.body);


    GSTid.find({
        gstNumber: req.body.gstNumber
    }, (err, docs) => {
        if (docs.length > 0) {

            User.find({
                userName: req.body.userName
            }).lean().exec((err, docs) => {
                if (docs.length == 0) {
                    let myData = new User(req.body);

                    myData.save()
                        .then(item => {
                            let respObj = {
                                respMsg: "user_saved",
                                userID: item._id
                            };
                            res.json(respObj);
                        })
                        .catch(err => {
                            let respObj = {
                                respMsg: "unable_to_save"
                            };
                            res.json(respObj);
                        });
                } else {
                    let respObj = {
                        respMsg: "username_exists"
                    };
                    res.json(respObj);
                }
            });

        } else {
            let respObj = {
                respMsg: "unknown_gst_number"
            };
            res.send(respObj);
        }
    });
});

app.post("/updateevent", (req, res) => {
    console.log("update_event");

    User.find({
        _id: req.body.userID
    }).lean().exec((err, docs) => {
        //console.log(docs);

        if (docs.length == 1) {
            if (docs[0].gstNumber == 'NaN') {
                let id = req.body._id;
                delete req.body._id;

                localEvents.updateOne({
                    _id: id
                }, req.body, function (err, doc) {
                    console.log(doc);
                    if (err) return res.send(500, {
                        error: err
                    });
                    let respObj = {
                        respMsg: "local_event_updated"
                    };
                    return res.send(respObj);
                });
            } else {
                let id = req.body._id;
                delete req.body._id;

                globalEvents.updateOne({
                    _id: id
                }, req.body, function (err, doc) {
                    console.log(doc);
                    if (err) return res.send(500, {
                        error: err
                    });
                    let respObj = {
                        respMsg: "global_event_updated"
                    };
                    return res.send(respObj);
                });
            }
        } else {
            let respObj = {
                respMsg: "user_not_found"
            };
            res.send(respObj);
        }
    });

});

app.post("/deleteevent", (req, res) => {
    console.log("delete_event");

    User.find({
        _id: req.body.userID
    }).lean().exec((err, docs) => {
        //console.log(docs);

        if (docs.length == 1) {
            if (docs[0].gstNumber == 'NaN') {
                let id = req.body._id;
                delete req.body._id;

                localEvents.deleteOne({
                    _id: id
                }, function (err, doc) {
                    console.log(doc);
                    if (err) return res.send(500, {
                        error: err
                    });
                    let respObj = {
                        respMsg: "local_event_deleted"
                    };
                    return res.send(respObj);
                });
            } else {
                let id = req.body._id;
                delete req.body._id;

                globalEvents.deleteOne({
                    _id: id
                }, function (err, doc) {
                    console.log(doc);
                    if (err) return res.send(500, {
                        error: err
                    });
                    let respObj = {
                        respMsg: "global_event_deleted"
                    };
                    return res.send(respObj);
                });
            }
        } else {
            let respObj = {
                respMsg: "user_not_found"
            };
            res.send(respObj);
        }
    });

});

app.post("/validateuser", (req, res) => {

    console.log('validate user');
    //console.log(req.body);

    User.find({
        userName: req.body.userName
    }).lean().exec((err, docs) => {
        //console.log(docs);
        if (docs.length == 1) {
            if (docs[0].passwordHash == req.body.passwordHash) {
                let respObj = {
                    respMsg: "valid_user",
                    userID: docs[0]._id
                };
                res.send(respObj);
            } else {
                let respObj = {
                    respMsg: "wrong_password"
                };
                res.send(respObj);
            }
        } else {
            let respObj = {
                respMsg: "unknown_user"
            };
            res.send(respObj);
        }
    });
});

app.post('/eventposting', (req, res) => {

    console.log('event posting');

    console.log(req.body);

    User.find({
        _id: req.body.userID
    }).lean().exec((err, docs) => {
        //console.log(docs);

        if (docs.length == 1) {
            if (docs[0].gstNumber == 'NaN') {


                let id = mongoose.mongo.ObjectId();
                Images.find({
                    category: req.body.genre
                }).lean().exec((err, docs) => {

                    let dataObj = {
                        _id: id,
                        title: req.body.title,
                        event_summary: req.body.event_summary,
                        duration: req.body.duration,
                        description: req.body.description,
                        price: req.body.price,
                        genre: req.body.genre,
                        start_date: req.body.start_date,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        userID: req.body.userID,
                        image_url: docs[0].image_url
                    };


                    let levent = new localEvents(dataObj);
                    levent.save();
                });

                let respObj = {
                    respMsg: "local_event_saved",
                    'eventID': id
                };
                res.send(respObj);
                console.log('local event saved');
            } else {


                let id = mongoose.mongo.ObjectId();

                Images.find({
                    category: req.body.genre
                }).lean().exec((err, docs) => {

                    let dataObj = {
                        _id: id,
                        title: req.body.title,
                        event_summary: req.body.event_summary,
                        duration: req.body.duration,
                        description: req.body.description,
                        price: req.body.price,
                        genre: req.body.genre,
                        start_date: req.body.start_date,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        userID: req.body.userID,
                        image_url: docs[0].image_url
                    };

                    let gevent = new globalEvents(dataObj);
                    gevent.save();
                });

                let respObj = {
                    respMsg: "global_event_saved",
                    "eventID": id
                };
                res.send(respObj);
                console.log('global event saved');
            }
        } else {
            let respObj = {
                respMsg: "user_not_found"
            };
            res.send(respObj);
        }
    });
});

app.post('/getglobalevents', (req, res) => {

    console.log('get global events');
    console.log(req.body);
    globalEvents.find({}).lean().exec((err, docs) => {
        //console.log(docs);
        let datalist = docs.slice();
        //console.log(datalist);
        if (datalist.length > 0) {

            for (let i = 0; i < datalist.length; i++) {
                let dist = distance(req.body.latitude, req.body.longitude, datalist[i].latitude, datalist[i].longitude);

                datalist[i].distance = Math.ceil(dist);

            }

            ret_data = []

            if(req.body.filter_genre != 'All'){
                for(let i = 0;i < datalist.length; i++){
                    if(req.body.filter_genre == datalist[i].genre){
                        ret_data.push(datalist[i]);
                    }
                }
            }
            else{
                ret_data = datalist.slice();
            }

            _ret_data = []

            if(req.body.sort_dist == true){
                for(let i = 0;i < ret_data.length; i++){
                    if(req.body.filter_dist >= ret_data[i].distance){
                        _ret_data.push(ret_data[i]);
                    }
                }
            }
            else{
                _ret_data = ret_data.slice();
            }

            _ret_data.sort((a, b) => {
                return a.distance - b.distance;
            });

            let respObj = {
                respMsg: "global_event_list",
                event_list: _ret_data
            };
            res.send(respObj);
        } else {
            let respObj = {
                respMsg: "no_global_events"
            };
            res.send(respObj);
        }

    });
});

app.post('/getlocalevents', (req, res) => {
    console.log('get local event');
    console.log(req.body);
    localEvents.find({}).lean().exec((err, docs) => {
        //console.log(docs);
        let datalist = docs.slice();

        if (datalist.length > 0) {

            for (let i = 0; i < datalist.length; i++) {
                let dist = distance(req.body.latitude, req.body.longitude, datalist[i].latitude, datalist[i].longitude);

                datalist[i].distance = Math.ceil(dist);

            }

            ret_data = []

            if(req.body.filter_genre != 'All'){
                for(let i = 0;i < datalist.length; i++){
                    if(req.body.filter_genre == datalist[i].genre){
                        ret_data.push(datalist[i]);
                    }
                }
            }
            else{
                ret_data = datalist.slice();
            }

            _ret_data = []

            if(req.body.sort_dist == true){
                for(let i = 0;i < ret_data.length; i++){
                    if(req.body.filter_dist >= ret_data[i].distance){
                        _ret_data.push(ret_data[i]);
                    }
                }
            }
            else{
                _ret_data = ret_data.slice();
            }

            _ret_data.sort((a, b) => {
                return a.distance - b.distance;
            });

            let respObj = {
                respMsg: "local_event_list",
                event_list: _ret_data
            };
            res.send(respObj);
        } else {
            let respObj = {
                respMsg: "no_local_events"
            };
            res.send(respObj);
        }

    });
});

app.post('/getuserevents', (req, res) => {
    console.log('get user events');

    User.find({
        _id: req.body.userID
    }).lean().exec((err, docs) => {
        console.log('user events details: ');
        console.log(req.body);
        if (docs.length == 1) {

            if (docs[0].gstNumber == 'NaN') {
                localEvents.find({
                    userID: req.body.userID
                }).lean().exec((err, docs) => {
                    if (docs.length > 0) {

                        let respObj = {
                            respMsg: "user_events_found",
                            event_list: docs
                        };
                        res.send(respObj);
                    } else {
                        let respObj = {
                            respMsg: "no_user_events"
                        };
                        res.send(respObj);
                    }
                });
            } else {
                globalEvents.find({
                    userID: req.body.userID
                }).lean().exec((err, docs) => {
                    if (docs.length > 0) {

                        let respObj = {
                            respMsg: "user_events_found",
                            event_list: docs
                        };
                        res.send(respObj);
                    } else {
                        let respObj = {
                            respMsg: "no_user_events"
                        };
                        res.send(respObj);
                    }
                });
            }
        } else {
            let respObj = {
                respMsg: "no_user_found"
            };
            res.send(respObj);
        }
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
