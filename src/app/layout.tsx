import "../styles/globals.css";

export const metadata = {
    title: "Next Latest - Prisma CRUD Demo",
    description: "A small SPA demo using Next App Router, Prisma and Postgres",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body className="min-h-screen bg-surface text-primary">
                <div className="min-h-screen flex items-center justify-center bg-surface">
                    <div className="container max-w-4xl mx-auto px-4">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
