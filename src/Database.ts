export const Database: User[] =[
    {
        id: 1,
        firstName: 'Jake',
        lastName: 'Batucan',
        email: 'batucanjake18@gmail.com',
        password: 'jakepogi',
        userName: 'oshi',
        role: 'ADMIN'
    }

]



export type User = {
    id: number,
    firstName: string,
    lastName: string
    email: string,
    password: string,
    userName: string,
    role: string
}