// Almacenamiento de datos en localStorage
const STORAGE_KEY = 'pentaGamesRegistrations';
const USER_REGISTERED_KEY = 'userRegistered';

// Clase para manejar el almacenamiento
class RegistrationManager {
    constructor() {
        this.registrations = this.loadRegistrations();
        this.updateCounter();
    }

    loadRegistrations() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {
            nametags: [],
            discordUsers: [],
            count: 0
        };
    }

    saveRegistrations() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.registrations));
    }

    isNametagTaken(nametag) {
        return this.registrations.nametags.includes(nametag.toLowerCase());
    }

    isDiscordUserTaken(discordUser) {
        return this.registrations.discordUsers.includes(discordUser.toLowerCase());
    }

    addRegistration(nametag, discordUser) {
        this.registrations.nametags.push(nametag.toLowerCase());
        this.registrations.discordUsers.push(discordUser.toLowerCase());
        this.registrations.count++;
        this.saveRegistrations();
        this.updateCounter();
        localStorage.setItem(USER_REGISTERED_KEY, 'true');
        return this.registrations.count;
    }

    isUserRegistered() {
        return localStorage.getItem(USER_REGISTERED_KEY) === 'true';
    }

    updateCounter() {
        document.getElementById('registered-count').textContent = this.registrations.count;
    }
}

// Inicializar el administrador de registros
const registrationManager = new RegistrationManager();

document.addEventListener('DOMContentLoaded', function() {
    if (registrationManager.isUserRegistered()) {
        showAlreadyRegisteredMessage();
        return;
    }

    const subtitle = document.getElementById('subtitle');
    const text = [
        "🎮 ¡Bienvenido a la nueva era de los eventos!",
        "🏆 Compite por un increíble premio",
        "🌟 Inscribete a este eventaso",
        "🎉 ¡Únete a nuestro servidor!",
        "https://discord.gg/Uf5ezKMQBg"
    ];

    function createSpanWithDelay(text, delay) {
        setTimeout(() => {
            const span = document.createElement('span');
            span.textContent = text;
            subtitle.appendChild(span);
        }, delay);
    }

    text.forEach((line, index) => {
        createSpanWithDelay(line, index * 800);
    });
});

function showAlreadyRegisteredMessage() {
    document.querySelector('.main-container').innerHTML = `
        <div class="info-container" style="text-align: center;">
            <div class="title">¡Ya estás registrado!</div>
            <div class="subtitle">
                <p>Ya has completado tu registro para el evento.</p>
                <p>Si necesitas modificar tus datos, contacta con un administrador.</p>
            </div>
        </div>
    `;
}

function validateForm(nametag, discord) {
    if (nametag.length < 3 || nametag.length > 20) {
        alert('El nametag debe tener entre 3 y 20 caracteres.');
        return false;
    }

    const discordRegex = /^.{3,32}(#\d{4})?$/;
    if (!discordRegex.test(discord)) {
        alert('El formato del usuario de Discord no es válido.');
        return false;
    }

    if (registrationManager.isNametagTaken(nametag)) {
        alert('Este nametag ya está registrado. Por favor, elige otro.');
        return false;
    }

    if (registrationManager.isDiscordUserTaken(discord)) {
        alert('Este usuario de Discord ya está registrado. Si crees que esto es un error, contacta con un administrador.');
        return false;
    }

    return true;
}

async function saveData() {
    const nametag = document.getElementById('nametag').value.trim();
    const discord = document.getElementById('discord').value.trim();
    const reason = document.getElementById('reason').value.trim();
    const device = document.getElementById('device').value.trim();

    if (!nametag || !discord || !reason || !device) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!validateForm(nametag, discord)) {
        return;
    }

    document.querySelector('.main-container').style.display = 'none';
    document.getElementById('loading-container').classList.add('fade-in');

    try {
        const response = await fetch('https://formspree.io/f/mqaagakn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Nametag: nametag,
                Discord: discord,
                Razón: reason,
                Dispositivo: device,
                _replyto: 'santosramonsteven@gmail.com'
            })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }

        const registrationNumber = registrationManager.addRegistration(nametag, discord);

        setTimeout(() => {
            document.getElementById('loading-container').classList.remove('fade-in');
            document.getElementById('result-container').classList.add('fade-in');

            document.getElementById('result-nametag').textContent = `Nametag: ${nametag}`;
            document.getElementById('result-discord').textContent = `Usuario de Discord: ${discord}`;
            document.getElementById('result-reason').textContent = `Razón: ${reason}`;
            document.getElementById('result-device').textContent = `Dispositivo: ${device}`;
            document.getElementById('result-message').textContent = 
                `¡Felicitaciones! Tu registro ha sido exitoso. Eres el participante #${registrationNumber}. ` +
                `Guardalo para tener pruebas por cualquier situación.`;
        }, 3000);

    } catch (error) {
        alert('Hubo un error al enviar el formulario: ' + error.message);
        document.querySelector('.main-container').style.display = 'flex';
        document.getElementById('loading-container').classList.remove('fade-in');
    }
  }
