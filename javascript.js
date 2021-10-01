var Empresas = null;
var Empresa = null;
var Filiais = null;
var Filial = null;
var tipoDeCadastro = null; //para usar nos botões de Salvar
var empresaAberta = null; //Para Saber qual empresa esta aberta e editar as filiais

//Define os atributos da empresa
function newEmpresa(){
	return {
		codigo : '',
		nomeFantasia : '',
		data : '',
		razaoSocial : '',
		situacao : null,
		cooperativa : null,
		qtdFuncionarios : null,
		faturamento : null,
		capitalSocial : null,
		inscricaoEstadual : '',
		cnpj : '',
		cidade : '',
		cep : '',
		bairro : '',
		endereco : '',
		descricao : '',
		email : '',
		telefone : '',
		filiais : null,
		

	};
}

//Abre um novo Form para cadastro de empresa
function cadastraEmpresa(){
	//Cria uma nova empresa
	Empresa = newEmpresa();
	Filiais = [];
	defineCampos();	
	mostraFilial();
	//Define o cadastro como empresa. O botão salvar recebe o ID Empresa
	tipoDeCadastro = "Empresa";

	//Reseta o Form
	$("#ovTXT-Codigo").val(Empresa.codigo);
	$("#ovTXT-NomeFantasia").val(Empresa.nomeFantasia);
	$("#ovTXT-DataFundacao").val(Empresa.data);
	$("#ovTXT-RazaoSocial").val(Empresa.razaoSocial);

	let CBSituacao = document.getElementById('ovCB-Situacao');
	CBSituacao.checked = false;

	let CBCooperativa = document.getElementById('ovCB-Cooperativa');
	CBCooperativa.checked = false;

	$("#ovTXT-QtdFuncionarios").val(Empresa.qtdFuncionarios);
	$("#ovTXT-Faturamento").val(Empresa.faturamento);
	$("#ovTxt-CapitalSocial").val(Empresa.capitalSocial);
	$("#ovTXT-InscricaoEstadual").val(Empresa.inscricaoEstadual);
	$("#ovTXT-CNPJ").val(Empresa.cnpj);
	$("#ovTXT-Cidade").val(Empresa.cidade);
	$("#ovTXT-CEP").val(Empresa.cep);
	$("#ovTXT-Bairro").val(Empresa.bairro);
	$("#ovTXT-Endereco").val(Empresa.endereco);
	$("#ovTXT-Descricao").val(Empresa.descricao);
	$("#ovTXT-Email").val(Empresa.email);
	$("#ovTXT-Telefone").val(Empresa.telefone);
	$("#ovTXT-Codigo").prop("disabled", false);
	//Define aba Empresa para abrir como padrão
	$("#empresa-tab").tab("show");
	//Chama função para adicionar os botões.
	mostraBotoesModal();
	//Mostra o Modal Empresa
	$("#modal-cadastroEmpresa").modal("show");
	$("#ovTXT-Codigo").focus();

}

