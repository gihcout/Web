function limpaFormulario(){
    document.getElementById('formulario').reset();
}

function validacaoEmail(inputEmail){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(inputEmail)) {
        alert("E-mail está incorreto. Por favor, insira um e-mail válido.");
        document.getElementById("campo_nome").focus();
    }
}

function validarTodosInput(){
    var inputs = document.querySelectorAll('input[required]');
    for (var i = 0; i < inputs.length; i++){
        if(inputs[i].value === ""){
            alert("Por favor, preencha todos os campos.");
            return false;
        }
    }
    return true;
}

function validarTipagem(){
    var inputs = document.querySelectorAll('input[type="text"], select');
    var erro = false;
    var mensagemErro = "";

    inputs.forEach(function(input){
        var id = input.id;
        var tipo = input.type;
        var valor = input.value;

        switch(tipo){
            case "text":
                if (!valor.match(input.pattern)){
                    erro = true;
                    mensagemErro = "Verifique as informações digitadas e tente novamente\n";
                }
                break;
            default:
                break;
        }
    });
    if(erro){
        alert(mensagemErro);
        return false;
    }else{
        return true;
    }
}

function validarPatterns(){
    var inputs = document.querySelectorAll('input[pattern], select');
    var erro = false;
    var mensagemErro = "";

    inputs.forEach(function(input){
        var pattern = input.getAttribute("pattern");
        var valor = input.value;

        if(valor === "" || (pattern && !new RegExp("^" + pattern + "$").test(valor))){
            var label = input.previousElementSibling.textContent.trim().replace(/:$/, "");
            mensagemErro += "O valor inserido para '" + label + "' não está correto.\n";
            erro = true;
        }
    });
    if(erro){
        alert(mensagemErro);
        return false;
    }else{
        return true;
    }
}

function validarFormulario(){
    var tipagemValida = validarTipagem();
    var todosInputsPreenchidos = validarTodosInput();
    var validacaoPattern = validarPatterns();

    if(todosInputsPreenchidos === false){
        return todosInputsPreenchidos;
    }else{
        return tipagemValida && validacaoPattern;
    }
}

function limpa_formulário_cep() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('uf').value = conteudo.uf;
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            document.getElementById('cep').value = cep.substring(0, 5) + "-" + cep.substring(5);
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
}