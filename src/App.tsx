import Text from "./components/text";

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
    </div>
  )
}
