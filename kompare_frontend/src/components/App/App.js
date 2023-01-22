import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyFirstAlgoCategory from "../MyFirstAlgoCategory";
import KGCompletionCategory from "../KGCompletionCategory";
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
            <Route path="multihopreasoning" />
            <Route path="pointwisereasoning" />
            <Route path="kgcompletion" element={<KGCompletionCategory />} />
            <Route path="kgquestionanswering" />
          </Routes>
        </div>
        <Particles id="tsparticles" />
      </div>
    </>
  );
}

export default App;
