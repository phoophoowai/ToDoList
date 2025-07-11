const express = require('express');
const app = express();
const toDoRoutes = require('./routes/todoRoutes');
const serverless = require('serverless-http');
const port = 8080;

app.use(express.json());
app.use('/todos', toDoRoutes);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

module.exports.handler = serverless(app, {
  request: (req, event) => {
    if (Buffer.isBuffer(req.body)) {
      try {
        req.body = JSON.parse(req.body.toString());
      } catch (err) {
        console.error('Error parsing body buffer:', err);
        req.body = {}; // fallback to empty object
      }
    }
    return req;
  }
});