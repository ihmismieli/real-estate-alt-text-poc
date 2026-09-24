import { signOut } from '@/auth';
import navigationStyles from '@/app/components/navigation/navigation.module.css';
import Link from 'next/link';
import NavigationMenu from '@/app/components/navigation/nav-menu';
import LoginModal from '@/app/components/navigation/login-modal';
import { isCurrentUserAdmin } from '@/lib/dal';
import { Suspense } from 'react';

export default async function Navigation() {
  const isAdmin = await isCurrentUserAdmin();

  const navItems = [{ href: '/', label: 'Kohteet' }];

  if (isAdmin) {
    navItems.push({ href: '/admin', label: 'Hallinnoi' });
  }

  return (
    <nav className={navigationStyles.nav} aria-label="Navigaatio">
      <Suspense fallback={<div className={navigationStyles.inner} />}>
        <NavigationMenu
          brand={
            <Link href="/" className={navigationStyles.brand}>
              Tekstivastineet myyntikuville
            </Link>
          }
          navItems={navItems}
          showLoginButton={!isAdmin}
          loginContent={!isAdmin ? <LoginModal /> : null}
          actions={
            isAdmin ? (
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className={navigationStyles.signOutButton}
                >
                  Kirjaudu ulos
                </button>
              </form>
            ) : null
          }
        />
      </Suspense>
    </nav>
  );
}
