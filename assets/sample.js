
// Function to display the current date at the top of the page
function displayCurrentDate() {
    const currentDateElement = document.getElementById("current-date");
    currentDateElement.textContent = `Current Date: ${dayjs().format("YYYY-MM-DD")}`;
}

// Function to add a habit entry to the list
function addHabit() {
    const habitName = document.getElementById("habit-name").value;
    const habitDate = document.getElementById("habit-date").value;
    const habitList = document.getElementById("habit-list");

    if (habitName && habitDate) {
        // Create Day.js instance for the current date
        const currentDate = dayjs();

        // Create Day.js instance for the selected habit date
        const selectedDate = dayjs(habitDate);

        // Check if the selected date is in the future
        if (selectedDate.isAfter(currentDate)) {
            alert("You cannot log habits in the future.");
        } else {
            // Create a new list item
            const listItem = document.createElement("li");
            listItem.textContent = `Habit: ${habitName}, Date: ${habitDate}`;

            // Append list item to the habit list
            habitList.appendChild(listItem);

            // Save logged habit to local storage
            const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];
            loggedHabits.push({ habitName, habitDate });
            localStorage.setItem("loggedHabits", JSON.stringify(loggedHabits));

            // Clear input fields
            document.getElementById("habit-name").value = "";
            document.getElementById("habit-date").value = "";
        }
    } else {
        alert("Please enter both habit name and date.");
    }
}

// Load logged habits from local storage on page load
window.addEventListener("load", function() {
    const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];

    const habitList = document.getElementById("habit-list");
    loggedHabits.forEach(function(entry) {
        const listItem = document.createElement("li");
        listItem.textContent = `Habit: ${entry.habitName}, Date: ${entry.habitDate}`;
        habitList.appendChild(listItem);
    });

    // Display the current date when the page loads
    displayCurrentDate();
});

// Call the function to display the current date
displayCurrentDate();