"use client"; // Делаем клиентским

import { useTranslations } from "next-intl";
import { useSession, signIn } from "next-auth/react";
import { Title } from "@/components/shared";
import { Filters } from "@/components/shared/filters";
import { useSearchParams } from "next/navigation";

export function HomeClient({ }: {}) {
    const t = useTranslations("HomePage");
    const { data: session } = useSession();

    const searchParams = useSearchParams()
    console.log("search params", searchParams.toString());

    return (
        <>
            <Filters />
        </>
    );
}
