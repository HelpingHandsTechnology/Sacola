import { Text } from "design";

export default function Header(){
  return (
    <header className="flex justify-between">
      <Text xClassName="text-4xl font-bold ">Welcome back! 👋</Text>
      <div>
        <button className="w-8 h-8 bg-black rounded-lg items-center justify-center mr-2">
          <Text xClassName="text-xs font-bold text-white">+</Text>
        </button>
        <button className="w-8 h-8 bg-black rounded-full items-center justify-center">
          <Text xClassName="text-xs font-bold text-white">A</Text>
        </button>
      </div>
    </header>
  )
}
