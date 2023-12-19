export default async function startTrackingGameDuration() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(
    `https://arwin-wheres-wally-backend.fly.dev/user/${userId}/duration/start`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 204) return false;

  if (!response.ok) throw new Error();

  return true;
}
