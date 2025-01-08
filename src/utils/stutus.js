// utils/status.js
const statuses = {
    active: 'Faol',
    pending: 'Kutmoqda',
    inactive: 'Faol emas',
    completed: 'Tugallangan',
    dropped: 'Tushib qolgan',
    expelled: 'Chekilgan',
    failed: 'Tasdiqlanmagan',
};

export function getStatus(status) {
    return statuses[status] ? statuses[status] : 'Noma\'lum holat';
}
