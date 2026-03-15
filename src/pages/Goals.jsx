import {useState,useEffect} from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import API from "../services/api"
import ProgressBar from "../components/ProgressBar"

function Goals(){

const [dailySteps,setDailySteps]=useState("")
const [calorieGoal,setCalorieGoal]=useState("")
const [workoutGoal,setWorkoutGoal]=useState("")
const [goals,setGoals]=useState([])

useEffect(()=>{
fetchGoals()
},[])

const fetchGoals = async()=>{

try{

const token = localStorage.getItem("token")

const res = await API.get("/goals",{
headers:{Authorization:`Bearer ${token}`}
})

setGoals(res.data)

}catch(err){
console.log(err)
}

}

const addGoal = async()=>{

try{

const token = localStorage.getItem("token")

await API.post("/goals",
{
dailySteps,
calorieGoal,
workoutGoal
},
{
headers:{Authorization:`Bearer ${token}`}
}
)

fetchGoals()

setDailySteps("")
setCalorieGoal("")
setWorkoutGoal("")

}catch(err){
console.log(err)
}

}

const deleteGoal = async(id)=>{

try{

const token = localStorage.getItem("token")

await API.delete(`/goals/${id}`,{
headers:{Authorization:`Bearer ${token}`}
})

fetchGoals()

}catch(err){
console.log(err)
}

}

const calculateProgress = (goal,current)=>{

if(!goal) return 0

return Math.min((current/goal)*100,100)

}

return(

<div>

<Navbar/>

<div className="flex flex-col md:flex-row">

<Sidebar/>

<div className="p-6 w-full">

<h1 className="text-3xl font-bold mb-6">
Goals
</h1>

<div className="grid md:grid-cols-4 gap-2 mb-6">

<input
value={dailySteps}
onChange={(e)=>setDailySteps(e.target.value)}
placeholder="Daily Steps Goal"
className="border p-2"
/>

<input
value={calorieGoal}
onChange={(e)=>setCalorieGoal(e.target.value)}
placeholder="Calories Goal"
className="border p-2"
/>

<input
value={workoutGoal}
onChange={(e)=>setWorkoutGoal(e.target.value)}
placeholder="Workout Goal"
className="border p-2"
/>

<button
onClick={addGoal}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Add Goal
</button>

</div>

<div>

{goals.map((g,i)=>(

<div key={i} className="bg-white p-4 shadow mb-4">

<p className="font-semibold">Daily Steps Goal: {g.dailySteps}</p>
<ProgressBar value={calculateProgress(g.dailySteps,g.currentSteps || 0)}/>

<p className="font-semibold mt-3">Calorie Goal: {g.calorieGoal}</p>
<ProgressBar value={calculateProgress(g.calorieGoal,g.currentCalories || 0)}/>

<p className="font-semibold mt-3">Workout Goal: {g.workoutGoal}</p>
<ProgressBar value={calculateProgress(g.workoutGoal,g.currentWorkouts || 0)}/>

<button
onClick={()=>deleteGoal(g._id)}
className="bg-red-500 text-white px-3 py-1 rounded mt-3"
>
Remove Goal
</button>

</div>

))}

</div>

</div>

</div>

</div>

)

}

export default Goals