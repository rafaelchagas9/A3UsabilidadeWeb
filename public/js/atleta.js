const form      = document.getElementById('form');
const nome      = document.getElementById('nome');
const sobrenome = document.getElementById('sobrenome');
const email     = document.getElementById('email');
const telefone  = document.getElementById('telefone');
const sexo      = document.getElementById('sexo');
const btnToast  = document.getElementById('btnToast');
const btnConfirmaExcluir = document.getElementById('btnConfirmaExcluir');

btnConfirmaExcluir.addEventListener('click', (e) => {
    e.preventDefault();

    var idAtletaHtml = document.getElementById('idAtleta').innerHTML;
    if (isNaN(idAtletaHtml)) {
        $('#modalDeletar').modal('hide')
        showToast("Falha ao recuperar id do atleta. Tente novamente");
    } else{
        var idAtleta = parseInt(document.getElementById('idAtleta').innerHTML);
        console.log(idAtleta);
        fetch('/atleta-excluir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idAtleta: idAtleta})
        }).then(response => {
            if (response.status === 200) {
                window.location.href = "/atleta";
            } else {
                $('#modalDeletar').modal('hide')
                showToast('Falha ao excluir atleta!');
            }
        }).catch(err => {
            console.log(err);
        });
    }
});

$('#modalDeletar').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.closest("tr").find(".idAtleta").text();
    document.getElementById('idAtleta').innerHTML = id;
})

form.addEventListener('submit', (e) => {
    if (!checkInput()) {
        e.preventDefault();
    }
});

function checkInput(){
    const data = new FormData(form);
    const dataJson = JSON.stringify(Object.fromEntries(data));
    
    if (data.get('nome') === ''  || data.get('nome') === null) {
        showToast('O campo nome é obrigatório');
        return false;
    }

    if (data.get('sobrenome') === '' || data.get('sobrenome') === null) {
        showToast('O campo sobrenome é obrigatório');
        return false;
    }

    if (data.get('email') === '' || data.get('email') === null) {
        showToast('O campo email é obrigatório');
        return;
    } else{
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };

            if (!validateEmail(data.get('email'))) {
                showToast('Insira um email válido');
                return false;
            }
    }

    if (data.get('telefone') === '' || data.get('telefone') === null) {
        showToast('O campo telefone é obrigatório');
        return false;
    }

    if (data.get('sexo') === '' || data.get('sexo') === null) {
        showToast('O campo sexo é obrigatório');
        return false;
    }

    return true;
}

function showToast(message){
    var toast = document.getElementById('toast');       

    toast.classList.remove('success', 'error');
    toast.classList.add('success'); 
    toast.querySelector('.toast-body').innerHTML = message; 


    var visibleToast = new bootstrap.Toast(toast, {'autohide': true, 'delay': 5000});
    visibleToast.show();
}