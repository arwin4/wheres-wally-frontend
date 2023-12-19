export default async function markWalliesAsNotFound() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(
    `https://arwin-wheres-wally-backend.fly.dev/user/${userId}/wallies`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) throw new Error();
}
