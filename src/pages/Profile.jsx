import {useEffect,useState} from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import API from "../services/api"

function Profile(){

const [user,setUser]=useState({})

useEffect(()=>{
fetchProfile()
},[])

const fetchProfile = async()=>{

try{

const res = await API.get("/auth/profile")

setUser(res.data)

}catch(err){

console.log(err)

}

}

return(

<div>

<Navbar/>

<div className="flex">

<Sidebar/>

<div className="p-6 w-full">

<h1 className="text-3xl font-bold mb-6">
Profile
</h1>

<div className="bg-white p-6 shadow rounded">

<p><b>Name:</b> {user.name}</p>
<p><b>Email:</b> {user.email}</p>

</div>

</div>

</div>

</div>

)

}

export default Profile