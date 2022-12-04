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

function showToast(message){
    var toast = document.getElementById('toast');       

    toast.classList.remove('success', 'error');
    toast.classList.add('success'); 
    toast.querySelector('.toast-body').innerHTML = message; 


    var visibleToast = new bootstrap.Toast(toast, {'autohide': true, 'delay': 5000});
    visibleToast.show();
}