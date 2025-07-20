import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { Service } from "./pages/Service/Service";
import { Service2 } from "./pages/Service/Service2";
import { Contact } from "./pages/Contact/Contact";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { ScrollToTop } from "./components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import '../public/lib/bootstrap/css/bootstrap.min.css'
import "../public/css/global.css";
import { FormularioPago } from "./pages/FormularioPago/FormularioPago";
import { Gracias } from "./pages/Gracias/Gracias";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 50,
    });
  }, []);

  const routes = [
    {
      path: "/",
      element: <Home />,
      name: "Home",
    },
    {
      path: "/servicios",
      element: (
        <>
          <Service2 />
          <Service />
        </>
      ),
      name: "Service",
    },
    {
      path: "/sobrenosotros",
      element: <AboutUs />,
      name: "AboutUs",
    },
    {
      path: "/contacto",
      element: <Contact />,
      name: "Contact",
    },
    {
      path: "/formularioPago",
      element: <FormularioPago />,
      name: "FormularioPago",
    },
    {
      path: "/gracias",
      element: <Gracias />,
      name: "Gracias",
    },
  ];

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />

        <Routes>
          {routes.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
