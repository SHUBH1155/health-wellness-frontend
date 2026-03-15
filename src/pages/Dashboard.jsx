import {useEffect,useState} from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Chart from "../components/Chart"
import API from "../services/api"

function Dashboard(){

const [workouts,setWorkouts]=useState([])
const [foods,setFoods]=useState([])
const [goals,setGoals]=useState([])

// BMI states
const [height,setHeight]=useState("")
const [weight,setWeight]=useState("")
const [bmi,setBmi]=useState(null)

const fetchData = async()=>{

try{

const token = localStorage.getItem("token")

const workoutRes = await API.get("/fitness",{
headers:{Authorization:`Bearer ${token}`}
})

const foodRes = await API.get("/nutrition",{
headers:{Authorization:`Bearer ${token}`}
})

const goalRes = await API.get("/goals",{
headers:{Authorization:`Bearer ${token}`}
})

setWorkouts(workoutRes.data || [])
setFoods(foodRes.data || [])
setGoals(goalRes.data || [])

}catch(err){
console.log(err)
}

}

useEffect(()=>{

fetchData()

window.addEventListener("focus",fetchData)

return ()=>{
window.removeEventListener("focus",fetchData)
}

},[])


// Calories Burn Calculation
const caloriesBurned = workouts.reduce(
(total,w)=> total + Number(
w.caloriesBurn || w.calories || w.caloriesBurned || 0
),0
)


// BMI Calculation

const calculateBMI=()=>{

if(!height || !weight) return

const h=height/100

const result=(weight/(h*h)).toFixed(2)

setBmi(result)

}


// Daily Progress

const dailyGoal = 500

const progress = Math.min((caloriesBurned/dailyGoal)*100,100)


return(

<div>

<Navbar/>

<div className="flex flex-col md:flex-row">

<Sidebar/>

<div className="p-6 w-full bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold mb-6">
Health & Wellness Dashboard
</h1>


{/* DASHBOARD CARDS */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<div className="bg-white p-6 rounded shadow text-center">
<h2 className="text-xl font-semibold">Calories Items</h2>
<p className="text-3xl mt-2">{foods.length}</p>
</div>

<div className="bg-white p-6 rounded shadow text-center">
<h2 className="text-xl font-semibold">Goals</h2>
<p className="text-3xl mt-2">{goals.length}</p>
</div>

<div className="bg-white p-6 rounded shadow text-center">
<h2 className="text-xl font-semibold">Workouts</h2>
<p className="text-3xl mt-2">{workouts.length}</p>
</div>

<div className="bg-white p-6 rounded shadow text-center">
<h2 className="text-xl font-semibold">Calories Burned</h2>
<p className="text-3xl mt-2 text-red-500">{caloriesBurned}</p>
</div>

</div>


{/* DAILY PROGRESS BAR */}

<div className="mt-10 bg-white p-6 rounded shadow">

<h2 className="text-xl font-semibold mb-4">
Daily Calories Progress
</h2>

<div className="w-full bg-gray-300 rounded h-6">

<div
className="bg-green-500 h-6 rounded"
style={{width:`${progress}%`}}
></div>

</div>

<p className="mt-2">
{caloriesBurned} / {dailyGoal} calories burned
</p>

</div>



{/* WEEKLY WORKOUT GRAPH */}

<div className="mt-10 bg-white p-6 rounded shadow">

<h2 className="text-xl font-semibold mb-4">
Weekly Workout Activity
</h2>

<Chart workouts={workouts} type="workout"/>

</div>



{/* CALORIES BURN DISTRIBUTION */}

<div className="mt-10 bg-white p-6 rounded shadow">

<h2 className="text-xl font-semibold mb-4">
Calories Burn Distribution
</h2>

<Chart workouts={workouts} type="calories"/>

</div>



{/* BMI CALCULATOR */}

<div className="mt-10 bg-white p-6 rounded shadow">

<h2 className="text-xl font-semibold mb-4">
BMI Calculator
</h2>

<div className="flex gap-3">

<input
placeholder="Height (cm)"
value={height}
onChange={(e)=>setHeight(e.target.value)}
className="border p-2"
/>

<input
placeholder="Weight (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
className="border p-2"
/>

<button
onClick={calculateBMI}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Calculate
</button>

</div>

{bmi && (

<p className="mt-4 text-lg font-semibold">
Your BMI: {bmi}
</p>

)}

</div>


</div>

</div>

</div>

)

}

export default Dashboard