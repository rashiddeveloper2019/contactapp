var express = require('express')
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var User = require('./api/user')
var contactapp = require('./api/contact')
var {authenticate} = require('./api/middleware')
var path = require('path');
var app = express()
var port = 5000

mongoose.connect('mongodb://localhost:27017/CONTACTAPP1')

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/view/html.html')
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/view/login.html')
})
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/view/home.html')
})

app.post('/signup', User.signup)
app.post('/signin', User.signin)
app.get('/getdata',authenticate, User.getdata)
app.post('/deletedata',authenticate, User.deletedata)
app.get('/deletedataall', authenticate, User.deletedataall)
app.post('/updatedata', authenticate, User.updatedata)

app.get('/signout',authenticate, User.signout)
app.post('/contactapp',authenticate, contactapp.contactapp)


app.post('/rashid', (req, res) => {
    console.log("============", req.body)
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});



























