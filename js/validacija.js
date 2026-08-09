document.addEventListener('DOMContentLoaded', function() {
    const forma = document.getElementById('kontaktForma');
    if (forma) {
        forma.addEventListener('submit', validirajFormu);
    }
});

function validirajFormu(dogadjaj) {
    dogadjaj.preventDefault();
    let jeValidno = true;

    const imeIme = document.getElementById('imePrezime');
    const imeGreska = document.getElementById('imeGreska');
    if (imeIme.value.trim().length < 3) {
        imeGreska.style.display = 'block';
        imeGreska.textContent = 'Ime i prezime moraju imati najmanje 3 karaktera.';
        imeIme.style.borderColor = '#e53e3e';
        jeValidno = false;
    } else {
        imeGreska.style.display = 'none';
        imeIme.style.borderColor = '';
    }

    const email = document.getElementById('emailAdresa');
    const emailGreska = document.getElementById('emailGreska');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        emailGreska.style.display = 'block';
        emailGreska.textContent = 'Unesite ispravnu e-mail adresu.';
        email.style.borderColor = '#e53e3e';
        jeValidno = false;
    } else {
        emailGreska.style.display = 'none';
        email.style.borderColor = '';
    }

    const telefon = document.getElementById('telefonBroj');
    const telefonGreska = document.getElementById('telefonGreska');
    if (telefon.value.trim().length < 6) {
        telefonGreska.style.display = 'block';
        telefonGreska.textContent = 'Unesite ispravan broj telefona (minimum 6 cifara).';
        telefon.style.borderColor = '#e53e3e';
        jeValidno = false;
    } else {
        telefonGreska.style.display = 'none';
        telefon.style.borderColor = '';
    }

    const poruka = document.getElementById('porukaTekst');
    const porukaGreska = document.getElementById('porukaGreska');
    if (poruka.value.trim().length < 10) {
        porukaGreska.style.display = 'block';
        porukaGreska.textContent = 'Poruka mora sadržati bar 10 karaktera.';
        poruka.style.borderColor = '#e53e3e';
        jeValidno = false;
    } else {
        porukaGreska.style.display = 'none';
        poruka.style.borderColor = '';
    }

    if (jeValidno) {
        alert('Vaša poruka je uspešno poslata! Hvala vam na upitu.');
        document.getElementById('kontaktForma').reset();
    } else {
        alert('Molimo vas da ispravite označene greške u formi.');
    }
}
