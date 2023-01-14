// import { VscGithub, VscBug } from "react-icons/vsc";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="px-10 pt-10">
      <div className="group relative mx-auto rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div className="navbar bg-base-100 rounded-[15px]">
          <div class="navbar bg-base-100">
            <ul class="flex-1">
              <li class="mr-6">
                <Link to="/" class="btn btn-primary">
                  KompaRe
                </Link>
              </li>
              <li class="mr-6">
                <a href="https://github.com/blainehill2001/KomPare">
                  <img
                    src="https://img.icons8.com/nolan/64/github.png"
                    class="object-scale-down w-12 h-12"
                  />
                </a>
              </li>
            </ul>
            <div class="flex-none">
              <ul class="menu menu-horizontal px-8">
                <li>
                  <Link to="myfirstalgocategory" class="text-purple-500">
                    Example Algo
                  </Link>
                </li>
                <li>
                  <Link to="TransE" class="text-purple-500">
                    TransE
                  </Link>
                </li>
                <li>
                  <Link to="gnnrl" class="text-purple-500">
                    GNN + RL
                  </Link>
                </li>
                {/* <li tabindex="0">
                  <a>
                    Parent
                    <svg
                      class="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                  </a>
                  <ul class="p-2 bg-base-100">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
