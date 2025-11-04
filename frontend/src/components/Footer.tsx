import React from "react";
import "../styles/components/footer.css";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 Learnet. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Sobre nosotros</a>
          <a href="#">Contacto</a>
          <a href="#">Política de privacidad</a>
        </div>
      </div>
      <div className="socials">
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" alt="LinkedIn" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png" alt="Twitter" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384012.png" alt="Instagram" /></a>
      </div>
    </footer>
  );
};
