export const mapStateToProps = (state) => {
  return {
    savedPlayer: state.savedPlayer,
    firstPlayerName: state.firstPlayerName,
    secondPlayerName: state.secondPlayerName,
    nextPlayer: state.nextPlayer,
    scores: state.scores,
    ticTacBoard: state.ticTacBoard,
    winner: state.winner,
    warningMessage: state.warningMessage,
    startGame: state.startGame,
    errorMessage: state.errorMessage
  }
};