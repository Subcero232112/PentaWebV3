import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <div>
            <div className="header">
                <i className="fab fa-discord"></i> Penta Studio
            </div>
            <div className="registration-counter">
                Registrados: <span id="registered-count">0</span>
            </div>
            <div className="main-container">
                <div className="info-container">
                    <div className="profile-container">
                        <img src="logo.png" alt="logo.png" className="profile-pic" />
                    </div>
                    <div className="title">Penta Games</div>
                    <div className="subtitle" id="subtitle"></div>
                </div>
                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="nametag">Nametag:</label>
                        <input type="text" id="nametag" placeholder="Escribe tu nametag" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discord">Usuario de Discord:</label>
                        <input type="text" id="discord" placeholder="Escribe tu usuario de Discord" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">¿Por qué quieres estar en nuestro evento?</label>
                        <textarea id="reason" placeholder="Escribe una breve explicación"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="device">Selecciona tu dispositivo:</label>
                        <select id="device">
                            <option value="móvil">Móvil</option>
                            <option value="pc">PC</option>
                            <option value="playstation">PlayStation</option>
                        </select>
                    </div>
                    <button className="button" onClick={saveData}>¡Únete al evento!</button>
                </div>
            </div>
            <div className="loading" id="loading-container">
                <i className="fas fa-spinner"></i>
            </div>
            <div className="result" id="result-container">
                <div className="result-title">Registro Confirmado</div>
                <div className="result-data" id="result-nametag"></div>
                <div className="result-data" id="result-discord"></div>
                <div className="result-data" id="result-reason"></div>
                <div className="result-data" id="result-device"></div>
                <div className="result-message" id="result-message"></div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
