//creamos el servidor
import express from "express";
const app = express();
const port = 3000;
//array de los usuarios
const usuario=[
    "Carlos",
    "Miguel",
    "Nelson",
    "Darold",
    "Augusto",
    "Ignacia",
    "Esperanza",
];
const numberRandom = () => {
    const numero = Math.floor(Math.random() * (4)) + 1
    return numero
}

app.listen(port, ()=>{
    console.log(`Servidor esta corriendo en http://localhost:${port}`);

})

//Hacemos publica en el servidor  la carpeta Assets
app.use(express.static('assets'))

//Middleware para validar que el usuario recibido como parametreo este en el array. si no se encuentra envia la imagen who.jpg
app.use('/abracadabra/juego/usuarios',(req,res,next) =>{
    const usuario = req.params.usuario;
    if(users.includes(usuario)){
            next();
    }
    else{
        res.redirect('/who.jpeg');
    }
})

 
//ruta get
//
app.get('abracadabra/:usuario', (req, res) =>{
    res.send(usuario);
})
//para devolver los usuarios existentes en el array
app.get('/abracadabra/usuarios', (req, res) => {
    res.send({usuario})
})
//get 
app.get('/', async (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.get('/abracadabra/juego/:usuario', (req, res) =>{
    res.send(usuario);
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    let n = req.params.n
    let number = numberRandom()
    //res.send([n, numero])
    n == number ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg');
    
})

//Esta es una ruta que devuelve un 404pagina no existe, en caso de consultar una ruta no definida
app.use('*',(err, req, res, next) => {
    console.error(err.stack)
    res.status(404).send('<h1>Esta pagina no existe</h1>');
})