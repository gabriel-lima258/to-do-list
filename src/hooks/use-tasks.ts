import useLocalStorage from "use-local-storage";
import { TASKS_KEY, type Task } from "../models/task";

/**
 * useTasks — Hook personalizado para gerenciar a lista de tarefas,
 * armazenando e lendo tudo do localStorage automaticamente.
 */
export default function useTasks() {
  // 1️⃣ Lê e escreve um array de Task no localStorage
  //    ⚙️ TASKS_KEY: chave única no storage (ex.: "my-app-tasks")
  //    ⚙️ []: valor inicial (vazio) caso não haja nada salvo ainda
  const [tasks] = useLocalStorage<Task[]>(TASKS_KEY, []);
  // -> `tasks` sempre reflete o estado atual do localStorage

  // 2️⃣ Retorna um objeto com:
  return {
    // ◼️ tasks: a lista completa de tarefas
    tasks,

    // ◼️ tasksCount: número total de tarefas
    tasksCount: tasks.filter((task) => task.state === "created").length,

    // ◼️ concludedTasksCount: 
    //    número de tarefas marcadas como concluídas
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
  };
}
