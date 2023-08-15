export const Database: User[] =[
    {
        id: 1,
        firstName: 'Jake',
        lastName: 'Batucan',
        email: 'batucanjake18@gmail.com',
        password: 'jakepogi',
        userName: 'oshi',
        role: 'ADMIN'
    },
    {
        id: 1,
        firstName: 'mac',
        lastName: 'idk',
        email: 'mac@gmail.com',
        password: 'mac',
        userName: 'mac',
        role: 'USER'
    },
    {
        id: 1,
        firstName: 'denver',
        lastName: 'idk',
        email: 'denver@gmail.com',
        password: 'denver',
        userName: 'denver',
        role: 'USER'
    },
    {
        id: 1,
        firstName: 'gen',
        lastName: 'idk',
        email: 'gen@gmail.com',
        password: 'gen',
        userName: 'gen',
        role: 'USER'
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