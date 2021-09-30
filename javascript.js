var Empresas = null;
var Empresa = null;
var Filiais = null;
var Filial = null;
var tipoDeCadastro = null;
var empresaAberta = null;
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

function cadastraEmpresa(){
	Empresa = newEmpresa();
	Filiais = [];

	
	
	mostraFilial();
	tipoDeCadastro = "Empresa";
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
	$("#empresa-tab").tab("show");
	//$("#filial-tab").prop("disabled", true);
	mostraBotoesModal();
	$("#modal-cadastroEmpresa").modal("show");
	$("#ovTXT-Codigo").focus();

}

function salvarEmpresa(){

	$("#ovTXT-Codigo").css("border", '1px solid grey');
	$("#ovTXT-NomeFantasia").css("border", '1px solid grey');
	$("#ovTXT-RazaoSocial").css("border", '1px solid grey');
	$("#ovTXT-CNPJ").css("border", '1px solid grey');
	$("#ovTXT-Endereco").css("border", '1px solid grey');




	if($("#ovTXT-Codigo").val() == "") {
		alert("Preencha todos os campos obrigatórios!");
		$("#ovTXT-Codigo").css("border", '1px solid red');
		return;

	}else{
		if($("#ovTXT-NomeFantasia").val() == "") {
			alert("Preencha todos os campos obrigatórios!");
			$("#ovTXT-NomeFantasia").css("border", '1px solid red');
			return;
		}else{
			if($("#ovTXT-RazaoSocial").val() == "") {
				alert("Preencha todos os campos obrigatórios!");
				$("#ovTXT-RazaoSocial").css("border", '1px solid red');
				return;
			}else{
				if($("#ovTXT-CNPJ").val() == "") {
					alert("Preencha todos os campos obrigatórios!");
					$("#ovTXT-CNPJ").css("border", '1px solid red');
					return;
				}else{
					if($("#ovTXT-Endereco").val() == "") {
						alert("Preencha todos os campos obrigatórios!");
						$("#ovTXT-Endereco").css("border", '1px solid red');
						return;
					}
				}
			}
		}
	}
	

	Empresa.codigo = $("#ovTXT-Codigo").val();
	Empresa.nomeFantasia = $("#ovTXT-NomeFantasia").val();
	Empresa.data = $("#ovTXT-DataFundacao").val();

	Empresa.razaoSocial = $("#ovTXT-RazaoSocial").val();
	let CBSituacao = document.getElementById('ovCB-Situacao');
	if(CBSituacao.checked){
		Empresa.situacao = "Ativo";
	}else{
		Empresa.situacao = "Inativo";
	}	

	let CBCooperativa = document.getElementById('ovCB-Cooperativa');
	if(CBCooperativa.checked){
		Empresa.cooperativa = "Sim";
	}else{
		Empresa.cooperativa = "Não";
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
	Empresa.filiais = Filiais;

	var empresaCadastrada = Empresas.filter(function(empresa){
		return empresa.codigo == Empresa.codigo;
	}).length > 0;

	if (empresaCadastrada) 
		Empresas.map(function(empresa, index){
			if(empresa.codigo == empresaAberta)
				empresa.nomeFantasia == Empresa.nomeFantasia;		

		});

	else
		Empresas.push(Empresa);


	$("#modal-cadastroEmpresa").modal("hide");
	mostraEmpresa();

}

function mostraEmpresa(){
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

		let line = "<tr>"
		+ "<td>" + empresa.codigo + "</td>"
		+ "<td>" + empresa.cnpj + "</td>"
		+ "<td>" + empresa.nomeFantasia + "</td>"
		+ "<td>" + empresa.situacao + "</td>"
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
	
	Filiais = Empresa.filiais;
	empresaAberta = codigoEmpresa;

	$("#ovTXT-Codigo").val(Empresa.codigo);
	$("#ovTXT-NomeFantasia").val(Empresa.nomeFantasia);
	$("#ovTXT-DataFundacao").val(Empresa.data);
	$("#ovTXT-RazaoSocial").val(Empresa.razaoSocial);

	let CBSituacao = document.getElementById('ovCB-Situacao');
	if(Empresa.situacao == "Ativo"){
		CBSituacao.checked = true;
	}else{
		CBSituacao.checked = false;
	}

	let CBCooperativa = document.getElementById('ovCB-Cooperativa');
	if(Empresa.cooperativa == "Sim"){
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











function newFilial(){
	return {

		codigo : '',
		descricao: '',
		sigla : '',
		cnpj : '',
		inscricaoEstadual : '',
		situacao : '',
		cidade : '',
		cep : '',
		bairro : '',
		centroDist : '',
		endereco : '',
		telefone : '',
		email: '',
	};
}

function cadastraFilial(){

	Filial = newFilial();
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

	
	$("#modal-cadastroFilial").modal("show");

}


function salvarFilial(){

	$("#ovTXT-CodigoFilial").css("border", '1px solid grey');
	$("#ovTXT-DescricaoFilial").css("border", '1px solid grey');
	$("#ovTXT-cnpjFilial").css("border", '1px solid grey');
	$("#ovTXT-Endereco").css("border", '1px solid grey');




	if($("#ovTXT-CodigoFilial").val() == "") {
		alert("Preencha todos os campos obrigatórios!");
		$("#ovTXT-CodigoFilial").css("border", '1px solid red');
		return;

	}else{
		if($("#ovTXT-DescricaoFilial").val() == "") {
			alert("Preencha todos os campos obrigatórios!");
			$("#ovTXT-DescricaoFilial").css("border", '1px solid red');
			return;
		}else{
			if($("#ovTXT-cnpjFilial").val() == "") {
				alert("Preencha todos os campos obrigatórios!");
				$("#ovTXT-cnpjFilial").css("border", '1px solid red');
				return;
			}else{
				if($("#ovTXT-EnderecoFilial").val() == "") {
					alert("Preencha todos os campos obrigatórios!");
					$("#ovTXT-EnderecoFilial").css("border", '1px solid red');
					return;
				}
			}
		}
	}


	Filial.codigo = $("#ovTXT-CodigoFilial").val();
	Filial.descricao = $("#ovTXT-DescricaoFilial").val();
	Filial.sigla = $("#ovTXT-Sigla").val();
	Filial.cnpj = $("#ovTXT-cnpjFilial").val();
	Filial.inscricaoEstadual = $("#ovTXT-InscricaoEstadual").val();
	let CBSituacaoFilial = document.getElementById('ovCB-SituacaoFilial');
	if (CBSituacaoFilial.checked) {
		Filial.situacao = "Ativo";
	}else{
		Filial.situacao = "Inativo";
	}

	Filial.cidade = $("#ovTXT-CidadeFilial").val();
	Filial.cep = $("#ovTXT-cepFilial").val();
	Filial.bairro = $("#ovTXT-BairroFilial").val();
	let CBCentroDist = document.getElementById('ovCB-CentroDistribuicao');
	if (CBCentroDist.checked) {
		Filial.centroDist = "Sim";
	}else{
		Filial.centroDist = "Não";
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
				alert("Passou");
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


		let line = "<tr>"
		+ "<td>" + filial.codigo + "</td>"
		+ "<td>" + filial.cnpj + "</td>"
		+ "<td>" + filial.descricao + "</td>"
		+ "<td>" + filial.situacao + "</td>"
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
	if(Filial.situacao == "Ativo"){
		CBSituacaoFilial.checked = true;
	}else{
		CBSituacaoFilial.checked = false;
	}

	let CBCentroDist = document.getElementById('ovCB-CentroDistribuicao');
	if(Filial.cooperativa == "Sim"){
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
	
	editaEmpresa2 = Empresas.filter(function(empresa, index){
		return empresa.codigo == empresaAberta;
	})[0];


	
	var filialSel = editaEmpresa2.filiais.filter(function(filial, index){
		return filial.codigo == codigoFilial;
	})[0];

	if(!confirm("Remover a filial "
		+ filialSel.descricao + "?"))
		return;
	
	editaEmpresa2.filiais = editaEmpresa2.filiais.filter(function(filial, index){
		return filial.codigo != codigoFilial;
	});
	mostraFilial();
}






function editarEvent(){
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


function fechaCadFilial(){
	$("#modal-cadastroFilial").modal("hide");
	cadastraEmpresa();
}


function mostraBotoesModal(){
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

$(document).ready(function(){
	Empresas = [];
	Filiais = [];



	$(document).on("click", "#ovBTN-AdicionarEmpresa",cadastraEmpresa);
	$(document).on("click", "#btn-SalvarEmpresa", salvarEmpresa);
	$(document).on("click", "#ovBTN-EditarEmpresa", editarEmpresa);
	$(document).on("click", "#ovBTN-AdicionarFilial", cadastraFilial);
	$(document).on("click", "#btn-SalvarFilial", salvarFilial);
	$(document).on("click", "#ovBTN-EditarFilial", editarFilial);

	editarEvent();
	eventoRemover();

	
});
