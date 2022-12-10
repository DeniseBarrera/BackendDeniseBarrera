const express = require('express');
const handlebars = require('express-handlebars');
const router = require("./router");

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/productos', router);

app.engine('hbs',
handlebars({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/public/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs')
app.set('views', 'public/views')

/*fakeApi = () => [
    { name: 'vianda princess & prince' , lane: 'midlaner' },
    { name: 'botella motivacional 1 lts' , lane: 'toplaner' },
    { name: 'botella selvatica' , lane: 'midlaner' },
    { name: 'molde de helado de silicona' , lane: 'midlaner' }
]

app.get('/', (req, res)=> {
    res.render('main', {suggestedProducts: fakeApi(), listExists: true})
})*/



app.listen(8090, () =>{
    console.log('server ok!');
})