"use client"
import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
;

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [formType, setFormType] = useState<"register" | "login">("login");

    function handleClose() {
        if (isOpen) onClose()
    }

    function switchFormType() {
        setFormType((prev) => prev === "login" ? "register" : "login")
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogDescription></DialogDescription>
                <div>
                    {
                        formType === "login" ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />
                    }
                    <Button onClick={switchFormType}>
                        {formType === "login" ? "Зарегистрироваться" : "Войти"}
                    </Button>
                    <div>
                        <Button onClick={() => signIn("github", {
                            callbackUrl: "/",
                            redirect: true
                        })} variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                            <span>Github</span>
                        </Button>
                        <Button onClick={() => signIn("google", {
                            callbackUrl: "/",
                            redirect: true
                        })} variant={"outline"} className="flex items-center gap-1 border-2 rounded-md">
                            <span>Google</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
