import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from "./components/Home/Homepage";
import Autorizationpage from "./components/Autorization/Autorizationpage"
import Searchpage from "./components/Search/Searchpage";
import Rezultpage from "./components/Rezult/Rezultpage";
import Notfondpage from './components/Notfound/Notfoundpage'
import Layout from './components/Layout/Layout';
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import {restoreAuth} from '../src/components/context/actionCreators'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="autorization" element={<Autorizationpage />} />
          <Route path="search" element={<Searchpage />} />
          <Route path="rezult" element={<Rezultpage />} />
          <Route path="notfound" element={<Notfondpage />} />
        </Route>
      </Routes>
    </>
  );
}

