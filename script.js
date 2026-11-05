// script.js
function handleSubmit(event) {
    event.preventDefault();
    const resultDiv = document.getElementById('form-result');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // Simple client‑side acknowledgement (no backend).
    resultDiv.innerHTML = `<p>¡Gracias, ${name}! Tu mensaje ha sido recibido.</p>`;
    // Reset form
    document.getElementById('contact-form').reset();
}
