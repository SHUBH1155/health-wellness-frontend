import {Pie} from "react-chartjs-2"

function NutritionChart({foods}){

const protein = foods.reduce((a,b)=>a+Number(b.protein||0),0)
const carbs = foods.reduce((a,b)=>a+Number(b.carbs||0),0)
const fat = foods.reduce((a,b)=>a+Number(b.fat||0),0)

const data = {
labels:["Protein","Carbs","Fat"],
datasets:[
{
data:[protein,carbs,fat],
backgroundColor:["#3b82f6","#22c55e","#f59e0b"]
}
]
}

return <Pie data={data}/>

}

export default NutritionChart