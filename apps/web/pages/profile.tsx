import { Text } from 'design';
import { Layout } from '@/components/layout';

import { trpcNext } from '@/lib/trpc';


const Profile = () => {
  const utils = trpcNext.useContext();

  const { data: user } = trpcNext.user.getUserInfo.useQuery();

  return (
    <Layout>
      <div className="flex flex-col items-start w-full p-4">
        <Text size="xl" xClassName="sm:text-4xl font-bold">
          Your Profile
        </Text>

        <div className="flex flex-col w-full mt-2">
          <Text size="md" xClassName="sm:text-2xl">
            {user?.name}
          </Text>
          <Text size="md" xClassName="sm:text-2xl">
            {user?.email}
          </Text>
        </div>

      </div>
    </Layout>
  );
};

export default Profile;
