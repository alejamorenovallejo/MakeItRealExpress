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
const productosSchema = mongoose.Schema({
  name:String,
  price:Number,
});
// definimos el modelo
const Products = mongoose.model("Products", productosSchema);



/**Devolviendo JSON**/
app.get('/products', async (req, res) => {
    const product = await Products.find();
    res.json(product)
});

app.listen(3000, () => console.log('Listening on port 3000!'));