const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router connenction
app.use('/api/auth', userRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Dadabase connection is maintained successfully!');
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
