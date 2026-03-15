import { Link } from "react-router-dom"

function Sidebar(){

return(

<div className="bg-green-700 text-white w-full md:w-60 p-6 md:min-h-screen">

<h2 className="text-xl md:text-2xl font-bold mb-6">
Wellness Menu
</h2>

<ul className="space-y-4">

<li>
<Link to="/dashboard" className="hover:text-yellow-300 no-underline">
Dashboard
</Link>
</li>

<li>
<Link to="/fitness" className="hover:text-yellow-300 no-underline">
Fitness Tracker
</Link>
</li>

<li>
<Link to="/nutrition" className="hover:text-yellow-300 no-underline">
Nutrition
</Link>
</li>

<li>
<Link to="/goals" className="hover:text-yellow-300 no-underline">
Goals
</Link>
</li>

<li>
<Link to="/profile" className="hover:text-yellow-300 no-underline">
Profile
</Link>
</li>

<li>
<Link to="/change-password" className="hover:text-yellow-300 no-underline">
Change Password
</Link>
</li>

</ul>

</div>

)

}

export default Sidebar