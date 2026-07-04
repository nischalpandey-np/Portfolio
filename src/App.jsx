import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import "./index.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  return (
    <>
      <div className="bg-[#fafafa] dark:bg-[#09090b] bg-grid-pattern relative overflow-hidden min-h-screen antialiased text-gray-900 dark:text-gray-100 transition-colors duration-700 ease-in-out">
        <CustomCursor />
        <Toaster />
        <NavBar theme={theme} setTheme={setTheme} />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <ContactUs />
        <Footer theme={theme} />
      </div>
    </>
  );
};

export default App;
