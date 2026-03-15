import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import API from "../services/api"

function Login(){

const navigate = useNavigate()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin=async(e)=>{
e.preventDefault()

try{

const res = await API.post("/auth/login",{email,password})

localStorage.setItem("token",res.data.token)

navigate("/dashboard")

}catch(err){

alert("Login Failed")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-green-400 to-yellow-300">

<div className="bg-white p-10 rounded-xl shadow-2xl w-11/12 md:w-96">

<h1 className="text-3xl font-bold text-center mb-6">
Login
</h1>

<form 
onSubmit={handleLogin} 
className="space-y-4"
autoComplete="off"
>

<input
type="email"
placeholder="example@email.com"
value={email}
onChange={(e)=>setEmail(e.target.value)}
autoComplete="off"
className="w-full p-3 border rounded"
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
autoComplete="new-password"
className="w-full p-3 border rounded"
/>

<button
className="w-full bg-blue-500 text-white py-3 rounded shadow hover:scale-105 transition"
>
Login
</button>

</form>

<div className="flex justify-between mt-4">

<Link to="/register" className="text-green-600">
Register
</Link>

<button
onClick={()=>navigate(-1)}
className="text-red-500"
>
Back
</button>

</div>

</div>

</div>

)

}

export default Login