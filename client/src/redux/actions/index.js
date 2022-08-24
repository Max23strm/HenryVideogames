import axios from 'axios';

export const types={
    GET_GAMES:"GET_GAMES",
    GET_GAME_BY_NAME:"GET_GAME_BY_NAME",
    GET_BY_ID:"GET_BY_ID",
    POST_VIDEOGAME:"POST_VIDEOGAME",
    GET_GENRES:"GET_GENRES",
    FILTER_GAMES: "FILTER_GAMES",
    GET_PLATFORMS: "GET_PLATFORMS",
    CREATE_GAME: "CREATE_GAME",
    CHANGE_THEME:"CHANGE_THEME",
    CLEAR_GAME_STATE:"CLEAR_GAME_STATE",
    CLEAR_SEARCH_STATE:"CLEAR_SEARCH_STATE"
}


export const getAllGames=()=>{
    return async (dispatch)=>{
        try {
            let json= await axios.get("http://localhost:3001/videogames")
                return dispatch({
                        type: types.GET_GAMES,
                        payload: json.data
                    })
        } catch (error) {
            if(error.code==="ECONNABORTED"){
                getAllGames()
            } else{
                console.log(error)
            }
        }
    }
}

export const getAllGenres=()=>{
    return async (dispatch)=>{
        try {
            let json= await axios.get("http://localhost:3001/genres")
                return dispatch({
                    type:types.GET_GENRES,
                    payload: json.data
                })
        } catch (error) {
            if(error.code==="ECONNABORTED"){
                getAllGenres()
            } else{
                console.log(error)
            }
        }
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

export const createGame=(obj)=>{
    return async (dispatch)=>{
        let creado= await axios.post(`http://localhost:3001/videogames`,obj)    

        return dispatch({
            type:types.CREATE_GAME,
            payload: creado.data
        })
    }
}

export const changeTheme=()=>{
    return ({
        type:types.CHANGE_THEME
    })
}

export const clearGame=()=>{
    return({
        type: types.CLEAR_GAME_STATE
    })
}

export const clearSearch=()=>{
    return({
        type: types.CLEAR_SEARCH_STATE
    })
}