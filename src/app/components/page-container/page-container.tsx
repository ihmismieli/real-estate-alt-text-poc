import pageContainerstyles from './page-container.module.css';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <main className={pageContainerstyles.page}>{children}</main>;
}
