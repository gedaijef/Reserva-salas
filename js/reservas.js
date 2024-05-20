
//Essa parte serve para colocar a imagem lateral
const barra = document.getElementById('barra-lateral')
const img = document.createElement("img")
const caminho = sessionStorage.getItem("img")
img.setAttribute("src", caminho)
img.setAttribute("alt", "Imagem da barra lateral")
barra.appendChild(img)


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
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear

        // Check if the day is Saturday (6) or Sunday (0)
        let dayOfWeek = new Date(currYear, currMonth, i).getDay();
        let inactiveClass = (dayOfWeek === 0 || dayOfWeek === 6) ? "inactive" : "";

        liTag += `<li class="${isToday} ${inactiveClass}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    // Hide or show the prev icon based on the current month and year
    if (currYear === currentYear && currMonth === 0) {
        prevIcon.classList.add("hidden");
    } else {
        prevIcon.classList.remove("hidden");
    }

    // Hide or show the next icon based on the current month and year
    if (currYear === currentYear && currMonth === 11) {
        nextIcon.classList.add("hidden");
    } else {
        nextIcon.classList.remove("hidden");
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
    });
});


const listaDias = document.getElementsByClassName("days")[0];
const dias = listaDias.querySelectorAll("li");

for (let i = 0; i < dias.length; i++) {
    dias[i].addEventListener('click', () => {
        if (!dias[i].classList.contains("inactive")) {
            // Remove a classe "active" de todos os dias
            dias.forEach(dia => dia.classList.remove("active"));
            // Adiciona a classe "active" ao dia clicado
            dias[i].classList.toggle("active");
        }
    });
}

