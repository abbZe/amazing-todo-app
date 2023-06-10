import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App.tsx'
import { store } from './redux/store' // state
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
  <BrowserRouter>
    {/* redux provider is provider for state of app */}
    <Provider store={store}>
      {/* theme provider is custom theme provider for MUI */}
      <ThemeProvider theme={theme}>
        {/* css baseline is rest of application styles */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
  //</React.StrictMode>
)
