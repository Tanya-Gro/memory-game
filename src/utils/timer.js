import { EventEmitter } from './event-emitter';
import { getFormattedTime } from './format-time';

export class Timer extends EventEmitter {
  constructor() {
    super();

    this.seconds = 0;
    this.timerId = null;
    this.isRunning = false;
  }

  emitTimeChange() {
    this.emit('tick', getFormattedTime(this.seconds));
  }

  start() {
    this.isRunning = true;
    this.timerId = setInterval(() => {
      this.seconds++;
      this.emitTimeChange();
    }, 1000);
  }

  pause() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset() {
    this.seconds = 0;
    this.isRunning = false;
    this.emitTimeChange();
  }
}
