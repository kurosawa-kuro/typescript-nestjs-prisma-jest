import Navigation from '@/components/Navigation';

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white text-black">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
