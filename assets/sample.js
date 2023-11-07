
// Function to create a habit entry
function createHabit() {
    const habitName = document.getElementById("habit-name").value;
    const habitList = document.getElementById("habit-list");

    if (habitName) {
        // Check if a container already exists for this habit
        let habitContainer = document.getElementById(habitName);
        if (!habitContainer) {
            // Create a new container for the habit
            habitContainer = document.createElement("li");
            habitContainer.id = habitName;
            habitContainer.innerHTML = `<div class="habit-entry">
                <h3>${habitName}</h3>
                <ul class="logged-values"></ul>
                <input type="number" placeholder="Enter value" id="logged-value-${habitName}">
                <button type="button" onclick="logValue('${habitName}')">Log Value</button>
            </div>`;
            habitList.appendChild(habitContainer);
        }

        // No need to clear the input field
    } else {
        alert("Please enter a habit name.");
    }
}

// Function to log numerical values for a habit
function logValue(habitName) {
    const loggedValueInput = document.getElementById(`logged-value-${habitName}`);
    const loggedValue = loggedValueInput.value;
    
    if (loggedValue !== "") {
        const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];

        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
        const logDate = `${currentDate} ${currentTime}`;

        loggedHabits.push({ habitName, loggedValue, logDate });
        localStorage.setItem("loggedHabits", JSON.stringify(loggedHabits));

        createHabitEntry(habitName, loggedValue, logDate);
        loggedValueInput.value = ""; // Clear the input after logging
    }
}

// Function to clear all logged data
function clearData() {
    if (confirm("Are you sure you want to clear all logged data?")) {
        localStorage.removeItem("loggedHabits");
        const habitList = document.getElementById("habit-list");
        habitList.innerHTML = "";
    }
}

// Load logged habits from local storage on page load
window.addEventListener("load", function() {
    const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];

    const habitList = document.getElementById("habit-list");
    loggedHabits.forEach(function(entry) {
        createHabitEntry(entry.habitName, entry.loggedValue, entry.logDate);
    });

    displayCurrentDate();
});

// Helper function to create a habit entry for logged values
function createHabitEntry(habitName, loggedValue, logDate) {
    const habitList = document.getElementById("habit-list");

    let habitContainer = document.getElementById(habitName);
    if (!habitContainer) {
        habitContainer = document.createElement("li");
        habitContainer.id = habitName;
        habitContainer.innerHTML = `<div class="habit-entry">
            <h3>${habitName}</h3>
            <ul class="logged-values"></ul>
        </div>`;
        habitList.appendChild(habitContainer);
    }

    const listItem = document.createElement("li");
    listItem.innerHTML = `<div class="logged-value">
        <span class="logged-date">${logDate}</span>
        <h4>${loggedValue}</h4>
    </div>`;

    const loggedValues = habitContainer.querySelector(".logged-values");
    loggedValues.appendChild(listItem);
}
