const barra = document.getElementById('barra-lateral');
const caminho = sessionStorage.getItem("img");
barra.innerHTML = `<img src="${caminho}" alt="Imagem da barra lateral">`;

let dataSelecionada = ""
let activeClass = ""
let data = ""
const checkbox = document.getElementById('checkbox');
const recorrenciaSelecionada = document.getElementById('recorrencia-selecionada');
const dataTermino = document.getElementById('dataTermino');
const btnLimpar = document.getElementById('btn-limpar');
const btnConfirmar = document.getElementById('btn-confirmar');
const containerSalas = document.getElementById('container-salas');

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
        const inactiveClass = (dayOfWeek === 0 || dayOfWeek === 6 || (currYear === currentYear && currMonth === currentMonth && i < date.getDate())) ? "inactive" : ""; //Definindo sábado, domingo e dias passados como inativos
        activeClass = (i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear()) ? "active" : "";

        liTag += `<li class="${inactiveClass} ${activeClass}">${i}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    prevIcon.classList.toggle("hidden", currYear === currentYear && currMonth <= currentMonth);
    nextIcon.classList.toggle("hidden", currYear === currentYear && currMonth === 11);

    adicionarEventListenersParaDias();  // Chama a função para adicionar eventos de clique aos dias
}

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
        calendarioInicio();  // Atualiza o calendário
    });
});


function calcularDiaRecorrencia(dia) {
    let diaMaximo = dia
    let diaMinimo = dia
    if (Number(diaMinimo) + 1 < 10) {
        diaMinimo = "0" + (Number(diaMinimo) + 1)
    }
    else {
        diaMinimo = (Number(diaMinimo) + 1)
    }
    if (Number(diaMaximo) < 10) {
        diaMaximo = "0" + diaMaximo
    }
    else {
        diaMaximo = dia
    }
    return { diaMinimo, diaMaximo }
}

function calcularMesesRecorrencia(mes) {
    let mesMaximo = mes
    let mesMinimo = mes
    if (Number(mesMaximo) + 1 < 10) {
        mesMaximo = "0" + (Number(mesMaximo) + 1)
    }
    else if (Number(mesMaximo) + 1 == 13) {
        mesMaximo = "01"
    }
    else {
        mesMaximo = (Number(mesMaximo) + 1)
    }

    if (mesMinimo < 10) {
        mesMinimo = "0" + mesMinimo
    }
    else {
        mesMinimo = mes
    }
    return { mesMinimo, mesMaximo }
}


let meses = {}
let dias = {}
function adicionarEventListenersParaDias() {
    //colocando o dia em que o usuário clica como data selecionada
    document.querySelectorAll(".days li").forEach(day => {
        day.addEventListener('click', () => {
            if (!day.classList.contains("inactive")) {
                document.querySelectorAll(".days li").forEach(d => d.classList.remove("active"));
                day.classList.add("active");
                data = `${day.textContent}/${currMonth + 1}/${currYear}`;

                const dia = day.textContent
                const mes = currMonth + 1
                meses = calcularMesesRecorrencia(mes)
                dias = calcularDiaRecorrencia(dia)

                if (checkbox.checked) {
                    dataTermino.value = `2024-${meses.mesMinimo}-${dias.diaMinimo}`;
                    checkbox.checked = false
                    recorrenciaSelecionada.style.display = 'none';
                }

                for (let i = 0; i < diaSelecionado.length; i++) {
                    diaSelecionado[i].innerHTML = data;
                }
            }
        });
    });
    dataTermino.value = ''
}

calendarioInicio();


//Colocando o dia de hoje como data selecionada
const diaSelecionado = document.getElementsByClassName("diaSelecionado");

for (let i = 0; i < diaSelecionado.length; i++) {
    data = date.getDate() + "/" + (currMonth + 1) + "/" + currYear
    diaSelecionado[i].innerHTML = data

    const dia = date.getDate()
    const mes = currMonth + 1
    meses = calcularMesesRecorrencia(mes)
    dias = calcularDiaRecorrencia(dia)
}



checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        recorrenciaSelecionada.style.display = 'block';
        dataTermino.setAttribute('min', `2024-${meses.mesMinimo}-${dias.diaMinimo}`);
        dataTermino.setAttribute('max', `2024-${meses.mesMaximo}-${dias.diaMaximo}`);
    } else {
        recorrenciaSelecionada.style.display = 'none';
    }
});

//Funcionalidade do horário
function checkTime(input) {
    const time = input.value;
    const [hours, minutes] = time.split(':').map(Number);

    if ((hours >= 19 && minutes >= 0) || (hours < 7)) {
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

document.getElementById('timeInicio').addEventListener('change', function () {
    checkTime(this);
    validateTimeRange();
});

document.getElementById('timeFinal').addEventListener('change', function () {
    checkTime(this);
    validateTimeRange();
});

//Funcionalidade do botão confirmar
btnConfirmar.addEventListener('click', () => {
    const timeInicio = document.getElementById('timeInicio').value
    const timeTermino = document.getElementById('timeFinal').value
    const dataTermino = document.getElementById('dataTermino').value
    if (timeInicio == "" || timeTermino == "") {
        alert('Preencha os campos necessários para a reserva.')
    }
    else {
        if (checkbox.checked) {
            if (dataTermino == "") {
                alert('Preencha a data final da reserva.')
            }
            else {
                containerSalas.style.display = 'block'
            }
        }
        else {
            containerSalas.style.display = 'block'
        }
    }
})

//Funcionalidade do botão limpar
btnLimpar.addEventListener('click', () => {
    document.getElementById('timeInicio').value = ""
    document.getElementById('timeFinal').value = ""
    document.getElementById('dataTermino').value = ""
    checkbox.checked = false
    recorrenciaSelecionada.style.display = 'none'
    containerSalas.style.display = 'none'
})

//Popup
const popup = document.getElementById("popup");
const salas = document.getElementsByClassName("sala");
const containerPopup = document.getElementById('container-popup')
for (let i = 0; i < salas.length; i++) {
    salas[i].addEventListener('click', () => {
        popup.style.display = 'flex'
        containerPopup.style.display = 'flex'
        informacoesPopup()
    })
}




function informacoesPopup() {

    const cadeirasRetornadas = document.getElementById('cadeiras').textContent
    const tvRetornada = document.getElementById('tv').textContent
    const andarRetornado = document.getElementById('andar').textContent

    const horInicioPopup = document.getElementById('horInicio')
    horInicioPopup.innerText = timeInicio.value
    const horFimPopup = document.getElementById('horFim')
    horFimPopup.innerText = timeFinal.value
    const quantCadeirasPopup = document.getElementById('quantCadeiras')
    quantCadeirasPopup.innerText = cadeirasRetornadas
    const numSalaPopup = document.getElementById('numSala')
    const andarSalaPopup = document.getElementById('andarSala')
    andarSalaPopup.innerText = andarRetornado
    const tvPopup = document.getElementById('temTv')
    tvPopup.innerText = tvRetornada
    const informacoes2 = document.getElementById('informacoes-2')
    const dia = document.getElementById('dia').textContent
    const diafinal = document.getElementById('dataTermino').value
    if (checkbox.checked) {
        const [year, month, day] = diafinal.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        informacoes2.innerHTML += `<p>Dia de início: ${dia}</p>`
        informacoes2.innerHTML += `<p>Dia de término: ${formattedDate}</p>`
    }
    else {
        informacoes2.innerHTML += `<p>Dia selecionado: ${dia}</p>`
    }
}


const confirmarReserva = document.getElementById('confirmar')
containerPopup.addEventListener('click', (event) => {
    if (event.target == containerPopup) {
        if (popup.style.display == 'flex') {
            popup.style.display = 'none'
            containerPopup.style.display = 'none'
        }
    }
})
confirmarReserva.addEventListener('click', () => {
    popup.style.display = 'none'
    containerPopup.style.display = 'none'
})