function salvarEmpresa(){

	defineCampos();

	//Cria variável para controle de campos vazios.
	var campoVazio = false;

	/*Verifica se algum campo obrigatório está vazio.
	Se sim, define a borda do campo para vermelho e coloca
	o valor true na variável campoVazio. Todos os campos obrigatórios
	em branco ficarao vermelhos.*/
	if($("#ovTXT-Codigo").val() == "") {
		$("#ovTXT-Codigo").css("border", '1px solid red');
		campoVazio = true;
		
	}
	if($("#ovTXT-NomeFantasia").val() == "") {
		
		$("#ovTXT-NomeFantasia").css("border", '1px solid red');
		campoVazio = true;
	}
	if($("#ovTXT-RazaoSocial").val() == "") {
		
		$("#ovTXT-RazaoSocial").css("border", '1px solid red');
		campoVazio = true;
	}
	if($("#ovTXT-CNPJ").val() == "") {
		
		$("#ovTXT-CNPJ").css("border", '1px solid red');
		campoVazio = true;
	}
	if($("#ovTXT-Endereco").val() == "") {
		
		$("#ovTXT-Endereco").css("border", '1px solid red');
		campoVazio = true;
	}
	/*Verifica se a variável campoVazio tem o valor true.
	Se sim, algum campo obrigatório está em branco, mostrando
	mensagem para preencher os campos e para a execução.*/
	if(campoVazio){
		alert("Preencha todos os campos obrigatórios!");
		return;
	}

	//Pega os valores dos campos e adiciona as variáveis da Empresa
	Empresa.codigo = $("#ovTXT-Codigo").val();
	Empresa.nomeFantasia = $("#ovTXT-NomeFantasia").val();
	Empresa.data = $("#ovTXT-DataFundacao").val();

	//Verifica os checkbox marcados
	Empresa.razaoSocial = $("#ovTXT-RazaoSocial").val();
	let CBSituacao = document.getElementById('ovCB-Situacao');
	if(CBSituacao.checked){
		Empresa.situacao = 1;
	}else{
		Empresa.situacao = 0;
	}	

	let CBCooperativa = document.getElementById('ovCB-Cooperativa');
	if(CBCooperativa.checked){
		Empresa.cooperativa = 1;
	}else{
		Empresa.cooperativa = 0;
	}

	Empresa.qtdFuncionarios = $("#ovTXT-QtdFuncionarios").val();
	Empresa.faturamento = $("#ovTXT-Faturamento").val();
	Empresa.capitalSocial = $("#ovTxt-CapitalSocial").val();
	Empresa.inscricaoEstadual = $("#ovTXT-InscricaoEstadual").val();
	Empresa.cnpj = $("#ovTXT-CNPJ").val();
	Empresa.cidade = $("#ovTXT-Cidade").val();
	Empresa.cep = $("#ovTXT-CEP").val();
	Empresa.bairro = $("#ovTXT-Bairro").val();
	Empresa.endereco = $("#ovTXT-Endereco").val();
	Empresa.descricao = $("#ovTXT-Descricao").val();
	Empresa.email = $("#ovTXT-Email").val();
	Empresa.telefone = $("#ovTXT-Telefone").val();
	/*A variável filiais em empresa, recebe o vetor onde 
	onde foram gravadas as filiais.*/
	Empresa.filiais = Filiais;

	//Verifica se a empresa já esta cadastrada.
	var empresaCadastrada = Empresas.filter(function(empresa){
		return empresa.codigo == Empresa.codigo;
	}).length > 0;

	if (empresaCadastrada) 
		Empresas.map(function(empresa, index){
			if(empresa.codigo == empresaAberta)
				empresa.nomeFantasia == Empresa.nomeFantasia;		

		});

	else
		//Adiciona a Empresa em Empresas.
		Empresas.push(Empresa);

	//Fecha o modal Empresa
	$("#modal-cadastroEmpresa").modal("hide");
	//Listar as empresas.
	mostraEmpresa();

}

function mostraEmpresa(){
	/*Lista as Empresas e adiciona os botões editar e remover
	para cada item.*/
	$("#ovTab-Empresas tbody").html("");
	Empresas.map(function(empresa, index){
		let acoesEmpresa = "<button type='button'"
		+ "class='btn btn-EditarEmpresa btn-primary'"
		+ "data-codigoempresa='" + empresa.codigo + "'"
		+ "id='ovBTN-Editar'>"
		+ "<i class='fa fa-pencil-alt'>" + "</i>"
		+ "</button>"
		+ " " 
		+ "<button type='button'"
		+ "class='btn btn-RemoverEmpresa btn-danger'"
		+ "data-codigoempresa='" + empresa.codigo + "'>"

		+ "<i class=\"fa fa-trash-alt\">" + "</i>"
		+ "</button>";
		var situacaoE = null;
		if(empresa.situacao == 1){
			situacaoE = "Ativo";
			}else{
			situacaoE = "Inativo";
		}
		let line = "<tr>"
		+ "<td>" + empresa.codigo + "</td>"
		+ "<td>" + empresa.cnpj + "</td>"
		+ "<td>" + empresa.nomeFantasia + "</td>"
		+ "<td>" + situacaoE + "</td>"
		+ "<td>" + acoesEmpresa + "</td>"
		+ "</tr>";
		$("#ovTab-Empresas tbody").append(line);
	});

	editarEvent();
	eventoRemover();
}

