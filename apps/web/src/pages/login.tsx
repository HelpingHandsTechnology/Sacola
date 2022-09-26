import { Col, Row } from '../Components/Layout';
import clxs from 'clsx';
import Typography from '../Components/Typography';
import { SwitchToggle } from '../Components/SwitchToggle';

const LogoWithTitle = ({ className = '' }) => {
  return (
    <Row className={clxs(['items-center', className])}>
      <span className="text-5xl">🎒</span>
      <h2 className={clxs(['text-3xl font-thin'])}>Sacola</h2>
    </Row>
  );
};

const Login = () => {
  return (
    <Row className="w-full min-h-screen ">
      <Row className={clxs(['px-4 w-full bg-primary basis-2/3 hidden'])}>
        Sacola
      </Row>
      <RightBanner />
    </Row>
  );
};

const RightBanner = () => {
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
        <Input />
        <Row className={clxs(['justify-between items-center pt-2'])}>
          {/* TODO: Forgot Password feature */}
          <SwitchToggle />
          <Typography variant="small">forgot password?</Typography>
        </Row>
      </div>
    </Col>
  );
};

// TODO: remove default props
const Input = ({
  isError = false,
  errorText = 'Error message',
  label = 'label',
  placeholder = 'placeholder',
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
      />
      <p className="text-red-500 text-xs italic invisible">{errorText}</p>
    </div>
  );
};

export default Login;
