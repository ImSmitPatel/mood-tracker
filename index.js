// Mood data containing emojis and descriptions for each mood type
const moodData = {
    happy: {
        emoji: "😊",
        text: "Feeling Happy and Excited!"
    },
    sad: {
        emoji: "😢",
        text: "A bit down today."
    },
    angry: {
        emoji: "😡",
        text: "Frustrated with work."
    },
    neutral: {
        emoji: "😐",
        text: "Just a normal day."
    }
};

// Initial mood logs
const defaultLogs = [
    { date: "Mar 14, 2025", mood: "angry" },
    { date: "Mar 15, 2025", mood: "happy" },
    { date: "Mar 16, 2025", mood: "neutral" },
    { date: "Mar 17, 2025", mood: "sad" }
];

const logs = [];

// DOM element references
const moodForm = document.getElementById("mood-form");
const moodSelect = document.getElementById("mood");
const logMoodButton = document.getElementById("log-mood");
const deleteLogsButton = document.getElementById("delete-logs");
const timeline = document.getElementById("timeline");

// Event listener for logging a new mood entry
logMoodButton.addEventListener("click", event => {

    event.preventDefault();     // Prevent default form submission behavior

    const selectedMood = moodSelect.value;

    // Validate if a mood is selected
    if(selectedMood == "none"){
        alert("Please select a mood")
        return // Stop execution if no mood is selected
    }

    // Add new mood entry to logs array
    logs.push({ 
        date: formatDate(),  // Get current date
        mood: selectedMood 
    });

    createMoodItems(); // Update the timeline display
    saveMoodLogs();  // Save logs to localStorage
});

// Event listener for deleting all mood logs
deleteLogsButton.addEventListener("click", () => {
    logs.length = 0; // Clear the logs array
    createMoodItems(); // Update the timeline display
    saveMoodLogs(); // Update localStorage
});

// Save mood logs to localStorage
const saveMoodLogs = () => {
    localStorage.setItem("logs", JSON.stringify(logs));
};

// Function to create and display mood items in the timeline
function createMoodItems() {
    timeline.innerHTML = "";

    
    logs.forEach(item => {

        // Create a timeline item container
        const moodItem = document.createElement("div");
        moodItem.className = `timeline-item mood-${item.mood}`;
        // Create date element 
        const dateElem = document.createElement("div");
        dateElem.className = `timeline-date ${item.mood}`;
        dateElem.textContent = item.date;
        // Create mood emoji element
        const emojiElem = document.createElement("div");
        emojiElem.className = "mood-emoji";
        emojiElem.textContent = moodData[item.mood].emoji;
        // Create text description element
        const textElem = document.createElement("p");
        textElem.textContent = moodData[item.mood].text;
        // Create mood details container
        const detailsElem = document.createElement("div");
        detailsElem.className = `timeline-content ${item.mood}`;

        // Append emoji and text to the details container
        detailsElem.appendChild(emojiElem);
        detailsElem.appendChild(textElem);
        
        // Append date and details to the mood item
        moodItem.appendChild(dateElem);
        moodItem.appendChild(detailsElem);

        // Append mood item to the timeline
        timeline.appendChild(moodItem);
    });

    // Scroll to the latest item
    scrollToLatest();
}

// Scrolls the timeline to the latest item.
function scrollToLatest() {
    setTimeout(() => {
        timeline.scrollLeft = timeline.scrollWidth;     // Move scroll to the end
    }, 100);
}


// Helper function for formatting date
function formatDate() {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Load mood logs from localStorage or default logs on page load
window.onload = function() {
    // Initialize the timeline
    const storedLogs = localStorage.getItem("logs");

    if (storedLogs) {
        logs.push(...JSON.parse(storedLogs)); // Load stored logs
    } else {
        logs.push(...defaultLogs); // Use default logs if storage is empty
        saveMoodLogs(); // Save default logs to localStorage
    }

    createMoodItems();
};
