const links = document.querySelectorAll('.room')
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', () => {
        if (i==0) {
            sessionStorage.setItem('img', '../img/barra-lateral-reuniao.png')
        }
        else if(i==1) {
            sessionStorage.setItem('img', '../img/barra-lateral-aula.png')
        }
        else {
            sessionStorage.setItem('img', '../img/barra-lateral-lab.png')
        }
        window.open('html/reservas.html', '_self')
    })
}