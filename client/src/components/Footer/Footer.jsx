import '../Footer/Footer.css'
import LinkedIn from '../UI/LinkedIn'
import Github from '../UI/Github'
import { useSelector } from 'react-redux'

function Footer() {
    const light=useSelector(state=>state.theme)
    return (
        <footer>
            <p>App created by Maximiliano Ovejak</p>
            <section>
                <a href={"https://www.linkedin.com/in/m-ovejak/"} target={'_blank'} rel="noreferrer">
                    <LinkedIn light={light}/>
                </a>
                <a href='https://github.com/Max23strm' target={'_blank'} rel="noreferrer">
                    <Github light={light}/>
                </a>
            </section>
        </footer>
    )
}

export default Footer