async function loadItems() {
    const response = await fetch("/api/data");
    const data = await response.json();
    
    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = ""; // clear old items

    data.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        itemsList.appendChild(li);
    });
}

// Handle form submission (POST new item)
document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page refresh

    const itemInput = document.getElementById("itemInput");
    const message = document.getElementById("message");

    const response = await fetch("/api/data", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ item: itemInput.value })
    });

    const result = await response.json();

    if (result.message) {
        message.textContent = result.message;
        itemInput.value = ""; // clear input
        loadItems(); // reload updated list
    } else {
        message.textContent = "Error: " + result.error;
    }
});

// Load items when page opens
loadItems();


function fetchGreeting() {
    const name = document.getElementById("nameInput").value;
    fetch(`/api/greet/${name}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("greeting").innerText = data.message;
        });
    }        