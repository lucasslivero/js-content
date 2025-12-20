type Body = Record<string, any>;
export function bodyParser<T = Body>(body: string | undefined): T {
  let parsedBody: T = {} as T;
  try {
    if (body) {
      parsedBody = JSON.parse(body);
    }
  } catch {}

  return parsedBody;
}
