"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { Button, Input } from "@/components/ui";
import { Api } from "@/services/api-client"; // Импорт остается таким же
import { Title } from "@/components/shared";
import { signIn } from "next-auth/react";
import { useCartStore } from "@/store";

interface Props {
  onClose: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      setLoading(true);
      const cartToken = useCartStore.getState().token;
      await Api.auth.register(data.email, data.fullName, data.password, cartToken);

      const resp = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error("Ошибка авторизации после регистрации");
      }

      toast.success("Регистрация успешна", {
        icon: "✅",
      });

      onClose();
    } catch (error) {
      console.error("Error [REGISTER]", error);
      toast.error("Не удалось зарегистрироваться", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-center">
          <Title text="Регистрация" size="md" className="font-bold" />
          <p className="text-gray-400">Введите данные для создания аккаунта</p>

        </div>

        <div>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="Email"
            required
          />
          {form.formState.errors.email && (
            <p className="text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...form.register("fullName")}
            type="text"
            placeholder="Полное имя"
            required
            autoComplete="family-name"
          />
          {form.formState.errors.fullName && (
            <p className="text-red-500">{form.formState.errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Input
            {...form.register("password")}
            type="password"
            placeholder="Пароль"
            required
            autoComplete='current-password'
          />
          {form.formState.errors.password && (
            <p className="text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div>
          <Input
            {...form.register("confirmPassword")}
            type="password"
            placeholder="Подтвердите пароль"
            autoComplete='current-password'
            required
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <Button className="h-12 text-base" type="submit" disabled={loading}>
          Зарегистрироваться {loading ? '...' : ''}
        </Button>
      </form>
    </FormProvider>
  );
};