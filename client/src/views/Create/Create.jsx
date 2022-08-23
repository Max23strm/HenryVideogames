import { useSelector } from 'react-redux'
import { Form } from '../../components/Form/Form'
import MainTitle from '../../components/mainTitle/MainTitle'

import '../Create/Create.css'

export const Create = () => {
    const light= useSelector(state=>state.theme)

    return (
        <article className={`createGenrealView`}>
            <MainTitle light={light}/>
            <h3 className={`${light?"darkText":"lightText"}`}>Create a new videogame</h3>
            <Form/>
        </article>
    )
}
