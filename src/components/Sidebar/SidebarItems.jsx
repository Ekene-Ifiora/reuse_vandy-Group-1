import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import SearchUser from "./SearchUser";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<SearchUser />
			<Notifications />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;
