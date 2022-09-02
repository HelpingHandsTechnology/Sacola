import { useRouter } from "next/router";
import { FixedTabOutlet } from "../../Components/Home/FixedArticleTabOutlet";

const Read = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>Post: {id}</p>
      <FixedTabOutlet />
    </div>
  );
};

export default Read;
