import { useState ,useEffect} from 'react'
import { getAllGames, createGame,getAllGenres } from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux'
import useCustomHook from '../../Hooks/useCustomHook'
import Spinner from '../UI/Spinner'
import '../Form/Form.css'

export const Form = () => {
    const {errorDescription,
        errorFecha,
        errorGenres,
        errorName,
        errorPlatforms,
        errorRating,
        validate}=useCustomHook()
    const [form,setForm]=useState({
        name:"",
        fecha_de_lanzamiento:"",
        rating:"",
        plataformas:[],
        description:"",
        genres:[]
    })
    const dispatch=useDispatch()
    const [showPop, setShowPop]=useState(false)
    const light= useSelector(state=>state.theme)
    const plataformas= useSelector(state=>state.allPlatforms)
    const generos=useSelector(state=>state.allGenres).map(e=>{
        return e.name
    })
    useEffect(()=>{
        dispatch(getAllGenres())
        // eslint-disable-next-line
    },[])
    
    useEffect(() => {
        if(setShowPop){
            const timer = setTimeout(() => {
                setShowPop(false)
            }, 3000);
            return () =>{
                clearTimeout(timer)
            };
        }
    }, [showPop]);

    const handleRating=(target)=>{
        let valor= parseInt(target.value)
        if(!isNaN(valor)){
            setForm({...form, rating:valor})
        } else if(target.value<1){
            setForm({...form, rating:0})
        }
    }

    useEffect(()=>{
        if(!plataformas[0]){
            dispatch(getAllGames())
        }
    })

    const handlePlatforms=(target)=>{
        if(target.checked){
            setForm({...form, plataformas:[...form.plataformas, target.value]})
        } else{
            setForm({...form, plataformas: form.plataformas.filter(e=>target.value!==e)})
        }
    }

    const handleGenres=(target)=>{
        if(target.checked){
            setForm({...form, genres:[...form.genres, target.value]})
        } else{
            setForm({...form, genres: form.genres.filter(e=>target.value!==e)})
        } 
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validate(form, plataformas, generos)===false){
            setForm({...form, rating:""})
            return false
        } else{
            dispatch(createGame(form))
            setShowPop(true)
            setForm({
                name:"",
                fecha_de_lanzamiento:"",
                rating: 0,
                plataformas:[],
                description:"",
                genres:[]
            })
        }
    }



    return (
        <form method='POST' className={`${light?"lightThemeContainer":"darkThemeContainer"}`} >
        <section className='formContainer'>

            <section className='sectionNombre'>
                <h6 className={`tituloForma ${light?"darkText":"lightText"}`}>Name:</h6>
                <input className={`${light?"light formLight darkText":"dark gameDark lightText"} ${errorName.value && "error"}`}
                onChange={(e)=>setForm({...form, name:e.target.value.toString()})}
                type="text"
                value={form.name}
                placeholder='Add name'/>
                <p className={`errorP ${errorName.value ? "show" : "hidden"}`}>{errorName.message}</p>
            </section>

            <section className='sectionFecha'>
                <h6 className={`tituloForma ${light?"darkText":"lightText"}`}>
                    Release date:
                </h6>

                <input className={`${light?"light formLight darkText":"dark gameDark lightText"}
                ${errorFecha.value && "error"}`}
                onChange={(e)=>setForm({...form, fecha_de_lanzamiento:e.target.value})}
                type="date"
                value={form.fecha_de_lanzamiento}
                placeholder='dd/mm/aaaa'/>

                <p className={`errorP ${errorFecha.value ? "show" : "hidden"}`}>{errorFecha.message}</p>
            </section>


            <section className='sectionRating'>
                <h6 className={`tituloForma
                ${light?"darkText":"lightText"}`}>
                    Rating:
                </h6>
                <input value={form.rating?form.rating:""} onChange={(e)=>handleRating(e.target)}
                className={`${light?"light formLight darkText":"dark gameDark lightText"}
                ${errorRating.value && "error"}`}
                type="number"
                min={1}
                max={5}
                placeholder={5}/>
                <p className={`errorP ${errorRating.value ? "show" : "hidden"}`}>{errorRating.message}</p>
            </section>

            <section className='sectionDescription'>
                <h6 className={`tituloForma
                ${light?"darkText":"lightText"}`}>Description:</h6>
                <input 
                onChange={(e)=>setForm({...form, description:e.target.value.toString()})}
                type="text"
                value={form.description}
                className={`${light?"light formLight darkText":"dark gameDark lightText"} ${errorDescription.value && "error"}`}
                placeholder='Add description'
                maxLength={"240"}
                />
                <p className={`errorP ${errorDescription.value ? "show" : "hidden"}`}>{errorDescription.message}</p>
            </section>

            <section className='sectionPlataformas'>
                <h6 className={`tituloForma
                ${light?"darkText":"lightText"}`}>Platforms:</h6>
                <section className={` ${plataformas[0] ? "grupo":"spinner"}`}>
                    {plataformas[0] ? plataformas.map(e=>{
                        return <section 
                            className={`containerInput ${light?"light formLight darkText":"dark gameDark lightText"}`}
                            key={plataformas.indexOf(e)}>

                            <input value={e}
                            id={e}
                            onChange={(e)=>handlePlatforms(e.target)}
                            checked={showPop?false:undefined}
                            type="checkbox"/>

                            <label htmlFor={e}>
                                {e}
                            </label>
                        </section>
                    }): <Spinner/>}
                </section>
                <p className={`errorP ${errorPlatforms.value ? "show" : "hidden"}`}>{errorPlatforms.message}</p>
            </section>

            <section className='sectionGeneros'>
                <h6 className={`tituloForma
                ${light?"darkText":"lightText"}`}>Genres:</h6>
                <section className={` ${generos[0] ? "grupo":"spinner"}`}>
                    {generos[0] ? generos.map(e=>{
                        return <section
                        className={`containerInput ${light?"light formLight darkText":"dark gameDark lightText"}`}
                        key={generos.indexOf(e)}>

                            <input value={e}
                            checked={showPop?false:undefined}
                            id={e}
                            onChange={(e)=>handleGenres(e.target)}
                            type="checkbox"/>

                            <label htmlFor={e}>{e}</label>
                        </section>
                    }): <Spinner/>}
                </section>
            <p className={`errorP ${errorGenres.value ? "show" : "hidden"}`}>{errorGenres.message}</p>
            </section>

            
        </section>  
            <article className={`message ${light?"lightPop":"darkPop"} ${showPop? "showPop":"hidePop"}`}>
                <h4>Game created!</h4>
            </article>
            <button className={`submitButton ${light?"lightFormAccent":"darkFormAccent"} `}onClick={(e)=>handleSubmit(e)} type={'reset'}>CREATE</button>
        </form>
    )
}
