function clearData() {
        localStorage.removeItem("loggedHabits");
        const habitList = document.getElementById("habit-list");
        habitList.innerHTML = "";
    }

function addHabit() {
    const habitName = document.getElementById("habit-name").value;
    const habitDate = document.getElementById("habit-date").value;
    const habitTime = document.getElementById("habit-time").value;
    const city = document.getElementById("city-name").value;
    const habitList = document.getElementById("habit-list");
    const weatherInfo = document.getElementById("weather-info");

    function tempConvert(temp) {
        return ((temp - 273.15) * 1.8 + 32).toFixed(2);
      }

    if (habitName && habitDate && city && habitTime) {
        const currentDate = dayjs();
        const selectedDate = dayjs(habitDate);
        const currentTime = dayjs('HH:MM');
        const selectedTime = dayjs(habitTime);

        if (selectedDate.isAfter(currentDate) && selectedTime.isafter(currentTime)) {
            alert("You cannot log habits in the future.");
        } else {

            const apiKey = '3977bb5e1b61426933e83f3be4f8c778';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            fetch(weatherUrl)
                .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data.");
                }
                return response.json();
            })
                .then(data => {
                const listItem = document.createElement("li");
                listItem.textContent = `Habit: ${habitName}, Date: ${habitDate}, Time: ${habitTime}, Weather: ${data.weather[0].description}, Temperature: ${tempConvert(data.main.temp)}°F`;
                habitList.appendChild(listItem);

                // Save to local storage---------------------------------------
                const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];
                loggedHabits.push({ habitName, habitDate, habitTime, weather: data.weather[0].description, temperature: tempConvert(data.main.temp)});
                localStorage.setItem("loggedHabits", JSON.stringify(loggedHabits));

                //weather information ----------------------------------
                weatherInfo.textContent = `Current Weather: ${data.weather[0].description}, Temperature: ${tempConvert(data.main.temp)}°F`;
            })
                .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherInfo.textContent = "Failed to fetch weather data. Please try again later.";
            });

            // Clear input fields
            document.getElementById("habit-name").value = "";
            document.getElementById("habit-date").value = "";
            document.getElementById("habit-time").value = "";
            document.getElementById("city-name").value = "";
        }
    } else {
        alert("Please enter habit name, date, and city.");
    }
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

// Load logged habits from local storage
window.addEventListener("load", function() {
    const loggedHabits = JSON.parse(localStorage.getItem("loggedHabits")) || [];

    const habitList = document.getElementById("habit-list");
    loggedHabits.forEach(function(entry) {
        const listItem = document.createElement("li");
        listItem.textContent = `Habit: ${entry.habitName}, Time: ${entry.habitTime}, Date: ${entry.habitDate}, Weather: ${entry.weather}, Temperature: ${entry.temperature}°F`;
        habitList.appendChild(listItem);
    });
});

