import React from "react";
// Componentes reutilizáveis
import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import InputText from "../components/input-text";

// Ícones SVG importados como componentes React
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil (1).svg?react";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";

import type { Task, TaskState } from "../models/task";
// Função para combinar classes condicionalmente
import { cx } from "class-variance-authority";
// Hook personalizado para atualizar/deletar tarefas no localStorage
import useTask from "../hooks/use-task";

// Props esperadas pelo componente TaskItem
interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  // Estado local para saber se estamos no modo de edição
  const [isEditing, setIsEditing] = React.useState(
    // Inicia em edição se a tarefa acabou de ser criada
    task?.state === ("creating" as TaskState)
  );
  // Aqui guardamos o texto atual do título, para edição
  const [taskTitle, setTaskTitle] = React.useState(task.title || "");

  // Funções do hook para atualizar, concluir ou deletar a tarefa
  const { updateTask, updateTaskStatus, deleteTask } = useTask();

  // Abre o modo de edição
  function handleEditTask() {
    setIsEditing(true);
  }

  // Sai do modo de edição
  function handleExitTask() {
    // Se a tarefa estava apenas em "creating", ao cancelar a criamos, então excluímos
    if (task.state === ("creating" as TaskState)) {
      deleteTask(task.id);
    }
    setIsEditing(false);
  }

  // Atualiza o estado local do título conforme o usuário digita
  function handleChangeTaskTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value || "");
  }

  // Salva a tarefa (atualiza título e muda estado para "created")
  function handleSaveTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // evita reload
    updateTask(task.id, { title: taskTitle });
    setIsEditing(false);
  }

  // Marca/desmarca a tarefa como concluída
  function handleUpdateTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
    updateTaskStatus(task.id, e.target.checked);
  }

  // Deleta a tarefa
  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <Card size="md">
      {/** Se não estiver editando, mostramos o modo leitura */}
      {!isEditing ? (
        <div className="flex items-center gap-4">
          {/* Checkbox para concluir a tarefa */}
          <InputCheckbox
            checked={task.concluded}
            onChange={handleUpdateTaskStatus}
          />
          {/* Título: aplica line-through se concluída */}
          <Text
            className={cx("flex-1", {
              "line-through": task.concluded,
            })}
          >
            {task.title}
          </Text>
          {/* Botões de ação: excluir e editar */}
          <div className="flex gap-1">
            <ButtonIcon
              icon={TrashIcon}
              variant="tertiary"
              onClick={handleDeleteTask}
            />
            <ButtonIcon
              icon={PencilIcon}
              variant="tertiary"
              onClick={handleEditTask}
            />
          </div>
        </div>
      ) : (
        /** Se estiver editando, mostramos um form para alterar o título */
        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
          <InputText
            value={taskTitle}
            className="flex-1"
            required
            autoFocus
            onChange={handleChangeTaskTitle}
          />
          <div className="flex gap-1">
            {/* Botão para cancelar edição */}
            <ButtonIcon
              type="button"
              icon={XIcon}
              variant="secondary"
              onClick={handleExitTask}
            />
            {/* Botão para salvar edição */}
            <ButtonIcon type="submit" icon={CheckIcon} variant="primary" />
          </div>
        </form>
      )}
    </Card>
  );
}
