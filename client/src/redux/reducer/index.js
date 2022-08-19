import { types } from "../actions";

const initialState={
    cachedGames:[],
    showingGames:[],
    allPlatforms:[],
    allGenres:[],
    searchedGames:[],
    game:{}
}

export const rootReducer=(state=initialState, action)=>{
    switch (action.type){
        case types.GET_GAMES:{
            return{
                ...state,
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
        default: return {...state}
    }

}