const { Router } = require('express');
const {Videogame, Genre} =  require ('../db')
const axios=require("axios");
const db = require('../db');
const {API} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET AL GENRES FROM API OR DATABASE
var flag=false
const randomNumber= Math.floor(Math.random() * 100)
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
            const generos= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
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
        const datos= await axios.get(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`)
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
            console.log(error)
            res.json({error:error.message})
        }
    } else{
        try{
            let promesas=[
                await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomNumber}`),
                await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomNumber + 1}`),
                await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomNumber + 2}`),
                await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomNumber + 3}`),
                await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomNumber + 4}`)
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
                    const juego= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
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
                return res.status(200).send(juego[0]) 
            } catch (error) {
                res.status(404).send("Juego no encontrado")
            }
        }
    }
    })

//CREATE NEW GAME
router.post("/videogames", async (req,res)=>{
    const {name, description, fecha_de_lanzamiento, rating, plataformas, genres} = req.body
    if(!name || !description || !plataformas) {
        return res.status(404).send("Falta enviar datos obligatorios")
    }
    try {
        const videog= await Videogame.create({
            name,description,fecha_de_lanzamiento,rating,plataformas,genres
        })
        let tablaGeneros=await Genre.findAll()

        const generos=[]

        tablaGeneros.forEach(e=>{
            if(videog.genres.includes(e.dataValues.name)){
                console.log(e)
                generos.push(e)
            }
        })
        videog.setGenres(generos)
        return res.status(201).json(videog)
} catch (error) {
    return res.status(400).send(error.message)
}
})


module.exports = router;
