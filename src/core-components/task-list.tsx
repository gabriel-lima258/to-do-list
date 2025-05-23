import React from "react";
import Button from "../components/button";
import TaskItem from "./task-item";
import PlusIcon from "../assets/icons/plus.svg?react";
import useTasks from "../hooks/use-tasks";
import useTask from "../hooks/use-task";
import type { TaskState } from "../models/task";

export default function TaskList() {
  // 🔄 Obtém a lista de tarefas e contadores do hook de leitura (localStorage)
  const { tasks } = useTasks();

  // 🆕 Obtém a função de criação de nova tarefa do hook de escrita
  const { prepareTask } = useTask();

  // Handler para o botão "Nova tarefa"
  function handleNewTask() {
    // Cria uma nova tarefa em estado "creating"
    prepareTask();
  }

  return (
    <>
      {/* Botão para adicionar nova tarefa */}
      <section>
        <Button
          icon={PlusIcon}            // Ícone de "+" no botão
          className="w-full"         // Largura total do container
          onClick={handleNewTask}     // Dispara a criação de tarefa
          // Desabilita enquanto já houver tarefa em criação
          disabled={tasks.some(
            task => task.state === ("creating" as TaskState)
          )}
        >
          Nova tarefa
        </Button>
      </section>

      {/* Lista de itens de tarefa */}
      <section className="space-y-2">
        {tasks.map(task => (
          // Cada TaskItem recebe a tarefa inteira como prop
          <TaskItem key={task.id} task={task} />
        ))}
      </section>
    </>
  );
}
