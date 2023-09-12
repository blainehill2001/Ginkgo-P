// import { VscGithub, VscBug } from "react-icons/vsc";
import { Link } from "react-router-dom";
import home_png from "../../assets/home_icon.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  return (
    <div className="px-10 pt-10 pb-5">
      <div className="group relative mx-auto rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div className="navbar bg-base-100 rounded-[15px]">
          <div className="navbar bg-base-100">
            <ul className="flex-1">
              <li className="mr-6">
                {/* <Link to="/" className="btn btn-primary">
                  KompaRe
                </Link> */}
                <Link to="/">
                  <img src={home_png} class="object-scale-down w-12 h-12" />
                </Link>
              </li>
              <li className="mr-6">
                <a href="https://github.com/blainehill2001/Ginkgo-P">
                  <img
                    src="https://img.icons8.com/nolan/64/github.png"
                    className="object-scale-down w-12 h-12"
                  />
                </a>
              </li>
            </ul>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-8">
                <li>
                  <Link to="quickstart" className="text-purple-500">
                    Quick Start
                  </Link>
                </li>
                <li>
                  <Link to="custom" className="text-purple-500">
                    Run Custom KG Algorithm
                  </Link>
                </li>
                <Menu as="div" className="relative inline-block text-left">
                  <li>
                    <Menu.Button className="inline-flex w-full h-full justify-center text-purple-500">
                      Built-In Algorithms
                      <ChevronDownIcon className="-mr-1 h-6 w-6 text-purple-500" />
                    </Menu.Button>
                  </li>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-4 whitespace-nowrap origin-top-right rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
                      <div className=" bg-base-100 rounded-[15px] p-3">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="example"
                              className={classNames(
                                active
                                  ? "bg-gray-200 mix-blend-multiply text-purple-800"
                                  : "text-purple-500",
                                "block rounded-[15px] px-4 py-2"
                              )}
                            >
                              Example Algo
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="kgcompletion"
                              className={classNames(
                                active
                                  ? "bg-gray-200 mix-blend-multiply text-purple-800"
                                  : "text-purple-500",
                                "block rounded-[15px] px-4 py-2"
                              )}
                            >
                              KG Completion
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="kgquestionanswering"
                              className={classNames(
                                active
                                  ? "bg-gray-200 mix-blend-multiply text-purple-800"
                                  : "text-purple-500",
                                "block rounded-[15px] px-4 py-2"
                              )}
                            >
                              KG Question Answering
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="kgpointwisereasoning"
                              className={classNames(
                                active
                                  ? "bg-gray-200 mix-blend-multiply text-purple-800"
                                  : "text-purple-500",
                                "block rounded-[15px] px-4 py-2"
                              )}
                            >
                              KG Subgraph Extraction
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="kgreinforcementlearning"
                              className={classNames(
                                active
                                  ? "bg-gray-200 mix-blend-multiply text-purple-800"
                                  : "text-purple-500",
                                "block rounded-[15px] px-4 py-2"
                              )}
                            >
                              KG Reinforcement Learning
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
