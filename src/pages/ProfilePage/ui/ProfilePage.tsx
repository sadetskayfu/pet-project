import { useParams } from "react-router-dom"

const ProfilePage = () => {
	const { userId } = useParams()

	return (
		<div className="page">
			<div className="container">Profile page of user {userId}</div>
		</div>
	)
}

export default ProfilePage
