if (!isAuthenticated()) {
    window.location.href = "memories.html";
}

function isAuthenticated() {
    const authenticated = sessionStorage.getItem("authenticated") === "true";
    const authenticatedAt = Number(sessionStorage.getItem("authenticatedAt") || 0);
    const valid = authenticated && authenticatedAt > 0 && Date.now() - authenticatedAt < MEMORY_ACCESS_DURATION;
    if (!valid) {
        sessionStorage.removeItem("authenticated");
        sessionStorage.removeItem("authenticatedAt");
    }
    return valid;
}

const container = document.getElementById("memories-container");
memories.forEach(memory => {
    const card = document.createElement("article");
    card.className = "memory-card";
    card.innerHTML = `<div class="memory-date">${memory.date}</div><h2>${memory.title}</h2><button type="button" class="primary-button" data-memory-id="${memory.id}">فتح التفاصيل <i class="fa-solid fa-arrow-left"></i></button>`;
    container.appendChild(card);
});
document.getElementById("back-button").addEventListener("click", goBack);
container.addEventListener("click", event => {
    const button = event.target.closest("[data-memory-id]");
    if (button) window.location.href = `day.html?id=${button.dataset.memoryId}`;
});
