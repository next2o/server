const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 8080

const lighthouseRouter = require('./routes/lighthouseRouter.js');
const databaseRouter = require('./routes/databaseRouter.js');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());

app.use('/api', lighthouseRouter);
app.use('/api', databaseRouter);

app.get('/', (req, res, next) => {
  res.status(200).json({hello: 'world'})
})

console.log('request')

app.use((err, req, res, next) => {
  const defaultErr = {
    log: `${err} Express error handler caught unknown middleware error`,
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return JSON.stringify(errorObj.status, errorObj.message);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log("server listening on port 8080")
});

module.exports = app;