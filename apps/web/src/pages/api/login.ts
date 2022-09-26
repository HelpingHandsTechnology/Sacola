import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import CookieService from '../../lib/auth';

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async (req, res) => {
  console.log(req, res);
};

