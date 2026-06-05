import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.email === process.env.ADMIN_EMAIL) {
    redirect('/admin');
  }
  redirect('/?login=1');
}
