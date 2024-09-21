const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalAmountSpan = document.getElementById('total-amount');


const LOCAL_STORAGE_KEY = 'expenses';


let expenses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
renderExpenses();


addExpenseButton.addEventListener('click', () => {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);

    if (name && amount > 0) {
        const expense = { id: Date.now(), name, amount };
        expenses.push(expense);
        saveExpenses();
        renderExpenses();
        clearInputs();
    }
});


function editExpense(id) {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
        expenseNameInput.value = expense.name;
        expenseAmountInput.value = expense.amount;
        deleteExpense(id);  
    }
}


function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderExpenses();
}


function saveExpenses() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
}


function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach(expense => {
        total += expense.amount;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name}: $${expense.amount.toFixed(2)}</span>
            <span>
                <button class="edit" onclick="editExpense(${expense.id})">Edit</button>
                <button class="delete" onclick="deleteExpense(${expense.id})">Delete</button>
            </span>
        `;
        expenseList.appendChild(li);
    });
    totalAmountSpan.textContent = total.toFixed(2);
}


function clearInputs() {
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
}
