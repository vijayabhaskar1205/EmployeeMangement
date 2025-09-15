
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllEmployees from './components/AllEmployees'
import Message from './components/Message'
import Calender from './components/Calender'
import Employeedetails from './components/Employeedetails'
import Show from './components/Show'
import Dashboard from './components/Dashboard'



function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<AllEmployees/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/message' element={<Message/>}/>
         <Route path='/calender' element={<Calender/>}/>
           <Route path='/employeedetails' element={<Employeedetails/>}/>
             <Route path='/show' element={<Show/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
