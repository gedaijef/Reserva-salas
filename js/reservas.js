const barra = document.getElementById('barra-lateral');
const caminho = sessionStorage.getItem("img");
barra.innerHTML = `<img src="${caminho}" alt="Imagem da barra lateral">`;

let reserva = []
let dataSelecionada = ""
let activeClass = ""

// Funcionamento do calendário
const daysTag = document.querySelector(".days"), // Seleciona o elemento HTML que contém os dias do calendário.
    currentDate = document.querySelector(".current-date"), // Seleciona o elemento HTML que mostra a data atual (mês e ano).
    prevNextIcon = document.querySelectorAll(".icons span"), // Seleciona todos os elementos de ícone para navegação (anterior e próximo).
    prevIcon = document.getElementById("prev"), // Seleciona o ícone anterior especificamente
    nextIcon = document.getElementById("next"); // Seleciona o ícone próximo especificamente
// Pegamos o ano e o mês atual (0-11)
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currentYear = currYear, // Armazenando o ano atual para restringir a navegação
    currentMonth = currMonth; // Armazenando o mês atual para restringir a navegação
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const calendarioInicio = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        const dayOfWeek = new Date(currYear, currMonth, i).getDay();
        const inactiveClass = (dayOfWeek === 0 || dayOfWeek === 6) ? "inactive" : ""; //Definindo sábado e domingo como dias inativos e o resto com classe vazia
        activeClass = (i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear()) ? "active" : "";

        liTag += `<li class="${inactiveClass} ${activeClass}">${i}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    prevIcon.classList.toggle("hidden", currYear === currentYear && currMonth <= currentMonth);
    nextIcon.classList.toggle("hidden", currYear === currentYear && currMonth === 11);

}

// const atualizarInputData = () => {
//     const dataSpan = document.querySelector(".diaSelecionado").textContent.trim();
//     if (dataSpan) {
//         const [dia, mes, ano] = dataSpan.split('/').map(Number);
//         const dataInicio = new Date(ano, mes - 1, dia);
//         const dataMin = new Date(dataInicio);
//         dataMin.setDate(dataMin.getDate() + 1);
//         const dataMax = new Date(dataInicio);
//         dataMax.setDate(dataMax.getDate() + 30);
//         const hoje = new Date();

//         const inputDate = document.querySelector('input[type="date"]');
//         inputDate.min = dataMin.toISOString().split('T')[0];
//         inputDate.max = dataMax.toISOString().split('T')[0];
//     }
// }

calendarioInicio();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "prev" && currMonth > 0) {
            currMonth -= 1;
        } else if (icon.id === "next" && currMonth < 11) {
            currMonth += 1;
        }

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, date.getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        calendarioInicio();
    });
});

const diaSelecionado = document.getElementsByClassName("diaSelecionado"); 
document.querySelectorAll(".days li").forEach(day => {
    day.addEventListener('click', () => {
        if (!day.classList.contains("inactive")) {
            document.querySelectorAll(".days li").forEach(d => d.classList.remove("active"));
            day.classList.add("active");
            reserva = [day.textContent];
            dataSelecionada = `${day.textContent}/${currMonth + 1}/${currYear}`;
            for (let i = 0; i < diaSelecionado.length; i++) {
                diaSelecionado[i].innerHTML = dataSelecionada;
            }
            // atualizarInputData();
        }
    });
});
