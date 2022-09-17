export const removeAccents = (str = '') =>
    str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const combineClass = (...classes) => {
    let newClasses = classes.filter(item => item) || []
    return newClasses.join(' ') || ''
}
    