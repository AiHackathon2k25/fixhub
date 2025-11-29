import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'FixHub - AI-powered damage triage',
  description: 'Insurance damage triage SaaS application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

