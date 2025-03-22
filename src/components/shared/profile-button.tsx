import React from 'react';
import { Button } from '../ui';
import { useSession } from 'next-auth/react';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
    setOpen: () => void
}

export const ProfileButton: React.FC<Props> = ({ setOpen }) => {
    const { data: session } = useSession()
    const t = useTranslations("Header")
    return (
        <> {
            session ? (
                <Button variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                    <User size={20} />
                    <span>{t("profileBtn", { userName: session?.user?.name })} </span>
                </Button>)
                : (
                    <Button onClick={setOpen} variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                        <User size={20} />
                        <span>{t("logIn")}</span>
                    </Button>
                )
        }
        </>
    );
};

