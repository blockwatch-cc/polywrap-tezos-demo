import { useState } from "react";
import {HashRouter, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './Home'
import Search from './Search'
import Details from './Details'
import Buy from './Buy'

import { WalletContext } from '../context/wallet'

function App() {
  const [app, setApp] = useState({
    network: 'ithacanet',
    account: null
  })

  return (
    <WalletContext.Provider value={{ app, setApp }}>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/buy/:name" element={<Buy />} />
        </Routes>
      </HashRouter>
      <ToastContainer position="top-center" />
    </WalletContext.Provider>
  );
}

export default App;
