import './App.css'

import { BrowserRouter } from 'react-router-dom'

import { Toaster } from 'react-hot-toast';

//import pages
import Router from './router'
import FotosProvider from './Context/FotosProvider'
import NewFotosProvider from './Context/NewFotosProvider'
import UserProvider from './Context/UserProvider'

function App() {

  return (
    <>
    <BrowserRouter>
      <UserProvider>
        <FotosProvider>
          <NewFotosProvider>
            <Toaster position='top-center' toastOptions={{
              duration: 5000,
            }} />
            <Router /> 
          </NewFotosProvider>
        </FotosProvider>
      </UserProvider>
    </BrowserRouter>
    </>
  )
}

export default App
