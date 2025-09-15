import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaRegComments, FaBell } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoMdSettings } from "react-icons/io";
import { GrView } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { allemp } from "./slice/show";
import type { employe } from "./types/employee.types";
import { singleedit, clearedit } from "./slice/Edit";
import { useState } from "react";

const AllEmployees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNewEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearedit());
    navigate("/employeedetails");
  };

  const handleEdit = (emp: employe) => {
    dispatch(singleedit(emp));
    navigate("/employeedetails");
  };

  const handleShow = (emp: employe) => {
    dispatch(allemp(emp));
    navigate("/show");
  };

  const handleGet = async () => {
    const res = await axios.get("http://localhost:7500/employee/getall");
    return res.data;
  };

  const handleDelete = async (id: string) => {
    const result = await axios.delete(`http://localhost:7500/employee/delete/${id}`);
    return result.data;
  };

  const deleteMutate = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allemployee"] });
    },
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: ["allemployee"],
    queryFn: handleGet,
  });


  const filteredData = data?.filter((emp: employe) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
     
      <div className="w-64 bg-white border-r">
        <div className="p-6 font-bold text-xl text-blue-600">RS-TECH</div>
        <nav className="mt-6 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-300 rounded-lg"
          >
            <RxDashboard className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-300 rounded-lg"
          >
            <FaUser className="mr-3" /> Employee
          </Link>
          <Link
            to="/calender"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-300 rounded-lg"
          >
            <FaCalendarAlt className="mr-3" /> Calendar
          </Link>
          <Link
            to="/message"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 focus:bg-blue-300 rounded-lg"
          >
            <FaRegComments className="mr-3" /> Messages
          </Link>
        </nav>
      </div>

    
      <main className="flex-1 flex flex-col">
  
        <div className="flex justify-end items-center p-4 bg-white border-b shadow-sm">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-gray-200">
              <IoMdSettings />
            </button>
            <button className="p-2 rounded-full bg-gray-200">
              <FaBell />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
              RS
            </div>
          </div>
        </div>

        <section className="p-6">
        
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Employee</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg px-4 py-2 w-64"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleAddNewEmployee}
              >
                + Add New Employee
              </button>
            </div>
          </div>

          
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Employee Name</th>
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Designation</th>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-red-500">
                      Error fetching data
                    </td>
                  </tr>
                ) : filteredData?.length > 0 ? (
                  filteredData.map((emp: employe) => (
                    <tr key={emp.id}>
                      <td className="px-4 py-2 flex items-center space-x-4">
                        <img
                          src={`http://localhost:7500/${emp.image}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{emp.name}</span>
                      </td>
                      <td className="px-4 py-2">{emp.employeeid}</td>
                      <td className="px-4 py-2">{emp.department}</td>
                      <td className="px-4 py-2">{emp.designation}</td>
                      <td className="px-4 py-2">{emp.project}</td>
                      <td className="px-4 py-2">{emp.type}</td>
                      <td className="px-4 py-2">{emp.status}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button onClick={() => handleShow(emp)}>
                          <GrView />
                        </button>
                        <button onClick={() => handleEdit(emp)}>
                          <AiFillEdit />
                        </button>
                        <button type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                
                                "Are you sure you want to delete this employee?"
                              )
                            ) {
                              deleteMutate.mutate(emp.id);
                            }
                          }}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center text-gray-500 py-6 font-medium"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllEmployees;
