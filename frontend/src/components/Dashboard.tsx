import { Link } from "react-router-dom"



const Dashboard = () => {
  return (
    <div>

      <h1>Process on working</h1>
      <button className="p-2 border-2 bg-violet-300" > <Link to='/'>click me redirect to employeepage</Link> </button> 
    
    </div>
  )
}

export default Dashboard