import React from "react"
import { cn } from "@/lib/utils"
import { Container, CartButton } from "@/components/shared"
import { Button, Input } from "@/components/ui"
import { User } from "lucide-react"

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
    return <header className={cn('py-5 border-b border-gray-700 ', className)}>
        <Container className="flex items-center gap-5 ">
            <h1 className="font-extrabold text-5xl">Pizza</h1>
            <Input className="" placeholder="Поиск..." />
            <CartButton />
            <Button variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                <User size={20} />
                <span>Войти</span>
            </Button>
        </Container>
    </header>
}
