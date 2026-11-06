function isAuthenticated() {
    const authenticated = sessionStorage.getItem("authenticated") === "true";
    const authenticatedAt = Number(sessionStorage.getItem("authenticatedAt") || 0);
    return authenticated && authenticatedAt > 0 && Date.now() - authenticatedAt < MEMORY_ACCESS_DURATION;
}

if (!isAuthenticated()) window.location.href = "memories.html";

const memory = memories.find(item => item.id === Number(new URLSearchParams(window.location.search).get("id")));
const container = document.getElementById("day-container");

function generateImages(item) {
    const images = [];
    for (let i = item.startImage; i <= item.endImage; i++) {
        const fileName = item.paddedImages !== false && i < 10 ? `0${i}.${item.extension}` : `${i}.${item.extension}`;
        images.push(encodeURI(`images/${item.folder}/${fileName}`));
    }
    return images;
}

if (!memory) {
    container.innerHTML = `<div class="memory-card"><h1>الذكرى غير موجودة</h1><p class="page-description">الرابط غير صحيح.</p></div>`;
} else {
    const images = generateImages(memory);
    container.innerHTML = `<h1>${memory.title}</h1><div class="date">${memory.date}</div><div class="memory-comment">${memory.commentBefore}</div><div class="gallery">${images.map(image => `<img src="${image}" alt="صورة من الذكريات" data-image="${image}">`).join("")}</div><div class="memory-comment">${memory.commentAfter}</div>`;
}

container.addEventListener("click", event => {
    const image = event.target.closest("[data-image]");
    if (image) window.open(image.dataset.image, "_blank", "noopener,noreferrer");
});
