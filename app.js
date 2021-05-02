const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const { Schema }=mongoose;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  secret: 'key',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.set('view engine', 'pug');
app.set('views', 'views');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

//definimos el Schema
const userSchema = mongoose.Schema({
  name:String,
  email:String,
  password:String
});
// definimos el modelo
const User = mongoose.model("User", userSchema);

app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('index', {
      users : users,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get('/register',(req, res) => {
    res.render('register')
});

app.post('/register', async (req,res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({name:req.body.nombre, email:req.body.email, password:hash});
    res.redirect('/');
    
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.listen(3000, () => console.log('Listening on port 3000!'));