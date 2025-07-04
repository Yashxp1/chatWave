'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CardWrapper from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas/AuthSchema';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { login } from '@/actions/login';

import { FormSuccess } from './form-success';
import { FormError } from './form-error';
import GoogleLogin from './google-login';

import React from 'react';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res: any) => {
      if (res.error) {
        setError(res.error);
        setLoading(false);
      }
      if (res.success) {
        setError('');
        setSuccess(res.success);
        setLoading(false);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
      <GoogleLogin />
    </CardWrapper>
  );
};

export default LoginForm;
