import { types } from "../actions";

const initialState={
    cachedGames:[],
    showingGames:[],
    allPlatforms:[],
    allGenres:[],
    searchedGames:[],
    game:{},
    createGame:{},
    theme:true
}

export const rootReducer=(state=initialState, action)=>{
    switch (action.type){
        case types.GET_GAMES:{
            let plataformasFlit=[]
            action.payload.map(e=>{
                return e.plataformas.forEach(p=>{
                    if (!plataformasFlit.includes(p)){
                        plataformasFlit.push(p)
                    }
                })
            })
            return{
                ...state,
                allPlatforms:plataformasFlit,
                showingGames: action.payload,
                cachedGames: action.payload,
            }
        }
        
        case  types.FILTER_GAMES:{
            const showingGames= state.cachedGames
            let juegosModificados=[]
            if(action.payload.genero){
                action.payload.genero==="All"?juegosModificados=[...showingGames]:juegosModificados=showingGames.filter(e=>e.genres.includes(action.payload.genero))
            }

            if(action.payload.creado){
                switch (action.payload.creado){
                    case "creado":
                        juegosModificados=showingGames.filter(e=>e.id.length>10)
                        break;
                    case "estudio":
                        juegosModificados=showingGames.filter(e=>typeof e.id ==="number")
                        break;
                    default:
                        juegosModificados=state.cachedGames
                        break
                }
            }

            if(action.payload.orden){
                switch (action.payload.orden){
                    case "AZ":
                        juegosModificados=showingGames.sort((a, b) => {
                            if (a.name < b.name) {
                            return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        });
                        break
                    case "ZA":
                        juegosModificados=showingGames.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }
                        return 0;
                        });
                        break
                    case "MejorAPeor":
                        juegosModificados=showingGames.sort((a, b) => {
                            if (a.rating > b.rating) {
                                return -1;
                            }
                            if (a.rating < b.rating) {
                                return 1;
                            }
                            return 0;
                        });
                        break
                    case "peorAMejor":
                        juegosModificados=showingGames.sort((a, b) => {
                            if (a.rating < b.rating) {
                                return -1;
                            }
                            if (a.rating > b.rating) {
                                return 1;
                            }
                            return 0;
                        });
                        break
                    default:
                        juegosModificados=showingGames
                    break 
                }
            }
            if(!action.payload.genero && !action.payload.creado && !action.payload.orden){
                juegosModificados=showingGames
            }
            return{
                ...state,
                showingGames:[...juegosModificados]
            }
        }

        case types.GET_GENRES: {
            return{
                ...state,
                allGenres: action.payload,
            }
        }

        case types.GET_GAME_BY_NAME:{
            return{
                ...state,
                searchedGames:action.payload
            }
        } 

        case types.GET_BY_ID:{
            return{
                ...state,
                game: action.payload
            }
        }

        case types.CREATE_GAME:{
            return{
                ...state,
                createGame:action.payload
            }
        }

        case types.CHANGE_THEME:{
            return{
                ...state,
                theme: !state.theme
            }
        }

        case types.CLEAR_GAME_STATE:{
            return{
                ...state,
                game:{}
            }
        }
        default: return {...state}
    }

}