const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
// app.use(express.cookieParser());
app.use(cookieParser())
app.use(express.static('client/build'));
app.use(bodyParser.json());

let randomId = () => "_" + Math.random().toString(36).substr(2, 9);

const gifts = [
    {id:1,cost:25,img:'https://icons-for-free.com/iconfiles/png/512/christmas+gift+gift+box+present+icon-1320184382640199846.png',available:true},
    {id:2,cost:40,img:'https://icons-for-free.com/iconfiles/png/512/christmas+gift+gift+box+present+icon-1320184382640199846.png',available:true},
    {id:3,cost:30,img:'https://icons-for-free.com/iconfiles/png/512/christmas+gift+gift+box+present+icon-1320184382640199846.png',available:true},
    {id:4,cost:40,img:'https://icons-for-free.com/iconfiles/png/512/christmas+gift+gift+box+present+icon-1320184382640199846.png',available:true},
]

const giftsInCart = []

const currentUser = {};

app.get('/get-gifts', (req, res) => {


  currentUser.id = randomId();
  currentUser.money = 100;
  res.cookie('user',currentUser.id, { maxAge: 90000000000, httpOnly: true });
  res.send(gifts);
})

app.get('/get-gifts-in-cart', (req, res) => {
    res.send(giftsInCart);
  })

app.post('/post_cost', (req, res) => {

    const {id} = req.body;
    let gift = gifts.find(g => g.id == id)
    if (currentUser.money > gift.cost) {
        currentUser.money= currentUser.money-gift.cost;
        giftsInCart.push(gift);
        res.send({ ok: true })
    }else{
        res.send({ failed:"there is no enough money" })
        console.log("no money");
    }
  })

  app.get('/get-user-money', (req, res) => {

    res.send({user:currentUser});
  })


const port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log('listening', port)
})
