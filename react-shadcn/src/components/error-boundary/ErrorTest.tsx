type Response = {
  user: {
    name: string;
  };
};
export function ErrorTest() {
  const user = {
    userName: 'Lucas Livero',
  } as unknown as Response;
  return <span className="font-bold">Ola, {user.user.name}</span>;
}
