//Essa parte serve para colocar a imagem lateral
const barra = document.getElementById('barra-lateral')
const img = document.createElement("img")
const caminho = sessionStorage.getItem("img")
img.setAttribute("src", caminho)
img.setAttribute("alt", "Imagem da barra lateral")
barra.appendChild(img)


//Nessa lista vai ficar o resumo do que o usuário selecionou.
let reserva = []
let dataSelecionada = ""


//Funcionamento do calendário
const daysTag = document.querySelector(".days"), //Seleciona o elemento HTML que contém os dias do calendário.
    currentDate = document.querySelector(".current-date"), //Seleciona o elemento HTML que mostra a data atual (mês e ano).
    prevNextIcon = document.querySelectorAll(".icons span"), // Seleciona todos os elementos de ícone para navegação (anterior e próximo).
    prevIcon = document.getElementById("prev"), // getting the previous icon specifically
    nextIcon = document.getElementById("next"); // getting the next icon specifically

// Pegamos o ano e o mês atual (0-11)
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currentYear = currYear; // storing the current year to restrict navigation


const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // pegando o primeiro dia do mês
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // pegando o último dia do mês
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // pegando o último dia do mês anterior
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // criando os dias inativos do mês anterior
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // criando os dias do mês atual
        // adicionando a classe ativa ao dia se o dia atual, mês e ano corresponderem
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear

        // Verifica se o dia é sábado (6) ou domingo (0)
        let dayOfWeek = new Date(currYear, currMonth, i).getDay();
        let inactiveClass = (dayOfWeek === 0 || dayOfWeek === 6) ? "inactive" : "";

        liTag += `<li class="${isToday} ${inactiveClass}">${i}</li>`;
    }

    // preenchendo os dias restantes para completar as 6 linhas
    for (let i = lastDayofMonth; i < 6 * 7 - (firstDayofMonth + lastDateofMonth); i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passando o mês e ano atuais como texto da currentDate
    daysTag.innerHTML = liTag;

    // Esconder ou mostrar o ícone anterior com base no mês e ano atuais
    if (currYear === currentYear && currMonth === 0) {
        prevIcon.classList.add("hidden");
    } else {
        prevIcon.classList.remove("hidden");
    }

    // Esconder ou mostrar o ícone próximo com base no mês e ano atuais
    if (currYear === currentYear && currMonth === 11) {
        nextIcon.classList.add("hidden");
    } else {
        nextIcon.classList.remove("hidden");
    }


    // Deixando as bolinhas coloridinhas ao clique e adicionando o dia selecionado à lista
    const listaDias = document.getElementsByClassName("days")[0];
    const dias = listaDias.querySelectorAll("li");

    for (let i = 0; i < dias.length; i++) {
        dias[i].addEventListener('click', () => {
            reserva = []

            if (!dias[i].classList.contains("inactive")) {
                // Remove a classe "active" de todos os dias
                dias.forEach(dia => dia.classList.remove("active"));
                // Adiciona a classe "active" ao dia clicado
                dias[i].classList.toggle("active");
                reserva.push(dias[i].textContent)

                // Exibe um alerta com a data selecionada
                dataSelecionada = `${dias[i].textContent}/${currMonth + 1}/${currYear}`
            }
        });
    }
}

renderCalendar();



prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1

        if (icon.id === "prev" && (currMonth > 0 || currYear > currentYear)) {
            currMonth -= 1;
        } else if (icon.id === "next" && (currMonth < 11 || currYear < currentYear + 1)) {
            currMonth += 1;
        }

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function

    })
})


//Pegando o clique do usuário nas salas, adicionando o popup com a data selecionada e bloqueando o popup caso nenhum dia tenha sido selecionado
const salas = document.getElementsByClassName("sala");
const popup = document.getElementById("popup");
const diaSelecionado = document.getElementById("diaSelecionado");
for (let i = 0; i < salas.length; i++) {
    salas[i].addEventListener('click', () => {
        if (dataSelecionada.trim() == "") {
            alert("Selecione uma data primeiro")
        } else {
            popup.style.display = 'block'
            diaSelecionado.textContent = dataSelecionada
        }
    })

}

//Fechando o popup quando o botão de fechar for clicado
const closePopup = document.getElementsByClassName('material-symbols-outlined')[0]
closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
})


document.getElementById('timeInicio').addEventListener('change', function () {
    checkTime(this);
});

document.getElementById('timeFinal').addEventListener('change', function () {
    checkTime(this);
});

function checkTime(input) {
    const time = input.value;
    const [hours, minutes] = time.split(':').map(Number);
    if (hours > 18) {
        alert('Horário inválido');
        input.value = '';
    }
    else if (hours >= 18 && minutes >= 1) {
        alert('Horário inválido');
        input.value = '';
    }
}