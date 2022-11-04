import { render, screen } from "@testing-library/react";
import MyFirstComponent from "./MyFirstComponent";

test("test my first component", () => {
  render(<MyFirstComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
