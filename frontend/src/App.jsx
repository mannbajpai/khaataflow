import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PrivateGroupRoute from './components/PrivateGroupRoute';
import {
  LandingPage, Login, Signup, ForgotPasswordPage,
  Home, AddExpense, ExpenseDetail, ProfilePage, EditProfilePage,
  GroupPage, Groups, JoinGroupPage, MySplits, AddGroupExpense, GroupExpenseDetail, EditGroupExpense,
  ErrorPage
} from "./pages"

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
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path='/group' element={<Groups />} />
        <Route path='/joinGroup' element={<JoinGroupPage />} />
        <Route element={<PrivateGroupRoute />}>
          <Route path='/group/:groupId' element={<GroupPage />} />
          <Route path='/group/:groupId/mySplits' element={<MySplits />} />
          <Route path='/group/:groupId/addExpense' element={<AddGroupExpense />} />
          <Route path='/group/:groupId/expense/:id/' element={<GroupExpenseDetail />} />
          <Route path='/group/:groupId/expense/:id/edit' element={<EditGroupExpense />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App