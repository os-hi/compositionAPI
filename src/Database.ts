export const Database : User[] =[
    {
        email: 'batucanjake18@gmail.com',
        password: 'jakepogi',
        name: 'jake',
        role: 'ADMIN'
    }

]



export type User = {
    email: string,
    password: string,
    name: string
    role: "USER" | "ADMIN" | "GUEST" 
}