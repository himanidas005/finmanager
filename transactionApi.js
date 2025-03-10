const API_URL = "http://localhost:5001/api/transactions"; // Backend API URL

// ✅ Add a new transaction
export async function addTransaction(transactionData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
        throw new Error("Failed to add transaction");
    }

    return await response.json();
}

// ✅ Get all transactions
export async function getTransaction() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return await response.json();
}

// ✅ Update a transaction
export async function updateTransaction(id, transactionData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
        throw new Error("Failed to update transaction");
    }

    return await response.json();
}

// ✅ Delete a transaction
export async function deleteTransaction(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete transaction");
    }

    return await response.json();
}
