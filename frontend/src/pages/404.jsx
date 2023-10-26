import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const { error } = useRouteError();
  return (
    <main>
      <h1>An error occured</h1>
      <h2>{error?.statusText || 'error'}</h2>
      <p>{error?.message || 'message'}</p>
    </main>
  );
}
