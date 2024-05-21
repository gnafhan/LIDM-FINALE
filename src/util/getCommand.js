const commands = {
    'valid': ["valid", "falit", "pelit"],
    'gantiHalaman': ["halaman"],
    'back': ["kembali", "back", "bek", "bag", "bad"],
    'scroll': ["scroll", "skrol", "gulir", "scrol"],
    'scrollNaik': ["naik", "atas", "night"],
    'scrollTo': ["ke halaman", "menuju"],
    'zoomIn': ["perbesar", "zoom in"],
    'zoomOut': ["perkecil", "zoom out"],
    'openModul': ["buka modul", "buka module", "lihat modul", "lihat module"],
    'openCatatan': ["buka catatan", "lihat catatan"],
    'openQuiz': ["buka quiz", "lihat quiz", "buka kuis", "lihat kuis", "mulai kuis"],
    'startEdit': ['mulai edit', 'mulai sunting', 'start edit', 'mulai mencatat'],
    'stopEdit': ['stop edit', 'berhenti edit', 'stop sunting', 'berhenti sunting', 'berhenti mencatat'],
    'backspace': ['hapus huruf terakhir', 'hapus karakter terakhir'],
    'deleteLastWord': ['hapus kata terakhir'],
    'deleteLastSentence': ['hapus kalimat terakhir'],
    'deleteLastLine': ['hapus baris terakhir'],
    'createNewLine': ['enter'],
    'createCatatan': ['buat catatan'],
    'kodeKelas': ['masukkan kode'],
    'enterKode': ['enter', 'submit', 'kirim'],
    'masukKelas': ['masuk kelas', 'buka kelas'],
    'pilihJawaban': ['pilih', 'jawab'],
    'nextNumber': ['selanjutnya', 'next'],
    'previousNumber': ['sebelumnya', 'previous'],
    'toNumber': ['ke nomor'],
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