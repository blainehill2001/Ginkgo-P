export const getBackend = () => {
  let backend;
  if (process.env.REACT_APP_NODE_ENV === "prod") {
    backend = process.env.REACT_APP_BACKEND + "/api/algorithms";
  } else {
    backend = process.env.REACT_APP_DEFAULT_BACKEND + "/api/algorithms";
  }
  return backend;
};
