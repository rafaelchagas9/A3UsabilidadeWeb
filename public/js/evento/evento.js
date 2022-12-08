const btnToast  = document.getElementById('btnToast');
const btnConfirmaExcluir = document.getElementById('btnConfirmaExcluir');

btnConfirmaExcluir.addEventListener('click', (e) => {
    e.preventDefault();

    var idEventoHtml = document.getElementById('idEvento').innerHTML;
    if (isNaN(idEventoHtml)) {
        $('#modalDeletar').modal('hide')
        showToast("Falha ao recuperar id do evento. Tente novamente");
    } else{
        var idEvento = parseInt(document.getElementById('idEvento').innerHTML);
        fetch('/evento-excluir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idEvento: idEvento})
        }).then(response => {
            if (response.status === 200) {
                window.location.href = "/evento";
            } else {
                $('#modalDeletar').modal('hide')
                showToast('Falha ao excluir evento!');
            }
        }).catch(err => {
            console.log(err);
        });
    }
});

$('#modalDeletar').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.closest("tr").find(".idEvento").text();
    document.getElementById('idEvento').innerHTML = id;
})

function showToast(message){
    var toast = document.getElementById('toast');       

    toast.classList.remove('success', 'error');
    toast.classList.add('success'); 
    toast.querySelector('.toast-body').innerHTML = message; 


    var visibleToast = new bootstrap.Toast(toast, {'autohide': true, 'delay': 5000});
    visibleToast.show();
}