import {useState,useEffect} from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import API from "../services/api"

function Fitness(){

const [exercise,setExercise]=useState("")
const [duration,setDuration]=useState("")
const [distance,setDistance]=useState("")
const [calories,setCalories]=useState("")
const [workouts,setWorkouts]=useState([])

useEffect(()=>{

fetchWorkouts()

},[])

const fetchWorkouts = async()=>{

try{

const token = localStorage.getItem("token")

const res = await API.get("/fitness",{
headers:{Authorization:`Bearer ${token}`}
})

setWorkouts(res.data)

}catch(err){

console.log(err)

}

}

const addWorkout = async()=>{

if(!exercise || !duration) return

try{

const token = localStorage.getItem("token")

await API.post("/fitness",
{
exerciseName:exercise,
duration,
distance,
calories   // ⭐ FIXED
},
{
headers:{Authorization:`Bearer ${token}`}
}
)

fetchWorkouts()

setExercise("")
setDuration("")
setDistance("")
setCalories("")

}catch(err){

console.log(err)

}

}

const deleteWorkout = async(id)=>{

try{

const token = localStorage.getItem("token")

await API.delete(`/fitness/${id}`,{
headers:{Authorization:`Bearer ${token}`}
})

fetchWorkouts()

}catch(err){

console.log(err)

}

}

return(

<div>

<Navbar/>

<div className="flex flex-col md:flex-row">

<Sidebar/>

<div className="p-6 w-full">

<h1 className="text-3xl font-bold mb-4">Fitness Tracker</h1>

<div className="grid md:grid-cols-5 gap-2 mb-4">

<input
value={exercise}
onChange={(e)=>setExercise(e.target.value)}
placeholder="Exercise"
className="border p-2"
/>

<input
value={duration}
onChange={(e)=>setDuration(e.target.value)}
placeholder="Duration"
className="border p-2"
/>

<input
value={distance}
onChange={(e)=>setDistance(e.target.value)}
placeholder="Distance (km)"
className="border p-2"
/>

<input
value={calories}
onChange={(e)=>setCalories(e.target.value)}
placeholder="Calories Burned"
className="border p-2"
/>

<button
onClick={addWorkout}
className="bg-green-500 text-white px-4 py-2 rounded"
>
Add
</button>

</div>

{workouts.map((w,i)=>(

<div key={i} className="bg-white p-3 shadow mb-2 flex justify-between items-center">

<span>
{w.exerciseName} - {w.duration} min - {w.distance} km - {w.calories} kcal
</span>

<button
onClick={()=>deleteWorkout(w._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Remove
</button>

</div>

))}

</div>

</div>

</div>

)

}

export default Fitness