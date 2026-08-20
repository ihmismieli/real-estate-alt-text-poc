'use client';

import { useState } from 'react';
import styles from './navigation.module.css';
import { Burger, Modal } from '@mantine/core';
import type { NavItemType } from './nav-links';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import NavLinks from './nav-links';

type Props = {
  brand: React.ReactNode;
  navItems: NavItemType[];
  actions?: React.ReactNode;
  showLoginButton?: boolean;
  loginContent?: React.ReactNode;
};

export default function NavigationMenu({
  brand,
  navItems,
  actions,
  showLoginButton,
  loginContent,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loginOpenedByUser, setLoginOpenedByUser] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginRequested = searchParams.get('login') === '1';
  const loginOpen = loginRequested || loginOpenedByUser;

  const openLogin = () => {
    setOpen(false);
    setLoginOpenedByUser(true);
  };

  const closeLogin = () => {
    setLoginOpenedByUser(false);

    if (!loginRequested) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('login');

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  return (
    <>
      <div className={styles.inner}>
        <div className={styles.navHeader}>
          {brand}

          <Burger
            opened={open}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Sulje navigaatio' : 'Avaa navigaatio'}
            className={styles.menuButton}
          />
        </div>

        <div className={`${styles.right} ${open ? styles.open : ''}`}>
          <NavLinks items={navItems} onNavigate={() => setOpen(false)} />
          {showLoginButton ? (
            <button
              type="button"
              onClick={openLogin}
              className={styles.loginButton}
            >
              Kirjaudu
            </button>
          ) : null}

          {actions}
        </div>
      </div>
      <Modal opened={loginOpen} onClose={closeLogin} title="Kirjaudu" centered>
        {loginContent}
      </Modal>
    </>
  );
}
