import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { ONE_DAY } from '../../utils/time';

const login = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 7 * ONE_DAY,
      sameSite: 'strict',
      path: '/',
    }),
  );
  res.status(200).json({ success: true });
};

export default login;
