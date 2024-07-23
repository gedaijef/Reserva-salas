const links = document.querySelectorAll('.room')
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', () => {
        if (i==0) {
            sessionStorage.setItem('img', '../img/barra-lateral-reuniao_img.webp')

        }
        else {
            sessionStorage.setItem('img', '../img/barra-lateral-aula_img.webp')

        }
        window.open('html/reservas.html', '_self')
    })
}