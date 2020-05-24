const express = require('express');
const pageRouter = require('./routes/pages');
const bodyParser = require('body-parser');
const app = express();

//for body parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routers
app.use('/', pageRouter);


// errors : not found
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handling errors
app.use((req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


//setting up the server
// app.listen(3000, () => {
//      console.log('Server is running on port 3000...');

// });

module.exports = app;