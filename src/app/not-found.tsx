import Link from 'next/link';
import PageContainer from './components/page-container/page-container';

export default function NotFound() {
  return (
    <PageContainer>
      <h2>Hakemaasi sivua ei löydy</h2>
      <Link href="/">Palaa kohteisiin</Link>
    </PageContainer>
  );
}
