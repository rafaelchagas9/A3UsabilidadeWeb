const form      = document.getElementById('form');
const nomeEsporte      = document.getElementById('nomeEsporte');
const participantesMinimo = document.getElementById('participantesMinimo');
const participantesMaximo     = document.getElementById('participantesMaximo');


btnConfirmaExcluir.addEventListener('click', (e) => {
    e.preventDefault();

    var idEsporteHtml = document.getElementById('idEsporte').innerHTML;
    if (isNaN(idEsporteHtml)) {
        $('#modalDeletar').modal('hide')
        showToast("Falha ao recuperar id do esporte. Tente novamente");
    } else{
        var idEsporte = parseInt(document.getElementById('idEsporte').innerHTML);
        console.log(idEsporte);
        fetch('/esporte-excluir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idEsporte: idEsporte})
        }).then(response => {
            if (response.status === 200) {
                window.location.href = "/esporte";
            } else {
                $('#modalDeletar').modal('hide')
                showToast('Falha ao excluir esporte!');
            }
        }).catch(err => {
            console.log(err);
        });
    }
});

$('#modalDeletar').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.closest("tr").find(".idEsporte").text();
    document.getElementById('idEsporte').innerHTML = id;
})

form.addEventListener('submit', (e) => {
    if (!checkInput()) {
        e.preventDefault();
    }
});

function showToast(message){
    var toast = document.getElementById('toast');       

    toast.classList.remove('success', 'error');
    toast.classList.add('success'); 
    toast.querySelector('.toast-body').innerHTML = message; 


    var visibleToast = new bootstrap.Toast(toast, {'autohide': true, 'delay': 5000});
    visibleToast.show();
}