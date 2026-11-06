const contacts = [
    { name: "Zeyad Mansour", phone: "01225351584" },
    { name: "Zeyad Mansour", phone: "01012544455" },
    { name: "Yousef Al Badawi", phone: "01094588416" }
];

const container =
document.getElementById("contacts-container");

contacts.forEach((contact, index) => {
    const card = document.createElement("article");
    card.className = "contact-card";
    const callPhone = getCallPhone(contact.phone);
    const whatsappPhone = normalizePhone(contact.phone);
    card.innerHTML = `
        <div class="contact-number">${index + 1}</div>
        <div class="contact-person">
            <h2>${escapeAttribute(contact.name)}</h2>
            <p class="contact-phone">${escapeAttribute(contact.phone)}</p>
        </div>
        <div class="contact-actions">
            <button type="button" data-url="tel:${callPhone}" class="contact-action call-action" title="Call" aria-label="Call">
                <i class="fa-solid fa-phone" aria-hidden="true"></i>
            </button>
            <button type="button" data-url="https://wa.me/${whatsappPhone}" data-new-tab="true" class="contact-action whatsapp-action" title="WhatsApp" aria-label="WhatsApp">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            </button>
        </div>
    `;
    container.appendChild(card);
});

function getCallPhone(value) {
    return String(value).trim().replace(/[^+\d]/g, "");
}

function normalizePhone(value) {
    const digits = String(value).replace(/\D/g, "");

    if (digits.startsWith("0")) {
        return `20${digits.slice(1)}`;
    }

    return digits;
}

function escapeAttribute(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
