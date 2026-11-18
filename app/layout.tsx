import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SafeSight AI | PPE Viewpoint Research', description: 'Evaluate PPE detector generalisation across unseen camera viewpoints and distances.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
