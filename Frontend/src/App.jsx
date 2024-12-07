import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Page/Login';
import Dashboard from './components/Page/Dashboard';
import Addstaff from './components/Page/Addstaff';
import Addmember from './components/Page/Addmember';
import Addmenu from './components/Page/Addmenu';
import Check from './components/Page/Check';
import Shop from './components/Page/Shop';
import OrderInvoices from './components/Page/OrderInvoices';
function App() {
  return (
    <Router>
      <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Dashboard/>} />
        <Route path='/member' element={<Dashboard/>} />
        <Route path='/staff' element={<Dashboard/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='check' element={<Check/>} />
        <Route path='/addmember' element={<Addmember/>} />
        <Route path='/addstaff' element={<Addstaff/>} />
        <Route path='/addmenu' element={<Addmenu/>} />
        <Route path='/test' element={<OrderInvoices></OrderInvoices>}></Route>
      </Routes>
    </Router>
  )
}

export default App
