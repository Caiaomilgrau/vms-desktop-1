import Swal from 'sweetalert2';

class MensagemDeAlerta {
    constructor() {
        this.alerta = Swal;
    }
    sucesso(mensagem = "Operação realizada com sucesso!") {
        this.alerta.fire({
            title: "Sucesso!",
            text: mensagem,
            icon: "success",
            draggable: true
        });
    }
    erro(mensagem = "Erro, preencha todos os campos!") {
        this.alerta.fire({
            icon: "error",
            title: "Oops...",
            text: mensagem
        });
    }
}
export default MensagemDeAlerta;