const express = require('express');
const router = require("./router");

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/productos', router);


app.set('view engine', 'pug')
app.set('views', 'public/views')




app.listen(8090, () =>{
    console.log('server ok!');
})