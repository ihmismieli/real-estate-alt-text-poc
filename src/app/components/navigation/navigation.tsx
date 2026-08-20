import { auth, signOut } from '@/auth';
import navigationStyles from './navigation.module.css';
import Link from 'next/link';
import NavigationMenu from './nav-menu';
import LoginModal from './login-modal';

export default async function Navigation() {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

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
