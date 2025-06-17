import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";
import { Home } from "./pages/Home/Home";
import { Service } from "./pages/Service/Service";
import { Service2 } from "./pages/Service/Service2";
import { Contact } from "./pages/Contact/Contact";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { ScrollToTop } from "./components/ScrollToTop";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import { BrowserRouter ,Routes, Route } from "react-router-dom";
// import '../public/lib/bootstrap/css/bootstrap.min.css'
import '../public/css/global.css'

function App() {
  
  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 800, // Duración de las animaciones
      easing: 'ease-out', // Tipo de easing
      once: true, // Si true, la animación solo ocurre una vez
      offset: 50, // Offset desde el trigger point
    });
  }, []);


  const routes = [
    {
      path:"/",
      element: <Home />,
      name: "Home",
    },
        {
      path:"/servicios",
      element: (
      <>
        <Service2 />
        <Service />
      </>
    ),
      name: "Service",
    },
    {
      path:"/sobrenosotros",
      element: <AboutUs />,
      name: "AboutUs",
    },
    {
      path:"/contacto",
      element: <Contact />,
      name: "Contact",
    },
  ]


  return (
    <>

    

      <BrowserRouter> 
      <ScrollToTop />    
      <Header /> 

      <Routes>

        {routes.map((route) => (

          <Route key={route.name} path={route.path} element={route.element}/>

        ))}

      </Routes>
         
      </BrowserRouter>

      <Footer/>
      
    </>
  );
}

export default App;

