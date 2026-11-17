import React, { useState } from "react";
import { TarefasProvider, useTarefas } from "./TarefasContext";
import ListaDeTarefas from "./ListaDeTarefas";
import "./App.css";

/**
 * ============================================================================
 * TRABALHO LPPI - GERENCIADOR DE TAREFAS
 * Aluno: Bruno Reis
 * 
 * Componente: FormularioAdicionar e ConteudoApp
 * - Requisito 1: Campo de entrada (input) e botão para adicionar tarefa.
 * - Requisito 4: Consome o contexto global provido por TarefasProvider.
 * - Dica: Utiliza useState para gerenciar o estado local do input e validação de erro.
 * ============================================================================
 */
function ConteudoApp() {
  const { dispatch } = useTarefas();

  // Estados locais para controlar o texto digitado e mensagens de validação
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");

  // Função para adicionar uma nova tarefa
  function handleAdicionar(e) {
    if (e) e.preventDefault();

    const nomeFormatado = texto.trim();
    if (nomeFormatado === "") {
      setErro("Por favor, digite o nome da tarefa antes de adicionar.");
      return;
    }

    dispatch({ type: "ADICIONAR", nome: nomeFormatado });
    setTexto("");
    setErro("");
  }

  // Limpa o erro assim que o usuário volta a digitar
  function handleInputChange(e) {
    setTexto(e.target.value);
    if (erro) {
      setErro("");
    }
  }

  return (
    <div className="container-app">
      <header className="cabecalho">
        <h1>Gerenciador de Tarefas</h1>
        <p className="subtitulo">Trabalho LPPI - Aluno: Bruno Reis</p>
      </header>

      {/* Requisito 1: Campo de entrada (input) e botão para adicionar tarefas */}
      <form className="formulario-tarefa" onSubmit={handleAdicionar}>
        <div className="grupo-input">
          <input
            type="text"
            className={`input-tarefa ${erro ? "input-com-erro" : ""}`}
            placeholder="O que você precisa fazer?"
            value={texto}
            onChange={handleInputChange}
            aria-label="Nome da nova tarefa"
          />
          <button type="submit" className="btn-adicionar">
            Adicionar
          </button>
        </div>
        {erro && <span className="mensagem-erro">{erro}</span>}
      </form>

      {/* Componente que lista as tarefas e provê a filtragem (Requisitos 2 e 3) */}
      <ListaDeTarefas />
    </div>
  );
}

/**
 * Componente Raiz: App
 * - Estrutura básica requerida: App, ListaDeTarefas e Tarefa.
 * - Provê o estado global utilizando TarefasProvider (Requisito 4).
 */
function App() {
  return (
    <TarefasProvider>
      <ConteudoApp />
    </TarefasProvider>
  );
}

export default App;
