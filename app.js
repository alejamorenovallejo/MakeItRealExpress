const express = require('express');
const app = express();


app.get('/', (req, res) => {
  //res.send('<h1>' +  req +'</h1>' )
  res.send(req.header('user-agent'))

  
});


app.listen(3000, () => console.log('Listening on port 3000!'));