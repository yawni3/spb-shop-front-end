import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Projects from "./pages/Projects/projects";
import ProjectDetail from "./pages/Projects/projectDetail";
import About from "./pages/About/about";
import Sources from "./pages/Sources/sources";
import Layout from "./Baselayout";

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
