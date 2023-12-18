export default async function startTrackingGameDuration() {
  const response = await fetch(`http://localhost:3000/duration/start`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userToken: localStorage.getItem('userToken'),
    }),
  });

  if (!response.ok) throw new Error();
}