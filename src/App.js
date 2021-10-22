
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  // adaptV4Theme,
} from '@mui/material/styles';

import React, {useEffect} from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'

import themeFile from './util/theme'

import ws from './util/connection'

// ipmort pages
import Home from './pages/Home'




// register window innerHeight as a global variable
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});



const theme = createTheme(themeFile)


function App() {

  useEffect(() => {    
    ws.connect()
    // close ws when app is closed
    return () => {ws.close()}
  },[])
  
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              </Switch>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
