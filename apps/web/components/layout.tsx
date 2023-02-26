import { Footer } from '@/components/Footer';
import Header from '@/components/site-header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex w-full min-h-screen flex-col items-center gap-8">{children}</main>
      <Footer />
    </>
  );
}
