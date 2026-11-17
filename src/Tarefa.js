import React, { useState } from "react";
import { useTarefas } from "./TarefasContext";

/**
 * ============================================================================
 * TRABALHO LPPI - GERENCIADOR DE TAREFAS
 * Aluno: Bruno Reis
 * 
 * Componente: Tarefa
 * - Requisito 2: Checkbox ao lado de cada tarefa para marcar/desmarcar conclusão.
 * - Dica: Utiliza useState para gerenciar o estado local do componente (modo de edição e texto temporário).
 * - Dica: Event listeners (onChange, onClick, onKeyDown) para capturar interações do usuário.
 * ============================================================================
 */
function Tarefa({ tarefa }) {
  const { dispatch } = useTarefas();

  // Estados locais do componente gerenciados via useState
  const [editando, setEditando] = useState(false);
  const [textoEdicao, setTextoEdicao] = useState(tarefa.nome);

  // Alterna o status da tarefa entre concluída e pendente
  function handleAlternarConclusao() {
    dispatch({ type: "ALTERNAR_CONCLUSAO", id: tarefa.id });
  }

  // Remove a tarefa da lista global
  function handleRemover() {
    dispatch({ type: "REMOVER", id: tarefa.id });
  }

  // Salva a edição do nome da tarefa
  function handleSalvarEdicao() {
    const nomeLimpo = textoEdicao.trim();
    if (nomeLimpo === "") return;
    dispatch({ type: "EDITAR", id: tarefa.id, nome: nomeLimpo });
    setEditando(false);
  }

  // Cancela a edição e restaura o nome original
  function handleCancelarEdicao() {
    setTextoEdicao(tarefa.nome);
    setEditando(false);
  }

  // Permite salvar com Enter e cancelar com Escape durante a edição
  function handleKeyDownEdicao(e) {
    if (e.key === "Enter") {
      handleSalvarEdicao();
    } else if (e.key === "Escape") {
      handleCancelarEdicao();
    }
  }

  return (
    <li className={`item-tarefa ${tarefa.concluida ? "concluida" : ""}`}>
      {editando ? (
        // Modo de edição inline utilizando o estado local (useState)
        <div className="modo-edicao">
          <input
            type="text"
            className="input-edicao"
            value={textoEdicao}
            onChange={(e) => setTextoEdicao(e.target.value)}
            onKeyDown={handleKeyDownEdicao}
            autoFocus
          />
          <div className="acoes-edicao">
            <button
              type="button"
              className="btn-salvar"
              onClick={handleSalvarEdicao}
              title="Salvar alterações"
            >
              Salvar
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancelarEdicao}
              title="Cancelar edição"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo de visualização normal com Checkbox (Requisito 2)
        <div className="conteudo-tarefa">
          <label className="label-checkbox">
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={handleAlternarConclusao}
              aria-label={`Marcar ${tarefa.nome} como concluída`}
            />
            <span className="texto-tarefa">{tarefa.nome}</span>
          </label>

          <div className="acoes-tarefa">
            <button
              type="button"
              className="btn-editar"
              onClick={() => {
                setTextoEdicao(tarefa.nome);
                setEditando(true);
              }}
              title="Editar nome da tarefa"
            >
              Editar
            </button>
            <button
              type="button"
              className="btn-remover"
              onClick={handleRemover}
              title="Excluir tarefa"
              aria-label={`Remover ${tarefa.nome}`}
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default Tarefa;
