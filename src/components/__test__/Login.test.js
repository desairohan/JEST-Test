import Login, {validateEmail} from "../Login";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("Test the Login Component", () => {
  test("renders the landing page", () => {
    render(<Login />);

    expect(screen.getByRole("heading")).toHaveTextContent(/Login/);
    expect(screen.getByRole("textbox", {name: /Email/i})).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {name: /Password/i})
    ).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
    expect(screen.getByRole("reset", {name: "reset"})).toBeInTheDocument();
  });
  test("render the login form 2 button on the screen", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

  test("should be failed on email validation ", () => {
    const testEmail = "rohan.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("email input field should accept email ", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    userEvent.type(email, "rohan");
    expect(email.value).not.toMatch("rohan.desai@gmail.com");
  });

  test("password input should have type password ", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should display alert if error", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const buttonList = screen.getAllByRole("button");

    userEvent.type(email, "desai");
    userEvent.type(password, "123456");
    userEvent.click(buttonList[0]);
    const error = screen.getByText("Email is not valid");
    expect(error).toBeInTheDocument();
  });

  test("should be able to reset the form ", () => {
    const {getByLabelText, getByTestId} = render(<Login />);
    const resetBtn = getByTestId("reset");
    const emailInputNode = getByLabelText("Email");
    const passwordInputNode = getByLabelText("Password");
    fireEvent.click(resetBtn);
    expect(emailInputNode.value).toMatch("");
    expect(passwordInputNode.value).toMatch("");
  });

  test("should be able to submit the form", () => {
    const component = render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const btnList = screen.getAllByRole("button");

    userEvent.type(email, "desai@gmail.com");
    userEvent.type(password, "123456");
    userEvent.click(btnList[0]);

    const user = screen.getByText("desai@gmail.com");
    expect(user).toBeInTheDocument();
  });

  test("render login component in doucment", () => {
    const {getByLabelText} = render(<Home />);
    const childElement = getByLabelText("Home");
    expect(childElement).toBeTruthy();
  });
});
