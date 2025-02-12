"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";


export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <>
            <SessionProvider>
                {children}
                <NextTopLoader height={4} color="#000" showSpinner={false} />
            </SessionProvider>

        </>
    );
};
