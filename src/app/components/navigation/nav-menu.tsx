'use client';

import { useState } from 'react';
import styles from './navigation.module.css';

type Props = {
  brand: React.ReactNode;
  links: React.ReactNode;
  actions?: React.ReactNode;
};

export default function NavigationMenu({ brand, links, actions }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.inner}>
      <div className={styles.navHeader}>
        {brand}

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-label="Avaa navigaatio"
          onClick={() => setOpen((value) => !value)}
        >
          ☰
        </button>
      </div>

      <div className={`${styles.right} ${open ? styles.open : ''}`}>
        {links}
        {actions}
      </div>
    </div>
  );
}
