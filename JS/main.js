const MEMORY_ACCESS_DURATION = 10 * 1000;
const avatarLink = document.querySelector(".avatar-link");
let holdTimer;
let longPressTriggered = false;

function resetAvatarHold() {
    clearTimeout(holdTimer);
    holdTimer = undefined;
}

function startAvatarHold(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    resetAvatarHold();
    longPressTriggered = false;
    holdTimer = setTimeout(() => {
        longPressTriggered = true;
        window.location.href = "memories.html";
    }, MEMORY_ACCESS_DURATION);
}

function openProfileImage(event) {
    if (longPressTriggered) {
        event.preventDefault();
        longPressTriggered = false;
        return;
    }

    window.open("images/profile.jpeg", "_blank", "noopener,noreferrer");
}

avatarLink.addEventListener("pointerdown", startAvatarHold);
avatarLink.addEventListener("pointerup", resetAvatarHold);
avatarLink.addEventListener("pointercancel", resetAvatarHold);
avatarLink.addEventListener("pointerleave", resetAvatarHold);
avatarLink.addEventListener("contextmenu", event => event.preventDefault());
avatarLink.addEventListener("click", openProfileImage);

function goBack() {
    const authenticatedAt = Number(sessionStorage.getItem("authenticatedAt") || 0);
    if (sessionStorage.getItem("authenticated") === "true" && Date.now() - authenticatedAt < MEMORY_ACCESS_DURATION) {
        window.location.href = "memories-list.html";
    } else if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-url]");
    if (!button) return;
    const url = button.dataset.url;
    if (button.dataset.newTab === "true") {
        window.open(url, "_blank", "noopener,noreferrer");
    } else {
        window.location.href = url;
    }
});
