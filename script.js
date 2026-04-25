var recognition, gravando = false;
var FORM = 'https://docs.google.com/forms/d/1tU55aCmyf-Zo6A-m2-Lt49Yn3bxczrsVpd0mUCeFT4g/viewform';
var TIPO_ID  = 'entry.836291884';
var TEXTO_ID = 'entry.954175182';

function initRecognition() {
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Use o Chrome pra gravar por voz.'); return null; }
  var r = new SR();
  r.lang = 'pt-BR'; r.continuous = true; r.interimResults = true;
  r.onresult = function(e) {
    var t = '';
    for (var i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
    document.getElementById('texto').value = t;
  };
  r.onerror = function(e) { status('Erro: ' + e.error); };
  r.onend   = function()  { if (gravando) r.start(); };
  return r;
}

function toggleGravar() {
  var btn = document.getElementById('btnGravar');
  if (!gravando) {
    recognition = initRecognition(); if (!recognition) return;
    recognition.start(); gravando = true;
    btn.textContent = '⏹ Parar gravação'; btn.classList.add('gravando');
    status('Gravando — fala o lançamento...');
  } else {
    recognition.onend = null; recognition.stop(); gravando = false;
    btn.textContent = '🎤 Gravar'; btn.classList.remove('gravando');
    status('Gravação parada. Confere o texto e envia.');
  }
}

function enviar() {
  var texto = document.getElementById('texto').value.trim();
  if (!texto) { status('Grava ou digita algo primeiro.'); return; }
  window.location.href = FORM
    + '?usp=pp_url'
    + '&' + TIPO_ID  + '=' + encodeURIComponent('Registro no consolidado')
    + '&' + TEXTO_ID + '=' + encodeURIComponent(texto);
}

function status(msg) { document.getElementById('status').textContent = msg; }
