const barra = document.getElementById('barra-lateral');
const caminho = sessionStorage.getItem("img");
barra.innerHTML = `<img src="${caminho}" alt="Imagem da barra lateral">`;
let tipoSala = ''
const labelCadeiras = document.getElementById('label-cadeiras');
if (caminho == "../img/barra-lateral-reuniao_img.png") {
    tipoSala = 'Sala de Reunião'
    labelCadeiras.innerHTML = `
                                    <label for="iest">Quantidade de cadeiras:</label>
                                    <select name="est" id="iest">
                                        <option value="1-5">1 - 5</option>
                                        <option value="6-8">6 - 8</option>
                                    </select>`
} else {
    tipoSala = 'Sala de Aula'
    labelCadeiras.innerHTML = '<p>Quantidade de cadeiras: <span id="iest">25</span></p>'
}

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
            if (!day.classList.contains("inactive") && !day.classList.contains("filtro-inativo")) {
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

// Função para o botão de confirmar
btnConfirmar.addEventListener('click', () => {
    const timeInicio = document.getElementById('timeInicio').value;
    const timeTermino = document.getElementById('timeFinal').value;
    const dataTermino = document.getElementById('dataTermino').value;
    if (btnConfirmar.textContent == 'Confirmar') {
        if (timeInicio === "" || timeTermino === "") {
            alert('Preencha os campos necessários para a reserva.');
        } else {
            if (checkbox.checked) {
                if (dataTermino === "") {
                    alert('Preencha a data final da reserva.');
                } else {
                    const booleanRecorrencia = true;
                    fetchData(booleanRecorrencia);
                }
            } else {
                const booleanRecorrencia = false;
                fetchData(booleanRecorrencia);
            }
        }
    }
    else {
        containerSalas.style.display = 'none'
        const alerta = document.getElementById('alerta-sem-sala');
        alerta.style.display = 'none';
        ativarFiltros()
    }
});

//FETCH 
let isFetching = false;
function fetchData(booleanRecorrencia) {
    containerSalas.innerHTML = ''
    if (isFetching) return;
    isFetching = true;

    console.log('fetchData chamada com booleanRecorrencia:', booleanRecorrencia);

    // PUXANDO A HORA DE INÍCIO DO EVENTO E FORMATANDO
    const timeInicio = document.getElementById('timeInicio').value + ':00';
    const timeTermino = document.getElementById('timeFinal').value + ':00';
    const dia = document.getElementById('dia').innerHTML;
    const [day, month, year] = dia.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const quantCadeira = document.getElementById('iest');
    let maximo = ''
    let minimo = ''

    if (tipoSala == 'Sala de Reunião') {
        minimo = quantCadeira.value.split('-')[0]
        maximo = quantCadeira.value.split('-')[1]
    }
    else {
        minimo = quantCadeira.textContent
        maximo = quantCadeira.textContent
    }

    let numero = ''
    let cadeiras = ''
    let tv = ''
    let andar = ''
    if (booleanRecorrencia) {
        const dataTermino = document.getElementById('dataTermino').value;
        fetch(`http://localhost:8080/room/filtrarSalas?selected_date=${formattedDate}&selected_start_time=${timeInicio}&selected_final_time=${timeTermino}&selected_min_capacity=${minimo}&selected_max_capacity=${maximo}&selected_recurring=true&final_date_recurring=${dataTermino}&selected_type=${tipoSala}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.length == 0) {
                    const alerta = document.getElementById('alerta-sem-sala');
                    alerta.style.display = 'block';
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        numero = data[i].name
                        cadeiras = data[i].capacity
                        tv = data[i].hasTv
                        andar = data[i].floor
                        informacoesFetch(numero, cadeiras, tv, andar)
                    }
                    containerSalas.style.display = 'block';
                }
                isFetching = false;

            })
            .catch(error => {
                console.error(error);
                isFetching = false;
            });
    } else {
        fetch(`http://localhost:8080/room/filtrarSalas?selected_date=${formattedDate}&selected_start_time=${timeInicio}&selected_final_time=${timeTermino}&selected_min_capacity=${minimo}&selected_max_capacity=${maximo}&selected_recurring=true&final_date_recurring=${formattedDate}&selected_type=${tipoSala}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.length == 0) {
                    const alerta = document.getElementById('alerta-sem-sala');
                    alerta.style.display = 'block';
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        numero = data[i].name
                        cadeiras = data[i].capacity
                        tv = data[i].hasTv
                        andar = data[i].floor
                        informacoesFetch(numero, cadeiras, tv, andar)
                    }
                    containerSalas.style.display = 'block';
                }
                isFetching = false;

            })
            .catch(error => {
                console.error(error);
                isFetching = false;
            });
    }


    desativarFiltros()
}

//Informações das salas
function informacoesFetch(numero, cadeiras, tv, andar) {
    if (tv) {
        tv = "Com "
    }
    else {
        tv = "Sem "
    }
    containerSalas.innerHTML += `<div class="sala" onclick="ativarPopup(event)">
                            <h2 id="numSala">${numero}</h2>
                            <section id="container-info-sala">
                                <p><span class="material-symbols-outlined">
                                        chair_alt
                                    </span> <span id="cadeiras">${cadeiras}</span> cadeira(s)</p>
                                <p id="span-tv"><span class="material-symbols-outlined">
                                        tv
                                    </span><span id="tv">${tv} televisão</span></p>
                                <p><span class="material-symbols-outlined">
                                        location_on
                                    </span><span id="andar">${andar}º andar</span></p>
                            </section>
                        </div>`

}

