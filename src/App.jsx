import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Projects from "./pages/Projects/projects.jsx";
import ProjectDetail from "./pages/Projects/projectDetail.jsx";
import About from "./pages/About/About.jsx";
import Sources from "./pages/Sources/sources.jsx";
import Layout from "./Baselayout.jsx";


function App() {
  return (
   <Routes>
  <Route path="/" element={<Layout />}>
    <Route path="/" element={ <Home />} />
    <Route path="/projects" element={ <Projects />} />
    <Route path="/projects/:id" element={ <ProjectDetail />} />
    <Route path="/about" element={ <About />} />
    <Route path="/sources" element={ <Sources />} />
  </Route>
   </Routes>
  );
}

export default App;
