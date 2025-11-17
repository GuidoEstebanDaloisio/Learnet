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
import { SolicitudesMentor } from "./pages/usuario_mentor/SolicitudesMentor";
import { AsignarMentoria } from "./pages/usuario_mentor/AsignarMentoria";
import { Agenda } from "./pages/usuario_mentor/Agenda";
import { MisMentoriasAlumno } from "./pages/usuario_alumno/MisMentoriasAlumno";
import { DetalleMentoriaAlumno } from "./pages/usuario_alumno/DetalleMentoriaAlumno";
import { DetalleMentoriaMentor } from "./pages/usuario_mentor/DetalleMentoriaMentor";

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
        <Route path="/alumno/mis-mentorias" element={<MisMentoriasAlumno />} />
        <Route path="/alumno/detalle-mentoria/:mentoriaId" element={<DetalleMentoriaAlumno />} />


        <Route path="/mentor/perfil" element={<PerfilMentor />} />
        <Route path="/mentor/solicitudes" element={<SolicitudesMentor />} />
        <Route path="/mentor/mis-mentorias" element={<MisMentoriasMentor />} />
        <Route path="/mentor/crear-mentoria" element={<NuevaMentoria />} />
        <Route path="/mentor/asignar-mentoria/:reservaId/:habilidad" element={<AsignarMentoria />} />
        <Route path="/mentor/agenda" element={<Agenda />} />
        <Route path="/mentor/detalle-mentoria/:mentoriaId" element={<DetalleMentoriaMentor />} />
      </Routes>
    </Router>
  );
}

export default App;
