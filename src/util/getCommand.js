const commands = {
    'valid': ["valid", "falit", "pelit"],
    'gantiHalaman': ["halaman"],
    'back': ["kembali", "back", "bek", "sebelumnya", "bag", "bad"],
    'scroll': ["scroll", "skrol", "gulir", "scrol"],
    'scrollNaik': ["naik", "atas", "night"],
    'scrollTo': ["ke halaman", "menuju"],
    'zoomIn': ["perbesar", "zoom in"],
    'zoomOut': ["perkecil", "zoom out"],
    'openModul': ["buka modul", "buka module"],
    'openCatatan': ["buka catatan", "lihat catatan"],
    'startEdit': ['mulai edit', 'mulai sunting', 'start edit', 'mulai mencatat'],
    'stopEdit': ['stop edit', 'berhenti edit', 'stop sunting', 'berhenti sunting', 'berhenti mencatat'],
    'backspace': ['hapus huruf terakhir', 'hapus karakter terakhir'],
    'deleteLastWord': ['hapus kata terakhir'],
    'deleteLastSentence': ['hapus kalimat terakhir'],
    'halaman': {
        "home": ["beranda", "home", "hom"],
        "modul": ["modul", "module"],
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