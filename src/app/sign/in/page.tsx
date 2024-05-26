'use client';
// React
import { useFormState } from "react-dom";
// Components
import Form from '@/layouts/Form';
import Input from '@/components/Input';
import { ZodErrors } from "@/components/ZodErrors";
import { StrapiErrors } from "@/components/StrapiErrors";
import { SubmitButton } from "@/components/SubmitButton";
// Services || Actions
import { loginUserAction } from "@/actions/auth-actions";

// State
const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export default function SignIn() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  return (
    <Form title="Sign In to your account" action={formAction}>
      <Input label="Username or email" name='identifier' type="text" autoComplete="email" required />
      <ZodErrors error={formState?.zodErrors?.identifier} />

      <Input label="Password" name='password' type="password" autoComplete="current-password" required link="forgot" linkLabel='Forgot password?'/>
      <ZodErrors error={formState?.zodErrors?.password} />

      <div>
        <SubmitButton
          className="w-full"
          text="Sign In"
          loadingText="Loading"
        />
      </div>

      <StrapiErrors error={formState?.strapiErrors} />

      <p className="mt-10 text-center text-sm text-gray-500">
        You&apos;re new? {" "}
        <a href="up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</a>
      </p>
    </Form>
  );
}