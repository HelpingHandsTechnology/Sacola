import { useRouter } from "next/router";

const Read = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
};

export default Read;
