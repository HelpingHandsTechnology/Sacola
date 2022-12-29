import { useState } from 'react';
import { TextInput } from 'design';
import { trpcClient } from '../utils/trpc';
import Link from 'next/link';

import { setTokenCookie } from '../auth/tokenCookies';
import { useRouter } from 'next/router';

/* eslint-disable react/no-unescaped-entities */
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [showConfirmationCode, setShowConfirmationCode] = useState<boolean>(false);
  const router = useRouter();

  const { mutate, isLoading: isLoadingEmail } = trpcClient.user.signIn.useMutation();
  const { mutate: confirmCode, isLoading: isLoadingCode } = trpcClient.user.verifyCode.useMutation();

  const handleButtonClick = () => {
    mutate({ email },
      {
        onSuccess: () => setShowConfirmationCode(true)
      });
  };

  const handleConfirmCode = () => {
    confirmCode({ email, code: confirmationCode }, {
      onSuccess: async (data) => {
        await setTokenCookie(data.token)
        router.push('/')
      }
    })
  };

  return (
    <div className="flex min-h-screen flex-row justify-between">
      <section className="bg-black py 2 flex items-center text-left justify-center flex-col gap-2 flex-1">
        <h1 className="text-white text-4xl">Welcome</h1>
        <h2 className="text-white text-xl">Sign in to continue</h2>
      </section>
      <section className="flex items-center justify-center w-3/5 flex-col">
        {isLoadingEmail || isLoadingCode ? <Loading /> : (
          renderForm({
            email,
            setEmail,
            confirmationCode,
            setConfirmationCode,
            showConfirmationCode,
            handleButtonClick,
            handleConfirmCode,
          })
        )}
      </section>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
    </div>
  )
}

const renderForm = ({
  email,
  setEmail,
  confirmationCode,
  setConfirmationCode,
  showConfirmationCode,
  handleButtonClick,
  handleConfirmCode,
} : {
  email: string;
  setEmail: (email: string) => void;
  confirmationCode: string;
  setConfirmationCode: (confirmationCode: string) => void;
  showConfirmationCode: boolean;
  handleButtonClick: () => void;
  handleConfirmCode: () => void;
}) => {
  if(showConfirmationCode) {
    return (
      <ConfirmationCodeComponent
        confirmationCode={confirmationCode}
        setConfirmationCode={setConfirmationCode}
        handleButtonClick={handleConfirmCode}
      />
    )
  } else {
    return (
      <EmailFormComponent
        email={email}
        setEmail={setEmail}
        handleButtonClick={handleButtonClick}
      />
    )
  }
}

interface EmailFormComponentProps {
  email: string;
  setEmail: (email: string) => void;
  handleButtonClick: () => void;
}

const EmailFormComponent = ({ email, setEmail, handleButtonClick }: EmailFormComponentProps) => {
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
        <Link href="/register" className="text-blue-600">
          Register
        </Link>
      </span>
    </>
  );
};

interface ConfirmationCodeComponentProps {
  confirmationCode: string;
  setConfirmationCode: (confirmationCode: string) => void;
  handleButtonClick: () => void
}

const ConfirmationCodeComponent = ({
  confirmationCode,
  setConfirmationCode,
  handleButtonClick,
}: ConfirmationCodeComponentProps) => {
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
          value={confirmationCode}
          onChangeText={setConfirmationCode}
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
