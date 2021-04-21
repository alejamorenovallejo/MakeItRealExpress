const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

app.set('view engine', 'pug');
app.set('views', 'views');

const schema = mongoose.Schema({
  name : String,
  count : { type: Number, default: 1 },
});

// definimos el modelo
const Visitor = mongoose.model("Visitor", schema);

/*Visitantes recurrentes*/
  app.get('/', async (req, res) => {
    try {
      const visitorExists = await Visitor.findOne({ name: req.query.name });
      if (visitorExists && visitorExists.name !== 'Anonimo') {
        await Visitor.findById(visitorExists.id, (err, visitor) => {
          visitor.count += 1;
          visitor.save();
        });
      } else {
        await Visitor.create({ name: req.query.name || 'Anonimo' });
      }
      const visitors = await Visitor.find();
      res.render('index', {
        visitors : visitors,
      });
      console.log(visitorExists)
    } catch (error) {
      console.error(error);
      res.status(500);
    }
});
app.listen(3000, () => console.log('Listening on port 3000!'));