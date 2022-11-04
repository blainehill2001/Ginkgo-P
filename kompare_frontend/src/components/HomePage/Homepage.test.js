import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("test HomePage", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/insert test/i);
  expect(linkElement).toBeInTheDocument();
});
