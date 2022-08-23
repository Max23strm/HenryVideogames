import { useSelector } from 'react-redux'
import MainTitle from '../../components/mainTitle/MainTitle'
import '../About/About.css'
function About() {
    const light= useSelector(state=>state.theme)
    return (
        <article className='aboutSection'>
            <MainTitle light={light}/>
            <section className={`${light?'lightAboutSection lightThemeContainer':'darkAboutSection darkThemeContainer'}`}>
                <h2 className={`${light?'darkText':'lightText'}`}>Maximiliano Ovejak's Henry Videogames</h2>
                
                <p className={`${light?'darkText':'lightText'}`}>
                    This app was created for Henry's bootcamp.
                    This app is a Fullstack app, the API used is <a href="https://rawg.io/" className={`${light?'darkText':'lightText'}`} target={'_blank'} rel="noreferrer">RAWG's api</a>. From this api, I get most of the videogame data, but not all. You can create your own videogame in the create section, the data provided is sent to my own database and you can visualize it the home page.
                    The images used are not mine, they were taken from <a href="https://unsplash.com" className={`${light?'darkText':'lightText'}`} target={'_blank'} rel="noreferrer">Unsplash</a> and from <a href="https://haikei.app/" className={`${light?'darkText':'lightText'}`} target={'_blank'} rel="noreferrer">Haikei</a>. The icons used are from  <a href="https://svgbox.net/" className={`${light?'darkText':'lightText'}`} target={'_blank'} rel="noreferrer">SVGBox</a>.
                </p>
                <img src="https://images.unsplash.com/photo-1516054719048-38394ee6cf3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Digital Nomad" />
            </section>

        </article>
    )
}

export default About