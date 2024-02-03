import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DashBoard from "./pages/DashBoard";
import SendMoney from "./pages/SendMoney";
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
