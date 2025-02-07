

export async function getUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        next: { revalidate: 60 }, // ISR - обновление раз в 60 секунд
    });


    if (!res.ok) {
        if (res.status === 404) {
            console.warn(`Users not found.`);
            return null;
        }
        throw new Error("Failed to fetch users data");
    }

    return res.json();
}

