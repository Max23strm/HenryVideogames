import '../mainTitle/MainTitle.css'
function MainTitle({light}) {
  return (
    <h1 className={`mainTitle ${light? "darkText": "lightText"} `}>Henry Videogames</h1>
  )
}

export default MainTitle