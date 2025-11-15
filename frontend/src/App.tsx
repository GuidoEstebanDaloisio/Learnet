import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { RegisterBase } from "./pages/register/RegisterBase";
import { RegisterAlumno } from "./pages/register/RegisterAlumno";
import { RegisterMentor } from "./pages/register/RegisterMentor";
import { RegisterAdmin } from "./pages/register/RegisterAdmin";
import { Explorar } from "./pages/usuario_alumno/Explorar";
import { DetallesMentor } from "./pages/usuario_alumno/DetallesMentor";
import { PerfilAlumno } from "./pages/usuario_alumno/PerfilAlumno";
import { PerfilMentor } from "./pages/usuario_mentor/PerfilMentor";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterBase />} />
        <Route path="/registro/alumno" element={<RegisterAlumno />} />
        <Route path="/registro/mentor" element={<RegisterMentor />} />
        <Route path="/registro/admin" element={<RegisterAdmin />} />

        <Route path="/alumno/perfil" element={<PerfilAlumno />} />
        <Route path="/alumno/explorar-mentores" element={<Explorar />} />
        <Route path="/alumno/detalles-mentor/:id" element={<DetallesMentor />} />

        <Route path="/mentor/perfil" element={<PerfilMentor />} />
      </Routes>
    </Router>
  );
}

export default App;
