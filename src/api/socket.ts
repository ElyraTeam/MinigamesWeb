import { HOST } from './../config/constants';
import io, { Socket } from 'socket.io-client';
import { store } from '../state/store';
import { setGame } from '../state/reducers/game';
import { setPlayers } from '../state/reducers/players';
import { setRoom } from '../state/reducers/room';

class LocalPlayer {
  socket: Socket;

  constructor() {
    this.socket = io(HOST, { autoConnect: false });
    this.sync();
  }

  private sync() {
    // onPlayersSync: (sync: GamePlayersSync) => void // onOptionsSync: (sync: GameOptionsSync) => void, // onGameSync: (sync: GameSync) => void,
    this.socket.on('sync', (sync: GameSync) => store.dispatch(setGame(sync)));
    this.socket.on('options', (options: GameOptionsSync) =>
      store.dispatch(setRoom(options))
    );
    this.socket.on('players', (players: GamePlayersSync) =>
      store.dispatch(setPlayers(players))
    );
  }

  authenticate(
    authReqOptions: AuthenticateRequest,
    ack: (res: string) => void
  ) {
    this.socket.emit('authenticate', authReqOptions, (result: any) => {
      ack(result);
    });
  }

  chat(msg: string) {
    this.socket.emit('chat', msg);
  }

  startRound() {
    this.socket.emit('start-game');
  }

  finishRound() {
    this.socket.emit('stop-game');
  }

  resetGame() {
    this.socket.emit('reset-game');
  }

  onRequestValues(
    ack: (callback: (values: { [name: string]: string }) => void) => void
  ) {
    this.socket.on('request-values', ack);
  }

  onStartVote(ack: (categoryData: CategoryVoteData) => void) {
    this.socket.on('start-vote', ack);
  }

  sendVotes(voteData: Votes) {
    this.socket.emit('vote', voteData);
  }

  onStartTimer(ack: (countdown: number) => void) {
    this.socket.on('start-timer', ack);
  }

  onKick(ack: (kickMsg: string) => void) {
    this.socket.on('kick', ack);
  }

  onChat(ack: (msg: ChatMessage) => void) {
    this.socket.on('chat', ack);
  }

  onUpdateVotedCount(ack: (count: number) => void) {
    this.socket.on('update-vote-count', ack);
  }

  onPlayerVotes(ack: (votes: AllPlayersVotes) => void) {
    this.socket.on('player-votes', ack);
  }

  offAll() {
    this.socket.removeAllListeners('start-timer');
    this.socket.removeAllListeners('kick');
    this.socket.removeAllListeners('chat');
    this.socket.removeAllListeners('update-vote-count');
    this.socket.removeAllListeners('start-vote');
    this.socket.removeAllListeners('request-values');
    this.socket.removeAllListeners('player-votes');
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const localPlayer = new LocalPlayer();

export default localPlayer;
