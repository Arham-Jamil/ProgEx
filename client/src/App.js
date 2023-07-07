import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Kitchen from "./pages/Kitchen";
import IngredientsList from "./StaffView/IngredientsList";
import EditExtras from "./StaffView/EditExtras";
import OrdersPage from "./StaffView/OrdersPage";
import EditCategoryDish from "./StaffView/EditCategoryDish";
import EditCategoryDrinks from "./StaffView/EditCategoryDrinks";
import Navigation from "./StaffView/Navigation";
import EditDishes from "./StaffView/EditDishes";

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
          <Route path="/editCategoryDish" element={<EditCategoryDish/>}/>
          <Route path="/editCategoryDrinks" element={<EditCategoryDrinks/>}/>
          <Route path="/editDishes" element={<EditDishes/>}/>


          
          <Route path="/Navigation" element={<Navigation/>}/>
          <Route path="/Nav" element={<Navigation/>}/>


          

          <Route path="/OrdersPage" element={<OrdersPage/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
