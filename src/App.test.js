import {render, screen} from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("render login component in doucment", () => {
  const {getByLabelText} = render(<App />);
  const childElement = getByLabelText("Email");
  expect(childElement).toBeTruthy();
});
