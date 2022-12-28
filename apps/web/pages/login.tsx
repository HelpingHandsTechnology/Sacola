import { useState } from 'react';
import { TextInput } from 'design';
import { trpcClient } from '../utils/trpc';
/* eslint-disable react/no-unescaped-entities */
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [showConfirmationCode, setShowConfirmationCode] = useState<boolean>(false);
  const { mutate } = trpcClient.user.signIn.useMutation();

  const handleButtonClick = () => {
    mutate({ email });
    // setShowConfirmationCode(!showConfirmationCode);
  };

  return (
    <div className="flex min-h-screen flex-row justify-between">
      <section className="bg-black py 2 flex items-center text-left justify-center flex-col gap-2 flex-1">
        <h1 className="text-white text-4xl">Welcome</h1>
        <h2 className="text-white text-xl">Sign in to continue</h2>
      </section>
      <section className="flex items-center justify-center w-3/5 flex-col">
        {!showConfirmationCode ? (
          <EmailFormComponent {...{ email, setEmail, handleButtonClick }} />
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
  handleButtonClick,
}: {
  email: string;
  setEmail: (email: string) => void;
  handleButtonClick: () => void;
}) => {
  return (
    <>
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
        Send code
      </button>
      <span>
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600">
          Register
        </a>
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
        <a href="#" className="text-blue-600">
          Resend
        </a>
      </span>
    </>
  );
};
