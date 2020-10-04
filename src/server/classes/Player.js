class Player {
  constructor(id, username, room){
    this.id = id;
    this.username = username;
    this.board = null;
    this.room = room;
    this.inGame = false;
  }
}

module.exports.Player = Player;