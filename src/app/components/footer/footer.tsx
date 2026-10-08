import styles from '@/app/components/footer/footer.module.css';
import ScrollToLink from '@/app/components/scroll-to-link/scroll-to-link';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';
import Link from 'next/link';

export default async function Footer() {
  'use cache';

  cacheLife('hours');

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
            <Suspense
              fallback={
                <Link href="/#myytavat-asunnot" className={styles.link}>
                  MYYTÄVÄT KOHTEET
                </Link>
              }
            >
              <ScrollToLink targetId="myytavat-asunnot" className={styles.link}>
                MYYTÄVÄT KOHTEET
              </ScrollToLink>
            </Suspense>
          </nav>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Heidi Ahlgren
        </p>
      </div>
    </footer>
  );
}
