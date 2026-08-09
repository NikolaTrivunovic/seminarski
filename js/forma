// ===== VALIDACIJA FORME =====
document.addEventListener('DOMContentLoaded', function() {
    const forma = document.getElementById('kontaktForma');
    
    if (forma) {
        forma.addEventListener('submit', function(e) {
            e.preventDefault();
            let validno = true;

            // Ime
            const ime = document.getElementById('ime');
            const greskaIme = document.getElementById('greskaIme');
            if (ime.value.trim().length < 2) {
                ime.classList.add('greska');
                greskaIme.style.display = 'block';
                validno = false;
            } else {
                ime.classList.remove('greska');
                greskaIme.style.display = 'none';
            }

            // Email
            const email = document.getElementById('email');
            const greskaEmail = document.getElementById('greskaEmail');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                email.classList.add('greska');
                greskaEmail.style.display = 'block';
                validno = false;
            } else {
                email.classList.remove('greska');
                greskaEmail.style.display = 'none';
            }

            // Poruka
            const poruka = document.getElementById('poruka');
            const greskaPoruka = document.getElementById('greskaPoruka');
            if (poruka.value.trim().length < 10) {
                poruka.classList.add('greska');
                greskaPoruka.style.display = 'block';
                validno = false;
            } else {
                poruka.classList.remove('greska');
                greskaPoruka.style.display = 'none';
            }

            if (validno) {
                document.getElementById('uspesnoPoslato').style.display = 'block';
                forma.reset();
                setTimeout(() => {
                    document.getElementById('uspesnoPoslato').style.display = 'none';
                }, 5000);
            }
        });
    }
});