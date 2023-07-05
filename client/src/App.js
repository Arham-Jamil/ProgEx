import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Kitchen from "./pages/Kitchen";
import IngredientsList from "./StaffView/IngredientsList";
import EditExtras from "./StaffView/EditExtras";
import OrdersPage from "./StaffView/OrdersPage";

const App = () =>{
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/Homepage" element={<HomePage/>}/>
          <Route path="/src/pages/HomePage.js" element={<HomePage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/src/pages/Kitchen.js" element={<Kitchen/>}/>
          <Route path="/ingredientsList" element={<IngredientsList/>}/>
          <Route path="/editExtras" element={<EditExtras/>}/>
          <Route path="/OrdersPage" element={<OrdersPage/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
