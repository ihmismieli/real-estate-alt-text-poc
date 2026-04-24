import styles from './page-container.module.css';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <main className={styles.page}>{children}</main>;
}
