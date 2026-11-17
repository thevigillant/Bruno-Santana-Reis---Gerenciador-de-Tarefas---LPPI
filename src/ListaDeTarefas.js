import React, { useState } from "react";
import { useTarefas, FILTROS } from "./TarefasContext";
import Tarefa from "./Tarefa";

/**
 * ============================================================================
 * TRABALHO LPPI - GERENCIADOR DE TAREFAS
 * Aluno: Bruno Reis
 * 
 * Componente: ListaDeTarefas
 * - Requisito 2: Lista as tarefas cadastradas renderizando cada componente Tarefa.
 * - Requisito 3: Permite filtrar tarefas por status (Todas, Concluídas, Pendentes).
 * - Dica: Utiliza useState para gerenciar o estado local do componente (filtro de busca textual).
 * - Dica: Atualização e filtragem estritamente imutáveis.
 * ============================================================================
 */
function ListaDeTarefas() {
  const { estado, dispatch } = useTarefas();
  const { tarefas, filtro } = estado;

  // Estado local gerenciado via useState para busca em tempo real
  const [busca, setBusca] = useState("");

  // Cálculo de contadores para exibição nos botões de filtro
  const totalTodas = tarefas.length;
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = totalTodas - totalConcluidas;

  // 1. Filtragem por status (Requisito 3) de forma puramente imutável
  const tarefasFiltradasPorStatus = tarefas.filter((tarefa) => {
    if (filtro === FILTROS.CONCLUIDAS) return tarefa.concluida;
    if (filtro === FILTROS.PENDENTES) return !tarefa.concluida;
    return true; // FILTROS.TODAS
  });

  // 2. Filtragem adicional por busca textual local (utilizando o estado de busca com useState)
  const tarefasVisiveis = tarefasFiltradasPorStatus.filter((tarefa) =>
    tarefa.nome.toLowerCase().includes(busca.toLowerCase().trim())
  );

  return (
    <section className="secao-lista">
      {/* Requisito 3: Botões de Filtragem por Status */}
      <div className="barra-filtros">
        <button
          type="button"
          className={`btn-filtro ${filtro === FILTROS.TODAS ? "ativo" : ""}`}
          onClick={() => dispatch({ type: "DEFINIR_FILTRO", filtro: FILTROS.TODAS })}
        >
          Todas ({totalTodas})
        </button>
        <button
          type="button"
          className={`btn-filtro ${filtro === FILTROS.CONCLUIDAS ? "ativo" : ""}`}
          onClick={() => dispatch({ type: "DEFINIR_FILTRO", filtro: FILTROS.CONCLUIDAS })}
        >
          Concluídas ({totalConcluidas})
        </button>
        <button
          type="button"
          className={`btn-filtro ${filtro === FILTROS.PENDENTES ? "ativo" : ""}`}
          onClick={() => dispatch({ type: "DEFINIR_FILTRO", filtro: FILTROS.PENDENTES })}
        >
          Pendentes ({totalPendentes})
        </button>
      </div>

      {/* Campo de busca rápida demonstrando useState local no componente */}
      {totalTodas > 0 && (
        <div className="campo-busca">
          <input
            type="text"
            placeholder="Pesquisar tarefas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
            aria-label="Pesquisar tarefas"
          />
          {busca && (
            <button
              type="button"
              className="btn-limpar-busca"
              onClick={() => setBusca("")}
              title="Limpar pesquisa"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Renderização da lista ou mensagem de vazio */}
      {tarefasVisiveis.length === 0 ? (
        <div className="estado-vazio">
          <p>
            {busca
              ? `Nenhuma tarefa encontrada com o termo "${busca}".`
              : filtro === FILTROS.CONCLUIDAS
              ? "Nenhuma tarefa concluída no momento."
              : filtro === FILTROS.PENDENTES
              ? "Parabéns! Todas as tarefas estão concluídas."
              : "Sua lista está vazia. Adicione uma tarefa acima!"}
          </p>
        </div>
      ) : (
        <ul className="lista-tarefas">
          {tarefasVisiveis.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))}
        </ul>
      )}

      {/* Ação complementar: limpar concluídas */}
      {totalConcluidas > 0 && (
        <div className="rodape-acoes">
          <button
            type="button"
            className="btn-limpar-concluidas"
            onClick={() => dispatch({ type: "LIMPAR_CONCLUIDAS" })}
          >
            Limpar Concluídas ({totalConcluidas})
          </button>
        </div>
      )}
    </section>
  );
}

export default ListaDeTarefas;
