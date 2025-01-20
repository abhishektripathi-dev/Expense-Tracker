const BASE_URL = "http://localhost:3000";

// Toggle password visibility
const passwordInput = document.getElementById("newPassword");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get("token");
    document.getElementById("resetToken").value = resetToken;
});

document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const resetToken = document.getElementById("resetToken").value;
    const newPassword = document.getElementById("newPassword").value;

    try {
        const response = await axios.post(`${BASE_URL}/api/resetpassword/${resetToken}`, { password: newPassword });
        alert(response.data.message || "Password reset successful!");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
});