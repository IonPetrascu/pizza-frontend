"use client"
import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogDescription, Separator } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import Image from 'next/image';

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

    const text = formType === "login" ? "У вас нет учетной записи?" : " У вас есть учетная записи?"
    const buttonText = formType === "login" ? "Зарегистрироваться" : "Войти"
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogTitle className='hidden'></DialogTitle>
            <DialogDescription className='hidden'></DialogDescription>
            <DialogDescription className='hidden'></DialogDescription>
            <DialogContent className="sm:max-w-[425px]">

                <div className='flex flex-col gap-5'>
                    {
                        formType === "login" ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />
                    }
                    <div className='flex items-center gap-2 justify-center'>
                        <span>{text}</span>
                        <Button className='p-0 bg-white hover:bg-white text-black block h-max text-base font-semibold' onClick={switchFormType}>{buttonText}</Button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Separator className='w-1/4 bg-black' />
                        <span className='flex items-center justify-center rounded-full w-2/4 text-center'>Или войдите с помощью</span>
                        <Separator className='w-1/4 bg-black' />
                    </div>
                    <div className='flex gap-5'>
                        <Button onClick={() => signIn("github", {
                            callbackUrl: "/",
                            redirect: true
                        })} variant={"outline"} className="flex items-center gap-1 border-2 rounded-md w-1/2">
                            <Image src="/logos/google-logo.svg" width={24} height={24} alt="google-logo" />
                            <span>Github</span>
                        </Button>
                        <Button onClick={() => signIn("google", {
                            callbackUrl: "/",
                            redirect: true
                        })} variant={"outline"} className="flex items-center gap-1 border-2 rounded-md w-1/2">
                            <Image src="/logos/github-logo.svg" width={24} height={24} alt="github-logo" />
                            <span>Google</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
