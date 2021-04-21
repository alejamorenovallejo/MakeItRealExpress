const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

app.set('view engine', 'pug');
app.set('views', 'views');

const schema = mongoose.Schema({
  name : String,
  count : Number,
});

// definimos el modelo
const Visitor = mongoose.model("Visitor", schema);

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

      res.render("index", {
        visitors: visitors
      });
    });
});
app.listen(3000, () => console.log('Listening on port 3000!'));