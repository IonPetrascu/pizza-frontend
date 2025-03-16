import { BaseLayout, Header } from "@/components/shared";
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: 'Pizza | Главная',
};

export default async function LocaleLayout({
    children,
    params,
    modal
}: {
    children: React.ReactNode;
    modal: React.ReactNode
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <BaseLayout locale={locale}>
            <Suspense>
                <Header />
            </Suspense>
            {children}
            {modal}
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </BaseLayout>);
}

