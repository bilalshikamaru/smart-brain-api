const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const cors = require('cors')
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const port = process.env.PORT || 3001 

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '@Bcd123456789',
      database : 'smart-brain'
    }
  });
  

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.json('hello world :D')
})

app.post('/signin', (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt)
})


app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})


app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
})


app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
    
})

app.post('/imageUrl', (req, res) => {
    image.handleApiCall(req, res)
    
})



app.listen(port,()=>{
    console.log(`app is runnning on port ${port}`)
    
})