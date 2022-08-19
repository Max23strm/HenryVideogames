const { Router } = require('express');
const {Videogame, Genre} =  require ('../db')
const axios=require("axios");
const db = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* const llamadaAlCargar=async ()=>{
    //Obtiene los datos de los generos de la API
    var generosPromesa= await axios.get('https://api.rawg.io/api/genres?key=75f23917b57947658c4010b7f4ed1fdb')
    let generosSubir=[]
    
    let agregarGen=(elem)=>{
            //Pushea y da forma al objeto
                generosSubir.push({
                    "Nombre":elem.name,
                    "id": elem.id
                })
    }


    // Obtiene paginas de juegos de la API 
    let promesas=[
        await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb"),
        await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=2"),
        await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=3"),
        await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=4"),
        await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=5")
    ]
    //Define la funcion que formatea los juegos a agragar y los agrega a un arreglo
    let juegosSubir=[]
    let agregar=(arreglo)=>{
        
        arreglo.data.results.forEach(e=>{
            //Formatea las plataformas
            let plataformas=e.platforms.map(j=>{
                return j.platform.name
            })
            //Formatea los generos
            let generos= e.genres.map(g=>{
                return g.id
            })
            //Pushea y da forma al objeto
            juegosSubir.push({
                juego:{
                "ext_id":e.id,
                "name": e.name,
                "description":`The game ${e.name} currently has a rating of ${e.rating} and you can find it in diferent platforms`,
                "image": e.background_image,
                "rating": e.rating,
                "plataformas": plataformas,
                "genres":generos
                },
                "generos":generos
            })
        })
    }
    generosPromesa.data.results.forEach(p=>agregarGen(p))
    promesas.forEach(p=>agregar(p))
    try {
        await Genre.bulkCreate(generosSubir)
        console.log("Generos actualizados")
        juegosSubir.forEach(async obj=>{
            const juego= await Videogame.create(obj.juego)
            juego.setGenres(obj.generos)

        })


        //await Videogame.bulkCreate(juegosSubir)
        console.log("Juegos actualizados")
    } catch (error) {
        console.log(error)
    }
}
//Carga los archivos al iniciar el servidor
var flag=true

while (flag){
    llamadaAlCargar()
    flag=false
} */

/* router.get("/videogames",async (req,res)=>{
    const {name}=req.query
    if(name){
        const juego= await Videogame.findAll({
            where: {name}
        })
        try {
            return res.status(200).json(juego)
        } catch (error) {
            res.status(404).send("Juego no encontrado")
        }
    }else{

        try {
            const dbResponse=await Videogame.findAll()
            res.status(200).send(dbResponse)
        } catch (error) {
            console.log(error.original)
        }
    }
}) */
    //GET AL GENRES FROM API OR DATABASE
    var flag=false
    router.get('/genres',async(req,res)=>{
        if(flag){
            try {
                const generos=await Genre.findAll()
                return res.json(generos)
                
            } catch (error) {
                return res.json(error) 
            }
        } else{
            try {
                const generos= await axios.get("https://api.rawg.io/api/genres?key=75f23917b57947658c4010b7f4ed1fdb")
                const generosFiltrados=generos.data.results.map(e=>{
                    return {
                        id:e.id,
                        name:e.name,
                        image: e.image_background
                    }
                })
                flag=true
                await Genre.bulkCreate(generosFiltrados)
                return res.json(generosFiltrados)
            } catch (error) {
                return res.json(error)
            }
        }
    })
    
    // GET ALL GAMES OR SEARCH BY NAME
    router.get('/videogames', async (req,res)=>{
        const {name}=req.query

        if (name){
            const datos= await axios.get(`https://api.rawg.io/api/games?search=${name}&&key=75f23917b57947658c4010b7f4ed1fdb`)
            const enviar=datos.data.results.map(j=>{
                return{
                    "id":j.id,
                    "name": j.name,
                    "image": j.background_image,
                    "rating": j.rating,
                    "plataformas": j.platforms && j.platforms.map(p=>p.platform.name),
                    "genres":j.genres.map(g=>g.name)
                }
            })
            try{
                return res.json(enviar)
            } catch(error){
                res.json(error)
            }
        } else{
            
            try{
                let promesas=[
                    await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb"),
                    await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=2"),
                    await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=3"),
                    await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=4"),
                    await axios.get("https://api.rawg.io/api/games?key=75f23917b57947658c4010b7f4ed1fdb&page=5")
                ]
                let enviarApi=[]
                promesas.forEach(e=>{
                    e.data.results.forEach(j=>{
                        let obj={
                            "id":j.id,
                            "name": j.name,
                            "image": j.background_image,
                            "rating": j.rating,
                            "plataformas": j.platforms.map(p=>p.platform.name),
                            "genres":j.genres.map(g=>g.name)
                        }
                        enviarApi.push(obj)
                    })
                })
                const dbResponse= await Videogame.findAll()
                enviarApi=[...dbResponse,...enviarApi]
                res.json(enviarApi)
            } catch(error){
                console.log(error)
            }
        }
    })

    //GET GAME FROM ID 
    router.get("/videogames/:id",async (req,res)=>{
        const {id}= req.params
        if(id){
            if(id.length<13){
                try {
                    const juego= await axios.get(`https://api.rawg.io/api/games/${id}?key=75f23917b57947658c4010b7f4ed1fdb`)
                    let enviarData=juego.data
                    res.json(enviarData)
                } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const juego= await Videogame.findAll({
                    where:{id}
                })
                return res.status(200).send(juego) 
            } catch (error) {
                res.status(404).send("Juego no encontrado")
            }
        }
    }
    })


router.post("/videogames", async (req,res)=>{
    const {name, description, fecha_de_lanzamiento, rating, plataformas} = req.body
    if(!name || !description || !plataformas) {
        return res.status(404).send("Falta enviar datos obligatorios")
    }
    try {
        const videog= await Videogame.create({
            name,description,fecha_de_lanzamiento,rating,plataformas
        })

    return res.status(201).json(videog)
} catch (error) {
    return res.status(400).json({error:error.message})
}
})


module.exports = router;
