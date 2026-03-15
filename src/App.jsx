import {BrowserRouter,Routes,Route} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Fitness from "./pages/Fitness"
import Nutrition from "./pages/Nutrition"
import Goals from "./pages/Goals"
import ChangePassword from "./pages/ChangePassword"
import Profile from "./pages/Profile"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/fitness" element={<Fitness/>}/>
<Route path="/nutrition" element={<Nutrition/>}/>
<Route path="/goals" element={<Goals/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/change-password" element={<ChangePassword/>}/>

</Routes>

</BrowserRouter>

)

}

export default App