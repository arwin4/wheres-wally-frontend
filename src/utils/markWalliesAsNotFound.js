export default async function markWalliesAsNotFound() {
  const response = await fetch(`http://localhost:3000/wallies`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userToken: localStorage.getItem('userToken'),
    }),
  });

  if (!response.ok) throw new Error();
}
