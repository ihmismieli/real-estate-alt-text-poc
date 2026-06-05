'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navigation.module.css';

export type NavItemType = {
  href: string;
  label: string;
};

export default function NavLinks({
  items,
  onNavigate,
}: {
  items: NavItemType[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.links}>
      {items.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === item.href
            : pathname.startsWith(item.href);

        const className = isActive
          ? `${styles.link} ${styles.active}`
          : styles.link;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={className}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
