import { useState } from 'react';
import { Col, Row } from '../Components/Layout';
import clxs from 'clsx';
import Typography from '../Components/Typography';
import { SwitchToggle } from '../Components/SwitchToggle';
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/router';


const LogoWithTitle = ({ className = '' }) => {
  return (
    <Row className={clxs(['items-center', className])}>
      <span className="text-5xl">🎒</span>
      <h2 className={clxs(['text-3xl font-thin'])}>Sacola</h2>
    </Row>
  );
};

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (email: string) => {
    console.log(email)

    // the Magic code
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!,
    ).auth.loginWithMagicLink({ email });

    // Once we have the token from magic,
    // update our own database
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    })

    if (authRequest.ok) {
    // We successfully logged in, our API
    // set authorization cookies and now we
    // can redirect to the dashboard!
    router.push('/')
    } else { /* handle errors */ }
  };

  return (
    <Row className="w-full min-h-screen ">
      <Row className={clxs(['px-4 w-full bg-primary basis-2/3 hidden'])}>
        Sacola
      </Row>
      <Form handleSubmit={handleSubmit}/>
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
          <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <Button onClick={() => handleSubmit(email)}/>

          <Row className={clxs(['justify-between items-center pt-2'])}>
            {/* TODO: Forgot Password feature */}
            <SwitchToggle />
            <Typography variant="small">forgot password?</Typography>
          </Row>
        </form>
      </div>
    </Col>
  );

};
const Button = ({onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        clxs([
          'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
          'text-white font-medium rounded-lg text-sm',
          'px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        ])
      }
    >
      Default
    </button>
  )
}

// TODO: remove default props
const Input = ({
  isError = false,
  errorText = 'Error message',
  label = '',
  placeholder = '',
  value,
  onChange
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

export default Login;
