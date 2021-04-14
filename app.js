const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });


const schema = mongoose.Schema({
  date : {type: Date, default: Date.now},
  name : String,
});

// definimos el modelo
const Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {
  const value = req.query.name || 'Anónimo';  
  Visitor.create({ name: value }, function(err) {
    if (err) return console.error(err);
  });
  res.send('<h1>El visitante fue almacenado con éxito</h1>');
  
});



/*app.get('/', (req, res) => {
  res.send(req.header('user-agent'))

  
});*/




app.listen(3000, () => console.log('Listening on port 3000!'));