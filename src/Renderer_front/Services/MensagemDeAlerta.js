import Swal from 'sweetalert2';

class MensagemDeAlerta{
    constructor(){
        this.alerta = Swal;
    }
    sucesso(){
        this.alerta.fire({
  title: "Sucesso!",
  icon: "success",
  draggable: true
});
    }
    erro(){
this.alerta.fire({
  icon: "error",
  title: "Oops...",
  text: "Erro, preencha todos os campos!"
});
    }
}
export default MensagemDeAlerta;