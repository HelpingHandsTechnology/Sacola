import { useEffect, useState } from 'react';
import { Col, Row } from '../Components/Layout';
import clxs from 'clsx';
import Typography from '../Components/Typography';
import { SwitchToggle } from '../Components/SwitchToggle';
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/router';
import { getProviders, signIn, useSession } from 'next-auth/react';

const LogoWithTitle = ({ className = '' }) => {
  return (
    <Row className={clxs(['items-center', className])}>
      <span className="text-5xl">🎒</span>
      <h2 className={clxs(['text-3xl font-thin'])}>Sacola</h2>
    </Row>
  );
};

const Login = ({ providers }) => {
  const router = useRouter();

  const handleSubmit = async (email: string) => {
    console.log(email);

    // the Magic code
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!
    ).auth.loginWithMagicLink({ email });

    // Once we have the token from magic,
    // update our own database
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      router.push('/');
    } else {
      /* handle errors */
    }
  };

  return (
    <Row className="w-full min-h-screen ">
      <Row className={clxs(['px-4 w-full bg-primary basis-2/3 hidden'])}>
        Sacola
      </Row>
      <Form handleSubmit={handleSubmit} />
    </Row>
  );
};

const Form = ({ handleSubmit }) => {
  const [email, setEmail] = useState('');

  return (
    <Col
      className={clxs([
        'bg-slate-100 w-full px-4 py-8',
        'md:min-w-[400px] md:basis-1/3 md:px-8 py-8',
      ])}
    >
      <LogoWithTitle className="mb-12 hidden" />
      <Typography variant="h5" className="mb-6">
        Nice to see you again
      </Typography>
      {/* TODO: Input de email */}
      <div>
        <form action="">
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button onClick={() => handleSubmit(email)} />

          <Row className={clxs(['justify-between items-center pt-2'])}>
            {/* TODO: Forgot Password feature */}
            <SwitchToggle />
            <Typography variant="small">forgot password?</Typography>
          </Row>
        </form>
        <button
          onClick={() => signIn('google', { redirect: true })}
          className="px-6 py-3 mt-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
            viewBox="0 0 48 48"
            width="48px"
            height="48px"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </Col>
  );
};
const Button = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clxs([
        'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
        'text-white font-medium rounded-lg text-sm',
        'px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
      ])}
    >
      Default
    </button>
  );
};

// TODO: remove default props
const Input = ({
  isError = false,
  errorText = 'Error message',
  label = '',
  placeholder = '',
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        {label}
      </label>
      <input
        className={clxs([
          'appearance-none block w-full rounded py-3 px-4 mb-1 leading-tight focus:outline-none ',
          'bg-gray-200 text-gray-700 border focus:bg-white',
          isError && 'border-red-500',
        ])}
        id="grid-first-name"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className="text-red-500 text-xs italic invisible">{errorText}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Login;
