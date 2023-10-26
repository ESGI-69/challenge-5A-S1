import styles from './ProfileButton.module.scss';

export default function ProfileButton() {
  return (
    <button className={styles.profilebutton}>
      <img className={styles.profilebuttonImg} src="https://avatars.githubusercontent.com/u/12610160?v=4" alt="avatar" />
    </button>
  );
}
