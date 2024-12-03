import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RotatingText from "./components/RotatingText";
import Skills from "./pages/Skills";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <div>
          <h1 className="text-4xl font-bold text-center mt-10">Welcome to my portfolio</h1>
          <button>Let&#39;s Talk</button>
        </div>

        <RotatingText />
        
        <About />

        <Skills />

        <Projects />

        <Contact />
        <div className="border-t border-gray-300 mt-8"></div>
        <Footer />
      </div>
    </>
  );
}

export default App;
