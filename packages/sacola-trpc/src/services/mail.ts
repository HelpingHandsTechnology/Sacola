import { User } from '@prisma/client';
import { mail } from '../mail';

export const TaskSendSignInEmail = async (user: User, newCode: string) => {
  await mail.sendMail({
    from: 'Sacola <thesacola@gmail.com>',
    to: `${user.name} <${user.email}>`,
    subject: 'Sacola SignIn',
    html: `Hello, ${user.name}, your code is: ${newCode}`,
  });
};