function editarEmpresa(codigoEmpresa){

	Empresa = Empresas.filter(function(empresa, index){
		return empresa.codigo == codigoEmpresa;
	})[0];
	
	/*Filiais recebe as filiais cadastradas na empresa atual dentro de 
	Empresa.filiais*/
	Filiais = Empresa.filiais;
	empresaAberta = codigoEmpresa;

	$("#ovTXT-Codigo").val(Empresa.codigo);
	$("#ovTXT-NomeFantasia").val(Empresa.nomeFantasia);
	$("#ovTXT-DataFundacao").val(Empresa.data);
	$("#ovTXT-RazaoSocial").val(Empresa.razaoSocial);

	let CBSituacao = document.getElementById('ovCB-Situacao');
	if(Empresa.situacao == 1){
		CBSituacao.checked = true;
	}else{
		CBSituacao.checked = false;
	}

	let CBCooperativa = document.getElementById('ovCB-Cooperativa');
	if(Empresa.cooperativa == 1){
		CBCooperativa.checked = true;
	}else{
		CBCooperativa.checked = false;
	}

	$("#ovTXT-QtdFuncionarios").val(Empresa.qtdFuncionarios);
	$("#ovTXT-Faturamento").val(Empresa.faturamento);
	$("#ovTxt-CapitalSocial").val(Empresa.capitalSocial);
	$("#ovTXT-InscricaoEstadual").val(Empresa.inscricaoEstadual);
	$("#ovTXT-CNPJ").val(Empresa.cnpj);
	$("#ovTXT-Cidade").val(Empresa.cidade);
	$("#ovTXT-CEP").val(Empresa.cep);
	$("#ovTXT-Bairro").val(Empresa.bairro);
	$("#ovTXT-Endereco").val(Empresa.endereco);
	$("#ovTXT-Descricao").val(Empresa.descricao);
	$("#ovTXT-Email").val(Empresa.email);
	$("#ovTXT-Telefone").val(Empresa.telefone);
	$("#empresa-tab").tab("show");
	mostraFilial();
	$("#modal-cadastroEmpresa").modal("show");
	$("#ovTXT-Codigo").focus();
	//Bloqueia a edição do campo código.
	$("#ovTXT-Codigo").prop("disabled", true);

}

function removerEmpresa(codigoEmpresa){
	
	var Empresa = Empresas.filter(function(empresa, index){
		return empresa.codigo == codigoEmpresa;
	})[0];

	if(!confirm("Remover Empresa "
		+ Empresa.nomeFantasia + "?"))
		return;
	
	Empresas = Empresas.filter(function(empresa, index){
		return empresa.codigo != codigoEmpresa;
	});
	mostraEmpresa();
}










//Definindo atributos de uma filial.
function newFilial(){
	return {

		codigo : '',
		descricao: '',
		sigla : '',
		cnpj : '',
		inscricaoEstadual : '',
		situacao : null,
		cidade : '',
		cep : '',
		bairro : '',
		centroDist : null,
		endereco : '',
		telefone : '',
		email: '',
	};
}

function cadastraFilial(){
	//Cria uma nova filial
	Filial = newFilial();
	defineCampos();
	/*Gravando que o modal aberto é o de Filial.
	Assim o botão salvar recebe o ID Filial.*/
	tipoDeCadastro = "Filial";
	$("#ovTXT-CodigoFilial").val(Filial.codigo);
	$("#ovTXT-DescricaoFilial").val(Filial.descricao);
	$("#ovTXT-Sigla").val(Filial.sigla);
	$("#ovTXT-cnpjFilial").val(Filial.cnpj);
	$("#ovTXT-InscricaoFilial").val(Filial.inscricaoEstadual);
	let CBSituacaoFilial = document.getElementById('ovCB-SituacaoFilial');
	CBSituacaoFilial.checked = false;
	$("#ovTXT-CidadeFilial").val(Filial.cidade);
	$("#ovTXT-cepFilial").val(Filial.cep);
	$("#ovTXT-BairroFilial").val(Filial.bairro);
	let CBCentroDist = document.getElementById('ovCB-CentroDistribuicao');
	CBCentroDist.checked = false;
	$("#ovTXT-EnderecoFilial").val(Filial.endereco);
	$("#ovTXT-TelefoneFilial").val(Filial.telefone);
	$("#ovTXT-EmailFilial").val(Filial.email);
	mostraBotoesModal();
	$("#ovTXT-CodigoFilial").prop("disabled", false);

	$("#ovTXT-CodigoFilial").focus();
	$("#modal-cadastroFilial").modal("show");

}


