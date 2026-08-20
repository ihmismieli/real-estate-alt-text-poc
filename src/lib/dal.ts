import { auth } from '@/auth'

export async function isCurrentUserAdmin(): Promise<boolean> {

    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminEmail) {
        return false
    }

    const session = await auth()

    return session?.user?.email === process.env.ADMIN_EMAIL
}