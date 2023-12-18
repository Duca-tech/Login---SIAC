document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login').addEventListener('click', function() {
        const cpf = $('#cpf').val();
        const senha = $('#senha').val();

        if (!cpf || !senha) {
            $('#resp').html('Preencha todos os campos corretamente.');
        } else {
            const clienteLogin = {
                cpf: cpf,
                senha: senha
            };

            fetch('http://localhost:4000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteLogin)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha na autenticação');
                }
                return response.json();
            })
            .then(data => {
                alert('Cliente Autenticado');
                console.log('Cliente Autenticado');
                window.location.href = 'SIAC/Paginas/Index/view/index.html';
            })
            .catch(error => {
                alert('Falha na autenticação: ' + error.message);
            });
        }
    });
});
