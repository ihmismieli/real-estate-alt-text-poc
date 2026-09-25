import pageContainerstyles from '@/app/components/page-container/page-container.module.css';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <div className={pageContainerstyles.page}>{children}</div>;
}
