import { Footer } from '@/components/Footer';
import Header from '@/components/site-header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center gap-8">{children}</main>
      <Footer />
    </>
  );
}
