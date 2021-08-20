
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'


import { Provider } from 'react-redux'
import store from './redux/store'

import themeFile from './util/theme'


// ipmort pages
import Home from './pages/Home'

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
