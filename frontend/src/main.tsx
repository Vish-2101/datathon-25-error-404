import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import Sample from './components/sample';

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <div className='text-white'>Hello</div>
     <Sample/>
    <StyledEngineProvider injectFirst>
   
      <App />
      
    </StyledEngineProvider>
  </React.StrictMode>
);