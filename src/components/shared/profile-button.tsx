import React from 'react';
import { Button } from '../ui';
import { useSession } from 'next-auth/react';
import { User } from 'lucide-react';

interface Props {
    setOpen: () => void
}

export const ProfileButton: React.FC<Props> = ({ setOpen }) => {
    const { data: session } = useSession()
    console.log(session);

    return (
        <> {
            session ? (
                <Button variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                    <User size={20} />
                    <span>Профиль</span>
                </Button>)
                : (
                    <Button onClick={setOpen} variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                        <User size={20} />
                        <span>Войти</span>
                    </Button>
                )
        }
        </>
    );
};

