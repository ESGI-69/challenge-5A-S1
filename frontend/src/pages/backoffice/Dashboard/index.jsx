import BackofficeHeader from '@/components/BackofficeHeader';
import Button from '@/components/lib/Button';

export default function Dashboard() {
  return (
    <>
      <BackofficeHeader actionsComponent={<Button>Lorem le ipsum</Button>}>
        <h1>Tableau de bord</h1>
      </BackofficeHeader>
      <p>Se tableau le bord</p>
    </>
  );
}
