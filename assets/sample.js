
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

            // Store the habit name in local storage
            const habitNames = JSON.parse(localStorage.getItem("habitNames")) || [];
            habitNames.push(habitName);
            localStorage.setItem("habitNames", JSON.stringify(habitNames));
        }
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
        localStorage.removeItem("habitNames"); // Clear habit names
        const habitList = document.getElementById("habit-list");
        habitList.innerHTML = "";
    }
}

// Load logged habits from local storage on page load
window.addEventListener("load", function() {
    const habitNames = JSON.parse(localStorage.getItem("habitNames")) || [];
    const habitList = document.getElementById("habit-list");

    // Recreate the input bars for each habit
    habitNames.forEach(function(habitName) {
        createHabit(habitName);
        const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];
        loggedHabits.forEach(function(entry) {
            if (entry.habitName === habitName) {
                createHabitEntry(habitName, entry.loggedValue, entry.logDate);
            }
        });
    });

    displayCurrentDate();
});

// Get the current date using Day.js
const currentDate = dayjs().format('YYYY-MM-DD');

// Display the current date in the div
document.getElementById('current-date').textContent = `Current Date: ${currentDate}`;

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

        // Function to fetch a random quote
        function getQuote() {
            fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
                .then(response => response.json())
                .then(data => {
                    const quote = data.data[0];
                    const quoteText = quote.quoteText;
                    const quoteAuthor = quote.quoteAuthor;

                    document.getElementById('quoteText').textContent = `"${quoteText}"`;
                    document.getElementById('quoteAuthor').textContent = `- ${quoteAuthor}`;
                })
                .catch(error => {
                    console.error('Error fetching quote:', error);
                });
        }

        document.getElementById('getQuoteButton').addEventListener('click', getQuote);
