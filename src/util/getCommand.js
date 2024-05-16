const commands = {
    'valid': ["valid", "falit", "pelit"],
    'gantiHalaman': ["ganti halaman", "ke halaman", "pindah halaman", "halaman"],
    'back': ["kembali", "back", "bek", "sebelumnya", "bag", "bad", "balik"],
    'scroll': ["scroll", "skrol", "gulir", "scrol"],
    'scrollNaik': ["naik", "atas", "night"],
    'scrollTo': ["ke halaman", "menuju"],
    'zoomIn': ["perbesar", "zoom in"],
    'zoomOut': ["perkecil", "zoom out"],
    'halaman': {
        "home": ["beranda", "home", "hom"],
        "modul": ["modul", "baca modul", "buku", "baca buku"],
        "catatan": ["mencatat", "catatan"],
        "quiz": ["quiz", "kuis"],
    }
}

function getCommand(command, sub = ''){
    if(sub){
        return commands[command][sub]
    } else {
        return commands[command]
    }
}

export default getCommand