//Funcionalidade do botão limpar
btnLimpar.addEventListener('click', () => {
    ativarFiltros()
    document.getElementById('timeInicio').value = ""
    document.getElementById('timeFinal').value = ""
    document.getElementById('dataTermino').value = ""
    checkbox.checked = false
    recorrenciaSelecionada.style.display = 'none'
    containerSalas.style.display = 'none'

})

//Popup
const popup = document.getElementById("popup");
const containerPopup = document.getElementById('container-popup');
function ativarPopup(event) {
    const sala = event.currentTarget;
    const numero = sala.querySelector('#numSala').innerText;
    const cadeiras = sala.querySelector('#cadeiras').innerText;
    const tv = sala.querySelector('#tv').innerText;
    const andar = sala.querySelector('#andar').innerText;

    popup.style.display = 'flex';
    containerPopup.style.display = 'flex';
    informacoesPopup(numero, cadeiras, tv, andar);
}

let informacoesReserva = []
//Informações do popup
function informacoesPopup(numero, cadeiras, tv, andar) {
    const inputNomeReserva = document.getElementById('nomeReserva')
    inputNomeReserva.disabled = false
    inputNomeReserva.classList.remove('desativado')

    const horInicioPopup = document.getElementById('horInicio')
    horInicioPopup.innerText = timeInicio.value

    const horFimPopup = document.getElementById('horFim')
    horFimPopup.innerText = timeFinal.value

    const quantCadeirasPopup = document.getElementById('quantCadeiras')
    quantCadeirasPopup.innerText = cadeiras

    const salaPopup = document.getElementById('numSalaPopup')
    salaPopup.innerText = numero

    const andarSalaPopup = document.getElementById('andarSala')
    andarSalaPopup.innerText = andar

    const tvPopup = document.getElementById('temTv')
    tvPopup.innerText = tv

    const datas = document.getElementById('datas')
    const dia = document.getElementById('dia').textContent
    const diafinal = document.getElementById('dataTermino').value

    informacoesReserva = [timeInicio.value,  timeFinal.value, cadeiras, numero, andar, tv]
    if (checkbox.checked) {
        const [year, month, day] = diafinal.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        datas.innerHTML = `<p>Dia de início: ${dia}</p>`
        datas.innerHTML += `<p>Dia de término: ${formattedDate}</p>`
        informacoesReserva.push(dia, formattedDate)
    }
    else {
        datas.innerHTML = `<p>Dia selecionado: ${dia}</p>`
        informacoesReserva.push(dia)
    }
    console.log(informacoesReserva)
   
}

//Fecha o popup se clicar fora dele
const confirmarReserva = document.getElementById('confirmar')
containerPopup.addEventListener('click', (event) => {
    if (event.target == containerPopup) {
        if (popup.style.display == 'flex') {
            popup.style.display = 'none'
            containerPopup.style.display = 'none'
        }
    }
})

//Confirmar reserva e fechar popup
confirmarReserva.addEventListener('click', () => {
    const nomeReserva = document.getElementById('nomeReserva').value.trim()
    if (nomeReserva == "") {
        alert("Por favor, preencha o campo de nome da reserva.")
    }
    else {
        alert("Reserva concluída!")
        popup.style.display = 'none'
        containerPopup.style.display = 'none'
        insercao()
    }

})

function desativarFiltros() {
    checkbox.disabled = true
    checkbox.classList.add('desativado')
    document.getElementById('filtros').classList.add
        ('desativado')
    const select = document.getElementById('iest')
    select.classList.add('desativado')
    select.disabled = true
    const inputs = document.getElementsByTagName('input')

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true
        inputs[i].classList.add('desativado')
    }

    btnConfirmar.innerText = 'Editar'

    let listItems = document.querySelectorAll('.days li');

    // Itera sobre cada item da lista
    listItems.forEach(item => {
        if (item.className.trim() == "active" || item.className.trim() == "") {
            item.classList.add('filtro-inativo')
        }

    })
}

function ativarFiltros() {
    const alerta = document.getElementById('alerta-sem-sala');
    alerta.style.display = 'none';
    checkbox.disabled = false
    checkbox.classList.remove('desativado')
    document.getElementById('filtros').classList.remove
        ('desativado')
    const select = document.getElementById('iest')
    select.classList.remove('desativado')
    select.disabled = false
    const inputs = document.getElementsByTagName('input')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false
        inputs[i].classList.remove('desativado')
    }
    btnConfirmar.innerText = 'Confirmar'

    let listItems = document.querySelectorAll('.days li');
    // Itera sobre cada item da lista
    listItems.forEach(item => {
        if (item.classList.contains("filtro-inativo")) {
            item.classList.remove('filtro-inativo')
        }

    })
}

//Inserir reserva
function insercao() {
    const url = 'http://localhost:8080/reservation/adicionar';

    const dados = {
        "startTime": "14:20:00",
        "finalTime": "15:20:00",
        "title": "Reunião do jedi",
        "date": "18/06/2024",
        "name":"102"
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    location.reload()
}