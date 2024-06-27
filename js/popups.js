const checkbox = document.getElementById('checkbox');

const resumoConfirmacao = document.getElementById('resumo-reserva')
const popupConfirmacao = document.getElementById('popup-confirmacao')
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
            checkbox.checked = false
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
        if (popup.style.display == 'block') {
            popup.style.display = 'none'
            containerPopup.style.display = 'none'
        }
        else {
            alert('Confirme sua reserva antes de fechar.')
        }

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



// Quando o usuário clicar em reservar, fazemos a verificação e limpamos o popup
const nomeReservaEnviar = document.getElementById('nomeReserva')
const horarioInicioEnviar = document.getElementById('horarioInicio')
const horarioTerminoEnviar = document.getElementById('horarioTermino')
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
            else {
                popup.style.display = 'none'
                popupConfirmacao.style.display = 'block'
                nomeReservaEnviar.innerText = nomeReserva
                horarioInicioEnviar.innerText = timeInicio
                horarioTerminoEnviar.innerText = timeTermino
            }
        }
        else {
            popup.style.display = 'none'
            popupConfirmacao.style.display = 'block'
            nomeReservaEnviar.innerText = nomeReserva
            horarioInicioEnviar.innerText = timeInicio
            horarioTerminoEnviar.innerText = timeTermino
        }
    }

})
