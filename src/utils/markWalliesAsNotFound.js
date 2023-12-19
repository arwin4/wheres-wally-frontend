export default async function markWalliesAsNotFound() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`http://localhost:3000/user/${userId}/wallies`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error();
}
