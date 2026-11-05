// SCRIPT.JS - Dr. Gustavo Anzola MuñozTébar | Cardiología Clínica

function handleMedicalForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const motivo = document.getElementById('motivo').value;
    const message = document.getElementById('message').value.trim();
    const resultDiv = document.getElementById('form-result');

    // Mensaje pre-armado para WhatsApp
    let waMessage = `Hola Dr. Gustavo Anzola MuñozTébar, solicito información para una cita médica:\n`;
    waMessage += `👤 Nombre: ${name}\n`;
    waMessage += `📱 Teléfono: ${phone}\n`;
    waMessage += `🩺 Motivo: ${motivo}\n`;
    if (message) {
        waMessage += `📝 Nota: ${message}\n`;
    }

    const encodedMsg = encodeURIComponent(waMessage);
    // Número principal para citas: 04143954757 (+58 414 395 4757)
    const waUrl = `https://wa.me/584143954757?text=${encodedMsg}`;

    resultDiv.innerHTML = `
        <div style="background: #e6f9ed; color: #0d873d; padding: 12px; border-radius: 8px; border: 1px solid #b7ebd0; font-weight: 600;">
            ✓ Redirigiendo a WhatsApp para enviar su solicitud...
        </div>
    `;

    // Abrir WhatsApp en pestaña nueva
    setTimeout(() => {
        window.open(waUrl, '_blank');
        document.getElementById('contact-form').reset();
    }, 800);
}
