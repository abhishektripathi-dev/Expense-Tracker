const BASE_URL = "http://localhost:3000";

// Toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Forgot Password logic
// Modal Elements
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.getElementById("closeModal");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

// Show modal on clicking "Forgot Password?"
forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    forgotPasswordModal.style.display = "flex"; // Show the modal
});

// Close modal on clicking "Close" button
closeModal.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none"; // Hide the modal
});

// Handle "Forgot Password" form submission
forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value.trim();

    try {
        const response = await axios.post(
            `${BASE_URL}/password/forgotpassword`,
            { email }
        );
        alert(response.data.message || "Password reset email sent!");
        forgotPasswordModal.style.display = "none"; // Hide the modal
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred. Please try again."
        );
    }
});

// Sign-in form submission logic
const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email,
            password,
        });
        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem("token", token);
            window.location.href = "./expense.html";
        }
    } catch (error) {
        alert(
            error.response?.data?.message || "An error occurred during login."
        );
    }
});
