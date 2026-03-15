import {useState,useEffect} from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import API from "../services/api"
import NutritionChart from "../components/NutritionChart"

function Nutrition(){

const [food,setFood]=useState("")
const [calories,setCalories]=useState("")
const [protein,setProtein]=useState("")
const [carbs,setCarbs]=useState("")
const [fat,setFat]=useState("")
const [foods,setFoods]=useState([])

useEffect(()=>{
fetchFoods()
},[])

const fetchFoods = async()=>{

try{

const token = localStorage.getItem("token")

const res = await API.get("/nutrition",{
headers:{Authorization:`Bearer ${token}`}
})

setFoods(res.data)

}catch(err){
console.log(err)
}

}

const addFood = async()=>{

try{

const token = localStorage.getItem("token")

await API.post("/nutrition",
{
foodName:food,
calories,
protein,
carbs,
fat
},
{
headers:{Authorization:`Bearer ${token}`}
}
)

fetchFoods()

setFood("")
setCalories("")
setProtein("")
setCarbs("")
setFat("")

}catch(err){
console.log(err)
}

}

const deleteFood = async(id)=>{

try{

const token = localStorage.getItem("token")

await API.delete(`/nutrition/${id}`,{
headers:{Authorization:`Bearer ${token}`}
})

fetchFoods()

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

<h1 className="text-3xl font-bold mb-4">Nutrition Tracker</h1>

<div className="grid md:grid-cols-6 gap-2">

<input value={food} placeholder="Food" onChange={(e)=>setFood(e.target.value)} className="border p-2"/>

<input value={calories} placeholder="Calories" onChange={(e)=>setCalories(e.target.value)} className="border p-2"/>

<input value={protein} placeholder="Protein" onChange={(e)=>setProtein(e.target.value)} className="border p-2"/>

<input value={carbs} placeholder="Carbs" onChange={(e)=>setCarbs(e.target.value)} className="border p-2"/>

<input value={fat} placeholder="Fat" onChange={(e)=>setFat(e.target.value)} className="border p-2"/>

<button onClick={addFood} className="bg-yellow-500 text-white px-4 py-2 rounded">
Add
</button>

</div>

{foods.map((f,i)=>(

<div key={i} className="bg-white p-3 shadow mt-3 flex justify-between items-center">

<span>
{f.foodName} - {f.calories} kcal | P:{f.protein} C:{f.carbs} F:{f.fat}
</span>

<button
onClick={()=>deleteFood(f._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Remove
</button>

</div>

))}

<div className="mt-10 bg-white p-6 shadow rounded">

<h2 className="text-xl font-semibold mb-4">
Macronutrients Distribution
</h2>

<NutritionChart foods={foods}/>

</div>

</div>

</div>

</div>

)

}

export default Nutrition