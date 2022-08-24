import {useState} from 'react'

function useCustomHook() {
    const [errorName,setErrorName]=useState({value:false, message:""})
    const [errorFecha,setErrorFecha]=useState({value:false, message:""})
    const [errorRating,setErrorRating]=useState({value:false, message:""})
    const [errorPlatforms,setErrorPlatforms]=useState({value:false, message:""})
    const [errorDescription,setErrorDescription]=useState({value:false, message:""})
    const [errorGenres,setErrorGenres]=useState({value:false, message:""})



    const validate=(forma, plataformas, generos)=>{
        let flagName=true
        let flagFecha=true
        let flagRating=true
        let flagPlatforms=true
        let flagGenres=true
        let flagDescription=true
        
        //Validar Nombre
        if(typeof(forma.name)!=="string"){
            setErrorName({value:true, message:"The value its not a valid"})
            flagName=false
        }else if(forma.name.length>100){
            setErrorName({value:true, message:"The name is too long"})
            flagName=false
        }else if(forma.name.length<1){
            setErrorName({value:true, message:"You must input a value"})
            flagName=false
        } else{
            setErrorName({value:false, message:""})
            flagName=true
        }
        //Validar Description
        if(typeof(forma.description)!=="string"){
            setErrorDescription({value:false, message:"The value is not a string"})
            flagDescription=false
        }else if(forma.description.length<1){
            setErrorDescription({value:true, message:"You must input a value"})
            flagDescription=false
        }else{
            flagDescription=true
            setErrorDescription({value:false, message:""})
        }


        //Validar Rating
        if(typeof(forma.rating)!=="number" || isNaN(forma.rating)){
            setErrorRating({value:true, message:"The value is not valid"})
            flagRating=false
        }else if(forma.rating<1 || forma.rating>5){
            setErrorRating({value:true, message:"The value must be bigger than 1 and smaller than 5"})
            flagRating=false
        } else{
            flagRating=true
            setErrorRating({value:false, message:""})
        }


        //Validar Plataformas
        if(!Array.isArray(forma.plataformas) || forma.plataformas.length<1){
            setErrorPlatforms({value:true, message:"You must select one of the options provided"})
            flagPlatforms=false
        } else{
            forma.plataformas.forEach(e=>{
                if(!plataformas.includes(e)){
                    setErrorPlatforms({value:true, message:"One of the values does not exist"})
                    flagPlatforms=false
                } else{
                    setErrorPlatforms({value:false, message:""})
                    flagPlatforms=true
                }
            })
        }

        //Validar Generos
        if(!Array.isArray(forma.genres) || forma.genres.length<1){
            setErrorGenres({value:true, message:"You must select one of the options provided"})
            flagGenres=false
        } else{
            forma.genres.forEach(e=>{
                if(!generos.includes(e)){
                    setErrorGenres({value:true, message:"One of the values does not exist"})
                    flagGenres=false
                } else{
                    setErrorGenres({value:false, message:""})
                    flagGenres=true
                }
            })
        }

        //Validar Fecha 
        // eslint-disable-next-line
        const dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/-](0?[1-9]|[12][0-9]|3[01])/;
        if(forma.fecha_de_lanzamiento.match(dateformat)){
            setErrorFecha({value:false, message:""})
            flagFecha=true
        } else{
            setErrorFecha({value:true, message:"The date is not valid"})
            flagFecha=false
        }
        
        if(flagDescription===true && flagFecha===true && flagName===true && flagPlatforms===true && flagRating===true && flagGenres===true){
            return true
        } else{
            return false
        }
    }



    return{
        validate,
        errorDescription,
        errorFecha,
        errorGenres,
        errorName,
        errorPlatforms,
        errorRating
    }
}

export default useCustomHook