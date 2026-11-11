// SCRIPT.JS - Dr. Gustavo Anzola MuñozTébar | Cardiología Clínica y Bioética

// 1. MANEJO DE LA CALCULADORA SCORE2-LA
function actualizarPAS(valor) {
    document.getElementById('pas-display').innerText = valor + ' mmHg';
}

function calcularNoHDL() {
    const total = parseFloat(document.getElementById('col-total').value) || 0;
    const hdl = parseFloat(document.getElementById('col-hdl').value) || 0;
    let noHdl = total - hdl;
    if (noHdl < 0) noHdl = 0;
    document.getElementById('no-hdl-val').innerText = Math.round(noHdl);
    return noHdl;
}

function calcularSCORE2(event) {
    event.preventDefault();

    const edad = parseInt(document.getElementById('score-edad').value);
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const fumador = parseInt(document.querySelector('input[name="tabaquismo"]:checked').value);
    const pas = parseFloat(document.getElementById('score-pas').value);
    const colTotal = parseFloat(document.getElementById('col-total').value);
    const colHDL = parseFloat(document.getElementById('col-hdl').value);

    // Validación básica de coherencia
    if (colHDL >= colTotal) {
        alert("El colesterol HDL no puede ser mayor o igual al Colesterol Total. Por favor verifique sus cifras.");
        return;
    }

    // Colesterol No-HDL en mg/dL y conversión a mmol/L (estándar SCORE2: 1 mmol/L = 38.67 mg/dL)
    const noHdl_mgdl = colTotal - colHDL;
    const noHdl_mmol = noHdl_mgdl / 38.67;

    // Centrado de variables clínicas según estándar SCORE2
    const edadCentrada = edad - 60;
    const pasCentrada = pas - 120;
    const noHdlCentrado = noHdl_mmol - 4.0;

    let lp = 0; // Predictor lineal
    let s0_10 = 0.945; // Supervivencia basal a 10 años calibrada para América Latina (región de riesgo moderado/alto)

    if (sexo === 'hombre') {
        s0_10 = 0.938;
        lp = (0.059 * edadCentrada) +
             (0.540 * fumador) +
             (0.019 * pasCentrada) +
             (0.145 * noHdlCentrado) -
             (0.013 * edadCentrada * fumador) -
             (0.0003 * edadCentrada * pasCentrada) -
             (0.004 * edadCentrada * noHdlCentrado);
    } else {
        // Mujer
        s0_10 = 0.962;
        lp = (0.076 * edadCentrada) +
             (0.640 * fumador) +
             (0.021 * pasCentrada) +
             (0.165 * noHdlCentrado) -
             (0.015 * edadCentrada * fumador) -
             (0.0004 * edadCentrada * pasCentrada) -
             (0.005 * edadCentrada * noHdlCentrado);
    }

    // Riesgo absoluto a 10 años mediante modelo de Cox / Weibull: 1 - S0(10)^exp(LP)
    const exponente = Math.exp(lp);
    let riesgoPorcentaje = (1 - Math.pow(s0_10, exponente)) * 100;

    // Ajuste de límites biológicos
    if (riesgoPorcentaje < 0.5) riesgoPorcentaje = 0.5;
    if (riesgoPorcentaje > 48.0) riesgoPorcentaje = 48.0;

    const riesgoFinal = riesgoPorcentaje.toFixed(1);

    // ESTRATIFICACIÓN SEGÚN GRUPOS DE EDAD (GUÍAS OFICIALES SCORE2 / SCORE2-OP)
    let categoria = '';
    let claseColor = '';
    let badgeColor = '';
    let mensajeBioetico = '';

    if (edad < 50) {
        // Menores de 50 años
        if (riesgoPorcentaje < 2.5) {
            categoria = 'Riesgo Bajo / Moderado';
            claseColor = 'resultado-verde';
            badgeColor = 'badge-verde-bg';
            mensajeBioetico = '«Tu puntuación se encuentra dentro de los márgenes estables para tu grupo de edad. Mantener un estilo de vida saludable y activo es tu mejor herramienta de autonomía.»';
        } else if (riesgoPorcentaje < 7.5) {
            categoria = 'Riesgo Alto';
            claseColor = 'resultado-amarillo';
            badgeColor = 'badge-amarillo-bg';
            mensajeBioetico = '«Tus cifras actuales sugieren una ventana de oportunidad importante para intervenir. Es altamente recomendable que programes una consulta con tu médico de confianza para trazar una estrategia personalizada.»';
        } else {
            categoria = 'Riesgo Muy Alto';
            claseColor = 'resultado-rojo';
            badgeColor = 'badge-rojo-bg';
            mensajeBioetico = '«Tus cifras actuales sugieren una ventana de oportunidad importante para intervenir. Es altamente recomendable que programes una consulta con tu médico de confianza para trazar una estrategia personalizada.»';
        }
    } else if (edad <= 69) {
        // Adultos 50 - 69 años
        if (riesgoPorcentaje < 5.0) {
            categoria = 'Riesgo Bajo / Moderado';
            claseColor = 'resultado-verde';
            badgeColor = 'badge-verde-bg';
            mensajeBioetico = '«Tu puntuación se encuentra dentro de los márgenes estables para tu grupo de edad. Mantener un estilo de vida saludable y activo es tu mejor herramienta de autonomía.»';
        } else if (riesgoPorcentaje < 10.0) {
            categoria = 'Riesgo Alto';
            claseColor = 'resultado-amarillo';
            badgeColor = 'badge-amarillo-bg';
            mensajeBioetico = '«Tus cifras actuales sugieren una ventana de oportunidad importante para intervenir. Es altamente recomendable que programes una consulta con tu médico de confianza para trazar una estrategia personalizada.»';
        } else {
            categoria = 'Riesgo Muy Alto';
            claseColor = 'resultado-rojo';
            badgeColor = 'badge-rojo-bg';
            mensajeBioetico = '«Tus cifras actuales sugieren una ventana de oportunidad importante para intervenir. Es altamente recomendable que programes una consulta con tu médico de confianza para trazar una estrategia personalizada.»';
        }
    } else {
        // Adultos Mayores 70 - 89 años (SCORE2-OP)
        if (riesgoPorcentaje < 7.5) {
            categoria = 'Riesgo Bajo / Moderado';
            claseColor = 'resultado-verde';
            badgeColor = 'badge-verde-bg';
            mensajeBioetico = '«Tu puntuación se encuentra dentro de los márgenes estables para tu grupo de edad. Mantener un estilo de vida saludable y activo es tu mejor herramienta de autonomía.»';
        } else if (riesgoPorcentaje < 15.0) {
            categoria = 'Riesgo Alto';
            claseColor = 'resultado-amarillo';
            badgeColor = 'badge-amarillo-bg';
            mensajeBioetico = '«Tus cifras actuales sugieren una ventana de oportunidad importante para intervenir. Es altamente recomendable que programes una consulta con tu médico de confianza para trazar una estrategia personalizada.»';
        } else {
            categoria = 'Riesgo Muy Alto';
            claseColor = 'resultado-rojo';
            badgeColor = 'badge-rojo-bg';
            mensajeBioetico = '«Tus cifras actuales sugieren una ventana de oportunidad importante para intervenir. Es altamente recomendable que programes una consulta con tu médico de confianza para trazar una estrategia personalizada.»';
        }
    }

    // Renderizado en pantalla
    const resultadoDiv = document.getElementById('score2-resultado');
    const mensajeWA = encodeURIComponent(`Hola Dr. Gustavo Anzola, realicé la calculadora SCORE2-LA en su página web y obtuve un riesgo estimado del ${riesgoFinal}% (${categoria}). Deseo agendar una consulta cardiológica.`);

    resultadoDiv.innerHTML = `
        <div class="score-card-output ${claseColor}">
            <div class="score-top-header">
                <span class="score-badge-cat ${badgeColor}">${categoria}</span>
                <span class="score-model-tag">Modelo SCORE2-LA (América Latina)</span>
            </div>

            <div class="score-number-display">
                <div class="score-val-big">${riesgoFinal}%</div>
                <div class="score-val-text">
                    <strong>Probabilidad estimada a 10 años</strong>
                    <p>de presentar un evento cardiovascular mayor (infarto de miocardio o ACV).</p>
                </div>
            </div>

            <div class="score-summary-details">
                <div class="sum-item"><strong>Edad:</strong> ${edad} años</div>
                <div class="sum-item"><strong>Sexo:</strong> ${sexo === 'hombre' ? 'Hombre' : 'Mujer'}</div>
                <div class="sum-item"><strong>Tabaquismo:</strong> ${fumador === 1 ? 'Fumador actual' : 'No fumador'}</div>
                <div class="sum-item"><strong>Presión Sistólica:</strong> ${pas} mmHg</div>
                <div class="sum-item"><strong>Colesterol No-HDL:</strong> ${Math.round(noHdl_mgdl)} mg/dL</div>
            </div>

            <div class="score-bioethical-box">
                <h4>Marco Bioético y Orientación Clínica:</h4>
                <p>${mensajeBioetico}</p>
            </div>

            <div class="score-actions-group">
                <a href="https://wa.me/584143954757?text=${mensajeWA}" target="_blank" class="btn-wa-score">
                    💬 Coordinar Consulta Cardiológica por WhatsApp
                </a>
                <a href="#guia-prevencion" class="btn-link-guia">
                    📖 Repasar los Pilares de la Guía Práctica de Prevención
                </a>
            </div>
        </div>
    `;

    resultadoDiv.style.display = 'block';
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 2. MANEJO DEL FORMULARIO DE CONTACTO / CITAS
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

// ═══════════════════════════════════════════════════════════════
// REFLEXIONES — PREVENCIÓN & BIOÉTICA
// Modal de lectura completa y filtros de categoría
// ═══════════════════════════════════════════════════════════════

/**
 * Abre el modal de lectura con el contenido del artículo indicado.
 * @param {string} idContenido - El id del div con la clase reflexion-modal-body
 */
function abrirReflexion(idContenido) {
    const card = document.querySelector(`#${idContenido}`).closest('.reflexion-card');
    const badgeEl = card.querySelector('.reflexion-badge');
    const fechaEl = card.querySelector('.reflexion-fecha');
    const tituloEl = card.querySelector('.reflexion-titulo');
    const contenidoEl = document.getElementById(idContenido);

    document.getElementById('modal-badge').className = 'reflexion-badge ' + badgeEl.className.split(' ').find(c => c.startsWith('badge-'));
    document.getElementById('modal-badge').textContent = badgeEl.textContent;
    document.getElementById('modal-fecha').textContent = fechaEl.textContent;
    document.getElementById('modal-titulo').textContent = tituloEl.textContent;
    document.getElementById('modal-contenido').innerHTML = contenidoEl.innerHTML;

    const modal = document.getElementById('reflexion-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de lectura.
 * Si se pasa un evento (clic en overlay), solo cierra si el clic fue fuera del contenedor.
 */
function cerrarReflexion(event) {
    if (event && event.target !== document.getElementById('reflexion-modal')) return;
    document.getElementById('reflexion-modal').style.display = 'none';
    document.body.style.overflow = '';
}

// Cierre con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') cerrarReflexion();
});

// Filtros de categoría
document.addEventListener('DOMContentLoaded', function () {
    const botones = document.querySelectorAll('.filtro-btn');
    const tarjetas = document.querySelectorAll('.reflexion-card');

    botones.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const filtro = btn.getAttribute('data-filtro');

            // Actualizar botón activo
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Mostrar/ocultar tarjetas
            tarjetas.forEach(function (card) {
                if (filtro === 'all' || card.getAttribute('data-categoria') === filtro) {
                    card.classList.remove('oculta');
                } else {
                    card.classList.add('oculta');
                }
            });
        });
    });
});
