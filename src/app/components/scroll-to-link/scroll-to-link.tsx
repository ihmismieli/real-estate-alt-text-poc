'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ScrollToLinkProps = {
  targetId: string;
  className?: string;
  children: React.ReactNode;
};

export default function ScrollToLink({
  targetId,
  className,
  children,
}: ScrollToLinkProps) {
  const pathname = usePathname();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') {
      return;
    }

    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    window.history.replaceState(null, '', `#${targetId}`);
  }

  return (
    <Link href={`/#${targetId}`} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
