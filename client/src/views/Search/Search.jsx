import MainTitle from '../../components/mainTitle/MainTitle'
import {useSelector} from 'react-redux'
import SearchBar from '../../components/SearchBar/SearchBar'
import '../Search/Search.css'
function Search() {
  const light= useSelector(state=>state.theme)

  return (
    <section className="mainSearchArea">
      <MainTitle light={light} />
      <h3 className={`${light?"darkText":"lightText"}`}>Insert your search</h3>
      <SearchBar/>
    </section>
  )
}

export default Search