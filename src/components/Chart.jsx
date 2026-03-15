import { Bar, Pie } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Title,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Title,
Tooltip,
Legend
)

function Chart({workouts,type}){

if(!workouts || workouts.length===0){
return <p className="text-gray-500">No data available</p>
}


if(type==="workout"){

const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

const dataValues = days.map((day,i)=>{

return workouts[i] ? 1 : 0

})

const data={
labels:days,
datasets:[
{
label:"Workouts Completed",
data:dataValues,
backgroundColor:"rgba(37,99,235,0.8)"
}
]
}

return(

<div className="w-full max-w-xl mx-auto">

<Bar data={data}/>

</div>

)

}


if(type==="calories"){

const data={
labels:workouts.map(w=>w.exerciseName),
datasets:[
{
label:"Calories Burned",
data:workouts.map(w=>Number(w.calories)),
backgroundColor:[
"#ff6384",
"#36a2eb",
"#ffce56",
"#4caf50",
"#9c27b0"
]
}
]
}

return(

<div className="w-full max-w-xl mx-auto">

<Pie data={data}/>

</div>

)

}

}

export default Chart