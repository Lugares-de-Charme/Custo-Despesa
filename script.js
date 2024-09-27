// Vetores para armazenar os valores
let historicoCustos = [];
let historicoDespesas = [];
let qtdPecasMes = 0; // Variável para armazenar a quantidade de peças produzidas no mês

function limpar() {
    historicoCustos = []; // Limpar o vetor de custos
    historicoDespesas = []; // Limpar o vetor de despesas
    qtdPecasMes = 0;
    console.log('Vetores limpos:', historicoCustos, historicoDespesas,qtdPecasMes);
}

function mudarTela(tela) {
    // Se estiver voltando ao início ou indo para cálculo de despesas, limpamos os vetores
    if (tela === 'inicio') {
        limpar();
        limparCampos();
    }
    // Código já existente para alternar entre as telas
    document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
    document.getElementById(tela).style.display = 'block';
}


// Função de atualização que mantém valores nos vetores e limpa os campos
function atualizarValores() {
    // Armazena valores atuais de custo, se houverem
    let materiaPrima = document.getElementById('materiaPrima').value;
    let custoMP = parseFloat(document.getElementById('custoMP').value);
    let qtdPecas = parseInt(document.getElementById('qtdPecas').value);

    if (materiaPrima !== '' && !isNaN(custoMP) && !isNaN(qtdPecas)) {
        historicoCustos.push({ materiaPrima, custoMP, qtdPecas });
        console.log("Histórico de Custos:", historicoCustos);
    }

    // Armazena valores atuais de despesas, se houverem
    let despesa = document.getElementById('despesaNome').value; // Atualizado
    let valorDespesa = parseFloat(document.getElementById('valorDespesa').value);

    if (despesa !== '' && !isNaN(valorDespesa)) {
        historicoDespesas.push({ despesa, valorDespesa });
        console.log("Histórico de Despesas:", historicoDespesas);
    } else {
        console.log("Erro: Certifique-se de que ambos os campos de despesa estão preenchidos corretamente.");
    }

    // Limpa os campos após armazenar os valores de custo e despesa
    limparCampos();
}

// Captura a quantidade de peças produzidas no mês, com validação e console.log para verificar o valor
function capturarQtdPecasMes() {
    // Tenta capturar o valor como um número inteiro
    qtdPecasMes = parseInt(document.getElementById('qtdPecasMes').value);
    
    // Verifica e exibe no console o valor capturado
    console.log("Valor capturado para qtdPecasMes:", qtdPecasMes);

    // Validação para garantir que a quantidade é válida

    console.log("Quantidade de peças válida capturada:", qtdPecasMes);
    return true;
}


// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById('materiaPrima').value = '';
    document.getElementById('custoMP').value = '';
    document.getElementById('qtdPecas').value = '';

    document.getElementById('despesaNome').value = '';  // Esvazia o campo de despesa
    document.getElementById('valorDespesa').value = '';

    document.getElementById('qtdPecasMes').value = '';
}

function calcularCustoTotal() {
    let custoTotal = 0; // Inicializa o custo total

    // Percorre o vetor de histórico de custos
    historicoCustos.forEach((custo) => {
        let custoPorPeca = custo.custoMP / custo.qtdPecas; // Calcula o custo por peça
        custoTotal += custoPorPeca; // Adiciona ao total
    });

    console.log('Custo Total por Peça:', custoTotal.toFixed(2)); // Exibe o resultado no console
    return custoTotal; // Retorna o custo total calculado
}

function calcularDespesaPorPeca() {
    let totalDespesas = 0;

    // Somar os valores das despesas registradas
    historicoDespesas.forEach((despesa) => {
        totalDespesas += despesa.valorDespesa;
    });

    // Calcular a despesa por peça
    let despesaPorPeca = totalDespesas / qtdPecasMes;

    console.log('Despesa Total:', totalDespesas);
    console.log('Despesa por Peça:', despesaPorPeca.toFixed(2));

    return despesaPorPeca; // Retornar o valor calculado
}

function mostrarResultados() {
    const resultadoCustoTexto = document.getElementById('resultadoCustoTexto');
    
    // Limpa o conteúdo anterior, caso exista
    resultadoCustoTexto.innerHTML = '';

    // Calcula o custo total por peça
    let custoTotal = calcularCustoTotal();

    // Exibe o custo total por peça logo acima da tabela
    resultadoCustoTexto.innerHTML = `
        <p><strong>Custo total por peça: R$ ${custoTotal.toFixed(2)}</strong></p>
    `;

    // Se o vetor de custos estiver vazio, exibe uma mensagem
    if (historicoCustos.length === 0) {
        resultadoCustoTexto.innerHTML += '<p>Nenhum cálculo de custo foi registrado.</p>';
        return;
    }

    // Cria uma div para a tabela
    resultadoCustoTexto.innerHTML += `<div class="tabela-container"></div>`;
    const tabelaContainer = resultadoCustoTexto.querySelector('.tabela-container');
    
    // Cria a tabela dinamicamente
    let tabela = '<table class="tabela-resultado">';
    tabela += `
        <tr>
            <th>Matéria-prima</th>
            <th>Custo</th>
            <th>Rendimento</th>
        </tr>`;

    // Percorre o vetor de custos para preencher a tabela
    historicoCustos.forEach((custo) => {
        tabela += `
        <tr>
            <td>${custo.materiaPrima}</td>
            <td>R$ ${custo.custoMP.toFixed(2)}</td>
            <td>${custo.qtdPecas} peças</td>
        </tr>`;
    });

    tabela += '</table>';

    // Adiciona a tabela ao HTML
    tabelaContainer.innerHTML = tabela;
}


