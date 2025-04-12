import { useParams } from "react-router-dom"

const UserProfilePage = () => {
	const { userId } = useParams()

	return (
		<div className="page">
			<div className="container">Profile page of user {userId}</div>
		</div>
	)
}

export default UserProfilePage
