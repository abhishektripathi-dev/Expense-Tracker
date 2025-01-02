// Get token from local storage
const token = localStorage.getItem("token");

// Redirect to login if no token is found
if (!token) {
    alert("You need to log in to access this page.");
    window.location.href = "./login.html";
}

const BASE_URL = "http://localhost:3000";

// DOM Elements
const expenseForm = document.getElementById("expenseForm");
const formButton = document.getElementById("formButton");
const categorySelect = document.getElementById("category");
const otherCategoryInput = document.getElementById("otherCategoryInput");
const expenseTableBody = document.getElementById("expenseTableBody");
const emptyMessage = document.getElementById("emptyMessage");
const logoutButton = document.getElementById("logoutButton");
const headerButtonSection = document.querySelector(".header-button")
const premiumButton = document.getElementById("buyPremiumButton");
const header = document.querySelector(".header");

let editingExpenseId = null;

// Redirect to login if token is invalid or expired
const handleUnauthorized = () => {
    alert("Your session has expired. Please log in again.");
    localStorage.removeItem("token");
    window.location.href = "./login.html";
};

// Toggle other category input based on selection
categorySelect.addEventListener("change", () => {
    if (categorySelect.value === "Other") {
        otherCategoryInput.style.display = "block";
        otherCategoryInput.setAttribute("required", "true");
    } else {
        otherCategoryInput.style.display = "none";
        otherCategoryInput.removeAttribute("required");
    }
});

// Fetch expenses
const fetchExpenses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/expenses`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const expenses = response.data;
        emptyMessage.style.display = expenses.length === 0 ? "block" : "none";
        populateTable(expenses);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        } else {
            console.error("Error fetching expenses:", error);
        }
    }
};

// Populate expense table
const populateTable = (expenses) => {
    expenseTableBody.innerHTML = "";
    expenses.forEach((expense) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.amount}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>
                <button class="edit" onclick="editExpense(${expense.id}, '${expense.amount}', '${expense.description}', '${expense.category}')">Edit</button>
                <button class="delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        expenseTableBody.appendChild(row);
    });
};

// Add or update expense
const addOrUpdateExpense = async (event) => {
    event.preventDefault();
    console.log("Entry point addOrUpdateExpense");
    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const category =
        categorySelect.value === "Other"
            ? otherCategoryInput.value.trim()
            : categorySelect.value;

    if (!amount || !description || !category) {
        alert("Please fill in all required fields.");
        return;
    }

    const expenseData = { amount, description, category };

    try {
        if (editingExpenseId) {
            await axios.put(
                `${BASE_URL}/api/expenses/${editingExpenseId}`,
                expenseData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            formButton.textContent = "Add Expense";
        } else {
            const response = await axios.post(`${BASE_URL}/api/expenses`, expenseData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Expense added:",response.data);
        }

        editingExpenseId = null;
        expenseForm.reset();
        fetchExpenses();
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        } else {
            console.error("Error saving expense:", error);
        }
    }
};

// Edit expense
const editExpense = (id, amount, description, category) => {
    editingExpenseId = id;
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;

    if (["Food", "Petrol", "Salary", "Entertainment"].includes(category)) {
        categorySelect.value = category;
        otherCategoryInput.style.display = "none";
    } else {
        categorySelect.value = "Other";
        otherCategoryInput.style.display = "block";
        otherCategoryInput.value = category;
    }
    formButton.textContent = "Update Expense";
};

// Delete expense
const deleteExpense = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
        await axios.delete(`${BASE_URL}/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchExpenses();
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        } else {
            console.error("Error deleting expense:", error);
        }
    }
};

// Logout functionality
logoutButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token");
        window.location.href = "./login.html";
    }
});

// Buy premium functionality
// if (premiumButton) {
// premiumButton.addEventListener("click", async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/api/premium`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         const options = {
//             key: response.data.key_id,
//             order_id: response.data.order.id,
//             handler: async function (response) {
//                 try {
//                     const result = await axios.post(
//                         `${BASE_URL}/api/premiumverify`,
//                         {
//                             order_id: options.order_id,
//                             payment_id: response.razorpay_payment_id,
//                         },
//                         {
//                             headers: { Authorization: `Bearer ${token}` },
//                         }
//                     );
//                     alert("You are a premium user now!");
//                 } catch (error) {
//                     console.error("Payment verification error:", error);
//                 }
//             },
//         };

//         const rzp1 = new Razorpay(options);
//         rzp1.open();
//     } catch (error) {
//         console.error("Error initiating premium purchase:", error);
//     }
// });
// }


// Function to check premium status
const checkPremiumStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        console.log(user);
        if (user.isPremium) {
            // Hide the premium button
            if (premiumButton) {
                premiumButton.style.display = "none";
            }

            // Add "Premium" status with a golden star emoji
            const premiumBadge = document.createElement("span");
            premiumBadge.classList.add("premium-badge");
            premiumBadge.textContent = "Premium ⭐";

            headerButtonSection.insertBefore(premiumBadge, headerButtonSection.firstChild); // Insert before the first child
        }
    } catch (error) {
        console.error("Error checking premium status:", error);
    }
};

// Call the function after login or on page load
checkPremiumStatus();

// Premium button click logic (buyPremiumButton event listener stays the same)
if (premiumButton) {
    premiumButton.addEventListener("click", async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/premium`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const options = {
                key: response.data.key_id,
                order_id: response.data.order.id,
                handler: async function (response) {
                    try {
                        const result = await axios.post(
                            `${BASE_URL}/api/premiumverify`,
                            {
                                order_id: options.order_id,
                                payment_id: response.razorpay_payment_id,
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );

                        alert("You are a premium user now!");
                        // Re-check premium status after successful payment
                        checkPremiumStatus();
                    } catch (error) {
                        console.error("Payment verification error:", error);
                    }
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error initiating premium purchase:", error);
        }
    });
}

expenseForm.addEventListener("submit", addOrUpdateExpense);

// Fetch initial expenses
fetchExpenses();
