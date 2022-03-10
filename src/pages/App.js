import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from './index'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  render(){
    return(
      <BrowserRouter>
          <main>
            <Routes>
              <Route exact path="/" element={<Index />}/>
            </Routes>
          </main>
      </BrowserRouter>
    );
  }

}

export default App;
