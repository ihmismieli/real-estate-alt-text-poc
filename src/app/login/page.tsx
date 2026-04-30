import PageContainer from '../components/page-container/page-container';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.email === process.env.ADMIN_EMAIL) {
    redirect('/admin');
  }

  return (
    <PageContainer>
      <h1>Kirjaudu</h1>
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/admin' });
        }}
      >
        <button type="submit">Kirjaudu Googlella</button>
      </form>
    </PageContainer>
  );
}
