import BaseLayout from '@/components/BaseLayout';


export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
