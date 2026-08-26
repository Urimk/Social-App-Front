import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import toast from "react-hot-toast";

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock simplebar-react to avoid DOM measurement issues in test environment
vi.mock("simplebar-react", () => ({
  default: ({ children }) => <div data-testid="simplebar">{children}</div>,
}));

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  };

  it("renders registration form elements correctly", () => {
    renderComponent();

    expect(screen.getByRole("heading", { name: /register/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/display name/i)).toBeInTheDocument();
    expect(screen.getByText(/upload a profile picture:/i)).toBeInTheDocument();
    expect(screen.getByAltText(/profile preview/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already registered\?/i)).toBeInTheDocument();
    expect(screen.getByText(/click here to login/i)).toBeInTheDocument();
  });

  it("disables submit button initially when fields are empty", () => {
    renderComponent();
    const submitBtn = screen.getByRole("button", { name: /sign up/i });
    expect(submitBtn).toBeDisabled();
  });

  it("shows validation error on blur when first name is too short", async () => {
    renderComponent();
    const fNameInput = screen.getByPlaceholderText(/first name/i);

    fireEvent.change(fNameInput, { target: { name: "fName", value: "A" } });
    fireEvent.blur(fNameInput);

    expect(await screen.findByText(/first name is too short/i)).toBeInTheDocument();
  });

  it("shows validation error on blur when password does not meet criteria", async () => {
    renderComponent();
    const passInput = screen.getByPlaceholderText(/^password$/i);

    fireEvent.change(passInput, { target: { name: "password", value: "simple" } });
    fireEvent.blur(passInput);

    expect(await screen.findByText(/password is too short/i)).toBeInTheDocument();

    fireEvent.change(passInput, { target: { name: "password", value: "simplepass" } });
    fireEvent.blur(passInput);

    expect(
      await screen.findByText(/password must contain uppercase, lowercase, and a number/i)
    ).toBeInTheDocument();
  });

  it("shows validation error on blur when confirm password does not match", async () => {
    renderComponent();
    const passInput = screen.getByPlaceholderText(/^password$/i);
    const confirmPassInput = screen.getByPlaceholderText(/confirm password/i);

    fireEvent.change(passInput, { target: { name: "password", value: "Password123" } });
    fireEvent.change(confirmPassInput, { target: { name: "confirmPass", value: "Different123" } });
    fireEvent.blur(confirmPassInput);

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("enables submit button when all fields are valid", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { name: "fName", value: "John" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { name: "lName", value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { name: "password", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { name: "confirmPass", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/display name/i), { target: { name: "display", value: "johndoe" } });

    const submitBtn = screen.getByRole("button", { name: /sign up/i });
    expect(submitBtn).toBeEnabled();
  });

  it("handles image upload and updates preview", async () => {
    const createObjectURLMock = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:http://localhost/mock-temp-url");
    renderComponent();

    const file = new File(["dummy image"], "avatar.png", { type: "image/png" });
    const fileInput = document.querySelector('input[type="file"]');

    await userEvent.upload(fileInput, file);

    const img = screen.getByAltText(/profile preview/i);
    expect(img).toHaveAttribute("src", "blob:http://localhost/mock-temp-url");
    createObjectURLMock.mockRestore();
  });

  it("submits form successfully and navigates to login", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { name: "fName", value: "John" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { name: "lName", value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { name: "password", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { name: "confirmPass", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/display name/i), { target: { name: "display", value: "johndoe" } });

    const submitBtn = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/users/register",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: "John",
            lastName: "Doe",
            displayName: "johndoe",
            password: "Password123",
            image: "",
          }),
        })
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Signed up successfully", { id: "register-success" });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("uploads image first during form submission if image is attached", async () => {
    // First fetch call: image upload returns { url: "http://uploaded-image.png" }
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ url: "http://uploaded-image.png" }),
    });
    // Second fetch call: register user returns { message: "Success" }
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    renderComponent();

    const file = new File(["dummy content"], "avatar.png", { type: "image/png" });
    const fileInput = document.querySelector('input[type="file"]');
    await userEvent.upload(fileInput, file);

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { name: "fName", value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { name: "lName", value: "Smith" } });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { name: "password", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { name: "confirmPass", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/display name/i), { target: { name: "display", value: "janesmith" } });

    const submitBtn = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "http://localhost:5000/image",
      expect.objectContaining({ method: "POST" })
    );

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "http://localhost:5000/users/register",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          firstName: "Jane",
          lastName: "Smith",
          displayName: "janesmith",
          password: "Password123",
          image: "http://uploaded-image.png",
        }),
      })
    );

    expect(toast.success).toHaveBeenCalledWith("Signed up successfully", { id: "register-success" });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("handles registration error and shows toast", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Display name already taken" }),
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { name: "fName", value: "John" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { name: "lName", value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { name: "password", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { name: "confirmPass", value: "Password123" } });
    fireEvent.change(screen.getByPlaceholderText(/display name/i), { target: { name: "display", value: "johndoe" } });

    const submitBtn = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Display name already taken", { id: "register-failed" });
    });
  });

  it("navigates to login page when 'Click here to login' is clicked", () => {
    renderComponent();

    const loginLink = screen.getByText(/click here to login/i);
    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
