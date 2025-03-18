import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormLoginValues, formLoginSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { Button, Input } from '@/components/ui';

interface Props {
  onClose: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-center">
          <Title text="Вход в аккаунт" size="md" className="font-bold" />
          <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
        </div>
        <div>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="Email"
            required
            autoComplete='email'
          />
          {form.formState.errors.email && (
            <p className="text-red-500">{form.formState.errors.email.message}</p>
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
        <Button className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};