function salvarFilial(){

	defineCampos();

	//Verificação de campos obrigatórios vazios.
	var campoVazio = false;
	if($("#ovTXT-CodigoFilial").val() == "") {
		
		$("#ovTXT-CodigoFilial").css("border", '1px solid red');
		campoVazio = true;

	}
		if($("#ovTXT-DescricaoFilial").val() == "") {
			
			$("#ovTXT-DescricaoFilial").css("border", '1px solid red');
			campoVazio = true;
		}
			if($("#ovTXT-cnpjFilial").val() == "") {
			
				$("#ovTXT-cnpjFilial").css("border", '1px solid red');
				campoVazio = true;
			}
				if($("#ovTXT-EnderecoFilial").val() == "") {
					
					$("#ovTXT-EnderecoFilial").css("border", '1px solid red');
					campoVazio = true;
				}
		if(campoVazio){
			alert("Preencha todos os campos obrigatórios!");
			return;
		}


	Filial.codigo = $("#ovTXT-CodigoFilial").val();
	Filial.descricao = $("#ovTXT-DescricaoFilial").val();
	Filial.sigla = $("#ovTXT-Sigla").val();
	Filial.cnpj = $("#ovTXT-cnpjFilial").val();
	Filial.inscricaoEstadual = $("#ovTXT-InscricaoEstadual").val();
	let CBSituacaoFilial = document.getElementById('ovCB-SituacaoFilial');
	if (CBSituacaoFilial.checked) {
		Filial.situacao = 1;
	}else{
		Filial.situacao = 0;
	}

	Filial.cidade = $("#ovTXT-CidadeFilial").val();
	Filial.cep = $("#ovTXT-cepFilial").val();
	Filial.bairro = $("#ovTXT-BairroFilial").val();
	let CBCentroDist = document.getElementById('ovCB-CentroDistribuicao');
	if (CBCentroDist.checked) {
		Filial.centroDist = 1;
	}else{
		Filial.centroDist = 0;
	}

	Filial.endereco = $("#ovTXT-EnderecoFilial").val();
	Filial.telefone = $("#ovTXT-TelefoneFilial").val();
	Filial.email = $("#ovTXT-EmailFilial").val();
	

	filialCadastrada = Filiais.filter(function(filial){
		return filial.codigo == Filial.codigo;
	}).length > 0;

	if (filialCadastrada) {
		Filiais.map(function(filial, index){
			if(filial.codigo == Filial.codigo){
				filial.situacao == Filial.situacao;
							}
		});
	}else{
		Filiais.push(Filial);
	}

	


	$("#modal-cadastroFilial").modal("hide");
	
	tipoDeCadastro = "Empresa";
	mostraBotoesModal();
	mostraFilial();

}



function mostraFilial(){


	$("#ovTab-Filiais tbody").html("");
	Filiais.map(function(filial, index){
		let acoesFilial = 

		"<button type='button'"
		+ "class='btn btn-EditarFilial btn-primary'"
		+ "data-codigofilial='" + filial.codigo + "'"
		+ "id='ovBTN-EditarF'>"
		+ "<i class='fa fa-pencil-alt'>" + "</i>"
		+ "</button>"
		+ " " 
		+ "<button type='button'"
		+ "class='btn btn-RemoverFilial btn-danger'"
		+ "data-codigofilial='" + filial.codigo + "'"
		+ "data-bs-dismiss='modal-cadastroFilial'>"
		+ "<i class=\"fa fa-trash-alt\">" + "</i>"
		+ "</button>";
		var situacaoF = null;
		if(filial.situacao == 1){
			situacaoF = "Ativo";
			}else{
			situacaoF = "Inativo";
		}

		let line = "<tr>"
		+ "<td>" + filial.codigo + "</td>"
		+ "<td>" + filial.cnpj + "</td>"
		+ "<td>" + filial.descricao + "</td>"
		+ "<td>" + situacaoF + "</td>"
		+ "<td>" + acoesFilial + "</td>"
		+ "</tr>";
		$("#ovTab-Filiais tbody").append(line);
	});

	editarEvent();
	eventoRemover();
}


function editarFilial(codigoFilial){

	tipoDeCadastro = "Filial";
	Filial = Filiais.filter(function(filial, index){
		return filial.codigo == codigoFilial;
	})[0];

	$("#ovTXT-CodigoFilial").val(Filial.codigo);
	$("#ovTXT-DescricaoFilial").val(Filial.descricao);
	$("#ovTXT-Sigla").val(Filial.sigla);
	$("#ovTXT-cnpjFilial").val(Filial.cnpj);
	$("#ovTXT-InscricaoFilial").val(Filial.inscricaoEstadual);

	let CBSituacaoFilial = document.getElementById('ovCB-SituacaoFilial');
	if(Filial.situacao == 1){
		CBSituacaoFilial.checked = true;
	}else{
		CBSituacaoFilial.checked = false;
	}

	let CBCentroDist = document.getElementById('ovCB-CentroDistribuicao');
	if(Filial.cooperativa == 1){
		CBCentroDist.checked = true;
	}else{
		CBCentroDist.checked = false;
	}


	$("#ovTXT-CidadeFilial").val(Filial.cidade);
	$("#ovTXT-cepFilial").val(Filial.cep);
	$("#ovTXT-BairroFilial").val(Filial.bairro);	
	$("#ovTXT-EnderecoFilial").val(Filial.endereco);
	$("#ovTXT-TelefoneFilial").val(Filial.telefone);
	$("#ovTXT-EmailFilial").val(Filial.email);
	
	mostraBotoesModal();
	$("#modal-cadastroFilial").modal("show");
	$("#ovTXT-CodigoFilial").focus();
	$("#ovTXT-CodigoFilial").prop("disabled", true);

}



