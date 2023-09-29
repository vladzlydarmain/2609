const authModule = require('./auth.js');
const studentModule = require('./student.js');
// const readLine = require('readline')

// // const rl = readLine.createInterface({
// //     input: process.stdin,
// //     output: process.stdout
// // })

var studentUser
var teacherUser

const main = () => {
    if (!studentUser && !teacherUser){
        console.log('Авторизація: \n1: Я вчитель\n2: Я учень')
        authModule.rl.question('',(select)=>{
            switch(select){
                case '1':
                    authModule.authTeacher((teacher) => {
                        teacherUser = teacher
                        main()
                    })
                    
                    break;
                case '2':
                    authModule.authStudent((student) => {
                        studentUser = student
                        main()
                    })
                    
                    break; 
            } 
        })
        
    } else if (teacherUser){
        console.log('You are teacher ')
        console.log(teacherUser.name, teacherUser.surname)
        authModule.rl.question("1: Переглянути список учнів \n2: Поставити оцінку учню \n3: Переглянути оцінки учнів ",(selectTeacher) => {
            let number = 1
            let subjectNumber = 1
            switch(selectTeacher){
                case '1':
                    for(student of studentModule.students){
                        console.log(`${student.name} ${student.surname}`)
                    }
                    main()
                    break
                case '2':
                    for(student of studentModule.students){
                        console.log(`${number}: ${student.name} ${student.surname}`)
                        number++
                    }
                    authModule.rl.question('Оберіть номер учня: ', (numberSelect) => {
                        let studentSelected = studentModule.students.at(Number(numberSelect)-1)
                        let subjects = Object.keys(studentSelected.marks)
                        for(let subject of subjects){
                            console.log(`${subjectNumber}: ${subject}`)
                            subjectNumber ++
                        }
                        authModule.rl.question('Оберіть предмет: ',(subjectSelected) => {
                            subjectSelected -= 1
                            authModule.rl.question('Напишіть оцінку яку ви хочете поставити: ',(mark)=>{
                                studentSelected.marks[subjects[subjectSelected]].push(mark)
                                console.log(studentSelected.marks)
                                main()
                            })
                        })
                    })
                    
                    break
                case '3':
                    for(student of studentModule.students){
                        console.log('--------------------')
                        console.log(`${student.name} ${student.surname}`)
                        let subjects = Object.keys(student.marks)
                        for(subject of subjects){
                            console.log(`${subject}: ${student.marks[subject]}`)
                        }
                        console.log('--------------------')
                    }
                    main()
                    break
            }
        })
    } else if (studentUser){
        console.log('You are student ')
        console.log(studentUser.name, studentUser.surname)
        console.log(studentUser.marks)
    }
    
} 

main()
