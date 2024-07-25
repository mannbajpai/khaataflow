import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import LoginPage from './components/Auth/LoginPage';

import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ForgotPasswordPage from './components/Auth/ForgetPassword';
import Home from './components/Home/Home'
import AddExpense from './components/Expense/AddExpense';
import Groups from './components/Groups/GroupsPage'
import GroupPage from "./components/Groups/GroupPage"
import JoinGroupPage from './components/Groups/JoinGroup';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/addExpense" element={<AddExpense />} />
      <Route path='/group' element={<Groups />} />
      <Route path='/group/:groupId' element={<GroupPage />} />
      <Route path='/joinGroup' element={<JoinGroupPage />} />
    </Routes>
  )
}

export default App