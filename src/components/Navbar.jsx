import { Link,useNavigate } from "react-router-dom"

function Navbar(){

const navigate = useNavigate()

const logout=()=>{
localStorage.removeItem("token")
navigate("/")
}

return(

<nav className="bg-blue-600 text-white p-4 flex flex-col md:flex-row md:justify-between items-center gap-3">

<h1 className="text-lg md:text-xl font-bold">
Health Wellness App
</h1>

<div className="flex flex-wrap gap-4 items-center justify-center">

<Link to="/dashboard" className="hover:text-yellow-300 no-underline">
Dashboard
</Link>

<Link to="/fitness" className="hover:text-yellow-300 no-underline">
Fitness
</Link>

<Link to="/nutrition" className="hover:text-yellow-300 no-underline">
Nutrition
</Link>

<Link to="/goals" className="hover:text-yellow-300 no-underline">
Goals
</Link>

<button
onClick={logout}
className="bg-red-500 px-3 py-1 rounded"
>
Logout
</button>

</div>

</nav>

)

}

export default Navbar