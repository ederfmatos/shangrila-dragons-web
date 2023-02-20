export class Clock {
  clockElement = document.querySelector(".clock");
  time = 10;
  interval = null;

  constructor(onEnd) {
    this.onEnd = onEnd;
  }

  start() {
    this.interval = setInterval(() => {
      this.time--;
      this.clockElement.innerHTML = `00:${String(this.time).padStart(2, "0")}`;
      if (this.time === 0) {
        clearInterval(this.interval);
        alert("Tempo acabou");
        this.onEnd?.call();
      }
    }, 1000);
  }

  reset() {
    this.clear();
    this.start();
  }

  clear() {
    if (this.interval) {
      this.time = 10;
      this.clockElement.innerHTML = `00:${String(this.time).padStart(2, "0")}`;
      clearInterval(this.interval);
    }
  }
}
