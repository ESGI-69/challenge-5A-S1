import styles from './NotificationsButton.module.scss';
import { Notif } from '@/components/lib/Icons';

export default function NotificationsButton() {
  return (
    <button className={styles.notificationsbutton}>
      <Notif />
    </button>
  );
}
