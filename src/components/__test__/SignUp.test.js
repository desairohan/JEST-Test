import SignUp from "../SignUp";
import "@testing-library/jest-dom/extend-expect";

describe ("Test the Signup component",() => {
    test("renders the landing page", () => {
      render(<SignUp />);
    
      expect(screen.getByRole("heading")).toHaveTextContent(/SignUp/);
      expect(screen.getByRole("textbox", {name: /Email/i})).toBeInTheDocument();
      expect(screen.getByRole("textbox", {name: /Password/i})).toBeInTheDocument();
      expect(screen.getByRole("textbox", {name: /confirm-password/i})).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument();
    });

    test("should be failed on email validation ", () => {
      const testEmail = "rohan.com";
      expect(validateEmail(testEmail)).not.toBe(true);
    });

    test("email input field should accept email ", () => {
      render(<SignUp />);
      const email = screen.getByPlaceholderText("Enter email");
      userEvent.type(email, "rohan");
      expect(email.value).not.toMatch("rohan.desai@gmail.com");
    });

    test("password input should have type password ", () => {
      render(<SignUp />);
      const password = screen.getByPlaceholderText("Password");
      expect(password).toHaveAttribute("type", "password");
    });

    test("password is matching with current password", ()=>{
        const {getByLabelText} = render(<SignUp />);
        const inputPassword = getByLabelText("password");
        const inputConfirmPassword = getByLabelText("confirm-password")
        expect(inputPassword.value).tobe(inputConfirmPassword.value)

    })

    test("should be able to submit the form", () => {
      const component = render(<SignUp />);
      const email = screen.getByPlaceholderText("Enter email");
      const password = screen.getByPlaceholderText("Password");
      const btnList = screen.getAllByRole("button");

      userEvent.type(email, "desai@gmail.com");
      userEvent.type(password, "123456");
      userEvent.click(btnList[0]);

      const user = screen.getByText("desai@gmail.com");
      expect(user).toBeInTheDocument();
    });

})



