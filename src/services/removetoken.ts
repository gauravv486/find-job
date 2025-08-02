import { cookies } from 'next/headers'

const removetoken =async () => {
    const cookiestore = await cookies();
    cookiestore.delete('token');
}

export default removetoken
