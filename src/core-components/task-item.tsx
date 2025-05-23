import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil (1).svg?react";
import React from "react";
import InputText from "../components/input-text";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import type { Task, TaskState } from "../models/task";
import { cx } from "class-variance-authority";
import useTask from "../hooks/use-task";

interface TaskItemProps {
	task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
	const [isEditing, setIsEditing] = React.useState(
		task?.state === ("creating" as TaskState),
	);
	const [taskTitle, setTaskTitle] = React.useState(task.title || "");
	const { updateTask, updateTaskStatus, deleteTask } = useTask();

	function handleEditTask() {
		setIsEditing(true);
	}

	function handleExitTask() {
		if (task.state === ("creating" as TaskState)) {
			deleteTask(task.id);
		}
		
		setIsEditing(false);
	}

	function handleChangeTaskTitle(event: React.ChangeEvent<HTMLInputElement>) {
		setTaskTitle(event.target.value || "");
	}

	function handleSaveTask(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		updateTask(task.id, {
			title: taskTitle,
		});
		setIsEditing(false);
	}

	function handleUpdateTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
		const checked = e.target.checked;

		updateTaskStatus(task.id, checked);
	}

	function handleDeleteTask() {
		deleteTask(task.id);
	}

	return (
		<>
			<Card size={"md"}>
				{!isEditing ? (
					<div className="flex items-center gap-4">
						<InputCheckbox
							checked={task?.concluded}
							onChange={handleUpdateTaskStatus}
						/>
						<Text
							className={cx("flex-1", {
								"line-through": task?.concluded,
							})}
						>
							{task?.title}
						</Text>
						<div className="flex gap-1">
							<ButtonIcon
								icon={TrashIcon}
								variant={"tertiary"}
								onClick={handleDeleteTask}
							/>
							<ButtonIcon
								icon={PencilIcon}
								variant={"tertiary"}
								onClick={handleEditTask}
							/>
						</div>
					</div>
				) : (
					<form onSubmit={handleSaveTask} className="flex items-center gap-4">
						<InputText
							value={taskTitle}
							className="flex-1"
							required
							autoFocus
							onChange={handleChangeTaskTitle}
						/>
						<div className="flex gap-1">
							<ButtonIcon
								type="button"
								icon={XIcon}
								variant={"secondary"}
								onClick={handleExitTask}
							/>
							<ButtonIcon type="submit" icon={CheckIcon} variant={"primary"} />
						</div>
					</form>
				)}
			</Card>
		</>
	);
}
