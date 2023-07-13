import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import IngredientsList from "./StaffView/IngredientsList";
import EditExtras from "./StaffView/EditExtras";
import OrdersPage from "./StaffView/OrdersPage";
import EditCategoryDish from "./StaffView/EditCategoryDish";
import EditCategoryDrinks from "./StaffView/EditCategoryDrinks";
import Navigation from "./StaffView/Navigation";
import EditDishes from "./StaffView/EditDishes";
import PrivateRoutes from "./pages/PrivateRoutes";
import { AuthProvider } from "./store/AuthContext";
import EditDrinks from "./StaffView/EditDrinks";

const App = () =>{
 

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/Homepage" element={<HomePage/>}/>
          <Route path="/src/pages/HomePage.js" element={<HomePage/>}/>
          
        <Route element={<PrivateRoutes />}>
          <Route path="/ingredientsList" element={<IngredientsList/>}/>
          <Route path="/editExtras" element={<EditExtras/>}/>
          <Route path="/editCategoryDish" element={<EditCategoryDish/>}/>
          <Route path="/editCategoryDrinks" element={<EditCategoryDrinks/>}/>
          <Route path="/editDishes" element={<EditDishes/>}/>
          <Route path="/editDrinks" element={<EditDrinks/>}/>




          
          <Route path="/Navigation" element={<Navigation/>}/>
          {/* <Route path="/Nav" element={<Navigation/>}/> */}
          
          <Route path="/Nav" element={<Navigation/>}/>
          <Route path="/OrdersPage" element={<OrdersPage/>}/>
          


          

          {/* <Route path="/OrdersPage" element={<OrdersPage/>}/> */}
          
          </Route>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
