
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'


import { Provider } from 'react-redux'
import store from './redux/store'

import themeFile from './util/theme'


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
  
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
