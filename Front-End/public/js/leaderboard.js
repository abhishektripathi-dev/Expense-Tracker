const token = localStorage.getItem("token");
if (!token) {
    alert("You need to log in to access this page.");
    window.location.href = "./login.html";
}

const BASE_URL = "http://localhost:3000";

// Redirect to login if token is invalid or expired
const handleUnauthorized = () => {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("token");
    window.location.href = "./login.html";
};

// Fetch leaderboard data
const fetchLeaderboard = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/leaderboard`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const leaderboard = response.data;
        populateLeaderboard(leaderboard);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        } else {
            console.error("Error fetching leaderboard data:", error);
        }
    }
};

// Populate leaderboard table
const populateLeaderboard = ({leaderboard}) => {
    console.log(leaderboard);
    const leaderboardTableBody = document.querySelector("#leaderboardTable tbody");
    leaderboardTableBody.innerHTML = "";

    
    leaderboard.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.totalExpenses}</td>
            <td>${user.isPremium ? "Yes" : "No"}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });
};

//Logout functionality
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token");
        window.location.href = "./login.html";
    }
});

// Fetch leaderboard on page load
fetchLeaderboard();
