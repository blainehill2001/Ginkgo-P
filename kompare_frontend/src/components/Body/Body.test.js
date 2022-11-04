import { render, screen } from "@testing-library/react";
import Body from "./Body";

test("test body", () => {
  render(<Body />);
  const linkElement = screen.getByText(/body/i);
  expect(linkElement).toBeInTheDocument();
});
