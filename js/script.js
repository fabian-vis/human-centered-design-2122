var voice = {
    // (A) INIT VOICE COMMAND
    wrap: null, // HTML DEMO <DIV> WRAPPER
    btn: null, // HTML DEMO BUTTON
    recog: null, // SPEECH RECOGNITION OBJECT
    init: () => {
        // (A1) GET HTML ELEMENTS
        voice.wrap = document.getElementById("vwrap");
        voice.btn = document.getElementById("vbtn");
        voice.img = document.getElementById("voiceimg");

        // (A2) GET MIC ACCESS PERMISSION
        navigator.mediaDevices.getUserMedia({
                audio: true
            })
            .then((stream) => {
                // (A3) SPEECH RECOGNITION OBJECT & SETTINGS
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                voice.recog = new SpeechRecognition();
                voice.recog.lang = "nl-nl";
                voice.recog.continuous = false;
                voice.recog.interimResults = false;

                // (A4) ON SPEECH RECOGNITION - RUN CORRESPONDING COMMAND
                voice.recog.onresult = (evt) => {
                    let said = evt.results[0][0].transcript.toLowerCase();
                    if (cmd[said]) {
                        cmd[said]();
                    } else {
                        said += " (niet gevonden, probeer het opnieuw)";
                    }
                    voice.img.style.display = "block";
                    voice.wrap.innerHTML = said;
                    voice.stop();
                };

                // (A5) ON SPEECH RECOGNITION ERROR
                voice.recog.onerror = (err) => {
                    console.error(evt);
                };

                // (A6) READY!
                voice.btn.disabled = false;
                voice.stop();
            })
            .catch((err) => {
                console.error(err);
                voice.wrap.innerHTML = "Schakel toegang in en sluit een microfoon aan.";
            });
    },

    // (B) START SPEECH RECOGNITION
    start: () => {
        voice.recog.start();
        voice.btn.onclick = voice.stop;
        voice.btn.value = "Praat nu, klik om te stoppen";
    },

    // (C) STOP/CANCEL SPEECH RECOGNITION
    stop: () => {
        voice.recog.stop();
        voice.btn.onclick = voice.start;
        voice.btn.value = "Klik en begin met praten";
    }
};
window.addEventListener("DOMContentLoaded", voice.init);

// (D) COMMANDS LIST
var cmd = {
    "power on": () => {
        voice.wrap.style.backgroundColor = "yellow";
        voice.wrap.style.color = "black";
    },

    "power off": () => {
        voice.wrap.style.backgroundColor = "black";
        voice.wrap.style.color = "white";
    },
    "kopieer artikel 1": () => {
        var content = document.getElementById('textArea1');
        content.select();
        document.execCommand('copy');
        alert("Artikel 1 gekopieerd!");
    },
    "plak artikel 1": () => {
        navigator.clipboard
            .readText()
            .then(
                cliptext =>
                (document.getElementById('kopieerArea1').innerText = cliptext),
                err => console.log(err)
                // bron https://javascript.plainenglish.io/how-to-copy-paste-text-into-clipboard-using-javascript-1bb5f96325e8
            );
    },
    "kopieer artikel 2": () => {
        var content = document.getElementById('textArea2');
        content.select();
        document.execCommand('copy');
        alert("Artikel 2 gekopieerd!");
    },
    "plak artikel 2": () => {
        navigator.clipboard
            .readText()
            .then(
                cliptext =>
                (document.getElementById('kopieerArea2').innerText = cliptext),
                err => console.log(err)
                // bron https://javascript.plainenglish.io/how-to-copy-paste-text-into-clipboard-using-javascript-1bb5f96325e8
            );
    }
};

// bron https://code-boxx.com/voice-commands-javascript-speech-recognition/#sec-download