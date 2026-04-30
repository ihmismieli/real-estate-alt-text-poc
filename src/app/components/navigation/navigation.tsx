import { auth, signOut } from '@/auth';
import NavLinks from './nav-links';
import navigationStyles from './navigation.module.css';
import Link from 'next/link';

export default async function Navigation() {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  const navItems = [{ href: '/', label: 'Kohteet' }];

  if (isAdmin) {
    navItems.push({ href: '/admin', label: 'Admin' });
  } else {
    navItems.push({ href: '/login', label: 'Kirjaudu' });
  }

  return (
    <nav className={navigationStyles.nav} aria-label="Navigaatio">
      <div className={navigationStyles.inner}>
        <Link href="/" className={navigationStyles.brand}>
          Tekstivastineet myyntikuville
        </Link>

        <div className={navigationStyles.right}>
          <NavLinks items={navItems} />
          {isAdmin && (
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
          )}
        </div>
      </div>
    </nav>
  );
}
