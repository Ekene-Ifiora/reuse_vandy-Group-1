const express = require('express'); 
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/:auth', (req,res) => {
    // sign in with google
});

// add API calls for getting data, such as pictures, etc from firebase

app.get('/', (req, res) => { 
    res.status(200).send({
        Message: 'Hello World'
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port}`));