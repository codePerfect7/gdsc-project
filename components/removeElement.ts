const removeElement = (array: any[], el: any) => {
    const index = array.indexOf(el)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}

export default removeElement