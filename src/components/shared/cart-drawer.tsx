import React, { PropsWithChildren } from 'react';
import {
    Button,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui"
import Link from 'next/link';

interface Props {
    className?: string
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children, className
}) => {
    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Link href="/cart">
                        <Button>
                            оформить заказ
                        </Button>
                    </Link>

                </SheetFooter>
            </SheetContent>
        </Sheet>

    );
};
