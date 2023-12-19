export default async function endTrackingGameDuration() {
  const userId = localStorage.getItem('userId');

  const response = await fetch(
    `https://arwin-wheres-wally-backend.fly.dev/user/${userId}/duration/finish`,
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
