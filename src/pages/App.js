import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Index from './presale'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  render(){
    return(
      <BrowserRouter>
        <container>
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<Index />}/>
            </Routes>
          </main>
        </container>
      </BrowserRouter>
    );
  }

}

export default App;
