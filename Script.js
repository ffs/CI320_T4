var registros = new Object();			//cria a estrutura que conterá os registros dos alunos nas disciplinas
	registros.tam = 0;					//inicializa numero de registros
	registros.aluno = new Array();		//cria a lista para os registros

var auxiliar = ["GRR00000000", "GRR00000001", "GRR00000002", "GRR00000003", "GRR00000004", "GRR00000005", "GRR00000006", "GRR00000007", "GRR00000008", "GRR00000009", "GRR00000010", "GRR00000011", "GRR00000012"];

var estadoDisciplinas = ["Aprovado", "Reprovado", "Equivale", "Matricula", "Repr. Freq", "Cancelado", "Tr. Total", "Disp. c/nt"];
var corEstados = ["verde", "vermelhoclaro", "amarelo", "azul", "vermelhoescuro", "roxo", "cinza", "marrom"];
var hexaCor = ["#00FF00", "#FF9999", "#FFFF00", "#0066FF", "#FF0000", "#990099", "#B2B2B2", "#996633"];
var numOpts = ["OPT1", "OPT2", "OPT3", "OPT4", "OPT5", "OPT6", "OPT7", "OPT8", "OPT9"];
var opts = 0;

var numRegs = 966;
var counter = 0;

function inicializa() {
	var registros = criaRegistros();
}

function criaRegistros() {
	var registro;
	$.getJSON("Alunos.json", function(data) {
		counter;	
		while(counter < numRegs){
			registro = data.ALUNOS_CURSO.ALUNO[counter];
			insereRegistro(registro, registros);
			counter++;
		}
	});
	return registros;
}

function insereRegistro(registro, registros) {
	var lastPosition = registros.tam;
	registros.aluno[lastPosition] = new Object;
	registros.aluno[lastPosition] = registro;
	registros.tam++;
}

function insereElemento(vetor, elemento) {
	var lastPosition = vetor.length;
	vetor[lastPosition] = new Object;
	vetor[lastPosition] = elemento;
	return vetor;
}

function criaAlunos(alunos, registros) {
	var discs = new Array;
	var disciplina;
	var aluno;
	var c = 0;
	for (var i = 0; i <= 12; i++) {
		aluno = criaAluno(registros.aluno[c]);
		while ((registros.aluno[c]) && (registros.aluno[c].MATR_ALUNO == auxiliar[i])) {
			disciplina = criaDisciplina(registros.aluno[c]);
			if (disciplinaNaoCriada(registros.aluno[c],aluno.disciplinas)){
				aluno.disciplinas = criaDisciplinas(aluno.disciplinas);
				//insere a nova disciplina na ultima posicao do array de disciplinas
				aluno.disciplinas[aluno.disciplinas.length - 1] = insereDisciplina(aluno.disciplinas[aluno.disciplinas.length - 1], disciplina);
			}
			else{
				//procura array da disciplina no historico do aluno
				//caminha nas diversas disciplinas
				for (var ds = aluno.disciplinas.length - 1; ds >= 0; ds--) {
					if (aluno.disciplinas[ds][0].COD_ATIV_CURRIC == disciplina.COD_ATIV_CURRIC){
						//insere a nova disciplina no array encontrado
						aluno.disciplinas[ds] = insereDisciplina(aluno.disciplinas[ds], disciplina);
						break;
					}
				};
			}
			c++;
		}
		alunos = insereAluno(alunos, aluno);
	}
	return alunos;
}

//retorna 0 se a disciplina ja foi criada pelo menos uma vez
//retorna 1 caso a disciplina nunca tenha sido criada para o determinado aluno
function disciplinaNaoCriada(d,alunoHist) {
	for (var i = alunoHist.length - 1; i >= 0; i--) {
		if (d.COD_ATIV_CURRIC == alunoHist[i][0].COD_ATIV_CURRIC) {
			return 0;
		}
	};
	return 1;
}

