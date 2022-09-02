import { useRouter } from "next/router";
import { FixedArticleTabOutlet } from "../../Components/Home/FixedArticleTabOutlet";

const Read = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>Post: {id}</p>
      <FixedArticleTabOutlet />
    </div>
  );
};

export default Read;
