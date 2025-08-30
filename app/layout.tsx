export const metadata = {
  title: 'Three.js + Next.js',
  description: 'Proyecto base con Three.js usando react-three-fiber en Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
