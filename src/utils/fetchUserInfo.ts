export async function fetchUserInfo(options: {
  userId: string;
}): Promise<{ level: number; name: string; exp: number }> {
  const resp = await fetch(
    `http://127.0.0.1:4523/m1/2536058-0-default/get-user-info?userId=${options.userId}`,
    {
      method: "GET",
    }
  );
  return await resp.json();
}
