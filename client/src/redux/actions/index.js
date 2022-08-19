import axios from 'axios';

export const types={
    GET_GAMES:"GET_GAMES",
    GET_GAME_BY_NAME:"GET_GAME_BY_NAME",
    GET_BY_ID:"GET_BY_ID",
    POST_VIDEOGAME:"POST_VIDEOGAME",
    GET_GENRES:"GET_GENRES",
    FILTER_GAMES: "FILTER_GAMES",
    GET_PLATFORMS: "GET_PLATFORMS"
}


export const getAllGames=()=>{
    return async (dispatch)=>{
        let json= await axios.get("http://localhost:3001/videogames")
            return dispatch({
                    type: types.GET_GAMES,
                    payload: json.data
                })
    }
}

export const getAllGenres=()=>{
    return async (dispatch)=>{
        let json= await axios.get("http://localhost:3001/genres")
            return dispatch({
                type:types.GET_GENRES,
                payload: json.data
            })
    }
}

export const filterGames=(payload)=>{
    return{
        type:"FILTER_GAMES",
        payload
    }
}

export const searchGames=(term)=>{
    return async (dispatch)=>{
        let json = await axios.get(`http://localhost:3001/videogames?name=${term}`)
        return dispatch({
            type:types.GET_GAME_BY_NAME,
            payload: json.data
        })
    }
}

export const getById=(param)=>{
    return async (dispatch)=>{
        let juego= await axios.get(`http://localhost:3001/videogames/${param}`)
        return dispatch({
            type: types.GET_BY_ID,
            payload: juego.data
        })
    }
}