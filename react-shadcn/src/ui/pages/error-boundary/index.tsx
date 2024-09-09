type Response = {
  user: {
    name: string;
  };
};

export function ErrorBoundaryPage() {
  const user = {
    userName: 'Lucas Livero',
  } as unknown as Response;

  return (
    <div className="flex">
      <span className="font-bold">Ola, {user.user.name}</span>
    </div>
  );
}
