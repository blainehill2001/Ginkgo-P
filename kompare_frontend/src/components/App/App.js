import "./App.css";
import { Routes, Route } from "react-router-dom";
// import MyFirstComponent from "../MyFirstComponent";
import MyFirstAlgoCategory from "../MyFirstAlgoCategory";
import NavBar from "../NavBar";
import HomePage from "../HomePage";
// import Body from "../Body";
import Particles from "../Particles";

function App() {
  return (
    <>
      <div className="App">
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="myfirstalgo" element={<MyFirstAlgoCategory />} />
            <Route path="transe" />
            <Route path="gnnrl" />
          </Routes>
        </div>
        <Particles id="tsparticles" />
      </div>
    </>
  );
}

export default App;
