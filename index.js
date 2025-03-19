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

const logs = [
    { date: "Mar 14, 2025", mood: "angry" },
    { date: "Mar 15, 2025", mood: "happy" },
    { date: "Mar 16, 2025", mood: "neutral" },
    { date: "Mar 17, 2025", mood: "sad" },
];

const moodForm = document.getElementById("mood-form");
const moodSelect = document.getElementById("mood");
const logMoodButton = document.getElementById("log-mood");
const deleteLogsButton = document.getElementById("delete-logs");
const timeline = document.getElementById("timeline");

logMoodButton.addEventListener("click", event => {
    event.preventDefault();
    const selectedMood = moodSelect.value;
    if(selectedMood == "none"){
        alert("Please select a mood")
    }
    logs.push({ 
        date: formatDate(), 
        mood: selectedMood 
    });
    createMoodItems();
    saveMoodLogs();
});

deleteLogsButton.addEventListener("click", () => {
    logs.length = 0;
    createMoodItems();
    saveMoodLogs();
});

// saving in local storage
const saveMoodLogs = () => {
    localStorage.setItem("logs", JSON.stringify(logs));
};

function createMoodItems() {
    timeline.innerHTML = "";

    logs.forEach(item => {
        
        const moodItem = document.createElement("div");
        moodItem.className = `timeline-item mood-${item.mood}`;
        
        const dateElem = document.createElement("div");
        dateElem.className = `timeline-date ${item.mood}`;
        dateElem.textContent = item.date;
        
        const emojiElem = document.createElement("div");
        emojiElem.className = "mood-emoji";
        emojiElem.textContent = moodData[item.mood].emoji;

        const textElem = document.createElement("p");
        textElem.textContent = moodData[item.mood].text;

        const detailsElem = document.createElement("div");
        detailsElem.className = `timeline-content ${item.mood}`;

        detailsElem.appendChild(emojiElem);
        detailsElem.appendChild(textElem);

        moodItem.appendChild(dateElem);
        moodItem.appendChild(detailsElem);
        timeline.appendChild(moodItem);
    });

    // Scroll to the latest item
    scrollToLatest();
}

// Scrolls the timeline to the latest item.
function scrollToLatest() {
    setTimeout(() => {
        timeline.scrollLeft = timeline.scrollWidth;
    }, 100);
}


// Helper function for formatting date
function formatDate() {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

window.onload = function() {
    // Load stored logs from localStorage
    const storedLogs = localStorage.getItem("logs");

    if (storedLogs) {
        logs.length = 0; // Clear the existing array while keeping reference
        logs.push(...JSON.parse(storedLogs)); // Parse and add to logs
    }

    createMoodItems();
};
