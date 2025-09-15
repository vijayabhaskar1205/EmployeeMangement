import { FaUser, FaCalendarAlt, FaRegComments, FaBell, FaChevronLeft } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { GoPersonFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const Employeedetails = () => {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState<string>("");
    const [employeeid, setEmployeeid] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [designation, setDesignation] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [Project, setProject] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const navigate = useNavigate()
    const [preview, setPreview] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handlearow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate('/')

    }
    const editwork = useSelector((state: any) => state.edit.edi)

    console.log(editwork)

    useEffect(() => {
        if (editwork) {

            if (editwork.image) {
                setPreview(`http://localhost:7500/${editwork.image}`);
            } else {
                setPreview(null);
            }
            setImage(null);
            setName(editwork.name || "");
            setEmployeeid(editwork.employeeid || "");
            setDepartment(editwork.department || "");
            setDesignation(editwork.designation || "");
            setType(editwork.type || "");
            setProject(editwork.project || "");
            setStatus(editwork.status || "");

        }
        else {

            setImage(null);
            setName("");
            setEmployeeid("");
            setDepartment("");
            setDesignation("");
            setType("");
            setProject("");
            setStatus("");
        }


    }, [editwork]);

    const handleeedit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const formdata = new FormData()

        formdata.append('name', name)
        formdata.append('employeeid', employeeid)
        formdata.append('department', department)
        formdata.append('designation', designation)
        formdata.append('type', type)
        formdata.append('project', Project)
        formdata.append('status', status)
        if (image) {
            formdata.append('image', image)
        }
        editmutate.mutate(formdata)
    }

    const editmutate = useMutation({
        mutationFn: async (formdata: FormData) => {
            const employeedetailsedit = await axios.put("http://localhost:7500/employee/employeeedit", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            try {
                alert(employeedetailsedit.data.message)
                navigate('/')
            }
            catch (err) {
                alert("errorn in employeedetailspost")
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allemployee'] })
        }
    })
    const handlecancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(image)
        console.log("ok ")
        setImage(null)
        setName("")
        setEmployeeid("")
        setDepartment("")
        setDesignation("")
        setType("")
        setProject("")
        setStatus("")
    }
    const queryClient = useQueryClient();
    const emppostmutation = useMutation({
        mutationFn: async (formdata: FormData) => {
            const employeedetailspost = await axios.post("http://localhost:7500/employee/employeepost", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            try {
                alert(employeedetailspost.data.message)
            }
            catch (err) {
                alert("errorn in employeedetailspost")
            }
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["allemployee"] });
        },
    })
    const handleconfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('employeeid', employeeid)
        formdata.append('department', department)
        formdata.append('designation', designation)
        formdata.append('type', type)
        formdata.append('project', Project)
        formdata.append('status', status)
        if (image) {
            formdata.append('image', image)
        }
        emppostmutation.mutate(formdata);
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
                        <button onClick={(e) => handlearow(e)}> <FaChevronLeft /> </button>
                        <h1 className="text-2xl font-bold">Add New Employee</h1>

                    </div>
                    <div className="flex items-center space-x-2 ">
                        <GoPersonFill />
                        <h1 className="text-2xl font-bold">Personal Information</h1>
                    </div>
                    <form onSubmit={handleconfirm}>
                        <div className="mt-4" >

                            <input type="file" className="hidden" required id="image" onChange={handleImageChange} />
                            <label
                                htmlFor="image"
                                className="w-32 h-32 border rounded-2xl flex justify-center items-center cursor-pointer overflow-hidden"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <MdOutlinePhotoCamera size={40} className="text-gray-500" />
                                )}
                            </label>

                        </div>
                        <div className="grid grid-cols-2 mt-4 gap-x-2 gap-y-5  ">

                            <div className="flex flex-col ">
                                <label className="font-bold">Name*</label>
                                <input type="text" required className="border rounded h-10 p-4 w-120" value={name} placeholder="Enter the Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex flex-col ">
                                <label className="font-bold">Employee ID*</label>
                                <input type="text" required className="border rounded h-10 p-4 w-120" value={employeeid} placeholder="Enter employee ID" onChange={(e) => setEmployeeid(e.target.value)} />
                            </div>
                            <div className="flex flex-col ">
                                <label className="font-bold">Department*</label>
                                <select
                                    className="border rounded h-10 px-3 w-120"
                                    required
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    <option value="HR">HR</option>
                                    <option value="IT">IT</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>
                            <div className="flex flex-col ">
                                <label className="font-bold">Designation*</label>
                                <select
                                    className="border rounded h-10 px-3 w-120"
                                    value={designation}
                                    required
                                    onChange={(e) => setDesignation(e.target.value)}
                                >
                                    <option value="">Select Designation</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Team Lead">Team Lead</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Intern">Intern</option>
                                </select>
                            </div>
                            <div className="flex flex-col ">
                                <label className="font-bold">Project</label>
                                <input type="text" className="border rounded h-10 p-4 w-120" value={Project} placeholder="Enter project" onChange={(e) => setProject(e.target.value)} />
                            </div>

                            <div className="flex flex-col ">
                                <label className="font-bold">Type*</label>
                                <select
                                    className="border rounded h-10 px-3 w-120"
                                    value={type}
                                    required
                                    onChange={(e) => setType(e.target.value)}
                                >

                                    <option value="">Select Type</option>
                                    <option value="office">office</option>

                                    <option value="work from home">work from home</option>

                                </select>
                            </div>
                            <div className="flex flex-col ">
                                <label className="font-bold">Status*</label>
                                <select
                                    className="border rounded h-10 px-3 w-120"
                                    value={status}
                                    required
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                        </div>
                        <div className="flex justify-end space-x-4 w-280">
                            <button className="border rounded-sm shadow-sm px-4 py-2 font-bold hover:bg-blue-400 bg-white" onClick={handlecancel}>Cancel</button>
                            {editwork ? (<button className="border rounded-sm shadow-sm px-4 py-2 font-bold hover:bg-blue-400 bg-white" onClick={handleeedit} >Confirm</button>) : (
                                <button className="border rounded-sm shadow-sm px-4 py-2 font-bold hover:bg-blue-400 bg-white" type="submit">Confirm</button>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Employeedetails