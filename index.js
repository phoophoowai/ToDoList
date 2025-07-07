const express = require('express');
const app = express();
const toDoRoutes = require('./routes/todoRoutes');
const serverless = require('serverless-http');
const port = 8080;

app.use((req, res, next) => {
    if (typeof req.body === 'string') {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return res.status(400).send('Invalid JSON');
        }
        
    }
    next();
});

app.use(express.json());
app.use('/todos', toDoRoutes);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

module.exports.handler = serverless(app);