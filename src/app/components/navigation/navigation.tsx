'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navigation.module.css';

const navItems = [
  { href: '/', label: 'Kohteet' },
  // { href: '/admin', label: 'Admin' },
  { href: '/login', label: 'Kirjaudu' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navigaatio">
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Tekstivastineet myyntikuville
        </Link>

        <div className={styles.links}>
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === item.href
                : pathname.startsWith(item.href);

            const className = isActive
              ? `${styles.link} ${styles.active}`
              : styles.link;

            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
