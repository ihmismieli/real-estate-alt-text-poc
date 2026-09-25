import styles from './admin-page-header.module.css';

export default function AdminPageHeader({ title }: { title: string }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
}
