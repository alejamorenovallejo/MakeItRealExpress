const express = require('express');
const app = express();
let value;

app.get('/', (req, res) => {

  
  if (req.query.nombre==='') {
    value='undefined'
  }else {
    value=req.query.nombre
  }
  res.send('<h1>Hola ' +  value  +'!</h1>');
  
});

app.listen(3000, () => console.log('Listening on port 3000!'));