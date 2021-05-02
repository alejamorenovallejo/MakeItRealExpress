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

/**Autenticacion**/
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/login', async (req,res)=>{

  let validation=false;

  try{
      const usersExist= await User.findOne({'email':req.body.email});
      if(usersExist){
          validation=await bcrypt.compare(req.body.password, usersExist.password);
      }

      if(validation){
          req.session.user= usersExist.id;
          const usersExists= await User.find();
          res.render('users', {"userList":usersExists});
      }else{
          res.render('login', {"error":true});
      }

  }catch(err){
      console.log(err);
  }
  
});

app.get('/logout', (req,res)=>{
  res.clearCookie('user');
  req.session = null;
  res.redirect('/login');
});


app.get('/register',(req, res) => {
  res.render('register')
});

app.post('/register', async (req,res) => {
try {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({name:req.body.name, email:req.body.email, password:hash});
  res.redirect('/');
  
} catch (error) {
  console.error(error);
  res.status(500);
}
});

/** Formulario Registro
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
    await User.create({name:req.body.name, email:req.body.email, password:hash});
    res.redirect('/');
    
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});**/

app.listen(3000, () => console.log('Listening on port 3000!'));