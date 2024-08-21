import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LandingPage from './pages/LandingPage';
import { Signup } from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import ExpenseIncome from './pages/ExpenseIncome';
import Profile from './pages/Profile';
import TransactionHistory from './pages/TransactionHistory';

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/landingpage'  element={<LandingPage/>}/>
            <Route path='/transactions' element={<ExpenseIncome/>}  />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/transactionHistory' element={<TransactionHistory/>}/>
            <Route path='/' element={<Navigate replace to="/landingPage" />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
