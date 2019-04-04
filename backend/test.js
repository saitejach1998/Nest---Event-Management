var express = require("express");
var app = express();
var port = 3300;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Test-DB");

var nameSchema = new mongoose.Schema({
    name: String,
    GSTnumber: String,
    userName: String,
    passwordHash: String
});

var GSTSchema = new mongoose.Schema({
    GSTnumber: String
});

var ImageSchema = new mongoose.Schema({
    category: String,
    image_base64: String
});

var eventSchema = new mongoose.Schema({
    title: String,
    event_summary: String,
    duration: Number,
    description: String,
    price: Number,
    genre: String,
    start_date: Date
});

var User = mongoose.model("User",nameSchema);
var GSTid = mongoose.model("GSTid",GSTSchema);
var localEvents = mongoose.model('local-events',eventSchema);
var globalEvents = mongoose.model('global-events',eventSchema);
var Images = mongoose.model('images',ImageSchema);

app.post("/adduser",(req,res) => {
    console.log(req.body);


    GSTid.find({GSTnumber : req.body.GSTnumber}, (err,docs) => {
        if(docs.length > 0){
            var myData = new User(req.body)

            myData.save()
                .then(item => {
                    res.send("item saved to database");
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
        else{
            res.send("unknown_GST_number");
        }
    });


});

app.get('/',(req,res) => {
    console.log('site requested');
    res.sendFile(__dirname + '/index.html');
})

app.post('/eventposting' ,(req,res)=> {

    console.log(req.body);
    var imagedata = new Images({ category: "Cooking", image_base64 : "abcde"});

    imagedata.save();

    res.end('saved')
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


// getting global events


// getting local events


// getting user events


// posting event
// keys
//   title
//   event_summary
//   number of days
//   event desciption
//   price
//   genre
//   start_date
//   image


