import { redirect } from 'next/navigation';
import { isCurrentUserAdmin } from '@/lib/dal';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    redirect('/?login=1');
  }

  return <>{children}</>;
}
