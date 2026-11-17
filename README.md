# Gerenciador de Tarefas - Trabalho LPPI

> **Disciplina:** Linguagens de Programação Para a Internet (LPPI)  
> **Aluno:** Bruno Reis  
> **Pontuação:** 20 pontos  

---

## 🎯 Sobre o Projeto

Aplicação desenvolvida em **React** para gerenciamento de tarefas cotidianas, atendendo 100% dos requisitos acadêmicos solicitados na atividade discursiva. O projeto emprega as melhores práticas modernas do React: componentização limpa, Context API combinada com `useReducer` para gerenciamento de estado global centralizado, `useState` para controle de estados locais em cada componente, e manipulação estritamente imutável dos dados.

---

## 📋 Requisitos Atendidos

| # | Requisito | Como foi Implementado |
|---|-----------|------------------------|
| **1** | **Adicionando Tarefas** | Campo `<input>` com validação de campos vazios, feedback visual, listener de teclado (`Enter`) e botão `"Adicionar"` com disparo de evento. |
| **2** | **Lista de Tarefas com Checkbox** | Listagem dinâmica onde cada tarefa possui um `<input type="checkbox">` que altera o status (pendente / concluída) com texto tachado e estilização diferenciada. |
| **3** | **Filtragem de Tarefas** | Botões com contadores dinâmicos para alternar entre as visualizações: **Todas**, **Concluídas** e **Pendentes**, além de funcionalidade para limpar tarefas concluídas. |
| **4** | **Estado Global (Context API + useReducer)** | Criação do `TarefasContext` com `useReducer`, centralizando todas as mutações e regras de negócio através de ações tipadas (`ADICIONAR`, `ALTERNAR_CONCLUSAO`, `REMOVER`, `EDITAR`, `DEFINIR_FILTRO`, `LIMPAR_CONCLUIDAS`). |

---

## 🧩 Estrutura de Componentes e Hooks

Conforme solicitado nas dicas da atividade:

1. **`App` (Componente Raiz):**
   - Envolve a aplicação com o `<TarefasProvider>`.
   - Controla o estado local (`useState`) do formulário de entrada e as mensagens de erro/validação.

2. **`ListaDeTarefas` (Componente de Listagem):**
   - Consome o estado global através do hook `useTarefas()`.
   - Aplica a filtragem por status (`Todas`, `Concluídas`, `Pendentes`) de forma imutável.
   - Utiliza estado local (`useState`) para busca textual instantânea entre as tarefas cadastradas.

3. **`Tarefa` (Componente Individual de Item):**
   - Renderiza a linha de cada tarefa com checkbox e botões de ação.
   - Utiliza estado local (`useState`) para controle do modo de edição inline (`editando` e `textoEdicao`).
   - Dispara eventos de alteração de status, edição e exclusão para o estado global via `dispatch`.

---

## ⚡ Princípio da Imutabilidade

Todas as operações no `tarefasReducer` foram construídas respeitando a imutabilidade do React:
- **Adição:** Uso do spread operator `[...estado.tarefas, novaTarefa]`.
- **Alternar Conclusão / Edição:** Uso de `estado.tarefas.map(...)` retornando cópias dos objetos atualizados.
- **Remoção:** Uso de `estado.tarefas.filter(...)` gerando um novo array sem mutar o original.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado (versão 14 ou superior)
- Gerenciador de pacotes **yarn** (ou npm)

### Passo a Passo

1. Abra o terminal na pasta do projeto:
   ```bash
   cd "Bruno Reis/gerenciador-de-tarefas"
   ```

2. Instale as dependências listadas no `package.json`:
   ```bash
   yarn
   # ou: npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn start
   # ou: npm start
   ```

4. O navegador abrirá automaticamente em [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura de Arquivos

```text
Bruno Reis/
└── gerenciador-de-tarefas/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.css               # Estilização moderna e responsiva
    │   ├── App.js                # Componente principal e formulário
    │   ├── ListaDeTarefas.js     # Componente de listagem e filtros
    │   ├── Tarefa.js             # Componente de item individual com edição
    │   ├── TarefasContext.js     # Context API + useReducer para estado global
    │   └── index.js              # Ponto de entrada React 18
    ├── .gitignore
    ├── package.json
    └── README.md
```
