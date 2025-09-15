
import { useSelector } from 'react-redux'
import { FaUser, FaCalendarAlt, FaRegComments, FaBell, FaChevronLeft } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GoPersonFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom"

const Show = () => {
    const employee=useSelector((state:any)=>state.showemp.show[0])
    console.log(employee)
    const navigate=useNavigate()
   const handlearow=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    navigate('/')

   }
  return (
    <div className=" flex h-screen bg-gray-50 container mx-auto">
            <div className="w-60 border-r" >
                <div className=" p-6 font-bold text-xl text-blue-600">RS-Tech</div>
                <nav className="mt-6 space-y-2">
                    <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-600 rounded-r-full w-60 "
                    >
                        <RxDashboard className='mr-3' /> Dashboard
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-600 rounded-r-full w-60"
                    >
                        <FaUser className="mr-3" /> Employee
                    </Link>

                    <Link
                        to="/calender"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-600 rounded-r-full w-60"
                    >
                        <FaCalendarAlt className="mr-3" /> Calendar
                    </Link>

                    <Link
                        to="/message"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-600 rounded-r-full w-60"
                    >
                        <FaRegComments className="mr-3" /> Messages
                    </Link>
                </nav>
            </div>
            <div className=" flex-1 flex flex-col   ">
                <div className=" flex justify-end items-center gap-2 p-4 bg-white border-b shadow-sm">
                    <button className="p-2 rounded-full bg-gray-200"><IoMdSettings />
                    </button>
                    <button className="p-2 rounded-full bg-gray-200"><FaBell /></button>
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        RS
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex space-x-2  items-center mb-6">
                        <button onClick={(e)=>handlearow(e)}> <FaChevronLeft /> </button>
                        <h1 className="text-2xl font-bold">Add New Employee</h1>

                    </div>
                    <div className="flex items-center space-x-2 ">
                        <GoPersonFill />
                        <h1 className="text-2xl font-bold">Personal Information</h1>
                    </div>
                      <div className="flex items-center mt-6 mb-6">
              <img
                src={`https://employeemangement-radical.onrender.com/${employee.image}`}
               
                className="w-20 h-20  object-cover mr-6"
              />
            
            </div>
  
            <div className="grid grid-cols-2 space-y-2 text-gray-700">
                 <div className=' space-y-2'>
                    <p className="font-medium">Name</p>
                    <p>{employee.name}</p>
                </div>
                  <div className=' space-y-2'>
                <p className="font-medium">Employeeid</p>
                <p>{employee.employeeid}</p>
              </div>
              <div className='border-b'></div>
              <div className='border-b'></div>
              <div className=' space-y-2'>
                <p className="font-medium">Department</p>
                <p>{employee.department}</p>
              </div>
              <div className=' space-y-2'>
                <p className="font-medium">Designation</p>
                <p>{employee.designation}</p>
              </div>
                <div className='border-b'></div>
              <div className='border-b'></div>
              <div className=' space-y-2'>
                <p className="font-medium">Project</p>
                <p>{employee.project}</p>
              </div>
              <div className=' space-y-2'>
                <p className="font-medium">Type</p>
                <p>{employee.type}</p>
              </div>
                <div className='border-b'></div>
              <div className='border-b'></div>
              <div className=' space-y-2 border-b'>
                <p className="font-medium">Status</p>
                <p>{employee.status}</p>
              </div>
           
               
            
            </div>
                </div>
            </div>
        </div>
  )
}

export default Show