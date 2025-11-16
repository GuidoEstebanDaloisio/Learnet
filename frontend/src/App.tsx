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
import { MisMentoriasMentor } from "./pages/usuario_mentor/MisMentoriasMentor";
import { NuevaMentoria } from "./pages/usuario_mentor/NuevaMentoria";


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
        <Route path="/mentor/mis-mentorias" element={<MisMentoriasMentor />} />
        <Route path="/mentor/crear-mentoria" element={<NuevaMentoria />} />
      </Routes>
    </Router>
  );
}

export default App;
