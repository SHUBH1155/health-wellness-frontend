import {Line} from "react-chartjs-2"

function TrendChart({data}){

const chartData = {

labels:data.map(d=>new Date(d.createdAt).toLocaleDateString()),

datasets:[{

label:"Calories Trend",

data:data.map(d=>d.calories),

borderColor:"blue"

}]

}

return <Line data={chartData}/>

}

export default TrendChart