function criaAluno(a) {
	var aluno = new Object();
		aluno.MATR_ALUNO;
		aluno.ID_VERSAO_CURSO;
		aluno.NOME_ALUNO;
		aluno.COD_CURSO;
		aluno.NOME_CURSO;
		aluno.NUM_VERSAO;
		aluno.ID_CURRIC_ALUNO;
		aluno.ID_ATIV_CURRIC;
		aluno.disciplinas = new Array();
	aluno.MATR_ALUNO = a.MATR_ALUNO;
	aluno.ID_VERSAO_CURSO = a.ID_VERSAO_CURSO;
	aluno.NOME_ALUNO = a.NOME_ALUNO;
	aluno.COD_CURSO = a.COD_CURSO;
	aluno.NOME_CURSO = a.NOME_CURSO;
	aluno.NUM_VERSAO = a.NUM_VERSAO;
	aluno.ID_CURRIC_ALUNO = a.ID_CURRIC_ALUNO;
	aluno.ID_ATIV_CURRIC = a.ID_ATIV_CURRIC;
	return aluno;
}

function criaDisciplina(registro) {
	var disciplina = new Object();
		disciplina.ANO;
		disciplina.MEDIA_FINAL;
		disciplina.SITUACAO_ITEM;
		disciplina.PERIODO;
		disciplina.SITUACAO;
		disciplina.COD_ATIV_CURRIC;
		disciplina.NOME_ATIV_CURRIC;
		disciplina.CREDITOS;
		disciplina.CH_TOTAL;
		disciplina.ID_LOCAL_DISPENSA;
		disciplina.CONCEITO;
		disciplina.ID_NOTA;
		disciplina.ID_ESTRUTURA_CUR;
		disciplina.DESCR_ESTRUTURA;
		disciplina.FREQUENCIA;
		disciplina.MEDIA_CREDITO;
		disciplina.SITUACAO_CURRICULO;
		disciplina.SIGLA;
	disciplina.ANO = registro.ANO;
	disciplina.MEDIA_FINAL = registro.MEDIA_FINAL;
	disciplina.SITUACAO_ITEM = registro.SITUACAO_ITEM;
	disciplina.PERIODO = registro.PERIODO;
	disciplina.SITUACAO = registro.SITUACAO;
	disciplina.COD_ATIV_CURRIC = registro.COD_ATIV_CURRIC;
	disciplina.NOME_ATIV_CURRIC = registro.NOME_ATIV_CURRIC;
	disciplina.CREDITOS = registro.CREDITOS;
	disciplina.CH_TOTAL = registro.CH_TOTAL;
	disciplina.ID_LOCAL_DISPENSA = registro.ID_LOCAL_DISPENSA;
	disciplina.CONCEITO = registro.CONCEITO;
	disciplina.ID_NOTA = registro.ID_NOTA;
	disciplina.ID_ESTRUTURA_CUR = registro.ID_ESTRUTURA_CUR;
	disciplina.DESCR_ESTRUTURA = registro.DESCR_ESTRUTURA;
	disciplina.FREQUENCIA = registro.FREQUENCIA;
	disciplina.MEDIA_CREDITO = registro.MEDIA_CREDITO;
	disciplina.SITUACAO_CURRICULO = registro.SITUACAO_CURRICULO;
	disciplina.SIGLA = registro.SIGLA;
	return disciplina;
}

function criaDisciplinas(alunoHist) {
	var lastPosition = alunoHist.length;
	alunoHist[lastPosition] = new Array;
	return alunoHist;
}

function insereDisciplina(disciplinas, disciplina) {
	var lastPosition = disciplinas.length;
	disciplinas[lastPosition] = new Object;
	disciplinas[lastPosition] = disciplina;
	return disciplinas;
}

function insereHistorico(alunoHist, disciplina) {
	var lastPosition = alunoHist.length;
	alunoHist[lastPosition] = new Object;
	alunoHist[lastPosition] = disciplina;
	return alunoHist;
}

