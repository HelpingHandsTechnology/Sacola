import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="flex w-full min-h-screen flex-col items-center gap-8">{children}</main>
      <Footer />
    </>
  );
}
