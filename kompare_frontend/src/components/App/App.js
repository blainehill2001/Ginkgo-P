import "./App.css";
import MyFirstComponent from "../MyFirstComponent";
import NavBar from "../NavBar";
import HomePage from "../HomePage";
// import Body from "../Body";
// import Particles from "../../assets/particles.js-master/src/particles.js";
import Particles from "../Particles";

function App() {
  // window.onload = function () {
  //   Particles.init({
  //     // normal options
  //     selector: ".background",
  //     connectParticles: true,
  //     maxParticles: 450,
  //     // options for breakpoints
  //     responsive: [
  //       {
  //         breakpoint: 768,
  //         options: {
  //           maxParticles: 200,
  //           color: "#48F2E3",
  //           connectParticles: false,
  //         },
  //       },
  //       {
  //         breakpoint: 425,
  //         options: {
  //           maxParticles: 100,
  //           connectParticles: true,
  //         },
  //       },
  //       {
  //         breakpoint: 320,
  //         options: {
  //           maxParticles: 0,

  //           // disables particles.js
  //         },
  //       },
  //     ],
  //   });
  // };

  // // E.g. gets called on a button click
  // function pause() {
  //   Particles.pauseAnimation();
  // }
  // // E.g. gets called on a button click
  // function resume() {
  //   Particles.resumeAnimation();
  // }
  return (
    <>
      <div className="App">
        <div>
          <NavBar />
          <MyFirstComponent />
          <Particles id="tsparticles" />
        </div>
      </div>
    </>
  );
}

export default App;
