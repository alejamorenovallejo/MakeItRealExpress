const express = require('express');
const app = express();

/*app.get('/', (req, res) => {
  const value = req.query.nombre || 'desconocido';   
  res.send('<h1>Hola ' +  value  +'!</h1>');
  
});*/

app.get('/makers/:name', (req, res) => {
  const value = req.params.name || 'desconocido';   
  
  res.send('<h1>Hola ' +  value.charAt(0).toUpperCase() + value.slice(1)  +'!</h1>');
  
});

app.listen(3000, () => console.log('Listening on port 3000!'));