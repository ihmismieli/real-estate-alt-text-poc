import styles from './footer.module.css';
import ScrollToLink from '../scroll-to-link/scroll-to-link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>Tekstivastineet myyntikuville</p>
          <p className={styles.description}>
            Proof of concept saavutettavista myyntikuvien tekstivastineista,
            jotka ovat luotu tekoälyn avulla.
          </p>
          <nav
            aria-label="Alatunnisteen navigaatio"
            className={styles.navigation}
          >
            <ScrollToLink targetId="myytavat-asunnot" className={styles.link}>
              MYYTÄVÄT KOHTEET
            </ScrollToLink>
          </nav>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Heidi Ahlgren
        </p>
      </div>
    </footer>
  );
}
