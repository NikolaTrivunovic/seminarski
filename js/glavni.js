document.addEventListener('DOMContentLoaded', function() {
    primeniPodesavanja();
    
    if (document.querySelector('.slajder-kontejner')) {
        inicijalizujSlajder();
    }

    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    if (hamburger && navUl) {
        // Otvaranje i zatvaranje menija na klik hamburgera
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navUl.classList.toggle('open');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', navUl.classList.contains('open'));
        });

        // Zatvori meni kada se klikne van zaglavlja
        document.addEventListener('click', function(e) {
            if (!e.target.closest('header')) {
                zatvoriMeni(navUl, hamburger);
            }
        });

        // Zatvori meni kada se klikne na link u meniju
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                zatvoriMeni(navUl, hamburger);
            });
        });
    }

    const padajuciMeni = document.querySelectorAll('.padajuci-meni');
    padajuciMeni.forEach(item => {
        const link = item.querySelector('a');
        const sadrzaj = item.querySelector('.padajuci-sadrzaj');
        
        if (link && sadrzaj) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    padajuciMeni.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('open');
                        }
                    });
                    item.classList.toggle('open');
                }
            });
        }
    });
});

// Zatvaranje mobilnog menija
function zatvoriMeni(navUl, hamburger) {
    navUl.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
}

function promeniTemu() {
    document.body.classList.toggle('tamna-tema');
    const jeTamna = document.body.classList.contains('tamna-tema');
    localStorage.setItem('tamnaTema', JSON.stringify(jeTamna));

    const dugme = document.querySelector('.dugme-pristupacnost[onclick="promeniTemu()"]');
    if (dugme) {
        dugme.textContent = jeTamna ? 'S' : 'T';
    }
}

// ===== Pristupačnost: veličina fonta =====
let trenutniZoom = 1.0;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 1.5;
const KORAK_ZOOM = 0.1;
const OSNOVNI_FONT = 16;

function zumiraj(akcija) {
    const promena = akcija === 'in' ? KORAK_ZOOM : -KORAK_ZOOM;
    // Zaokruzujemo da se ne bi nakupila greska decimalnog racuna (1.1 + 0.1)
    const noviZoom = Math.round((trenutniZoom + promena) * 10) / 10;

    if (noviZoom < MIN_ZOOM || noviZoom > MAX_ZOOM) {
        return;
    }

    trenutniZoom = noviZoom;
    primeniZoom();
    localStorage.setItem('zoomNivo', JSON.stringify(trenutniZoom));
}

function primeniZoom() {
    // Menjamo osnovnu velicinu fonta - sve rem vrednosti se skaliraju zajedno sa njom.
    // Ranije je ovde stajao transform: scale() nad body-jem, sto je kvarilo
    // lepljivo (sticky) zaglavlje i sve ostale transformacije na stranici.
    document.documentElement.style.setProperty('--velicina-fonta', (OSNOVNI_FONT * trenutniZoom) + 'px');
    azurirajPrikazZuma();
}

function resetujZoom() {
    trenutniZoom = 1.0;
    document.documentElement.style.removeProperty('--velicina-fonta');
    azurirajPrikazZuma();
    localStorage.removeItem('zoomNivo');
}

// Ispisuje trenutni nivo uvecanja na srednjem dugmetu
function azurirajPrikazZuma() {
    const dugme = document.querySelector('.dugme-pristupacnost[onclick="resetujZoom()"]');
    if (dugme) {
        dugme.textContent = Math.round(trenutniZoom * 100) + '%';
        dugme.setAttribute('aria-label', 'Resetuj veličinu fonta (trenutno ' + Math.round(trenutniZoom * 100) + '%)');
    }
}

function primeniPodesavanja() {
    const sacuvanaTema = localStorage.getItem('tamnaTema');
    const sacuvaniZoom = localStorage.getItem('zoomNivo');

    if (sacuvanaTema === 'true') {
        document.body.classList.add('tamna-tema');
        const dugme = document.querySelector('.dugme-pristupacnost[onclick="promeniTemu()"]');
        if (dugme) {
            dugme.textContent = 'S';
        }
    }

    if (sacuvaniZoom) {
        trenutniZoom = JSON.parse(sacuvaniZoom);
        primeniZoom();
    } else {
        azurirajPrikazZuma();
    }
}

let trenutniSlajd = 0;
let slajderInterval = null;

function inicijalizujSlajder() {
    const slajdovi = document.querySelectorAll('.slajd');
    if (slajdovi.length === 0) return;

    const indikatori = document.querySelectorAll('.indikator');
    indikatori.forEach(function(ind, i) {
        ind.addEventListener('click', function() {
            trenutniSlajd = i;
            prikaziSlajd();
            restartujInterval();
        });
    });

    slajderInterval = setInterval(function() {
        pomeriSlajd(1);
    }, 5000);
}

function pomeriSlajd(smer) {
    const slajdovi = document.querySelectorAll('.slajd');
    if (slajdovi.length === 0) return;

    trenutniSlajd += smer;

    if (trenutniSlajd >= slajdovi.length) {
        trenutniSlajd = 0;
    }
    if (trenutniSlajd < 0) {
        trenutniSlajd = slajdovi.length - 1;
    }

    prikaziSlajd();
    restartujInterval();
}

function prikaziSlajd() {
    const kontejner = document.querySelector('.slajder-slike');
    const slajdovi = document.querySelectorAll('.slajd');
    const indikatori = document.querySelectorAll('.indikator');

    if (kontejner && slajdovi.length > 0) {
        kontejner.style.transform = 'translateX(-' + (trenutniSlajd * 100) + '%)';
    }

    indikatori.forEach(function(ind, i) {
        if (i === trenutniSlajd) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}

function restartujInterval() {
    if (slajderInterval) {
        clearInterval(slajderInterval);
        slajderInterval = setInterval(function() {
            pomeriSlajd(1);
        }, 5000);
    }
}
