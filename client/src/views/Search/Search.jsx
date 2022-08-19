import MainTitle from '../../components/mainTitle/MainTitle'
import SearchBar from '../../components/SearchBar/SearchBar'
import '../Search/Search.css'
function Search() {
  return (
    <section className="mainSearchArea">
        <MainTitle/>
        <h3>Insert your search</h3>
        <SearchBar/>
    </section>
  )
}

export default Search