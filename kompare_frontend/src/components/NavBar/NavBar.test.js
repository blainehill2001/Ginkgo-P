import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

test("test navbar", () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/haha/i);
  expect(linkElement).toBeInTheDocument();
});
