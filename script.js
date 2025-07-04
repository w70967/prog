
const userDataForm = document.getElementById('userDataForm');
const userTableBody = document.getElementById('userTableBody');


userDataForm.addEventListener('submit', function(event) {
    event.preventDefault();


    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value);


    if (!fullName || !email || isNaN(age) || age < 1) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (age < 18) {
        alert('Age must be 18 or older.');
        return;
    }


    const row = document.createElement('tr');
    const fullNameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const ageCell = document.createElement('td');

    fullNameCell.textContent = fullName;
    emailCell.textContent = email;
    ageCell.textContent = age;

    row.appendChild(fullNameCell);
    row.appendChild(emailCell);
    row.appendChild(ageCell);
    userTableBody.appendChild(row);


    const userData = { fullName, email, age };
    saveUserDataToLocalStorage(userData);


    userDataForm.reset();
});


function saveUserDataToLocalStorage(userData) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}


function loadUserDataFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(function(user) {
        const row = document.createElement('tr');
        const fullNameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const ageCell = document.createElement('td');

        fullNameCell.textContent = user.fullName;
        emailCell.textContent = user.email;
        ageCell.textContent = user.age;

        row.appendChild(fullNameCell);
        row.appendChild(emailCell);
        row.appendChild(ageCell);
        userTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', loadUserDataFromLocalStorage);