var registros = new Object();			//cria a estrutura que conterá os registros dos alunos nas disciplinas
	registros.tam = 0;					//inicializa numero de registros
	registros.aluno = new Array();		//cria a lista para os registros

var auxiliar = ["GRR00000000","GRR00000001","GRR00000002","GRR00000003","GRR00000004","GRR00000005","GRR00000006","GRR00000007","GRR00000008","GRR00000009","GRR00000010","GRR00000011","GRR00000012"];

var estadoDisciplinas = ["Aprovado","Reprovado","Equivale","Matricula","Repr. Freq","Cancelado","Tr. Total","Disp. c/nt"];
var corEstados = ["verde","vermelhoclaro","amarelo","azul","vermelhoescuro","roxo","cinza","marrom"];
var hexaCor = ["#00FF00","#FF9999","#FFFF00","#0066FF","#FF0000","#990099","#B2B2B2","#996633"];
var numOpts = ["OPT1","OPT2","OPT3","OPT4","OPT5","OPT6","OPT7","OPT8","OPT9"];
var opts = 0;

var numRegs = 966;
var counter = 0;

function inicializa() {
	var registros = criaRegistros();
}

function criaRegistros() {
	var registro;
	$.getJSON("Alunos.json",function(data) {
		counter;	
		while(counter < numRegs){
			registro = data.ALUNOS_CURSO.ALUNO[counter];
			insereRegistro(registro,registros);
			counter++;
		}
	});
	return registros;
}

function insereRegistro(registro,registros) {
	var lastPosition = registros.tam;
	registros.aluno[lastPosition] = new Object;
	registros.aluno[lastPosition] = registro;
	registros.tam++;
}

function insereElemento(vetor,elemento) {
	var lastPosition = vetor.length;
	vetor[lastPosition] = new Object;
	vetor[lastPosition] = elemento;
	return vetor;
}

function criaAlunos(alunos,registros) {
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
				aluno.disciplinas[aluno.disciplinas.length - 1] = insereDisciplina(aluno.disciplinas[aluno.disciplinas.length - 1],disciplina);
			}
			else{
				//procura array da disciplina no historico do aluno
				//caminha nas diversas disciplinas
				for (var ds = aluno.disciplinas.length - 1; ds >= 0; ds--) {
					if (aluno.disciplinas[ds][0].COD_ATIV_CURRIC == disciplina.COD_ATIV_CURRIC){
						//insere a nova disciplina no array encontrado
						aluno.disciplinas[ds] = insereDisciplina(aluno.disciplinas[ds],disciplina);
						break;
					}
				};
			}
			c++;
		}
		alunos = insereAluno(alunos,aluno);
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

function insereDisciplina(disciplinas,disciplina) {
	var lastPosition = disciplinas.length;
	disciplinas[lastPosition] = new Object;
	disciplinas[lastPosition] = disciplina;
	return disciplinas;
}

function insereHistorico(alunoHist,disciplina) {
	var lastPosition = alunoHist.length;
	alunoHist[lastPosition] = new Object;
	alunoHist[lastPosition] = disciplina;
	return alunoHist;
}

function insereAluno(alunos,aluno) {
	var lastPosition = alunos.tam;
	alunos.a[lastPosition] = new Object;
	alunos.a[lastPosition] = aluno;
	alunos.tam++;
	return alunos;
}

function procuraAluno(alunos,grr) {
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
	opts = 0;
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
				a = insereElemento(a,ultima);
			break;
			//Reprovado
			case (estadoDisciplinas[1]):
				r = insereElemento(r,ultima);
			break;
			//Equivalencia
			case estadoDisciplinas[2]:
				e = insereElemento(e,ultima);
			break;
			//Matriculada
			case estadoDisciplinas[3]:
				m = insereElemento(m,ultima);
			break;
			//Reprovado Frequencia
			case estadoDisciplinas[4]:
				rf = insereElemento(rf,ultima);
			break;
			//Cancelado
			case estadoDisciplinas[5]:
				c = insereElemento(c,ultima);
			break;
			//Trancamento total
			case estadoDisciplinas[6]:
				t = insereElemento(t,ultima);
			break;
			//Dispensa com nota
			case estadoDisciplinas[7]:
				d = insereElemento(d,ultima);
			break;
		}
	};
	//pinta aprovadas de verde
	pintaDisciplinas(a,hexaCor[0],aluno);
	//pinta reprovadas por nota de vermelho claro
	pintaDisciplinas(r,hexaCor[1],aluno);
	//pinta equivalencias de amarelo
	pintaDisciplinas(e,hexaCor[2],aluno);
	//pinta matriculadas de azul
	pintaDisciplinas(m,hexaCor[3],aluno);
	//pinta reprovadas por frequencia de vermelho escuro
	pintaDisciplinas(rf,hexaCor[4],aluno);
	//pinta canceladas de roxo
	pintaDisciplinas(c,hexaCor[5],aluno);
	//pinta trancadas totais de cinza
	pintaDisciplinas(t,hexaCor[6],aluno);
	//pinta dispensas com nota de marrom
	pintaDisciplinas(d,hexaCor[7],aluno);
}