function insereAluno(alunos, aluno) {
	var lastPosition = alunos.tam;
	alunos.a[lastPosition] = new Object;
	alunos.a[lastPosition] = aluno;
	alunos.tam++;
	return alunos;
}

function procuraAluno(alunos, grr) {
	var counter = 0;
	while(counter < alunos.tam) {
		if (alunos.a[counter].MATR_ALUNO == grr) {
			return alunos.a[counter];
		}
		counter++;
	}
}

function pintaDisciplinas(dcpls,cor,aluno) {
	var grade = document.getElementsByClassName("codigo");
	var flag;
	//caminha nas disciplinas a pintar
	for (var d = dcpls.length - 1; d >= 0; d--) {
		//caminha na grade procurando a disciplina
		flag=1;
		for (var i = grade.length - 1; i >= 0; i--) {
			if (flag){
				//match pelo nome da disciplina
				if (grade[i].id == dcpls[d].COD_ATIV_CURRIC) {
					grade[i].style.backgroundColor=cor;
					flag=0;
				};
				//match por optativa
				if (dcpls[d].DESCR_ESTRUTURA == "Optativas") {
					if (grade[i].id == numOpts[opts]){
						flag=0;
						grade[i].style.backgroundColor=cor;
						grade[i].innerHTML=dcpls[d].COD_ATIV_CURRIC;
						opts++;
						//grade 2011 6 optativas
						if ((aluno.ID_VERSAO_CURSO=="1227") && (opts>5)){
							opts--;
						};
						//grade 1998 9 optativas
						if ((aluno.ID_VERSAO_CURSO=="308") && (opts>8)){
							opts++;
						};
					};
				};
				//match por TG 1
				if ((dcpls[d].DESCR_ESTRUTURA == "Trabalho de Graduação I") && (grade[i].id == "TG1")) {
					grade[i].style.backgroundColor=cor;
					flag=0;
				};
				//match por TG 2
				if ((dcpls[d].DESCR_ESTRUTURA == "Trabalho de Graduação II") && (grade[i].id == "TG2")) {
					grade[i].style.backgroundColor=cor;
					flag=0;
				};
			};
		};
	};
}

function procuraMaterias(aluno) {
	var a = new Array;			//aprovadas
	var r = new Array;			//reprovadas
	var e = new Array;			//equivalencias
	var m = new Array;			//matriculadas
	var rf = new Array;			//reprovadas frequencia
	var c = new Array;			//canceladas
	var t = new Array;			//trancamento
	var d = new Array;			//dispensa com nota
	var ultima;
	//caminha nas disciplinas
	for (var ds = aluno.disciplinas.length - 1; ds >= 0; ds--) {
		ultima = aluno.disciplinas[ds][aluno.disciplinas[ds].length-1];
		switch (ultima.SIGLA) {
			//Aprovado
			case estadoDisciplinas[0]:
				a = insereElemento(a, ultima);
			break;
			//Reprovado
			case (estadoDisciplinas[1]):
				r = insereElemento(r, ultima);
			break;
			//Equivalencia
			case estadoDisciplinas[2]:
				e = insereElemento(e, ultima);
			break;
			//Matriculada
			case estadoDisciplinas[3]:
				m = insereElemento(m, ultima);
			break;
			//Reprovado Frequencia
			case estadoDisciplinas[4]:
				rf = insereElemento(rf, ultima);
			break;
			//Cancelado
			case estadoDisciplinas[5]:
				c = insereElemento(c, ultima);
			break;
			//Trancamento total
			case estadoDisciplinas[6]:
				t = insereElemento(t, ultima);
			break;
			//Dispensa com nota
			case estadoDisciplinas[7]:
				d = insereElemento(d, ultima);
			break;
		}
	};
	//pinta aprovadas de verde
	pintaDisciplinas(a,hexaCor[0], aluno);
	//pinta reprovadas por nota de vermelho claro
	pintaDisciplinas(r,hexaCor[1], aluno);
	//pinta equivalencias de amarelo
	pintaDisciplinas(e,hexaCor[2], aluno);
	//pinta matriculadas de azul
	pintaDisciplinas(m,hexaCor[3], aluno);
	//pinta reprovadas por frequencia de vermelho escuro
	pintaDisciplinas(rf,hexaCor[4], aluno);
	//pinta canceladas de roxo
	pintaDisciplinas(c,hexaCor[5], aluno);
	//pinta trancadas totais de cinza
	pintaDisciplinas(t,hexaCor[6], aluno);
	//pinta dispensas com nota de marrom
	pintaDisciplinas(d,hexaCor[7], aluno);
}

