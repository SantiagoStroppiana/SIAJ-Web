
// // import { Home } from "./pages/Home/Home";
// import { Barco } from "./pages/Barco/Barco";
// import { Envio } from "./pages/Envio/Envio";
import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";
// import { BrowserRouter ,Routes, Route } from "react-router-dom";

import '../public/css/estilos.css'
import '../public/lib/bootstrap/css/bootstrap.min.css'


function App() {

  // Admin();

  // const routes = [
  //   {
  //     path:"/",
  //     element: <Home/>,s
  //     name: "Home",
  //   }, 
  //   {
  //     path:"/barcos",
  //     element: <Barco />,
  //     name: "Barco",
  //   },
  //   {
  //     path:"/envios",
  //     element: <Envio />,
  //     name: "Envio",
  //   },
  // ]



  return (
    <>

    

      {/* <BrowserRouter>      */}
      <Header /> 

      {/* <Routes>

        {routes.map((route) => (

          <Route key={route.name} path={route.path} element={route.element}/>
s
        ))}

      </Routes>
         
      </BrowserRouter> */}

      <Footer/>
      
    </>
  );
}

export default App;

