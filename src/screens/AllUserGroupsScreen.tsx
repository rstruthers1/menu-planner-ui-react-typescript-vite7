import {Alert} from "react-bootstrap";
import {useGetUserGroupsQuery} from "../services/usergroup.api";
import {Link} from "react-router-dom";
import TopOffsetContainer from "../components/TopOffsetContainer.tsx";

const AllUserGroupsScreen = () => {
    const {data, error, isLoading} = useGetUserGroupsQuery();

    return (
        <TopOffsetContainer>
        <h1>All User Groups</h1>
        {data && (

            <ul>
                {data.map((userGroup) => (
                    <li key={userGroup.id}>{userGroup.name}</li>
                ))}
            </ul>

        )}
            {error && (
                <Alert variant="danger">Error fetching cookbooks</Alert>
            )}
        {isLoading && <p>Loading...</p>}
            <Link to='/dashboard' className='mt-4'>Back to Dashboard</Link>
        </TopOffsetContainer>
    );
}

export default AllUserGroupsScreen;