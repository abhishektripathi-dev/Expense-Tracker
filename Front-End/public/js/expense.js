// Get token from local storage
const token = localStorage.getItem("token");

// Redirect to login if no token is found
if (!token) {
    alert("You need to log in to access this page.");
    window.location.href = "./login.html"; // Redirect to login page
}

const BASE_URL = "http://localhost:3000";

const expenseForm = document.getElementById("expenseForm");
const formButton = document.getElementById("formButton");
const categorySelect = document.getElementById("category");
const otherCategoryInput = document.getElementById("otherCategoryInput");
const expenseTableBody = document.getElementById("expenseTableBody");
const emptyMessage = document.getElementById("emptyMessage");

let editingExpenseId = null;

categorySelect.addEventListener("change", () => {
    if (categorySelect.value === "Other") {
        otherCategoryInput.style.display = "block";
        otherCategoryInput.setAttribute("required", "true");
    } else {
        otherCategoryInput.style.display = "none";
        otherCategoryInput.removeAttribute("required");
    }
});

const fetchExpenses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/expenses`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        const expenses = response.data;

        if (expenses.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
            populateTable(expenses);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            handleUnauthorized();
        } else {
            console.error("Error fetching expenses:", error);
        }
    }
};

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

const addOrUpdateExpense = async (event) => {
    event.preventDefault();
    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const category =
        categorySelect.value === "Other"
            ? otherCategoryInput.value.trim()
            : categorySelect.value;

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
        } else {
            await axios.post(`${BASE_URL}/api/expenses`, expenseData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        editingExpenseId = null;
        formButton.textContent = "Add Expense";
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

const editExpense = (id, amount, description, category) => {
    editingExpenseId = id; // Set the ID of the expense being edited

    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;

    if (["Food", "Petrol", "Salary", "Entertainment"].includes(category)) {
        categorySelect.value = category;
        otherCategoryInput.style.display = "none";
        otherCategoryInput.value = "";
    } else {
        categorySelect.value = "Other";
        otherCategoryInput.style.display = "block";
        otherCategoryInput.value = category;
    }
    formButton.textContent = "Update Expense";
};

const deleteExpense = async (id) => {
    const confirmDelete = confirm(
        "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) {
        return;
    }

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

expenseForm.addEventListener("submit", addOrUpdateExpense);

fetchExpenses();

// Logout functionality
const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
        localStorage.removeItem("token"); // Remove token from local storage
        // alert("You have been logged out.");
        window.location.href = "./login.html"; // Redirect to login page
    }
});
