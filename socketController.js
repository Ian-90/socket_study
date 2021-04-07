const socketController = (socket) => {
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
    console.log(nickname);
  });

  // socket.on("setNickname", ({ nickname }) => {
  //   socket.nickname = nickname;
  // });
};

export default socketController;
