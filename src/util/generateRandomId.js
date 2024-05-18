function generateRandomId(len) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = ''
    const charactersLength = characters.length
    
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    
    return result
  }
  
export default generateRandomId