function desenhaGrade(aluno) {
	var grade = document.getElementById("grade");
	if (aluno.NUM_VERSAO == "2011"){
		$('#grade').html('<table class="table_grade"><tr><td colspan="8" class="titulos_table">Ciência da Computação <br>Períodos semestrais do curso</td></tr><tr><td class="titulos_table">1º</td><td class="titulos_table">2º</td><td class="titulos_table">3º</td><td class="titulos_table">4º</td><td class="titulos_table">5º</td><td class="titulos_table">6º</td><td class="titulos_table">7º</td><td class="titulos_table">8º</td></tr><tr id="line1"><td id="CI068" class="codigo">CI068</td><td id="CI210" class="codigo">CI210</td><td id="CI212" class="codigo">CI212</td><td id="CI215" class="codigo">CI215</td><td id="CI162" class="codigo">CI162</td><td id="CI163" class="codigo">CI163</td><td id="CI221" class="codigo">CI221</td><td id="OPT1" class="codigo">OPT</td></tr><tr id="line2"><td id="CI055" class="codigo">CI055</td><td id="CI056" class="codigo">CI056</td><td id="CI057" class="codigo">CI057</td><td id="CI062" class="codigo">CI062</td><td id="CI065" class="codigo">CI065</td><td id="CI165" class="codigo">CI165</td><td id="CI211" class="codigo">CI211</td><td id="OPT2" class="codigo">OPT</td></tr><tr id="line3"><td id="CI046" class="codigo">CM046</td><td id="CI067" class="codigo">CI067</td><td id="CI064" class="codigo">CI064</td><td id="CE003" class="codigo">CE003</td><td id="CI059" class="codigo">CI059</td><td id="CI209" class="codigo">CI209</td><td id="OPT3" class="codigo">OPT</td><td id="OPT4" class="codigo">OPT</td></tr><tr id="line4"><td id="CI045" class="codigo">CM045</td><td id="CM005" class="codigo">CM005</td><td id="CI237" class="codigo">CI237</td><td id="CU058" class="codigo">CI058</td><td id="CI061" class="codigo">CI061</td><td id="CI218" class="codigo">CI218</td><td id="OPT5" class="codigo">OPT</td><td id="OPT6" class="codigo">OPT</td></tr><tr id="line5"><td id="CM201" class="codigo">CM201</td><td id="CM202" class="codigo">CM202</td><td id="CI166" class="codigo">CI166</td><td id="CI164" class="codigo">CI164</td><td id="SA214" class="codigo">SA214</td><td id="CI220" class="codigo">CI220</td><td id="TG1" class="codigo">TG I</td><td id="TG2" class="codigo">TG II</td></tr><tr><td colspan="3"><strong> * BLOCO A (Formação básica) </strong></td><td colspan="5">&nbsp;</td></tr></table>');
	}
	else{
		if (aluno.NUM_VERSAO == "1998") {
			$('#grade').html('<table class="table_grade"><tr><td colspan="8" class="titulos_table">Ciência da Computação <br>Períodos semestrais do curso</td></tr><tr><td class="titulos_table">1º</td><td class="titulos_table">2º</td><td class="titulos_table">3º</td><td class="titulos_table">4º</td><td class="titulos_table">5º</td><td class="titulos_table">6º</td><td class="titulos_table">7º</td><td class="titulos_table">8º</td></tr><tr id="line1"><td id="CI055" class="codigo">CI055</td><td id="CI056" class="codigo">CI056</td><td id="CI057" class="codigo">CI066</td><td id="CI059" class="codigo">CI215</td><td id="CI058" class="codigo">CI162</td><td id="CI061" class="codigo">CI061</td><td id="CI220" class="codigo">CI221</td><td id="TG2" class="codigo">TG2</td></tr><tr id="line2"><td id="CI063" class="codigo">CI063</td><td id="CI067" class="codigo">CI067</td><td id="CI064" class="codigo">CI064</td><td id="CI060" class="codigo">CI060</td><td id="CI062" class="codigo">CI062</td><td id="CI214" class="codigo">CI214</td><td id="CI221" class="codigo">CI221</td><td id="OPT6" class="codigo">OPT</td></tr><tr id="line3"><td id="CI066" class="codigo">CI066</td><td id="CI068" class="codigo">CI068</td><td id="CI210" class="codigo">CI210</td><td id="CI065" class="codigo">CI065</td><td id="CI211" class="codigo">CI211</td><td id="CI218" class="codigo">CI218</td><td id="TG1" class="codigo">TG1</td><td id="OPT7" class="codigo">OPT</td></tr><tr id="line4"><td id="CM045" class="codigo">CM045</td><td id="CM005" class="codigo">CM005</td><td id="CI237" class="codigo">CI237</td><td id="CI069" class="codigo">CI069</td><td id="CI215" class="codigo">CI215</td><td id="CI236" class="codigo">CI236</td><td id="OPT4" class="codigo">OPT</td><td id="OPT8" class="codigo">OPT</td></tr><tr id="line5"><td id="CM046" class="codigo">CM046</td><td id="CM202" class="codigo">CM202</td><td id="SA214" class="codigo">SA214</td><td id="CI212" class="codigo">CI212</td><td id="CI235" class="codigo">CI235</td><td id="OPT2" class="codigo">OPT</td><td id="OPT5" class="codigo">OPT</td><td id="OPT9" class="codigo">OPT</td></tr><tr id="line6"><td id="CM201" class="codigo">CM201</td><td id="CI202" class="codigo">CI202</td><td id="CE003" class="codigo">CE003</td><td id="CI219" class="codigo">CI219</td><td id="SIN070" class="codigo">SIN070</td><td id="OPT3" class="codigo">OPT</td><td id="nada" class="codigo"></td><td id="nada" class="codigo"></td></tr><tr id="line7"><td id="nada" class="codigo"></td><td id="nada" class="codigo"></td><td id="nada" class="codigo"></td><td id="CM224" class="codigo">CM224</td><td id="OPT1" class="codigo">OPT</td><td id="nada" class="codigo"></td><td id="nada" class="codigo"></td><td id="nada" class="codigo"></td></tr></table>');
		};
	}
	var disc = document.getElementsByClassName("codigo");
	for (var i = disc.length - 1; i >= 0; i--) {
		disc[i].style.backgroundColor="#FFFFFF";
	};
}

function atualizaDados() {
	var alunos = new Object();			//cria a estrutura que conterá os registros dos alunos nas disciplinas
		alunos.tam = 0;					//inicializa numero de registros
		alunos.a = new Array();			//cria a lista para os registros
	alunos = criaAlunos(alunos, registros);
	var aluno;
	var grr = document.getElementById("grr").value;
	var nomeAluno = document.getElementById("nomeAluno");
	var raAluno = document.getElementById("grrAluno");
	aluno = procuraAluno(alunos, grr);
	nomeAluno.innerHTML=aluno.NOME_ALUNO;
	raAluno.innerHTML=aluno.MATR_ALUNO;
	desenhaGrade(aluno);										//limpa grade curricular
	procuraMaterias(aluno);
}