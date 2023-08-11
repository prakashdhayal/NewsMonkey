import './App.css'
import React,{useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App=()=> {
  const [progress, setProgress] = useState(0)
  const pageSize = 15;
  const apiKey = "f6da6a0e2e124aa39c78195235a58cbd";
  // const apiKey="f6da6a0e2e124aa39c78195235a58cbd";
  const changeProgress = (progress) => {
    setProgress(progress);
  }
 
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Switch>
            <Route exact path="/"><News setProgress={changeProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" /></Route>
            <Route exact path="/NewsMonkey"><News setProgress={changeProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" /></Route>
            <Route exact path="/general"><News setProgress={changeProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" /></Route>
            <Route exact path="/business"><News setProgress={changeProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News setProgress={changeProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" /></Route>
            <Route exact path="/health"><News setProgress={changeProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" /></Route>
            <Route exact path="/science"><News setProgress={changeProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" /></Route>
            <Route exact path="/sports"><News setProgress={changeProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News setProgress={changeProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" /></Route>
          </Switch>

        </Router>
      </div>
    )
}
export default App;
