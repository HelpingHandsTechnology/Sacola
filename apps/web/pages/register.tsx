import { useState } from 'react';
import { TextInput } from 'design';
import { trpcNext } from '../lib/trpc';
import { useRouter } from 'next/router';
import Link from 'next/link';

/* eslint-disable react/no-unescaped-entities */
export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showConfirmationCode, setShowConfirmationCode] = useState<boolean>(false);
  const { mutate } = trpcNext.auth.signUp.useMutation();
  const router = useRouter();

  const handleButtonClick = () => {
    mutate({ email, name }, { onSuccess: () => router.push('/login') });
    // setShowConfirmationCode(!showConfirmationCode);
  };

  return (
    <div className="flex min-h-screen flex-row justify-between">
      <section className="bg-black py-2 flex items-center text-left justify-center flex-col gap-2 flex-1">
        <div className="max-w-sm flex flex-col gap-2">
          <h1 className="text-white text-4xl">Sign up now!</h1>
          <h2 className="text-white text-xl">Create an account and start saving your favorite articles today</h2>
        </div>
      </section>
      <section className="flex items-center justify-center w-3/5 flex-col">
        {!showConfirmationCode ? (
          <EmailFormComponent {...{ email, name, setName, setEmail, handleButtonClick }} />
        ) : (
          <ConfirmationCodeComponent {...{ handleButtonClick }} />
        )}
      </section>
    </div>
  );
}

const EmailFormComponent = ({
  email,
  setEmail,
  name,
  setName,
  handleButtonClick,
}: {
  email: string;
  name: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  handleButtonClick: () => void;
}) => {
  return (
    <>
      <fieldset className="flex flex-col w-1/2 gap-2 mb-4">
        <label htmlFor="name" className="text-xl">
          Name
        </label>
        <TextInput
          xClassName="border border-black p-2 rounded-md"
          placeholder="Your name"
          placeholderTextColor={'#333'}
          value={name}
          onChangeText={setName}
        />
      </fieldset>
      <fieldset className="flex flex-col w-1/2 gap-2">
        <label htmlFor="email" className="text-xl">
          E-mail
        </label>
        <TextInput
          xClassName="border border-black p-2 rounded-md"
          placeholder="abcd@xyz.com"
          placeholderTextColor={'#333'}
          value={email}
          onChangeText={setEmail}
        />
      </fieldset>
      <button onClick={handleButtonClick} className="bg-black text-white text-xl p-4 w-1/2 m-5 rounded-md">
        Register
      </button>
      <span>
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600">
          Sign in
        </Link>
      </span>
    </>
  );
};

const ConfirmationCodeComponent = ({ handleButtonClick }: { handleButtonClick: () => void }) => {
  return (
    <>
      <fieldset className="flex flex-col w-1/2 gap-2">
        <label htmlFor="email" className="text-xl">
          Confirmation code
        </label>
        <TextInput
          xClassName="border border-black p-2 rounded-md"
          placeholder="123456"
          placeholderTextColor={'#333'}
          value={''}
          onChangeText={() => {}}
        />
      </fieldset>
      <button onClick={handleButtonClick} className="bg-black text-white text-xl p-4 w-1/2 m-5 rounded-md">
        Confirm code
      </button>
      <span>
        Didn't received the code?{' '}
        <Link href="#" className="text-blue-600">
          Resend
        </Link>
      </span>
    </>
  );
};
