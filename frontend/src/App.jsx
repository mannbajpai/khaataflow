import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App