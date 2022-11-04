import { render, screen } from "@testing-library/react";
import App from "./App";
//'npm run test' to run all xxx.test.js tests across the project
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
