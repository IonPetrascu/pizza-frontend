"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Container, CartButton } from "@/components/shared"
import { Input } from "@/components/ui"
import { ProfileButton } from "@/components/shared"
import { AuthModal } from "@/components/shared"
interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
    const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

    return <header className={cn('py-5 border-b border-gray-700 ', className)}>
        <Container className="flex items-center gap-5 ">
            <h1 className="font-extrabold text-5xl">Pizza</h1>
            <Input className="" placeholder="Поиск..." />
            <CartButton />
            <ProfileButton setOpen={() => setIsOpenModal(true)} />
            <AuthModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </Container>
    </header>
}
