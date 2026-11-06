const PASSWORD_HASH = "3b2cbc8be13f3bad7d9049caf98fd558b191bc3ff2107638cf773eefbc4df512";
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 60 * 1000;

async function hashPassword(value) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

async function checkPassword() {
    const input = document.getElementById("password");
    const message = document.getElementById("error-message");
    const lockedUntil = Number(sessionStorage.getItem("passwordLockedUntil") || 0);
    if (Date.now() < lockedUntil) {
        message.textContent = `حاول مرة أخرى بعد ${Math.ceil((lockedUntil - Date.now()) / 1000)} ثانية`;
        return;
    }

    const hash = await hashPassword(input.value);
    if (hash === PASSWORD_HASH) {
        sessionStorage.setItem("authenticated", "true");
        sessionStorage.setItem("authenticatedAt", String(Date.now()));
        sessionStorage.removeItem("passwordAttempts");
        window.location.href = "memories-list.html";
        return;
    }

    const attempts = Number(sessionStorage.getItem("passwordAttempts") || 0) + 1;
    sessionStorage.setItem("passwordAttempts", String(attempts));
    if (attempts >= MAX_ATTEMPTS) {
        sessionStorage.setItem("passwordLockedUntil", String(Date.now() + LOCK_TIME));
        sessionStorage.removeItem("passwordAttempts");
        message.textContent = "تم القفل مؤقتًا بسبب محاولات كثيرة";
    } else {
        message.textContent = `كلمة المرور غير صحيحة · المحاولات المتبقية: ${MAX_ATTEMPTS - attempts}`;
    }
    input.value = "";
    input.focus();
}

document.getElementById("login-button").addEventListener("click", checkPassword);
