import './App.css';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Landing from './components/Landing/Landing.jsx';
import Nav from './components/NavBar/Nav';
import Home from './views/Home/Home';
import Search from './views/Search/Search';
import GameDetail from './views/GameDetail/GameDetail';
function App() {
  return (
    <div className="App">
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
              <Route exact path={"/search"}>
                <Search/>
              </Route>
              <Route exact path={"/:id"}>
                <GameDetail/>
              </Route>
            </Switch>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
