console.log('hello ts!')

interface StriveStaff {
    name: string,
    age?: number,
    role: string
}

let striveTutors: Array<StriveStaff> = [
    {
        name: 'Stefano',
        age: 33,
        role: 'Teacher'
    }, 
    {
        name: 'Riccardo',
        age: 35,
        role: 'Teacher'
    },
    {
        name: 'Stefano mic',
        age: 31,
        role: 'Teacher'
    },
    {
        name: 'Diego',
        role: 'Master of Strive'
    }
]

console.log(striveTutors[1].role)