const users = [];
const Player = require("../classes/Player").Player;
const genTetraminoArr = require("../pieceHelper/pieceHelper");

const addUser = ({ id, name, room }) => {

    const roomLength = users.filter((user) => user.room === room);

    if (roomLength.length >= 6) {
      console.log('Room is full')
      return { error: 'Room is full (limit: 6)' };
    }else {
      let user = new Player(id, name, room);
      users.push(user);
      return { user };      
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const startGame = (room) => {
  users.map((user) => { 
    if (user.room === room) {
      user.inGame = true;
    }
  });
  return users;
}

const deadUser = (id) => {
users.map((user) => { 
    if (user.id === id) {
      user.inGame = false;
      user.board = null;
    }
  });
  return users;
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, startGame, genTetraminoArr, deadUser, users };