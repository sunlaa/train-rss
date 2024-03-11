type Emiter = {
  [key: string]: (() => void)[];
};
class EventEmmiter {
  events: Emiter;

  constructor() {
    this.events = {};
  }

  subscribe(name: string, fn: () => void) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }

  unsubscribe(name: string, fn: () => void) {
    this.events[name] = this.events[name].filter(
      (eventCallback) => fn !== eventCallback
    );
  }

  emit(name: string) {
    if (!this.events[name]) {
      return [];
    }

    return this.events[name].forEach((fn) => fn());
  }
}

const emmiter = new EventEmmiter();

export default emmiter;
