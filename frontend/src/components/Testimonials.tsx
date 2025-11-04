import React from "react";
import "../styles/components/testimonials.css";

export const Testimonials: React.FC = () => {
  return (
    <section className="testimonials">
      <h2>Lo que dicen nuestros usuarios</h2>
      <div className="testimonial-cards">
        <div className="testimonial">
          <p>“Learnet me ayudó a encontrar un mentor que cambió mi forma de trabajar.”</p>
          <span>— Sofía G.</span>
        </div>
        <div className="testimonial">
          <p>“Una comunidad increíble para crecer profesionalmente.”</p>
          <span>— Juan P.</span>
        </div>
        <div className="testimonial">
          <p>“Las sesiones personalizadas fueron justo lo que necesitaba para avanzar.”</p>
          <span>— Martín L.</span>
        </div>
      </div>
    </section>
  );
};
