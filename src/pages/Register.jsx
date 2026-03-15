import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import API from "../services/api"

function Register(){

const navigate = useNavigate()

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleRegister=async(e)=>{
e.preventDefault()

try{

await API.post("/auth/register",{name,email,password})

alert("User Registered")

navigate("/")

}catch(err){

alert("Register Failed")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-yellow-300 to-blue-400">

<div className="bg-white p-10 rounded-xl shadow-2xl w-11/12 md:w-96">

<h1 className="text-3xl font-bold text-center mb-6">
Create Account
</h1>

<form 
onSubmit={handleRegister} 
className="space-y-4"
autoComplete="off"
>

<input
type="text"
placeholder="Enter Your Name"
value={name}
onChange={(e)=>setName(e.target.value)}
autoComplete="off"
className="w-full p-3 border rounded"
/>

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
placeholder="Create Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
autoComplete="new-password"
className="w-full p-3 border rounded"
/>

<button
className="w-full bg-green-500 text-white py-3 rounded shadow hover:scale-105 transition"
>
Register
</button>

</form>

<div className="flex justify-between mt-4">

<Link to="/" className="text-blue-600">
Login
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

export default Register