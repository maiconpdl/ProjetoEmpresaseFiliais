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

	Filial.codigo = $("#ovTXT-CodigoFilial").val();
	Filial.descricao = $("#ovTXT-DescricaoFilial").val();
	Filial.sigla = $("#ovTXT-Sigla").val();
	Filial.cnpj = $("#ovTXT-cnpjFilial").val();
	Filial.inscricaoEstadual = $("#ovTXT-InscricaoEstadual");
	Filial.situacao = $("#ovCB-SituacaoFilial");
	Filial.cidade = $("#ovTXT-CidadeFilial");
	Filial.cep = $("#ovTXT-cepFilial");
	Filial.bairro = $("#ovTXT-BairroFilial");
	Filial.centroDist = $("#ovCB-CentroDistribuicao");
	Filial.endereco = $("#ovTXT-EnderecoFilial");
	Filial.telefone = $("#ovTXT-TelefoneFilial");
	Filial.email = $("#ovTXT-EmailFilial");
	

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
var acao = null;
if(empresaAberta != null){

	empresaSelecionada = Empresas.filter(function(empresa, index){
		return empresa.codigo == empresaAberta;
	})[0];

	acao = empresaSelecionada.filiais;

}else{
	acao = Filiais;
}

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
		+ "<td>" + filial.codigo + "</td>"
		+ "<td>" + filial.descricao + "</td>"
		+ "<td>" + acoesFilial + "</td>"
		+ "</tr>";
		$("#ovTab-Filiais tbody").append(line);
	});

	editarEvent();
	eventoRemover();
}


function editarFilial(codigoFilial){

	tipoDeCadastro = "Filial";
	editaFilial = Filiais.filter(function(filial, index){
		return filial.codigo == codigoFilial;
	})[0];

	$("#ovTXT-CodigoFilial").val(editaFilial.codigo);
	$("#ovTXT-DescricaoFilial").val(editaFilial.descricao);
	$("#ovTXT-Sigla").val(editaFilial.sigla);
	$("#ovTXT-cnpjFilial").val(editaFilial.cnpj);
	$("#ovTXT-InscricaoFilial").val(editaFilial.inscricaoEstadual);

	let CBSituacaoFilial = document.getElementById('ovCB-SituacaoFilial');
	if(editaFilial.situacao == "Ativo"){
		CBSituacaoFilial.checked = true;
	}else{
		CBSituacaoFilial.checked = false;
	}

	let CBCentroDist = document.getElementById('ovCB-CentroDistribuicao');
	if(editaFilial.cooperativa == "Sim"){
		CBCentroDist.checked = true;
	}else{
		CBCentroDist.checked = false;
	}


	$("#ovTXT-CidadeFilial").val(editaFilial.cidade);
	$("#ovTXT-cepFilial").val(editaFilial.cep);
	$("#ovTXT-BairroFilial").val(editaFilial.bairro);	
	$("#ovTXT-EnderecoFilial").val(editaFilial.endereco);
	$("#ovTXT-Telefone").val(editaFilial.telefone);
	$("#ovTXT-Email").val(editaFilial.email);
	
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
			  "<button type='button'" 
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
	$(document).on("click", "#ovBTN-CancelaFilial", fechaCadFilial);
	$(document).on("click", "#ovBTN-EditarFilial", editarFilial);

	editarEvent();
	eventoRemover();

	
});
