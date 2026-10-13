const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function toBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileData.toString('base64')}`;
}

const imgInicialOverview = toBase64('reports/screenshot_inicial_overview.png');
const imgInicialOperacoes = toBase64('reports/screenshot_inicial_operacoes.png');
const imgFinalOverview = toBase64('reports/screenshot_final_overview.png');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório - Análise de Eficácia de Testes com Teste de Mutação</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    @page {
      size: A4 portrait;
      margin: 14mm 14mm 14mm 14mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 9.8pt;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    .page {
      page-break-after: always;
      height: 100%;
      min-height: 260mm;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Header & Footer styling for pages */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 14px;
      font-size: 7.8pt;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .page-footer {
      margin-top: auto;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 7.8pt;
      color: #94a3b8;
    }

    /* Capa (Página 1) */
    .cover-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 30px 15px 15px 15px;
    }

    .institution-block {
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 15px;
    }

    .institution-title {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      margin: 0;
    }

    .discipline-title {
      font-size: 11pt;
      font-weight: 500;
      color: #475569;
      margin-top: 6px;
    }

    .cover-main {
      margin: auto 0;
      padding: 20px 0;
    }

    .badge-tag {
      display: inline-block;
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #bfdbfe;
      border-radius: 9999px;
      padding: 4px 14px;
      font-size: 8.5pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 15px;
    }

    .report-title {
      font-size: 22pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
      margin: 0 0 12px 0;
    }

    .report-subtitle {
      font-size: 11pt;
      color: #475569;
      max-width: 580px;
      margin: 0 auto;
      line-height: 1.45;
    }

    .meta-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px 20px;
      max-width: 520px;
      margin: 25px auto 0 auto;
      text-align: left;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
    }

    .meta-label {
      font-size: 7.5pt;
      text-transform: uppercase;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 2px;
    }

    .meta-val {
      font-size: 9.5pt;
      font-weight: 600;
      color: #0f172a;
    }

    .meta-val a {
      color: #2563eb;
      text-decoration: none;
      word-break: break-all;
    }

    /* Headings */
    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px 0;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    h2 .num {
      background: #2563eb;
      color: #ffffff;
      font-size: 9pt;
      font-weight: 700;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e293b;
      margin: 12px 0 6px 0;
    }

    p {
      margin: 0 0 9px 0;
      text-align: justify;
      color: #334155;
    }

    /* Metric cards */
    .metric-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 10px 0 14px 0;
    }

    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      text-align: center;
    }

    .metric-card.highlight-green {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }

    .metric-card.highlight-orange {
      background: #fffbeb;
      border-color: #fde68a;
    }

    .metric-card.highlight-red {
      background: #fef2f2;
      border-color: #fecaca;
    }

    .metric-val {
      font-size: 16pt;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 4px;
    }

    .metric-val.green { color: #16a34a; }
    .metric-val.orange { color: #d97706; }
    .metric-val.red { color: #dc2626; }
    .metric-val.blue { color: #2563eb; }

    .metric-lbl {
      font-size: 7.2pt;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748b;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 12px 0;
      font-size: 8.5pt;
    }

    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 9px;
      text-align: left;
    }

    th {
      background: #f1f5f9;
      font-weight: 600;
      color: #0f172a;
    }

    tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Images */
    .screenshot-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 7px;
      padding: 5px;
      margin: 8px 0 12px 0;
      text-align: center;
    }

    .screenshot-box img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      display: block;
      margin: 0 auto;
    }

    .screenshot-caption {
      font-size: 7.5pt;
      font-weight: 500;
      color: #64748b;
      margin-top: 4px;
      text-align: center;
    }

    /* Code blocks & mutator boxes */
    .mutant-card {
      border: 1px solid #e2e8f0;
      border-left: 4px solid #ef4444;
      background: #ffffff;
      border-radius: 6px;
      padding: 9px 12px;
      margin-bottom: 10px;
    }

    .mutant-card.fixed {
      border-left-color: #10b981;
    }

    .mutant-title {
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .mutant-badge {
      font-size: 7pt;
      font-weight: 600;
      text-transform: uppercase;
      padding: 2px 7px;
      border-radius: 4px;
      background: #fee2e2;
      color: #b91c1c;
    }

    .mutant-badge.killed {
      background: #d1fae5;
      color: #065f46;
    }

    .code-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 5px 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.8pt;
    }

    .code-pane {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 6px 8px;
    }

    .code-pane.original { border-left: 3px solid #64748b; }
    .code-pane.mutated { border-left: 3px solid #ef4444; }
    .code-pane.solution { border-left: 3px solid #10b981; }

    .code-pane-title {
      font-size: 6.8pt;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 2px;
    }

    .code-text {
      white-space: pre-wrap;
      word-break: break-all;
      color: #0f172a;
    }

    .alert-box {
      background: #eff6ff;
      border-left: 3.5px solid #2563eb;
      padding: 8px 12px;
      border-radius: 4px;
      margin: 9px 0;
      font-size: 8.8pt;
      color: #1e3a8a;
    }

    .alert-box.success {
      background: #f0fdf4;
      border-left-color: #16a34a;
      color: #14532d;
    }

    ul, ol {
      margin: 4px 0 10px 18px;
      padding: 0;
      font-size: 9pt;
      color: #334155;
    }

    li {
      margin-bottom: 3px;
    }
  </style>
</head>
<body>

  <!-- ==================== PÁGINA 1: CAPA ==================== -->
  <div class="page">
    <div class="cover-container">
      <div class="institution-block">
        <h1 class="institution-title">Engenharia de Software e Qualidade de Software</h1>
        <div class="discipline-title">Laboratório de Teste de Software &bull; Teste de Mutação com StrykerJS</div>
      </div>

      <div class="cover-main">
        <div class="badge-tag">Relatório Técnico Experimental</div>
        <h2 class="report-title" style="border:none; display:block; padding:0; font-size:23pt;">
          Análise de Eficácia de Testes com Teste de Mutação
        </h2>
        <div class="report-subtitle">
          Avaliação crítica da insuficiência da métrica de cobertura de código (Code Coverage) e aprimoramento sistemático da suíte de testes unitários através da ferramenta StrykerJS.
        </div>

        <div class="meta-card">
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Estudante / Autor</span>
              <span class="meta-val">Tiago Boaventura Amaral</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Matrícula</span>
              <span class="meta-val">847972</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Disciplina</span>
              <span class="meta-val">Teste e Qualidade de Software</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Data de Realização</span>
              <span class="meta-val">Outubro de 2026</span>
            </div>
            <div class="meta-item" style="grid-column: span 2;">
              <span class="meta-label">Repositório Fork GitHub</span>
              <span class="meta-val">
                <a href="https://github.com/TiagoBoavAmaral/operacoes-mutante" target="_blank">
                  https://github.com/TiagoBoavAmaral/operacoes-mutante
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style="font-size: 8.5pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px;">
        Projeto base: <code>CleitonSilvaT/operacoes-mutante</code> &bull; Suíte de Testes Jest + StrykerJS Mutator
      </div>
    </div>
  </div>

  <!-- ==================== PÁGINA 2: ANÁLISE INICIAL ==================== -->
  <div class="page">
    <div class="page-header">
      <span>Relatório Técnico &bull; Teste de Mutação</span>
      <span>Página 2</span>
    </div>

    <h2><span class="num">1</span> Análise Inicial: A Falácia dos 100% de Cobertura</h2>

    <p>
      Na primeira etapa experimental do trabalho, realizou-se a execução da suíte de testes original pré-existente no projeto (50 testes para 50 funções aritméticas em <code>src/operacoes.js</code>). Inicialmente, executou-se a ferramenta Jest com o coletor nativo de cobertura (<code>npm test -- --coverage</code>), seguido da execução do framework de teste de mutação <strong>StrykerJS</strong> (<code>npx stryker run</code>).
    </p>

    <div class="metric-row">
      <div class="metric-card highlight-green">
        <div class="metric-val green">100%</div>
        <div class="metric-lbl">Linhas (Lines)</div>
      </div>
      <div class="metric-card highlight-green">
        <div class="metric-val green">100%</div>
        <div class="metric-lbl">Ramos (Branches)</div>
      </div>
      <div class="metric-card highlight-green">
        <div class="metric-val green">100%</div>
        <div class="metric-lbl">Funções (Funcs)</div>
      </div>
      <div class="metric-card highlight-orange">
        <div class="metric-val orange">73.71%</div>
        <div class="metric-lbl">Score Stryker Inicial</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Métrica de Avaliação</th>
          <th>Ferramenta</th>
          <th>Resultado Inicial</th>
          <th>Diagnóstico Crítico</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cobertura de Linhas (Line Coverage)</strong></td>
          <td>Jest Coverage</td>
          <td><strong>100%</strong> (74/74 linhas)</td>
          <td>Todas as instruções foram executadas durante a suíte.</td>
        </tr>
        <tr>
          <td><strong>Cobertura de Ramos (Branch Coverage)</strong></td>
          <td>Jest Coverage</td>
          <td><strong>100%</strong> (34/34 ramos)</td>
          <td>Todos os caminhos lógicos formais foram percorridos.</td>
        </tr>
        <tr>
          <td><strong>Mutation Score Inicial</strong></td>
          <td>StrykerJS</td>
          <td><strong>73.71%</strong> (157 detectados / 213 total)</td>
          <td><strong>44 mutantes sobreviveram</strong> e 12 sem cobertura efetiva de asserção.</td>
        </tr>
      </tbody>
    </table>

    <div class="alert-box">
      <strong>Discussão da Discrepância:</strong> Embora a cobertura clássica aponte 100%, ela apenas mede <em>quais linhas de código foram executadas</em>, e <u>não</u> se as asserções (<code>expect</code>) realmente verificam o comportamento correto dos algoritmos diante de desvios sutis. A suíte original apresentava asserções simplistas (um único caso favorável por função), ignorando condições de contorno, ramos negativos e validação estrita de exceções.
    </div>

    <div class="screenshot-box" style="margin-top: 15px;">
      <img src="${imgInicialOverview}" style="max-height: 210px;" alt="Visão Geral Inicial do Stryker">
      <div class="screenshot-caption">Figura 1: Relatório inicial do StrykerJS comprovando Mutation Score de 73,71% com 44 mutantes sobreviventes e 12 sem cobertura efetiva.</div>
    </div>

    <div class="page-footer">
      <span>Tiago Boaventura Amaral &bull; Teste de Mutação</span>
      <span>2 de 4</span>
    </div>
  </div>

  <!-- ==================== PÁGINA 3: MUTANTES CRÍTICOS E SOLUÇÃO ==================== -->
  <div class="page">
    <div class="page-header">
      <span>Relatório Técnico &bull; Teste de Mutação</span>
      <span>Página 3</span>
    </div>

    <h2><span class="num">2</span> Análise de Mutantes Críticos da 1ª Execução</h2>

    <p>
      Para compreender a fragilidade da suíte inicial, foram selecionados <strong>três mutantes sobreviventes emblemáticos</strong> gerados pelo StrykerJS na primeira execução:
    </p>

    <!-- Mutante 1 -->
    <div class="mutant-card">
      <div class="mutant-title">
        <span>1. Mutante #17 &bull; <code>raizQuadrada(n)</code> (Linha 13)</span>
        <span class="mutant-badge">Sobreviveu Inicialmente</span>
      </div>
      <div class="code-comparison">
        <div class="code-pane original">
          <div class="code-pane-title">Código Original</div>
          <div class="code-text">if (n < 0) throw new Error(...);</div>
        </div>
        <div class="code-pane mutated">
          <div class="code-pane-title">Mutação Aplicada (EqualityOperator)</div>
          <div class="code-text">if (n <= 0) throw new Error(...);</div>
        </div>
      </div>
      <p style="margin: 3px 0 0 0; font-size: 8.5pt;">
        <strong>Por que sobreviveu?</strong> O teste original avaliava apenas <code>expect(raizQuadrada(16)).toBe(4)</code>. Nunca testava a fronteira crítica em que <code>n === 0</code>. Se o operador for alterado para <code><= 0</code>, a função passa a lançar erro incorretamente para zero, mas o teste original não testava esse valor e não notou o bug.
      </p>
    </div>

    <!-- Mutante 2 -->
    <div class="mutant-card">
      <div class="mutant-title">
        <span>2. Mutante #68 &bull; <code>isPar(n)</code> (Linha 43)</span>
        <span class="mutant-badge">Sobreviveu Inicialmente</span>
      </div>
      <div class="code-comparison">
        <div class="code-pane original">
          <div class="code-pane-title">Código Original</div>
          <div class="code-text">function isPar(n) { return n % 2 === 0; }</div>
        </div>
        <div class="code-pane mutated">
          <div class="code-pane-title">Mutação Aplicada (BooleanLiteral)</div>
          <div class="code-text">function isPar(n) { return true; }</div>
        </div>
      </div>
      <p style="margin: 3px 0 0 0; font-size: 8.5pt;">
        <strong>Por que sobreviveu?</strong> O teste original testava apenas <code>expect(isPar(4)).toBe(true)</code>. Uma função degenerada que retorna <code>true</code> para qualquer entrada passava no teste com 100% de cobertura da linha! Faltava asserção para o ramo falso (número ímpar).
      </p>
    </div>

    <!-- Mutante 3 -->
    <div class="mutant-card">
      <div class="mutant-title">
        <span>3. Mutante #116 &bull; <code>isPrimo(n)</code> (Linha 73)</span>
        <span class="mutant-badge">Sobreviveu Inicialmente</span>
      </div>
      <div class="code-comparison">
        <div class="code-pane original">
          <div class="code-pane-title">Código Original</div>
          <div class="code-text">if (n <= 1) return false;</div>
        </div>
        <div class="code-pane mutated">
          <div class="code-pane-title">Mutação Aplicada (EqualityOperator)</div>
          <div class="code-text">if (n < 1) return false;</div>
        </div>
      </div>
      <p style="margin: 3px 0 0 0; font-size: 8.5pt;">
        <strong>Por que sobreviveu?</strong> O teste original verificava apenas <code>expect(isPrimo(7)).toBe(true)</code>. Com <code>n < 1</code>, para <code>n = 1</code> o código não retorna falso e cai no laço <code>for (i = 2; i < 1)</code> que termina imediatamente, retornando <code>true</code> (declarando falsamente que 1 é primo). Nenhum teste avaliava <code>isPrimo(1)</code>.
      </p>
    </div>

    <h2><span class="num">3</span> Solução Implementada: Fortalecimento da Suíte</h2>

    <p>
      Para eliminar os mutantes sobreviventes, foi criada uma segunda suíte <code>describe('Suíte fortalecida para matar mutantes sobreviventes')</code> com testes projetados especificamente para cobrir:
    </p>

    <ul>
      <li><strong>Condições de Limite / Fronteira:</strong> <code>expect(raizQuadrada(0)).toBe(0)</code> eliminou o mutante #17; <code>expect(isPrimo(1)).toBe(false)</code> e <code>expect(isPrimo(0)).toBe(false)</code> mataram o mutante #116.</li>
      <li><strong>Ramos Negativos e Falseabilidade:</strong> <code>expect(isPar(7)).toBe(false)</code> e <code>expect(isImpar(8)).toBe(false)</code> eliminaram o mutante #68.</li>
      <li><strong>Asserção Estrita de Exceções e Mensagens:</strong> Validação de mensagens originais lançadas em <code>inverso(0)</code>, <code>fatorial(-3)</code>, <code>maximoArray([])</code> e <code>medianaArray([])</code>, matando mutantes que removiam os erros ou esvaziavam blocos.</li>
      <li><strong>Operações com Tipos Estritos e Arrays Especiais:</strong> Testes em <code>clamp</code> com entradas string e limites invertidos (matando mutantes de igualdade #147 e #151) e <code>produtoArray({ length: 0 })</code> (matando mutante #140).</li>
    </ul>

    <div class="page-footer">
      <span>Tiago Boaventura Amaral &bull; Teste de Mutação</span>
      <span>3 de 4</span>
    </div>
  </div>

  <!-- ==================== PÁGINA 4: RESULTADOS FINAIS E CONCLUSÃO ==================== -->
  <div class="page">
    <div class="page-header">
      <span>Relatório Técnico &bull; Teste de Mutação</span>
      <span>Página 4</span>
    </div>

    <h2><span class="num">4</span> Resultados Finais: Superação da Meta</h2>

    <p>
      Após a implementação da suíte fortalecida com 17 novos blocos de teste detalhados (totalizando 67 testes no Jest), executou-se novamente a análise completa do StrykerJS. A pontuação de mutação final atingiu <strong>98,12%</strong>, superando com folga a meta estabelecida no trabalho (> 98%).
    </p>

    <div class="metric-row">
      <div class="metric-card highlight-green">
        <div class="metric-val green">98.12%</div>
        <div class="metric-lbl">Mutation Score Final</div>
      </div>
      <div class="metric-card highlight-green">
        <div class="metric-val green">205</div>
        <div class="metric-lbl">Mutantes Mortos (Killed)</div>
      </div>
      <div class="metric-card highlight-green">
        <div class="metric-val blue">4</div>
        <div class="metric-lbl">Timeout (Mortos)</div>
      </div>
      <div class="metric-card">
        <div class="metric-val orange">4</div>
        <div class="metric-lbl">Sobreviventes (Equivalentes)</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Métrica</th>
          <th>Execução Inicial</th>
          <th>Execução Final</th>
          <th>Evolução Obtida</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mutation Score Total</strong></td>
          <td>73.71%</td>
          <td><strong>98.12%</strong></td>
          <td><span style="color:#16a34a; font-weight:700;">+ 24.41 pontos percentuais</span></td>
        </tr>
        <tr>
          <td><strong>Mutantes Detectados</strong></td>
          <td>157 / 213</td>
          <td><strong>209 / 213</strong></td>
          <td><span style="color:#16a34a; font-weight:700;">+ 52 mutantes eliminados</span></td>
        </tr>
        <tr>
          <td><strong>Mutantes Sobreviventes</strong></td>
          <td>44 sobreviventes</td>
          <td><strong>4 sobreviventes</strong></td>
          <td>Redução de 90,9% nas falhas de teste</td>
        </tr>
        <tr>
          <td><strong>Mutantes sem Cobertura</strong></td>
          <td>12 sem cobertura</td>
          <td><strong>0 sem cobertura</strong></td>
          <td>100% de cobertura efetiva atingida</td>
        </tr>
      </tbody>
    </table>

    <div class="screenshot-box">
      <img src="${imgFinalOverview}" style="max-height: 185px;" alt="Visão Geral Final do Stryker">
      <div class="screenshot-caption">Figura 3: Relatório final do StrykerJS confirmando Mutation Score de 98,12% (209 detectados, apenas 4 sobreviventes).</div>
    </div>

    <div class="alert-box success">
      <strong>Análise dos 4 Mutantes Remanescentes (Mutantes Equivalentes):</strong> Os únicos 4 mutantes que restaram encontram-se na linha 19 da função <code>fatorial</code> (<code>if (n === 0 || n === 1) return 1;</code>). Como a função inicializa <code>resultado = 1</code> e executa o laço de <code>i = 2</code> até <code>n</code>, a condição <code>if</code> é redundante: mesmo substituindo a expressão por <code>false</code> ou <code>&&</code>, o laço não executa para <code>n = 0</code> ou <code>n = 1</code> e a função retorna <code>1</code> normalmente. Trata-se de um clássico caso de <em>mutantes equivalentes</em> (cujo comportamento externo é idêntico ao código original em todo o domínio válido).
    </div>

    <h2><span class="num">5</span> Conclusão e Considerações Finais</h2>

    <p>
      Este trabalho evidenciou de forma contundente que a métrica convencional de <strong>cobertura de código (Code Coverage)</strong> é uma condição necessária, porém insuficiente, para assegurar a qualidade de software. Ter 100% de cobertura sem asserções rigorosas gera uma falsa sensação de segurança.
    </p>
    <p>
      O <strong>Teste de Mutação</strong> atuou como o verdadeiro "teste dos testes", injetando falhas artificiais e forçando o desenvolvimento de uma suíte orientada à detecção real de defeitos e análise de valores-limite. A melhoria de <strong>73,71% para 98,12%</strong> comprova cientificamente o ganho de robustez e confiabilidade na base de código.
    </p>

    <div class="page-footer">
      <span>Tiago Boaventura Amaral &bull; Teste de Mutação</span>
      <span>4 de 4</span>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('relatorio_teste_mutacao.html', htmlContent, 'utf8');
console.log('HTML do relatório gerado com sucesso: relatorio_teste_mutacao.html');
