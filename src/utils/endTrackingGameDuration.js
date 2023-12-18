export default async function endTrackingGameDuration() {
  const response = await fetch(`http://localhost:3000/duration/finish`, {
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