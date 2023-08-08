const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('Hi, this is the root route');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
