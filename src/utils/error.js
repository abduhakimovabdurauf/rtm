const errors ={
    EMAIL_NOT_FOUND: 'Bunday pochta topilmadi',
    PASSWORD_NOT_FOUND: 'Bunday parol yo`q!',
    auth:'Saytga kiring'
}
export function error(error){
    return errors[error] ? errors[error] : 'Noma`lum xatolik'
}