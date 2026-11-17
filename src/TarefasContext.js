import React, { createContext, useContext, useReducer } from "react";

/**
 * ============================================================================
 * TRABALHO LPPI - GERENCIADOR DE TAREFAS
 * Aluno: Bruno Reis
 * 
 * Requisito 4: Gerenciamento de Estado Global com Context API + useReducer
 * Dica: Atualização imutável do estado sem modificar a lista original diretamente.
 * ============================================================================
 */

// Constantes para os valores possíveis de filtragem
export const FILTROS = {
  TODAS: "todas",
  CONCLUIDAS: "concluidas",
  PENDENTES: "pendentes",
};

// Estado inicial com tarefas pré-cadastradas para demonstração
const estadoInicial = {
  tarefas: [
    { id: 1, nome: "Estudar conceitos de React e Hooks", concluida: true },
    { id: 2, nome: "Implementar Context API e useReducer", concluida: true },
    { id: 3, nome: "Finalizar trabalho de LPPI (Gerenciador de Tarefas)", concluida: false },
  ],
  filtro: FILTROS.TODAS,
};

/**
 * Reducer para gerenciar as ações da lista de tarefas.
 * Todas as operações respeitam o princípio de IMUTABILIDADE:
 * - Nunca usamos push, splice ou alteração direta de propriedades.
 * - Sempre retornamos uma nova referência com spread operator (...), map ou filter.
 */
function tarefasReducer(estado, acao) {
  switch (acao.type) {
    case "ADICIONAR": {
      const novaTarefa = {
        id: Date.now(),
        nome: acao.nome.trim(),
        concluida: false,
      };
      return {
        ...estado,
        tarefas: [...estado.tarefas, novaTarefa],
      };
    }

    case "ALTERNAR_CONCLUSAO": {
      return {
        ...estado,
        tarefas: estado.tarefas.map((tarefa) =>
          tarefa.id === acao.id
            ? { ...tarefa, concluida: !tarefa.concluida }
            : tarefa
        ),
      };
    }

    case "REMOVER": {
      return {
        ...estado,
        tarefas: estado.tarefas.filter((tarefa) => tarefa.id !== acao.id),
      };
    }

    case "EDITAR": {
      return {
        ...estado,
        tarefas: estado.tarefas.map((tarefa) =>
          tarefa.id === acao.id
            ? { ...tarefa, nome: acao.nome.trim() }
            : tarefa
        ),
      };
    }

    case "DEFINIR_FILTRO": {
      return {
        ...estado,
        filtro: acao.filtro,
      };
    }

    case "LIMPAR_CONCLUIDAS": {
      return {
        ...estado,
        tarefas: estado.tarefas.filter((tarefa) => !tarefa.concluida),
      };
    }

    default:
      return estado;
  }
}

// Criação do Contexto React para estado global
const TarefasContext = createContext();

/**
 * Provider do Contexto: provê o estado e o dispatch para toda a árvore de componentes.
 */
export function TarefasProvider({ children }) {
  const [estado, dispatch] = useReducer(tarefasReducer, estadoInicial);

  return (
    <TarefasContext.Provider value={{ estado, dispatch }}>
      {children}
    </TarefasContext.Provider>
  );
}

/**
 * Hook customizado para consumir o contexto com validação de escopo.
 */
export function useTarefas() {
  const contexto = useContext(TarefasContext);
  if (!contexto) {
    throw new Error("useTarefas deve ser utilizado dentro de um TarefasProvider.");
  }
  return contexto;
}

export default TarefasContext;
