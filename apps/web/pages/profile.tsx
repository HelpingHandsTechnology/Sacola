import { Text, TextInput } from 'design';
import { Layout } from '@/components/layout';

import { trpcNext } from '@/lib/trpc';
import Image from 'next/image';

const Profile = () => {
  const { data: user } = trpcNext.user.getUserInfo.useQuery();
  const { mutate: logout } = trpcNext.auth.invalidateToken.useMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout>
      <div className="flex w-full flex-col items-start p-4">
        <Text size="3xl" xClassName="font-bold">
          Your Profile
        </Text>

        <div className="mt-4 flex w-full flex-row items-center gap-1">
          {/* create user avatar div */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300">
            <Text size="4xl" xClassName="text-slate-600">
              AC
            </Text>
          </div>
          <div className="ml-4 flex flex-col gap-1">
            <Text size="md" xClassName="sm:text-2xl text-slate-700">
              {user?.name}
            </Text>
            <Text size="md" xClassName="sm:text-2xl text-slate-700">
              {user?.email}
            </Text>
            <Text size="md" xClassName="sm:text-2xl text-slate-700">
              {user?.username || 'No username set'}
            </Text>
          </div>
        </div>

        <div className="mt-6 flex w-full flex-col gap-4 rounded-md bg-gray-800 p-4">
          <fieldset>
            <legend className="text-gray-400">Name</legend>
            <div className="flex flex-row items-center justify-between">
              <Text size="lg" xClassName="text-slate-100 font-bold">
                {user?.name}
              </Text>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-slate-100">E-mail</legend>
            <div className="flex flex-row items-center justify-between">
              <Text size="lg" xClassName="text-slate-100 font-bold">
                {user?.email}
              </Text>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-slate-100">Username</legend>
            <div className="flex flex-row items-center justify-between">
              {user?.username ? (
                <Text size="lg" xClassName="text-slate-100 font-bold">
                  {user?.username}
                </Text>
              ) : (
                <>
                  <Text xClassName="text-slate-300">Set your username e.g. @username</Text>
                  <button className="rounded-md bg-slate-600 px-4 py-2 text-slate-300">Edit</button>
                </>
              )}
            </div>
          </fieldset>
        </div>

        <div className="mt-4 w-full">
          <button className="w-full rounded-md bg-red-500 px-4 py-2 text-white desktop:w-24" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