function removerFilial(codigoFilial){
	
	var Empresa = Empresas.filter(function(empresa, index){
		return empresa.codigo == empresaAberta;
	})[0];


	
	var Filial = Empresa.filiais.filter(function(filial, index){
		return filial.codigo == codigoFilial;
	})[0];

	if(!confirm("Remover a filial "
		+ Filial.descricao + "?"))
		return;
	
	Empresa.filiais = Empresa.filiais.filter(function(filial, index){
		return filial.codigo != codigoFilial;
	});
	Filiais = Empresa.filiais;
	mostraFilial();
}






function editarEvent(){
	/*definindo ação para os botões de edição das listas de
	Empresas e Filiais*/
	$(".btn-EditarEmpresa").each(function(indice, btn){
		$(btn).on("click", function(){
			var codigoEmpresa = $(this).data("codigoempresa");
			editarEmpresa(codigoEmpresa);
			
		});
	});

	$(".btn-EditarFilial").each(function(indice, btn){
		$(btn).on("click", function(){
			var codigoFilial = $(this).data("codigofilial");
			editarFilial(codigoFilial);
		});
	});
}

function eventoRemover(){
	/*definindo ação para os botões de remoção das listas de
	Empresas e Filiais*/
	$(".btn-RemoverEmpresa").each(function(indice, btn){
		$(btn).on("click", function(){
			var codigoEmpresa = $(this).data("codigoempresa");
			removerEmpresa(codigoEmpresa);
		});
	});

	$(".btn-RemoverFilial").each(function(indice, btn){
		$(btn).on("click", function(){
			var codigoFilial = $(this).data("codigofilial");
			removerFilial(codigoFilial);
		});
	});
}



function mostraBotoesModal(){
	/*Definindo os botões Salvar e Cancelar.
	Os botões receberão o ID a partir do modal que está aberto
	na variável tipoDeCadastro.*/
	$(".divBTN-Modal").html("");
	let botoes = 
	"<button type='submit'" 
	+ "class='btn'"
	+ "id='btn-Salvar" + tipoDeCadastro + "'>Salvar</button>"
	+ " "
	+ "<button type='button'"
	+ "class='btn btn-danger'"
	+ "id='ovBTN-Cancela" + tipoDeCadastro + "'"
	+ "data-bs-dismiss='modal'>Cancelar</button>";
	let line = botoes;
	$(".divBTN-Modal").append(line);
}

function defineCampos(){
	/*Define os padrões dos campos obrigatórios.
	Quando o campo ficar vermelho e o modal for fechado,
	ao abrir um novo cadastro os campos voltam ao normal.*/
	$("#ovTXT-Codigo").css("border", '1px solid grey');
	$("#ovTXT-NomeFantasia").css("border", '1px solid grey');
	$("#ovTXT-RazaoSocial").css("border", '1px solid grey');
	$("#ovTXT-CNPJ").css("border", '1px solid grey');
	$("#ovTXT-Endereco").css("border", '1px solid grey');
	$("#ovTXT-CodigoFilial").css("border", '1px solid grey');
	$("#ovTXT-DescricaoFilial").css("border", '1px solid grey');
	$("#ovTXT-cnpjFilial").css("border", '1px solid grey');
	$("#ovTXT-EnderecoFilial").css("border", '1px solid grey');
}

$(document).ready(function(){
	Empresas = [];
	Filiais = [];


	//Definindo quais functions serão chamadas ao click em cada botão.
	$(document).on("click", "#ovBTN-AdicionarEmpresa",cadastraEmpresa);
	$(document).on("click", "#btn-SalvarEmpresa", salvarEmpresa);
	$(document).on("click", "#ovBTN-EditarEmpresa", editarEmpresa);
	$(document).on("click", "#ovBTN-AdicionarFilial", cadastraFilial);
	$(document).on("click", "#btn-SalvarFilial", salvarFilial);
	$(document).on("click", "#ovBTN-EditarFilial", editarFilial);

	editarEvent();
	eventoRemover();

	
});
