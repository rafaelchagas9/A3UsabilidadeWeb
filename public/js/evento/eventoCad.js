const form      = document.getElementById('form');
const nome      = document.getElementById('nome');
const min = document.getElementById('min');
const max     = document.getElementById('max');
const btnToast  = document.getElementById('btnToast');

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

    if (data.get('min') === '' || data.get('min') === null) {
        showToast('O campo Num. Mínimo de Participantes é obrigatório');
        return false;
    }

    if (data.get('max') === '' || data.get('max') === null) {
        showToast('O campo Num. Máximo de Participantes é obrigatório');
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