function mostrarResultadosDespesas() {
    const resultadoDespesaTexto = document.getElementById('resultadoDespesaTexto');
    
    // Limpa o conteúdo anterior, caso exista
    resultadoDespesaTexto.innerHTML = '';

    // Se o vetor de despesas estiver vazio, exibe uma mensagem
    if (historicoDespesas.length === 0) {
        resultadoDespesaTexto.innerHTML = '<p class="resultado">Nenhuma despesa foi registrada.</p>';
        return;
    }

    // Calcula a despesa por peça
    let despesaPorPeca = calcularDespesaPorPeca();

    // Exibe o total de despesas por peça logo acima da tabela
    resultadoDespesaTexto.innerHTML = 
        `<p class="resultado"><strong>Despesa total por peça: R$ ${despesaPorPeca.toFixed(2)}</strong></p>
        <p class="resultado">Para cada ${qtdPecasMes} peças produzidas por mês.</p>
        `;

    // Cria uma div para a tabela
    resultadoDespesaTexto.innerHTML += '<div class="tabela-container"></div>';
    const tabelaContainer = resultadoDespesaTexto.querySelector('.tabela-container');
    
    // Cria a tabela dinamicamente
    let tabela = '<table class="tabela-resultado">';
    tabela += 
        `<tr>
            <th>Despesa</th>
            <th>Valor</th>
        </tr>`;

    // Percorre o vetor de despesas para preencher a tabela
    historicoDespesas.forEach((despesa) => {
        tabela += 
        `<tr>
            <td>${despesa.despesa}</td>
            <td>R$ ${despesa.valorDespesa.toFixed(2)}</td>
        </tr>`;
    });

    tabela += '</table>';

    // Adiciona a tabela ao HTML
    tabelaContainer.innerHTML = tabela;
}



function calcularCusto() {
    let materiaPrima = document.getElementById('materiaPrima').value.trim();
    let custoMP = parseFloat(document.getElementById('custoMP').value.trim());
    let qtdPecas = parseInt(document.getElementById('qtdPecas').value.trim());

    // Caso todos os campos estejam vazios
    if (materiaPrima === '' && isNaN(custoMP) && isNaN(qtdPecas)) {
        mudarTela('resultadoCusto');
        mostrarResultados();
        return;  // Evita que os valores vazios sejam inseridos no vetor
    }

    // Caso todos os campos estejam preenchidos
    if (materiaPrima !== '' && !isNaN(custoMP) && !isNaN(qtdPecas)) {
        historicoCustos.push({ materiaPrima, custoMP, qtdPecas });
        console.log('Histórico de Custos:', historicoCustos);
        document.getElementById('materiaPrima').value = '';
        document.getElementById('custoMP').value = '';
        document.getElementById('qtdPecas').value = '';
        mudarTela('resultadoCusto');
        mostrarResultados();
    } else {
        alert('Certifique-se de que todos os campos estão preenchidos ou vazios.');
    }
}




function exibirResultadoCusto() {
    const corpoTabela = document.getElementById('corpoTabelaCusto');
    
    // Limpar a tabela antes de inserir novos dados
    corpoTabela.innerHTML = '';

    // Percorrer o vetor de custos e adicionar uma nova linha para cada item
    custos.forEach((custo, index) => {
        const novaLinha = document.createElement('tr');

        // Criar as células (td) com os valores de matéria-prima, custo e rendimento
        novaLinha.innerHTML = `
            <td>${custo.materiaPrima}</td>
            <td>R$ ${custo.custoMP.toFixed(2)}</td>
            <td>${custo.qtdPecas} peças</td>
        `;

        // Adicionar a nova linha à tabela
        corpoTabela.appendChild(novaLinha);
    });
}


// Função para calcular a despesa
function calcularDespesa() {
    let despesaNome = document.getElementById('despesaNome').value.trim();
    let valorDespesa = parseFloat(document.getElementById('valorDespesa').value.trim());

    // Caso todos os campos estejam vazios
    if (despesaNome === '' && isNaN(valorDespesa)) {
        mudarTela('resultadoDespesa');
        mostrarResultadosDespesas();
        return;  // Evita que valores vazios sejam inseridos no vetor
    }

    // Caso todos os campos estejam preenchidos
    if (despesaNome !== '' && !isNaN(valorDespesa)) {
        historicoDespesas.push({ despesa: despesaNome, valorDespesa });
        console.log('Histórico de Despesas:', historicoDespesas);
        document.getElementById('despesaNome').value = '';
        document.getElementById('valorDespesa').value = '';
        mudarTela('resultadoDespesa');
        mostrarResultadosDespesas();
    } else {
        alert('Certifique-se de que todos os campos estão preenchidos ou vazios.');
    }
}

