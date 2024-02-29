import './App.css'
import { Route, Routes } from 'react-router-dom'
import EmpListing from './components/EmpListing'
import EmpCreate from './components/EmpCreate'
import EmpDetail from './components/EmpDetail'
import EmpEdit from './components/EmpEdit'

function App() {

  return (
    <>
      {/* <h1 className='text-center py-5'>React JS CRUD OPERATIONS</h1> */}

      <Routes>
        <Route path='/' element={<EmpListing />}></Route>
        <Route path='/create' element={<EmpCreate />}></Route>
        <Route path='/detail/:empid' element={<EmpDetail />}></Route>
        <Route path='/edit/:empid' element={<EmpEdit />}></Route>

      </Routes>
    </>
  )
}

export default App
