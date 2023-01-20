import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo } from "react";
import background from "../../assets/cool-background.png";

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const ParticlesComponent = (props) => {
  // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
  const options = useMemo(() => {
    // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
    // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
    return {
      background: {
        image: `url(${background})`, // this sets a background color for the canvas
        size: "cover"
      },
      smooth: true,
      fullScreen: {
        enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
        zIndex: -1, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
        position: "relative"
      },
      interactivity: {
        events: {
          onClick: {
            enable: true, // enables the click event
            mode: "push" // adds the particles on click
          },
          onHover: {
            enable: true, // enables the hover event
            mode: "repulse" // make the particles run away from the cursor
          }
        },
        modes: {
          push: {
            quantity: 4 // number of particles to add on click
          },
          repulse: {
            distance: 90 // distance of the particles from the cursor
          }
        }
      },
      particles: {
        number: {
          value: 400,
          max: 100
        },
        links: {
          enable: true, // enabling this will make particles linked together
          distance: 200 // maximum distance for linking the particles
        },
        size: {
          value: { min: 1, max: 5 } // let's randomize the particles size a bit
        },
        move: {
          direction: "none",
          enable: true,
          outModes: "out",
          random: false,
          speed: 2,
          straight: false
        },
        opacity: {
          animation: {
            enable: true,
            speed: 0.5,
            startValue: "max",
            count: 10,
            destroy: "min"
          },
          value: {
            min: 0.1,
            max: 1
          }
        }
      },
      emitters: {
        direction: "random",
        mode: {
          random: {
            count: 100
          }
        },
        size: {
          width: 90,
          height: 90
        },
        position: {
          x: 50,
          y: 50
        },
        rate: {
          delay: 2,
          quantity: 20
        }
      }
    };
  }, []);

  // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
  const particlesInit = useCallback((engine) => {
    // loadSlim(engine);
    loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
  }, []);

  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;
