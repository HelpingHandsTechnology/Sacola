import { CgProfile, FaTrophy, FaUserFriends, MdFeedback } from "react-icons/fa";

export default function Profile() {
  return (
    <div class="flex flex-col justify-center items-center">
      <div class="bg-[url('https://wall.alphacoders.com/by_sub_category.php?id=241779&name=Social+Media+Wallpapers')]" />

      <div>
        <button>
          <CgProfile />
        </button>
        <div>
          <div>
            <p>+500</p>
          </div>
          <div>
            <p>Seguidores</p>
          </div>
          <div>
            <p>Seguindo</p>
          </div>
        </div>
        <div>
          <div>
            <FaTrophy />
          </div>
          <div>
            <FaUserFriends />
          </div>
          <div>
            <MdFeedback />
          </div>
        </div>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}
