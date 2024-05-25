'use client';
import Form from '@/layouts/Form';
import Input from '@/components/Input';
import { SubmitButton } from "@/components/SubmitButton";

import { registerUserAction } from "@/actions/auth-actions";
import { useFormState } from 'react-dom';

import { ZodErrors } from "@/components/ZodErrors";
import { StrapiErrors } from "@/components/StrapiErrors";

const INITIAL_STATE = {
  ZodErrors: null,
  StrapiErrors: null,
  data: null,
  message: null,
};

export default function SignUp() {
  const [formState, formAction] = useFormState(
    registerUserAction, 
    INITIAL_STATE
  );

  // console.log(formState);

  return (
    <Form title="Sign Up to Facepalm" action={formAction}>
      <Input label="Username" name="username" type='text' autoComplete="username" required />
      <ZodErrors error={formState?.zodErrors?.username} />

      <Input label="Email address" name="email" type="email" autoComplete="email" required />
      <ZodErrors error={formState?.zodErrors?.email} />

      <Input label="Password" name="password" type="password" autoComplete="current-password" required />
      <ZodErrors error={formState?.zodErrors?.password} />

      <div>
      <SubmitButton className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" text="Sign Up" loadingText="Loading" />
      </div>

      <StrapiErrors error={formState?.strapiErrors} />

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member? {" "}
        <a href="in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</a>
      </p>
    </Form>
  );
}
