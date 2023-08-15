console.log("Terminal")

const mediaEscola = 6;
let alunos = [];

function cadastrarAluno(codigo, nome, sobrenome, email, notas) {
    if (!codigo || !nome || !sobrenome || !email || !notas || notas.length !== 3) {
        console.error("Erro: Todos os campos devem ser preenchidos corretamente.");
        return;
    }
    if (alunos.some(aluno => aluno.codigo === codigo || aluno.nome === nome || aluno.email === email)) {
        console.error("Erro: Aluno já cadastrado.");
        return;
    }
    let novoAluno = {
        codigo: codigo,
        nome: nome.trim(),
        sobrenome: sobrenome,
        email: email,
        notas: notas,
        ativo: true
    };
    alunos.push(novoAluno);
    console.log("Aluno cadastrado com sucesso!");
    atualizarTabela();
}

function removerAluno(codigo) {
    let index = alunos.findIndex(aluno => aluno.codigo === codigo);
    if (index === -1) {
        console.error("Erro: Aluno não encontrado.");
        return;
    }
    alunos.splice(index, 1);
    console.log("Aluno removido com sucesso!");
    atualizarTabela();
}

function buscarAluno(codigo) {
    let aluno = alunos.find(aluno => aluno.codigo === codigo);
    if (!aluno) {
        console.error("Erro: Aluno não encontrado.");
        return;
    }
    console.log(aluno);
}

function listarAlunos() {
    console.table(alunos);
}

function calcularMediaAluno(codigo) {
    let aluno = alunos.find(aluno => aluno.codigo === codigo);
    if (!aluno) {
        console.error("Erro: Aluno não encontrado.");
        return;
    }
    let media = aluno.notas.reduce((acc, nota) => acc + nota) / 3;
    console.log(`Média do aluno ${aluno.nome}: ${media}`);
}

function desativarAluno(codigo) {
    let index = alunos.findIndex(aluno => aluno.codigo === codigo);
    if (index === -1) {
        console.error("Erro: Aluno não encontrado.");
        return;
    }
    alunos[index].ativo = false;
    console.log("Aluno desativado com sucesso!");
}

function listarAlunosAtivos() {
    let alunosAtivos = alunos.filter(aluno => aluno.ativo);
    console.table(alunosAtivos);
}

function listarAlunosInativos() {
    let alunosInativos = alunos.filter(aluno => !aluno.ativo);
    console.table(alunosInativos);
}

function listarAlunosComMediaEsperada() {
    let alunosComMediaEsperada = alunos.filter(aluno => {
        let media = aluno.notas.reduce((acc, nota) => acc + nota) / 3;
        return media >= mediaEscola;
    });
    console.table(alunosComMediaEsperada);
}

function listarAlunosAbaixoDaMedia() {
    let alunosAbaixoDaMedia = alunos.filter(aluno => {
        let media = aluno.notas.reduce((acc, nota) => acc + nota) / 3;
        return media < mediaEscola;
    });
    console.table(alunosAbaixoDaMedia);
}

document.getElementById("form-cadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)
    
    let codigo = document.getElementById("codigo").value;
    let nome = document.getElementById("nome").value;
    let sobrenome = document.getElementById("sobrenome").value;
    let email = document.getElementById("email").value;
    let nota1 = parseFloat(document.getElementById("nota1").value);
    let nota2 = parseFloat(document.getElementById("nota2").value);
    let nota3 = parseFloat(document.getElementById("nota3").value);
    
    cadastrarAluno(codigo, nome, sobrenome, email, [nota1, nota2, nota3]);
    
    // Limpa os campos do formulário
    document.getElementById("codigo").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    
    // Atualiza a tabela de alunos
    atualizarTabela();
});


function atualizarTabela() {
    let tabela = document.getElementById("tabela-alunos");
    
    // Limpa o conteúdo da tabela
    tabela.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Média</th>
            <th>Ativo</th>
            <th>Ações</th>
        </tr>
    `;
    
    // Adiciona os dados dos alunos à tabela
    for (let aluno of alunos) {
        let media = aluno.notas.reduce((acc, nota) => acc + nota) / 3;
        tabela.innerHTML += `
            <tr>
                <td>${aluno.codigo}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.sobrenome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.notas[0]}</td>
                <td>${aluno.notas[1]}</td>
                <td>${aluno.notas[2]}</td>
                <td>${media.toFixed(1)}</td>
                <td>${aluno.ativo ? "Sim" : "Não"}</td>
                <td><button onclick="removerAluno('${aluno.codigo}')">Remover</button></td>
            </tr>
        `;
    }
}

