import useLocalStorage from "use-local-storage";
import { TASKS_KEY, type Task, type TaskState } from "../models/task";

/**
 * Hook personalizado para gerenciar a lista de tarefas
 * usando o localStorage como fonte de persistência.
 */
export default function useTask() {
  // 🔄 Lê e atualiza um array de Task no localStorage sob a chave TASKS_KEY.
  //    Inicializa com [] se não houver nada salvo ainda.
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  /**
   * prepareTask — cria uma nova tarefa em estado "creating"
   * com ID gerado aleatoriamente e título vazio.
   */
  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9), // ID curto e único
        title: "",                                     // título inicial vazio
        state: "creating" as TaskState,                // tipagem via union cast
      },
    ]);
  }

  /**
   * updateTask — atualiza o título e marca a tarefa como "created"
   * para o task cujo id coincidir.
   *
   * @param id      — ID da tarefa a ser atualizada
   * @param payload — objeto contendo o novo título
   */
  function updateTask(id: string, payload: { title: Task["title"] }) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              state: "created" as TaskState, // muda o estado para criado
              ...payload,                    // aplica novo título
            }
          : task
      )
    );
  }

  /**
   * updateTaskStatus — altera o flag `concluded` de uma tarefa
   *
   * @param id        — ID da tarefa a ser marcada/desmarcada
   * @param concluded — novo valor booleano de `concluded`
   */
  function updateTaskStatus(id: string, concluded: Task["concluded"]) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, concluded } // aplica o novo status de conclusão
          : task
      )
    );
  }

  /**
   * deleteTask — remove do array a tarefa cujo ID corresponda
   *
   * @param id — ID da tarefa a ser deletada
   */
  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // 🚀 Expõe as funções para uso nos componentes:
  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
}
