const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./application');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE.replace(
  '<password>',
  process.env.PASSWORD_DB,
);

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then((connection) => {
    console.log('🤝 DB connection successful!');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
