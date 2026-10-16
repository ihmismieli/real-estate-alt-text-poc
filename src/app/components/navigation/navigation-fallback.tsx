import Link from 'next/link';
import styles from '@/app/components/navigation/navigation.module.css';

export default function NavigationFallback() {
  return (
    <div className={styles.inner}>
      <div className={styles.navHeader}>
        <Link href="/" className={styles.brand}>
          Tekstivastineet myyntikuville
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Kohteet
          </Link>
        </div>
      </div>
    </div>
  );
}
