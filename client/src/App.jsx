import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'
import Web3Provider from './context/Web3Provider'
import './App.css'
function App() {
 

  return (
    <>
        <Web3Provider>
          <RouterProvider router={routes} ></RouterProvider>
        </Web3Provider>
    </>
  )
}

export default App
