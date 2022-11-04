import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

test("test navbar", () => {
  render(<NavBar />);
  //insert expect statements to test component below
  // const linkElement = screen.getByText(/haha/i);
  // expect(linkElement).toBeInTheDocument();
});
