const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const value =req.query.nombre ==='' ? 'desconocido' : req.query.nombre; 
  res.send('<h1>Hola ' +  value  +'!</h1>');
  
});

app.listen(3000, () => console.log('Listening on port 3000!'));