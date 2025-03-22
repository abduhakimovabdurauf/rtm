const statuses = {
    active: 'Faol',
    pending: 'Jarayonda',
    inactive: 'Faol emas',
    completed: 'Bajarilgan',
    dropped: 'Bekor qilingan',
    expelled: 'Haydalgan',
    failed: 'Muvaffaqiyatsiz',
    read: 'O`qildi',
    unread: 'O`qilmadi',
    answered: 'Javob berildi',
    no_answer: 'Javob berilmadi',
    busy: 'Band',
    call_back: 'Qayta aloqa',
};

export function getStatus(status) {
    return statuses[status] ? statuses[status] : 'Noma\'lum holat';
}
