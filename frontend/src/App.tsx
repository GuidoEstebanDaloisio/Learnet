import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Explorar } from "./pages/usuario_alumno/Explorar";
import { DetallesMentor } from "./pages/usuario_alumno/DetallesMentor";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumno/explorar-mentores" element={<Explorar />} />
        <Route path="/alumno/detalles-mentor" element={<DetallesMentor />} />
      </Routes>
    </Router>
  );
}

export default App;
