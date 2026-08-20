import { signOut } from '@/auth';
import navigationStyles from './navigation.module.css';
import Link from 'next/link';
import NavigationMenu from './nav-menu';
import LoginModal from './login-modal';
import { isCurrentUserAdmin } from '@/lib/dal';

export default async function Navigation() {
  const isAdmin = await isCurrentUserAdmin();

  const navItems = [{ href: '/', label: 'Kohteet' }];

  if (isAdmin) {
    navItems.push({ href: '/admin', label: 'Hallinnoi' });
  }

  return (
    <nav className={navigationStyles.nav} aria-label="Navigaatio">
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
              <button type="submit" className={navigationStyles.signOutButton}>
                Kirjaudu ulos
              </button>
            </form>
          ) : null
        }
      />
    </nav>
  );
}
