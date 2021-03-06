import React, { Component } from 'react';
import styled from 'styled-components';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';

import TicTacListItem from '../../components/TicTacListItem/TicTacListItem';
import FirstPlayer from '../../components/First-player/First-player';
import SecondPlayer from '../../components/Second-player/Second-player';
import { mapStateToProps } from './redux-selectors/mapStateToProps';
import { mapDispatchToProps } from './redux-selectors/mapDispatchToProps';

const BlockCSS = styled.div`
  display: flex;
  background: teal;
  margin-top: 25px;
  flex-wrap: wrap;
  width: 620px;
  box-shadow: 0 0 8px #661156;
  padding: 10px;
`;

const ContentCSS = styled.div`
  width: 100%;
  display: flex;
`;

class TicTacToeList extends Component {

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.savedPlayer !== this.props.savedPlayer) {
      this.props.initGame();
    }
  }

  render() {
    let readyToStartGame = null;
    if (this.props.savedPlayer && !this.props.errorMessage) {
      const { firstPlayerName, secondPlayerName, nextPlayer, scores, ticTacBoard, winner, warningMessage, startGame, playerClick } = this.props;
      let warningMessageDefault = '';
      if (warningMessage) {
        warningMessageDefault = (
            <Alert color="warning">
              Ops! Pick Another Field
            </Alert>
        );
      }
      let finishGame = '';
      if (winner && !startGame) {
        finishGame = (
            <Alert color="success">
              <strong>VICTORY: </strong>
              <strong>{winner} </strong> won the game
            </Alert>
        );
      } else if (!winner && !startGame) {
        finishGame = (
            <Alert color="success">
              <strong>NO WINNER: </strong>Start new game
            </Alert>
        );
      }
      const ticTacListItem = ticTacBoard.map((field, index) => {
        let hoverAll = 'hoverAll';
        if (!startGame || field.field) {
          hoverAll = '';
        }
        return (
            <TicTacListItem
                hoverAll={hoverAll}
                activeDrawWinner={field.drawField}
                playerClick={(e) => playerClick(e, index)}
                key={index}>
              {field.field}
            </TicTacListItem>
        );
      });

      readyToStartGame = (
          <>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block', width: '620px' }}>
                {warningMessageDefault}
                {finishGame}
              </div>
            </div>
            <ContentCSS>
              <FirstPlayer
                  activePlayer={nextPlayer === 'X' ? 'activePlayer' : ''}
                  name={firstPlayerName}
                  score={scores[0]} />
              <div>
                <BlockCSS>
                  {ticTacListItem}
                </BlockCSS>
              </div>
              <SecondPlayer
                  activePlayer={nextPlayer === '0' ? 'activePlayer' : ''}
                  name={secondPlayerName}
                  score={scores[1]} />
            </ContentCSS>
          </>
      );
    } else if (!this.props.savedPlayer && this.props.errorMessage) {
      readyToStartGame = (
          <div style={{ textAlign: 'center' }}>
            <Alert color="danger" style={{ display: 'inline-block', width: '30%' }}>
              <strong>Please choose correct name!</strong>
            </Alert>
          </div>
      );
    }

    return readyToStartGame;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeList);