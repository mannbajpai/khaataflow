import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { Login, Signup, ForgotPasswordPage, Home, AddExpense, GroupPage, Groups, JoinGroupPage, LandingPage, ExpenseDetail,ProfilePage, EditProfilePage, MySplits } from "./pages"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path='/expense/:id' element={<ExpenseDetail />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="/me" element={<ProfilePage/>}/>
        <Route path="/editProfile" element={<EditProfilePage/>}/>
        <Route path='/group' element={<Groups />} />
        <Route path='/group/:groupId' element={<GroupPage />} />
        <Route path='/joinGroup' element={<JoinGroupPage />} />
        <Route path='/group/:groupId/mySplits' element={<MySplits />} />
      </Route>
    </Routes>
  )
}

export default App