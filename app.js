const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });


const schema = mongoose.Schema({
  name : String,
  count : Number,
});

// definimos el modelo
const Visitor = mongoose.model("Visitor", schema);

/*app.get('/', (req, res) => {
  const value = req.query.name || 'Anónimo';  
  Visitor.create({ name: value,  count: 1}, function(err) {
    if (err) return console.error(err);
  });
  res.send('<h1>El visitante fue almacenado con éxito</h1>');
  
});*/


/*Visitantes recurrentes*/
app.get('/', (req, res) => {
  const value = req.query.name
  
  Visitor.find({name : value}, function(err, visitors) {
      if (err) return console.error(err);
      if(visitors.length > 0) {
      count = visitors[0].count+1
        Visitor.updateOne({ count: count }, function(err) {
          if (err) return console.error(err);
        });
      }else {
        Visitor.create({ name: (value ? value: 'Anonimo'),  count: 1}, function(err) {
          if (err) return console.error(err);
        });
      }

      Visitor.find({}, function(err, visitors) {
      var templ='<table border=2><thead><tr><th>Id</th><th>Name</th><th>Count</th></tr></thead> <tbody>'

        visitors.forEach(element => 
          templ +=  '<tr><td>'+ element._id + '</td><td>' + element.name + '</td><td>' + element.count + '</td></tr>'
        )
        templ +='</tbody></table>'
        res.send(templ)
      
      });
    });
});
app.listen(3000, () => console.log('Listening on port 3000!'));