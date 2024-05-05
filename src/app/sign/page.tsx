import { redirect } from 'next/navigation';
// import SignUp from './up/page';
// import SignIn from './in/page';

export default function Sign() {
  // return <SignIn />;
  return redirect('/sign/in');
}