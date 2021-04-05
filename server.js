const express = require('express');
const connectDB = require('./config/db');
const app = express();
const chalk = require('chalk');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is Running..'));
// app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.yellow(`Listening on PORT ${PORT}`)}`
  );
});
