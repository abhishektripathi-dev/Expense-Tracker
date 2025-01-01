const BASE_URL = "http://localhost:3000";

// Toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    // Toggle the input type between password and text
    const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the icon accordingly
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Sign-in form submission logic

const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        // Make a POST request to the login endpoint
        const response = await axios.post(`${BASE_URL}/api/login`, {
            email,
            password,
        });

        // Handle successful login
        if (response.status === 200) {
            const { token, message } = response.data; // Expecting message from backend response
            console.log(message);

            localStorage.setItem("token", token);
            // alert(
            //     message ||
            //         "Login successful! Redirecting to dashboard."
            // );
            window.location.href = "./expense.html"; // Redirect to expense dashboards
        }
    } catch (error) {
        // Handle errors
        if (error.response && error.response.data) {
            const { message } = error.response.data;
            alert(message || "An error occurred during login.");
        } else {
            console.error("Error signing in:", error);
            alert("An error occurred. Please try again later.");
        }
    }
});
