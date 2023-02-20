export class Clock {
  clockElement = document.querySelector(".clock");
  time = 10;
  interval = null;

  start() {
    this.interval = setInterval(() => {
      this.time--;
      this.clockElement.innerHTML = `00:${String(this.time).padStart(2, "0")}`;
      if (this.time === 0) {
        clearInterval(this.interval);
        alert("Tempo acabou");
      }
    }, 1000);
  }

  reset() {
    if (this.interval) {
      this.time = 10;
      this.clockElement.innerHTML = `00:${String(this.time).padStart(2, "0")}`;
      clearInterval(this.interval);
    }
    this.start();
  }
}
