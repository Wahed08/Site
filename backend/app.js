const express = require('express');
const app = express();


app.listen(5000, (req, res)=>{
    console.log('server is connected to port 5000');
});