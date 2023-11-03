function addHabit() {
    const habitName = document.getElementById("habit-name").value;
    const habitDate = document.getElementById("habit-date").value;
    const city = document.getElementById("city-name").value;
    const habitList = document.getElementById("habit-list");
    const weatherInfo = document.getElementById("weather-info");

    if (habitName && habitDate && city) {
        const currentDate = dayjs();
        const selectedDate = dayjs(habitDate);

        if (selectedDate.isAfter(currentDate)) {
            alert("You cannot log habits in the future.");
        } else {

            const apiKey = 'nurshat key';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            fetch(weatherUrl)
                .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data.");
                }
                return response.json();
            })
                .then(data => {
                const listItem = document.createElement("li");
                listItem.textContent = `Habit: ${habitName}, Date: ${habitDate}, Weather: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
                habitList.appendChild(listItem);

                // Save to local storage---------------------------------------
                const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];
                loggedHabits.push({ habitName, habitDate, weather: data.weather[0].description, temperature: data.main.temp });
                localStorage.setItem("loggedHabits", JSON.stringify(loggedHabits));

                //weather information ----------------------------------
                weatherInfo.textContent = `Weather: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
            })
                .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherInfo.textContent = "Failed to fetch weather data. Please try again later.";
            });

            // Clear input fields
            document.getElementById("habit-name").value = "";
            document.getElementById("habit-date").value = "";
            document.getElementById("city-name").value = "";
        }
    } else {
        alert("Please enter habit name, date, and city.");
    }
}

// Load logged habits from local storage
window.addEventListener("load", function() {
    const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];

    const habitList = document.getElementById("habit-list");
    loggedHabits.forEach(function(entry) {
        const listItem = document.createElement("li");
        listItem.textContent = `Habit: ${entry.habitName}, Date: ${entry.habitDate}, Weather: ${entry.weather}, Temperature: ${entry.temperature}°C`;
        habitList.appendChild(listItem);
    });
});