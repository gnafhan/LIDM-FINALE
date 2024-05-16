function checkCommand(command, voice){
    for(let cmd of command){
      if(voice.includes(cmd)){
        return true;
      }
    }
    return false
  }

export default checkCommand