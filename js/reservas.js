const barra = document.getElementById('barra-lateral');
const caminho = sessionStorage.getItem("img");
barra.innerHTML = `<img src="${caminho}" alt="Imagem da barra lateral">`;

// Nessa lista vai ficar o resumo do que o usuário selecionou.
let reserva = []
let dataSelecionada = ""

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
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        const isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear();
        const dayOfWeek = new Date(currYear, currMonth, i).getDay();
        const inactiveClass = (dayOfWeek === 0 || dayOfWeek === 6) ? "inactive" : "";

        liTag += `<li class="${inactiveClass}">${i}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    prevIcon.classList.toggle("hidden", currYear === currentYear && currMonth <= currentMonth);
    nextIcon.classList.toggle("hidden", currYear === currentYear && currMonth === 11);

    document.querySelectorAll(".days li").forEach(day => {
        day.addEventListener('click', () => {
            if (!day.classList.contains("inactive")) {
                document.querySelectorAll(".days li").forEach(d => d.classList.remove("active"));
                day.classList.add("active");
                reserva = [day.textContent];
                dataSelecionada = `${day.textContent}/${currMonth + 1}/${currYear}`;
                atualizarInputData();
            }
        });
    });
}

const atualizarInputData = () => {
    const dataSpan = document.querySelector(".diaSelecionado").textContent.trim();
    if (dataSpan) {
        const [dia, mes, ano] = dataSpan.split('/').map(Number);
        const dataInicio = new Date(ano, mes - 1, dia);
        const dataMin = new Date(dataInicio);
        dataMin.setDate(dataMin.getDate() + 1);
        const dataMax = new Date(dataInicio);
        dataMax.setDate(dataMax.getDate() + 30);
        const hoje = new Date();

        const inputDate = document.querySelector('input[type="date"]');
        inputDate.min = dataMin.toISOString().split('T')[0];
        inputDate.max = dataMax.toISOString().split('T')[0];

    }
}

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

const salas = document.getElementsByClassName("sala");
const popup = document.getElementById("popup");
const containerPopup = document.getElementById("container-popup");
const diaSelecionado = document.getElementsByClassName("diaSelecionado");
for (let i = 0; i < salas.length; i++) {
    salas[i].addEventListener('click', () => {
        if (dataSelecionada.trim() == "") {
            alert("Selecione uma data primeiro")
        } else {
            popup.style.display = 'block'
            containerPopup.style.display = 'block'
            for (let j = 0; j < diaSelecionado.length; j++) {
                diaSelecionado[j].textContent = dataSelecionada
            }
            atualizarInputData();
        }
    })
}

const btnCancelar = document.getElementById('button-cancelar')
const closePopup = document.getElementsByClassName('material-symbols-outlined')[0]
closePopup.addEventListener('click', () => {
    popup.style.display = 'none'
    containerPopup.style.display = 'none'
})
containerPopup.addEventListener('click', (event) => {
    if (event.target == containerPopup) {
        popup.style.display = 'none'
        containerPopup.style.display = 'none'
    }
})
btnCancelar.addEventListener('click', () => {
    popup.style.display = 'none'
    containerPopup.style.display = 'none'
})

document.getElementById('timeInicio').addEventListener('change', function () {
    checkTime(this);
    validateTimeRange();
});

document.getElementById('timeFinal').addEventListener('change', function () {
    checkTime(this);
    validateTimeRange();
});

function checkTime(input) {
    const time = input.value;
    const [hours, minutes] = time.split(':').map(Number);

    if ((hours >= 18 && minutes >= 0) || (hours < 7)) {
        alert('Horário inválido');
        input.value = '';
    }
}

function validateTimeRange() {
    const timeInicio = document.getElementById('timeInicio').value;
    const timeFinal = document.getElementById('timeFinal').value;

    if (timeInicio && timeFinal) {
        const [startHours, startMinutes] = timeInicio.split(':').map(Number);
        const [endHours, endMinutes] = timeFinal.split(':').map(Number);

        const startTime = startHours * 60 + startMinutes;
        const endTime = endHours * 60 + endMinutes;

        if (endTime <= startTime) {
            alert('O horário de término deve ser maior que o horário de início');
            document.getElementById('timeFinal').value = '';
        }
    }
}

const checkbox = document.getElementById('checkbox');
const tabsRecorrencia = document.getElementById('tabs-recorrencia');
checkbox.addEventListener('change', function (event) {
    if (event.target.checked) {
        // Mudando display do Semanalmente e Diariamente
        tabsRecorrencia.style.display = 'block';

    } else {
        tabsRecorrencia.style.display = 'none';
    }
})

// Quando o usuário clicar em reservar, fazemos a verificação e limpamos o popup
const btnReservar = document.getElementById('button-reservar')
btnReservar.addEventListener('click', () => {
    const nomeReserva = document.getElementById('textInput').value
    const timeInicio = document.getElementById('timeInicio').value
    const timeTermino = document.getElementById('timeFinal').value
    const checkbox = document.getElementById('checkbox');
    const dataTermino = document.getElementById('dataTermino').value
    if (nomeReserva.trim() == "" || timeInicio == "" || timeTermino == "") {
        alert("Preencha todos os campos.")
    }
    else {
        if (checkbox.checked) {
            if (dataTermino == "") {
                alert('Preencha a data final da reserva.')
            }
        }

    }

})