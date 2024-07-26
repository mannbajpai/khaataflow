import { Routes, Route } from 'react-router-dom';

import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgetPassword';
import Home from './pages/UserHomePage'
import AddExpense from './pages/AddExpensePage';
import Groups from './pages/GroupsPage'
import GroupPage from "./pages/GroupPage"
import JoinGroupPage from './pages/JoinGroupPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addExpense" element={<AddExpense />} />
      <Route path='/group' element={<Groups />} />
      <Route path='/group/:groupId' element={<GroupPage />} />
      <Route path='/joinGroup' element={<JoinGroupPage />} />
      <Route path='/' element={<LandingPage />} />
    </Routes>
  )
}

export default App