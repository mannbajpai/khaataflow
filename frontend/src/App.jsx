import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ForgotPasswordPage from './components/Auth/ForgetPassword';
import Home from './components/Home/Home'
import AddExpense from './components/Expense/AddExpense';
import Group from "./components/Groups/Group"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addExpense" element={<AddExpense/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/group' element={<Group/>}/>
    </Routes>
  )
}

export default App