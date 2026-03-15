import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import API from "../services/api"

function ChangePassword(){

const [oldPassword,setOldPassword] = useState("")
const [newPassword,setNewPassword] = useState("")

const updatePassword = async () => {

try{

const token = localStorage.getItem("token")

await API.put(
"/auth/change-password",
{
oldPassword,
newPassword
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

alert("Password Updated Successfully")

}catch(err){

alert("Error updating password")

}

}

return(

<div>

<Navbar/>

<div className="flex flex-col md:flex-row">

<Sidebar/>

<div className="p-4 md:p-6 w-full">

<h1 className="text-2xl md:text-3xl font-bold mb-4">
Change Password
</h1>

<div className="flex flex-col md:flex-row gap-3">

<input
type="password"
placeholder="Old Password"
onChange={(e)=>setOldPassword(e.target.value)}
className="border p-2 w-full md:w-auto"
/>

<input
type="password"
placeholder="New Password"
onChange={(e)=>setNewPassword(e.target.value)}
className="border p-2 w-full md:w-auto"
/>

<button
onClick={updatePassword}
className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
>
Update Password
</button>

</div>

</div>

</div>

</div>

)

}

export default ChangePassword