import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx';
import Nav from './components/NavBar/Nav';
import Home from './views/Home/Home';
import GameDetail from './views/GameDetail/GameDetail';
import { Create } from './views/Create/Create';
import { useSelector } from 'react-redux';
import Footer from './components/Footer/Footer.jsx';
import About from './views/About/About.jsx';


import './App.css';

function App() {

  const light= useSelector(state=>state.theme)
  return (
    <div className={`App ${light?'ligth':'dark'}`}>
      <Router>
        <Switch>
          <Route path={'/'} exact>
            <Landing/>
          </Route>
          <Route>
            <Nav/>
            <Switch>
              <Route exact path={"/home"}>
                <Home/>
              </Route>
              <Route exact path={"/videogames/:id"}>
                <GameDetail/>
              </Route>
              <Route exact path={"/create"}>
                <Create/>
              </Route>
              <Route exact path={"/about"}>
                <About/>
              </Route>
            </Switch>
            <Footer/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
