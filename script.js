// SCRIPT.JS - Dr. Gustavo Anzola MuñozTébar | Cardiología Clínica y Bioética

// 1. MANEJO DEL FORMULARIO DE CITAS
function handleMedicalForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const motivo = document.getElementById('motivo').value;
    const message = document.getElementById('message').value.trim();
    const resultDiv = document.getElementById('form-result');

    let waMessage = `Hola Dr. Gustavo Anzola MuñozTébar, solicito coordinar una cita médica:\n`;
    waMessage += `👤 Nombre: ${name}\n`;
    waMessage += `📱 Teléfono: ${phone}\n`;
    waMessage += `🩺 Motivo: ${motivo}\n`;
    if (message) {
        waMessage += `📝 Mensaje: ${message}\n`;
    }

    const encodedMsg = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/584143954757?text=${encodedMsg}`;

    resultDiv.innerHTML = `
        <div style="background: #e6f9ed; color: #0d873d; padding: 12px; border-radius: 8px; border: 1px solid #b7ebd0; font-weight: 600; margin-top: 1rem;">
            ✓ Redirigiendo a WhatsApp para enviar su solicitud...
        </div>
    `;

    setTimeout(() => {
        window.open(waUrl, '_blank');
        document.getElementById('contact-form').reset();
    }, 700);
}

// 2. HERRAMIENTA INTERACTIVA: EL SEMÁFORO DE MIS HÁBITOS
function handleSemaforo(event) {
    event.preventDefault();

    const form = document.getElementById('semaforo-form');
    const tabaco = parseInt(form.querySelector('input[name="tabaco"]:checked').value);
    const alcohol = parseInt(form.querySelector('input[name="alcohol"]:checked').value);
    const actividad = parseInt(form.querySelector('input[name="actividad"]:checked').value);
    const alimentacion = parseInt(form.querySelector('input[name="alimentacion"]:checked').value);
    const descanso = parseInt(form.querySelector('input[name="descanso"]:checked').value);

    // Suma de factores de riesgo
    const puntajeTotal = tabaco + alcohol + actividad + alimentacion + descanso;
    const panelResultado = document.getElementById('semaforo-resultado');

    let htmlResultado = '';

    // LÓGICA DEL SEMÁFORO
    // Si fuma diario (tabaco == 3) y tiene otros factores -> ROJO
    if (tabaco === 3 || puntajeTotal >= 6) {
        // ROJO: Busquemos apoyo
        htmlResultado = `
            <div class="resultado-rojo">
                <div class="semaforo-badge-res badge-rojo-bg">
                    <span>🔴</span> Semáforo Rojo: Busquemos apoyo conjunto
                </div>
                <h3 class="resultado-titulo">Prioricemos el cuidado de tus arterias</h3>
                <p class="resultado-texto">
                    Hemos identificado factores de riesgo simultáneos (como el tabaquismo activo, el sedentarismo o la sobrecarga metabólica) que inflaman tus arterias y aumentan de forma multiplicadora la probabilidad de eventos cardiovasculares.
                </p>
                <div class="resultado-consejo-box">
                    <strong>Recomendación Bioética del Dr. Gustavo Anzola:</strong><br>
                    «Es momento de conversar con tu médico para diseñar juntos un plan a tu medida, priorizando tu bienestar y respetando tu proceso. No buscamos juicios ni imposiciones; buscamos brindarte acompañamiento científico y humano para proteger tu vida.»
                </div>
                <a href="https://wa.me/584143954757?text=Hola%20Dr.%20Gustavo%20Anzola,%20realic%C3%A9%20el%20Sem%C3%A1foro%20de%20H%C3%A1bitos%20y%20deseo%20orientaci%C3%B3n%20m%C3%A9dica%20personalizada" target="_blank" class="resultado-cta-btn">
                    💬 Conversar por WhatsApp con el Consultorio
                </a>
            </div>
        `;
    } else if (puntajeTotal >= 3 || alcohol === 2 || tabaco === 1) {
        // AMARILLO: Momento de ajustar
        htmlResultado = `
            <div class="resultado-amarillo">
                <div class="semaforo-badge-res badge-amarillo-bg">
                    <span>🟡</span> Semáforo Amarillo: Momento de ajustar
                </div>
                <h3 class="resultado-titulo">Pequeños cambios para un gran impacto</h3>
                <p class="resultado-texto">
                    Cuentas con hábitos positivos, pero se observan áreas de oportunidad clave como el sedentarismo prolongado, el consumo social frecuente de alcohol o el estrés crónico que pueden estar sobrecargando tu endotelio vascular de forma silenciosa.
                </p>
                <div class="resultado-consejo-box">
                    <strong>Consejo Personalizado de Prevención:</strong><br>
                    • Aplica la regla de los <strong>30 minutos de caminata</strong> 5 días por semana.<br>
                    • Espacia el consumo de bebidas alcohólicas para cuidar tu hígado y triglicéridos.<br>
                    • Suma vegetales de colores variados en la mitad de tu plato diario.<br>
                    • Un chequeo preventivo oportuno puede darte total certeza de tu salud arterial.
                </div>
                <a href="#guia-prevencion" class="resultado-cta-btn">
                    📖 Repasar los 5 Pasos de la Guía Práctica
                </a>
            </div>
        `;
    } else {
        // VERDE: ¡Vas por excelente camino!
        htmlResultado = `
            <div class="resultado-verde">
                <div class="semaforo-badge-res badge-verde-bg">
                    <span>🟢</span> Semáforo Verde: ¡Vas por excelente camino!
                </div>
                <h3 class="resultado-titulo">¡Felicitaciones por cuidar tu salud cardiovascular!</h3>
                <p class="resultado-texto">
                    Tus respuestas reflejan una autonomía consciente: no fumas, mantienes moderación, incorporas movimiento y valoras el descanso reparador. Estás protegiendo tu endotelio del estrés oxidativo y la inflamación de forma activa.
                </p>
                <div class="resultado-consejo-box">
                    <strong>Reforzamiento Positivo del Dr. Anzola:</strong><br>
                    «Mantener estos hábitos en el tiempo es el mejor regalo para tu longevidad y bienestar. Recuerda realizarte tu chequeo cardiovascular periódico de control para seguir sumando años de vida saludable guiados por la ciencia y la prevención.»
                </div>
                <a href="#servicios" class="resultado-cta-btn">
                    🩺 Conoce nuestros Chequeos Preventivos
                </a>
            </div>
        `;
    }

    panelResultado.innerHTML = htmlResultado;
    panelResultado.style.display = 'block';

    // Desplazamiento suave al resultado
    panelResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
