import { redirect } from 'next/navigation';
// import SignUp from './up/page';
// import SignIn from './in/page';

export default function Sign() { // https://tailwindui.com/components/application-ui/forms/sign-in-forms
  // return <SignIn />;
  return redirect('/sign/in');
}