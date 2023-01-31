import "./App.css";
import { Routes, Route } from "react-router-dom";
import Particles from "../Particles";
//import components and navbar
import NavBar from "../NavBar";
import HomePage from "../HomePage";
import ExampleCategory from "../Categories/ExampleCategory";
import KGCompletionCategory from "../Categories/KGCompletionCategory";
import KGQuestionAnsweringCategory from "../Categories/KGQuestionAnsweringCategory";
import KGPointWiseReasoningCategory from "../Categories/KGPointWiseReasoningCategory";
import KGReinforcementLearningCategory from "../Categories/KGReinforcementLearningCategory";

function App() {
  return (
    <>
      <div className="App">
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="example" element={<ExampleCategory />} /> */}
            <Route path="kgcompletion" element={<KGCompletionCategory />} />
            <Route
              path="kgquestionanswering"
              element={<KGQuestionAnsweringCategory />}
            />
            <Route
              path="kgpointwisereasoning"
              element={<KGPointWiseReasoningCategory />}
            />
            <Route
              path="kgreinforcementlearning"
              element={<KGReinforcementLearningCategory />}
            />
          </Routes>
        </div>
        <Particles id="tsparticles" />
      </div>
    </>
  );
}

export default App;
