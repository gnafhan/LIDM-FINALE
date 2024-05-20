function checkClass(kode, classes, type = 'kode'){
    for (let key in classes) {
        if (classes.hasOwnProperty(key)) {
            let theClass = classes[key].id
            if(type == 'kode'){
                theClass = classes[key].kode_kelas.toLowerCase()
            }
           if(theClass == kode.toLowerCase()){
            return true
           }
        }
     }
     return false
}

export default checkClass