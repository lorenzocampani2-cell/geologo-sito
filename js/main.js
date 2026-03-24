/* ============================================================
   MAIN.JS — Sito vetrina Dr. Fabio Rastelli, Geologo

   INDICE:
   1. Anno automatico nel footer
   2. Navbar: ombra allo scroll
   3. Menu mobile: apri / chiudi
   4. Menu mobile: chiudi al click su un link
   5. Menu mobile: chiudi premendo il tasto Escape
   6. Nota sul smooth scroll
============================================================ */

'use strict'; /* modalità rigorosa: aiuta a evitare errori silenziosi */


/* ============================================================
   1. ANNO AUTOMATICO NEL FOOTER
   Aggiorna l'anno ogni volta che viene caricata la pagina,
   senza dover toccare il codice ogni anno.
============================================================ */
const annoEl = document.getElementById('current-year');
if (annoEl) {
  annoEl.textContent = new Date().getFullYear();
}


/* ============================================================
   2. NAVBAR: OMBRA ALLO SCROLL
   Aggiunge la classe CSS .scrolled all'header quando l'utente
   scorre verso il basso. Questo fa apparire l'ombra definita
   in style.css con .site-header.scrolled.
============================================================ */
const header = document.querySelector('.site-header');

function aggiornaHeader() {
  if (!header) return;
  /* Aggiunge .scrolled se siamo scesi di più di 30px dalla cima */
  header.classList.toggle('scrolled', window.scrollY > 30);
}

/* passive: true migliora le prestazioni dello scroll su mobile */
window.addEventListener('scroll', aggiornaHeader, { passive: true });

/* Eseguiamo subito al caricamento, nel caso la pagina
   venga aperta già a metà (ad es. dopo un refresh con ancora) */
aggiornaHeader();


/* ============================================================
   3. MENU MOBILE: APRI / CHIUDI
   Il pulsante hamburger toglie/aggiunge la classe .open
   al tag <nav class="main-nav">, che il CSS usa per
   mostrare o nascondere il menu (vedi media query in style.css).
============================================================ */
const menuToggle = document.querySelector('.menu-toggle');
const mainNav    = document.querySelector('.main-nav');

function apriChiudiMenu() {
  if (!menuToggle || !mainNav) return;

  const aperto = mainNav.classList.toggle('open');

  /* Aggiorna il testo e l'attributo accessibilità del pulsante */
  menuToggle.textContent       = aperto ? '✕' : '☰';
  menuToggle.setAttribute('aria-label',    aperto ? 'Chiudi menu' : 'Apri menu');
  menuToggle.setAttribute('aria-expanded', aperto ? 'true' : 'false');

  /* Blocca lo scroll della pagina quando il menu è aperto,
     così l'utente non scorre lo sfondo mentre naviga nel menu */
  document.body.style.overflow = aperto ? 'hidden' : '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', apriChiudiMenu);
}


/* ============================================================
   4. MENU MOBILE: CHIUDI AL CLICK SU UN LINK
   Quando l'utente clicca un link del menu su mobile,
   il menu si chiude automaticamente prima che la pagina
   scorra alla sezione selezionata.
============================================================ */
function chiudiMenu() {
  if (!mainNav || !menuToggle) return;

  mainNav.classList.remove('open');
  menuToggle.textContent       = '☰';
  menuToggle.setAttribute('aria-label',    'Apri menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* Selezioniamo tutti i link dentro il menu di navigazione */
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(function(link) {
  link.addEventListener('click', chiudiMenu);
});


/* ============================================================
   5. MENU MOBILE: CHIUDI CON IL TASTO ESCAPE
   Comodità per chi usa tastiera o tecnologie assistive.
============================================================ */
document.addEventListener('keydown', function(evento) {
  if (evento.key === 'Escape') {
    chiudiMenu();
  }
});


/* ============================================================
   6. SMOOTH SCROLL
   Non serve aggiungere codice JavaScript per lo scroll morbido:
   nel file style.css è già presente la regola:

       html { scroll-behavior: smooth; }

   Questo è sufficiente per tutti i browser moderni.
   La regola scroll-padding-top in style.css garantisce anche
   che la navbar fissa non copra il titolo della sezione di destinazione.

   Se in futuro servisse un controllo più preciso (es. velocità
   personalizzata o callback dopo lo scroll), si può aggiungere
   qui una funzione con requestAnimationFrame o usare
   element.scrollIntoView({ behavior: 'smooth' }).
============================================================ */
