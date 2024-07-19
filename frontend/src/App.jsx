import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home/Home'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App