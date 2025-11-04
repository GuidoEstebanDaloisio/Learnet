import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";


export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
};
