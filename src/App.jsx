import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from "./components/Home/Homepage";
import Autorizationpage from "./components/Autorization/Autorizationpage"
import Searchpage from "./components/Search/Searchpage";
import Rezultpage from "./components/Rezult/Rezultpage";
import Notfondpage from './components/Notfound/Notfoundpage'
import Layout from './components/Layout/Layout';

export default function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="autorization" element={<Autorizationpage />} />
          <Route path="searh" element={<Searchpage />} />
          <Route path="rezult" element={<Rezultpage />} />
          <Route path="notfound" element={<Notfondpage />} />
        </Route>
      </Routes>
    </>
  )
}

