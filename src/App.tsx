import Text from "./components/text";
import TrashIcon from "./assets/icons/trash.svg?react";
import Icon from "./components/icon";
import Badge from "./components/badge";
import Button from "./components/button";
import ButtonIcon from "./components/button-icon";
// a biblioteca svgr permite importar arquivos svg como componentes react

export default function App() {
  return (
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
      <Icon svg={TrashIcon} animate className="fill-green-dark"/>
      <Badge variant={"primary"}>522</Badge>
      <Badge variant={"secondary"}>51</Badge>
      <Button variant={"primary"} icon={TrashIcon}> Ola</Button>
      <ButtonIcon variant={"primary"} icon={TrashIcon}/>
      <ButtonIcon variant="secondary" icon={TrashIcon}/>
      <ButtonIcon variant={"tertiary"}  icon={TrashIcon}/>
    </div>
  )
}
