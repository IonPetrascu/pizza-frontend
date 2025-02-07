import { NextPage } from 'next'
import { getUsers } from '@/utils/api'

interface Props { }

const Page: NextPage<Props> = async () => {
    const users = await getUsers()

    return (
        <div>
            <h1>Success!</h1>
            {users ? (
                users.map((user) => (
                    <div key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    )
}

export default Page
