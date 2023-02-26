import { useState } from 'react';
import { TextInput } from 'design';
import { trpcNext } from '../lib/trpc';
import Link from 'next/link';
import { setTokenCookie } from '../lib/cookeis';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { MotiView } from 'moti';

/* eslint-disable react/no-unescaped-entities */
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [showConfirmationCode, setShowConfirmationCode] = useState<boolean>(false);
  const router = useRouter();

  const { mutate, isLoading: isLoadingEmail } = trpcNext.auth.signIn.useMutation();
  const { mutate: confirmCode, isLoading: isLoadingCode } = trpcNext.auth.verifyCode.useMutation();

  const handleButtonClick = () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    // validate email with regex
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError('Email is invalid');
      return;
    }

    mutate(
      { email: email.toLowerCase() },
      {
        onSuccess: () => setShowConfirmationCode(true),
      },
    );
  };

  const handleConfirmCode = () => {
    confirmCode(
      { email, code: confirmationCode },
      {
        onSuccess: async (data) => {
          await setTokenCookie(data.token);
          router.push('/');
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen flex-row justify-between">
      <section className="bg-black py 2 flex items-center text-left justify-center flex-col gap-2 flex-1">
        <h1 className="text-white text-4xl">Welcome</h1>
        <h2 className="text-white text-xl">Sign in to continue</h2>
      </section>
      <section className="flex items-center justify-center w-3/5 flex-col">
        {isLoadingEmail || isLoadingCode ? (
          <Loading />
        ) : (
          <Form
            {...{
              error,
              email,
              setEmail,
              confirmationCode,
              setConfirmationCode,
              showConfirmationCode,
              handleButtonClick,
              handleConfirmCode,
            }}
          />
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
  );
};

type FormP = {
  error: string | null;
  email: string;
  setEmail: (email: string) => void;
  confirmationCode: string;
  setConfirmationCode: (confirmationCode: string) => void;
  showConfirmationCode: boolean;
  handleButtonClick: () => void;
  handleConfirmCode: () => void;
};
const Form = ({
  email,
  setEmail,
  error,
  confirmationCode,
  setConfirmationCode,
  showConfirmationCode,
  handleButtonClick,
  handleConfirmCode,
}: FormP) => {
  if (!showConfirmationCode) {
    return <EmailFormComponent error={error} email={email} setEmail={setEmail} handleButtonClick={handleButtonClick} />;
  }

  return (
    <ConfirmationCodeComponent
      confirmationCode={confirmationCode}
      setConfirmationCode={setConfirmationCode}
      handleButtonClick={handleConfirmCode}
    />
  );
};

interface EmailFormComponentProps {
  email: string;
  error: string | null;
  setEmail: (email: string) => void;
  handleButtonClick: () => void;
}

const EmailFormComponent = ({ email, setEmail, error, handleButtonClick }: EmailFormComponentProps) => {
  return (
    <form
      className="flex items-center justify-center  flex-col w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleButtonClick();
      }}
    >
      <fieldset className="flex flex-col w-1/2 gap-2">
        <MotiView animate={{ opacity: 1 }} from={{ opacity: '0' }} transition={{ type: 'timing', duration: 500 }}>
          <label htmlFor="email" className="text-xl">
            E-mail
          </label>
          <TextInput
            xClassName={clsx('border border-black p-2 rounded-md', error && 'border-red-600')}
            placeholder="abcd@xyz.com"
            placeholderTextColor={'#333'}
            value={email}
            onChangeText={setEmail}
          />
        </MotiView>
        {error && <span className="text-red-600">{error}</span>}
      </fieldset>
      <MotiView
        animate={{ opacity: 1 }}
        from={{ opacity: '0' }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
        className="w-1/2 m-5 space-y-2"
      >
        <button onClick={handleButtonClick} className="bg-black text-white text-xl p-4  rounded-md" type="submit">
          Send code
        </button>
        <span>
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </span>
      </MotiView>
    </form>
  );
};

interface ConfirmationCodeComponentProps {
  confirmationCode: string;
  setConfirmationCode: (confirmationCode: string) => void;
  handleButtonClick: () => void;
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
          maxLength={6}
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