function desenhaGrade(aluno) {
	var grade = document.getElementById("grade");
	if (aluno.NUM_VERSAO == "2011"){
		$('#grade').html('<table class="table_grade"><tr><td colspan="8" class="titulos_table">Ciência da Computação <br>Períodos semestrais do curso <br>Grade Curricular 2011</td></tr><tr><td class="titulos_table">1º</td><td class="titulos_table">2º</td><td class="titulos_table">3º</td><td class="titulos_table">4º</td><td class="titulos_table">5º</td><td class="titulos_table">6º</td><td class="titulos_table">7º</td><td class="titulos_table">8º</td></tr><tr id="line1"><td id="CI068" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI068</td><td id="CI210" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI210</td><td id="CI212" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI212</td><td id="CI215" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI215</td><td id="CI162" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI162</td><td id="CI163" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI163</td><td id="CI221" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI221</td><td id="OPT1" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line2"><td id="CI055" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI055</td><td id="CI056" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI056</td><td id="CI057" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI057</td><td id="CI062" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI062</td><td id="CI065" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI065</td><td id="CI165" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI165</td><td id="CI211" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI211</td><td id="OPT2" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line3"><td id="CI046" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM046</td><td id="CI067" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI067</td><td id="CI064" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI064</td><td id="CE003" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CE003</td><td id="CI059" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI059</td><td id="CI209" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI209</td><td id="OPT3" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="OPT4" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line4"><td id="CI045" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM045</td><td id="CM005" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM005</td><td id="CI237" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI237</td><td id="CI058" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI058</td><td id="CI061" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI061</td><td id="CI218" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI218</td><td id="OPT5" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="OPT6" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line5"><td id="CM201" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM201</td><td id="CM202" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM202</td><td id="CI166" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI166</td><td id="CI164" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI164</td><td id="SA214" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">SA214</td><td id="CI220" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI220</td><td id="TG1" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">TG I</td><td id="TG2" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">TG II</td></tr><tr><td colspan="3" bgcolor="#f5f5f5"><strong> * BLOCO A (Formação básica) </strong></td><colspan="5">&nbsp;</td></tr></table>');
	}
	else{
		if (aluno.NUM_VERSAO == "1998") {
			$('#grade').html('<table class="table_grade"><tr><td colspan="8" class="titulos_table">Ciência da Computação <br>Períodos semestrais do curso <br>Grade Curricular 1998</td></tr><tr><td class="titulos_table">1º</td><td class="titulos_table">2º</td><td class="titulos_table">3º</td><td class="titulos_table">4º</td><td class="titulos_table">5º</td><td class="titulos_table">6º</td><td class="titulos_table">7º</td><td class="titulos_table">8º</td></tr><tr id="line1"><td id="CI055" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI055</td><td id="CI056" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI056</td><td id="CI057" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI066</td><td id="CI059" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI215</td><td id="CI058" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI162</td><td id="CI061" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI061</td><td id="CI220" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI221</td><td id="TG2" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">TG2</td></tr><tr id="line2"><td id="CI063" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI063</td><td id="CI067" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI067</td><td id="CI064" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI064</td><td id="CI060" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI060</td><td id="CI062" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI062</td><td id="CI214" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI214</td><td id="CI221" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI221</td><td id="OPT6" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line3"><td id="CI066" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI066</td><td id="CI068" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI068</td><td id="CI210" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI210</td><td id="CI065" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI065</td><td id="CI211" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI211</td><td id="CI218" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI218</td><td id="TG1" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">TG1</td><td id="OPT7" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line4"><td id="CM045" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM045</td><td id="CM005" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM005</td><td id="CI237" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI237</td><td id="CI069" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI069</td><td id="CI215" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI215</td><td id="CI236" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI236</td><td id="OPT4" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="OPT8" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line5"><td id="CM046" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM046</td><td id="CM202" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM202</td><td id="SA214" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">SA214</td><td id="CI212" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI212</td><td id="CI235" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI235</td><td id="OPT2" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="OPT5" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="OPT9" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td></tr><tr id="line6"><td id="CM201" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM201</td><td id="CI202" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI202</td><td id="CE003" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CE003</td><td id="CI219" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CI219</td><td id="SIN070" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">SIN070</td><td id="OPT3" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="nada"></td><td id="nada"></td></tr><tr id="line7"><td id="nada"></td><td id="nada"></td><td id="nada"></td><td id="CM224" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">CM224</td><td id="OPT1" onclick="abreDetalhes(event)" oncontextmenu="abreDetalhes(event)" class="codigo">OPT</td><td id="nada"></td><td id="nada"></td><td id="nada"></td></tr></table>');
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
	var aluno;
	var grr = document.getElementById("grr").value;
	var nomeAluno = document.getElementById("nomeAluno");
	var raAluno = document.getElementById("grrAluno");
	var c = document.getElementById("cAlu");
	alunos = criaAlunos(alunos,registros);
	aluno = procuraAluno(alunos,grr);
	nomeAluno.innerHTML=aluno.NOME_ALUNO;
	raAluno.innerHTML=aluno.MATR_ALUNO;
	c.innerHTML=aluno.NOME_CURSO;
	desenhaGrade(aluno);										//limpa grade curricular
	procuraMaterias(aluno);
}

function mostraDetalheAprovacao(matApr,aluno) {
	//procura array da disciplina no historico do aluno
	//caminha nas diversas disciplinas
	for (var ds = aluno.disciplinas.length - 1; ds >= 0; ds--) {
		ultima = aluno.disciplinas[ds][aluno.disciplinas[ds].length-1];
		if (matApr == 'TG1'){
			if (ultima.DESCR_ESTRUTURA == "Trabalho de Graduação I") {
				materiaAprovada(ultima);
				return;
			};
		};
		if (matApr == 'TG2'){
			if (ultima.DESCR_ESTRUTURA == "Trabalho de Graduação II") {
				materiaAprovada(ultima);
				return;
			};
		};
		if (ultima.COD_ATIV_CURRIC == matApr){
			materiaAprovada(ultima);
			return;
		};
	};
}

function mostraDetalheMateria(codMateria,aluno) {
	var tentativas = 1;
	for (var ds = aluno.disciplinas.length - 1; ds >= 0; ds--) {
		primeira = aluno.disciplinas[ds][0];
		if (primeira.DESCR_ESTRUTURA == "Trabalho de Graduação I"){
			if (codMateria == 'TG1'){
				var str = "";
				str += "<div class=\"DivWithScroll\">";
				for (var i = 0; i <= aluno.disciplinas[ds].length - 1; i++) {
					str += "<b>Tentativa</b> "+tentativas+":\n";
					str += "<table>";
					str += "<tr><td><b>Cursada no período/ano: </b></td><td>"+aluno.disciplinas[ds][i].PERIODO+"/"+aluno.disciplinas[ds][i].ANO+"</td>";
					str += "<tr><td><b>Media final: </b></td><td>"+aluno.disciplinas[ds][i].MEDIA_FINAL+"</td>";
					str += "<tr><td><b>Situação: </b></td><td>"+aluno.disciplinas[ds][i].SITUACAO+"</td>";
					str += "<tr><td><b>Código Disciplina: </b></td><td>"+aluno.disciplinas[ds][i].COD_ATIV_CURRIC+"</td>";
					str += "<tr><td><b>Creditos: </b></td><td>"+aluno.disciplinas[ds][i].CREDITOS+"</td>";
					str += "<tr><td><b>Carga Horária: </b></td><td>"+aluno.disciplinas[ds][i].CH_TOTAL+"</td>";
					str += "<tr><td><b>Tipo Disciplina: </b></td><td>"+aluno.disciplinas[ds][i].DESCR_ESTRUTURA+"</td>";
					str += "<tr><td><b>Frequência: </b></td><td>"+aluno.disciplinas[ds][i].FREQUENCIA+"</td>";
					str += "</table>\n";
					tentativas++;
				};
				str += "</div>";
				new Messi (str, {title: primeira.NOME_ATIV_CURRIC, titleClass: 'info'});
				return;
			};
		};
		if (primeira.DESCR_ESTRUTURA == "Trabalho de Graduação II") {
			if (codMateria == 'TG2'){
				var str = "";
				str += "<div class=\"DivWithScroll\">";
				for (var i = 0; i <= aluno.disciplinas[ds].length - 1; i++) {
					str += "<b>Tentativa</b> "+tentativas+":\n";
					str += "<table>";
					str += "<tr><td><b>Cursada no período/ano: </b></td><td>"+aluno.disciplinas[ds][i].PERIODO+"/"+aluno.disciplinas[ds][i].ANO+"</td>";
					str += "<tr><td><b>Media final: </b></td><td>"+aluno.disciplinas[ds][i].MEDIA_FINAL+"</td>";
					str += "<tr><td><b>Situação: </b></td><td>"+aluno.disciplinas[ds][i].SITUACAO+"</td>";
					str += "<tr><td><b>Código Disciplina: </b></td><td>"+aluno.disciplinas[ds][i].COD_ATIV_CURRIC+"</td>";
					str += "<tr><td><b>Creditos: </b></td><td>"+aluno.disciplinas[ds][i].CREDITOS+"</td>";
					str += "<tr><td><b>Carga Horária: </b></td><td>"+aluno.disciplinas[ds][i].CH_TOTAL+"</td>";
					str += "<tr><td><b>Tipo Disciplina: </b></td><td>"+aluno.disciplinas[ds][i].DESCR_ESTRUTURA+"</td>";
					str += "<tr><td><b>Frequência: </b></td><td>"+aluno.disciplinas[ds][i].FREQUENCIA+"</td>";
					str += "</table>\n";
					tentativas++;
				};
				str += "</div>";
				new Messi (str, {title: primeira.NOME_ATIV_CURRIC, titleClass: 'info'});
				return;
			};
		};
		if (primeira.COD_ATIV_CURRIC == codMateria){
			var str = "";
			str += "<div class=\"DivWithScroll\">";
			for (var i = 0; i <= aluno.disciplinas[ds].length - 1; i++) {
				str += "<b>Tentativa</b> "+tentativas+":\n";
				str += "<table>";
				str += "<tr><td><b>Cursada no período/ano: </b></td><td>"+aluno.disciplinas[ds][i].PERIODO+"/"+aluno.disciplinas[ds][i].ANO+"</td>";
				str += "<tr><td><b>Media final: </b></td><td>"+aluno.disciplinas[ds][i].MEDIA_FINAL+"</td>";
				str += "<tr><td><b>Situação: </b></td><td>"+aluno.disciplinas[ds][i].SITUACAO+"</td>";
				str += "<tr><td><b>Código Disciplina: </b></td><td>"+aluno.disciplinas[ds][i].COD_ATIV_CURRIC+"</td>";
				str += "<tr><td><b>Creditos: </b></td><td>"+aluno.disciplinas[ds][i].CREDITOS+"</td>";
				str += "<tr><td><b>Carga Horária: </b></td><td>"+aluno.disciplinas[ds][i].CH_TOTAL+"</td>";
				str += "<tr><td><b>Tipo Disciplina: </b></td><td>"+aluno.disciplinas[ds][i].DESCR_ESTRUTURA+"</td>";
				str += "<tr><td><b>Frequência: </b></td><td>"+aluno.disciplinas[ds][i].FREQUENCIA+"</td>";
				str += "</table>\n";
				tentativas++;
			};
			str += "</div>";
			new Messi (str, {title: primeira.NOME_ATIV_CURRIC, titleClass: 'info'});
			return;
		};
	};
}

function materiaAprovada(detalhes) {
	var str="<table>";
	str += "<tr><td><b>Última vez cursada (período/ano): </b></td><td>"+detalhes.PERIODO+"/"+detalhes.ANO+"</td>";
	str += "<tr><td><b>Media final: </b></td><td>"+detalhes.MEDIA_FINAL+"</td>";
	str += "<tr><td><b>Situação: </b></td><td>"+detalhes.SITUACAO+"</td>";
	str += "<tr><td><b>Código Disciplina: </b></td><td>"+detalhes.COD_ATIV_CURRIC+"</td>";
	str += "<tr><td><b>Creditos: </b></td><td>"+detalhes.CREDITOS+"</td>";
	str += "<tr><td><b>Carga Horária: </b></td><td>"+detalhes.CH_TOTAL+"</td>";
	str += "<tr><td><b>Tipo Disciplina: </b></td><td>"+detalhes.DESCR_ESTRUTURA+"</td>";
	str += "<tr><td><b>Frequência: </b></td><td>"+detalhes.FREQUENCIA+"</td>";
	str += "</table>\n";
	new Messi (str, {title: detalhes.NOME_ATIV_CURRIC, titleClass: 'info'});
}


function abreDetalhes(event) {
	var alunos = new Object();			//cria a estrutura que conterá os registros dos alunos nas disciplinas
		alunos.tam = 0;					//inicializa numero de registros
		alunos.a = new Array();			//cria a lista para os registros
	var aluno;
	var grr = document.getElementById("grr").value;
	alunos = criaAlunos(alunos,registros);
	aluno = procuraAluno(alunos,grr);
	switch(event.which) {
		case 1:				//left button	
			mostraDetalheAprovacao(event.currentTarget.innerHTML,aluno);
		break;
		case 3:				//right button
			mostraDetalheMateria(event.currentTarget.innerHTML, aluno);
		break;
	}
}