import Text from "../components/text.tsx";
import TrashIcon from "../assets/icons/trash.svg?react";
import Icon from "../components/icon.tsx";
import Badge from "../components/badge.tsx";
import Button from "../components/button.tsx";
import ButtonIcon from "../components/button-icon.tsx";
import InputText from "../components/input-text.tsx";
import InputCheckbox from "../components/input-checkbox.tsx";
import Card from "../components/card.tsx";
import Container from "../components/container.tsx";
// a biblioteca svgr permite importar arquivos svg como componentes react

export default function PageComponents() {
	return (
		<Container>
			<div className="flex flex-col items-center justify-center">
				<Text variant="body-md" className="text-shadow-pink-dark">
					Hello world!
				</Text>
				<Text variant="body-md-bold" className="text-pink-base">
					Ola mundo!
				</Text>
				<Text variant="body-sm-bold" className="text-shadow-green-base">
					Ola mundo!
				</Text>
				<Icon svg={TrashIcon} animate className="fill-green-dark" />
				<Badge variant={"primary"}>522</Badge>
				<Badge variant={"secondary"}>51</Badge>
				<Button variant={"primary"} icon={TrashIcon}>
					{" "}
					Ola
				</Button>
				<ButtonIcon variant={"primary"} icon={TrashIcon} />
				<ButtonIcon variant="secondary" icon={TrashIcon} />
				<ButtonIcon variant={"tertiary"} icon={TrashIcon} />
				<InputText />
				<InputCheckbox />
				<Card size={"md"}>ola mundo</Card>
			</div>
		</Container>
	);
}
