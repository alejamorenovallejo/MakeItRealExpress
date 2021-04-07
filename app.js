const express = require('express');
const app = express();
const useragent = require('express-useragent');


app.set('view engine', 'pug');
app.set('views', 'views');
app.use(useragent.express());

//app.use(express.urlencoded());


/*app.get('/', (req, res) => {
  const value = req.query.nombre || 'desconocido';   
  res.send('<h1>Hola ' +  value  +'!</h1>');
  
});*/

/*app.get('/makers/:name', (req, res) => {
  const value = req.params.name || 'desconocido';   
  
  res.send('<h1>Hola ' +  value.charAt(0).toUpperCase() + value.slice(1)  +'!</h1>');
  
});*/

/*app.get('/', (req, res) => {

  let value ='';
  for(i=1;i<=50;i++) {
     if (i  %  2 === 0) {
        value += '<p>' + i + ' Soy Par!</p>'
      }else 
      {
        value +='<p>' + i + ' Soy Impar!</p>'
      }
  }
  res.send(value);
});*/

/*app.get('/', (req, res) => {

  let array =[];
  for(i=1;i<=50;i++) {
    array.push(`${i} Soy ${(i % 2 === 0 ? "Par" : "Impar")}!`);
  }
  res.render('index', { title: "Pares e Impares", array: array });

});*/

/*app.get('/', (req, res) => {
  res.render('index');
});

app.post('/hello', (req, res) => {
  res.send('<h1>Hola ' +  req.body.name  +'!</h1>'  );
});*/


app.get('/', (req, res) => {
  //res.send(req.header('User-Agent'));
  //res.send(req.useragent.browser);
  res.send('<h1>' +  req.useragent.browser +'</h1>' )
});


app.listen(3000, () => console.log('Listening on port 3000!'));