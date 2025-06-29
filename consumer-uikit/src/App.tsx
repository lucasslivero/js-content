import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@lucasslivero/uikit";

export function App() {
  return (
    <div>
      <Button>Hello JStack!</Button>

      <Avatar>
        <AvatarImage
          src="https://github.com/lucasslivero.png"
          alt="@lucasslivero"
        />
        <AvatarFallback>MS</AvatarFallback>
      </Avatar>

      <h1 className="bg-blue-500 text-white container">Hello JStack!</h1>
    </div>
  );
}
