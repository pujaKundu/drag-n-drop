import Home from './components/Home/Home'
import Selector from './components/Selector/Selector'
import './App.css'
import { useState } from 'react';

function App() {
  const [selectedOption, setSelectedOption] = useState("top");

  return (
    <>
      <Selector setSelectedOption={setSelectedOption} />
      <Home selectedOption={selectedOption}/>
    </>
  )
}

export default App
