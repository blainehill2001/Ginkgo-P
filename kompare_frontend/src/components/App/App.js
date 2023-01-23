import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyFirstAlgoCategory from "../MyFirstAlgoCategory";
import KGCompletionCategory from "../KGCompletionCategory";
import ExampleResult from "../ExampleResult";
import NavBar from "../NavBar";
import HomePage from "../HomePage";
// import Body from "../Body";
import Particles from "../Particles";

function App() {
  const example_data =
    '{\n    "status": "Good",\n    "result1": {\n      "nodes": [\n        { "id": "6", "name": "Aiea,_Hawaii" },\n        { "id": "3", "name": "Black_Week_(Hawaii)" },\n        { "id": "7", "name": "Honolulu" },\n        { "id": "4", "name": "Aloha_Stadium" },\n        { "id": "1", "name": "Hawaii" },\n        { "id": "8", "name": "Hawaii_Convention_Center" },\n        { "id": "5", "name": "Halawa,_Hawaii" },\n        { "id": "2", "name": "Hawaii_State_Capitol" }\n      ],\n      "links": [\n        { "source": "1", "type": "isLocatedIn", "target": "2" },\n        { "source": "1", "type": "happenedIn", "target": "3" },\n        { "source": "1", "type": "isLocatedIn", "target": "4" },\n        { "source": "1", "type": "isLocatedIn", "target": "5" },\n        { "source": "1", "type": "isLocatedIn", "target": "6" },\n        { "source": "1", "type": "hasCapital", "target": "7" },\n        { "source": "1", "type": "isLocatedIn", "target": "8" },\n        { "source": "2", "type": "isLocatedIn", "target": "7" },\n        { "source": "3", "type": "happenedIn", "target": "7" },\n        { "source": "4", "type": "isLocatedIn", "target": "5" },\n        { "source": "4", "type": "isLocatedIn", "target": "6" },\n        { "source": "4", "type": "isLocatedIn", "target": "7" },\n        { "source": "7", "type": "isLocatedIn", "target": "8" }\n      ]\n    }\n  }';

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
        <ExampleResult data={example_data} />
        <Particles id="tsparticles" />
      </div>
    </>
  );
}

export default App;
