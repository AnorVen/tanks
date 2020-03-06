import { compilation } from "webpack";

export class Loader {
  constructor() {
    this.loadOrder = {
      images: [],
      json: []
    };
    this.resources = {
      images: [],
      json: []
    };
  }

  addImage = (name, src) => {
    this.loadOrder.images.push({ name, src });
  };

  load = (callback = () => ({})) => {
    const promises = [];
    for (const { name, src } of this.loadOrder.images) {
      const promise = Loader.loadImage(src).then(image => {
        this.resources.images[name] = image;
        if (this.loadOrder.images.includes(name)) {
          const index = this.loadOrder.images.indexOf(name);
          this.loadOrder.images.splice(index, 1);
        }
      });
      promises.push(promise);
    }
    Promise.all(promises).then(() => callback());
  };

  static loadImage = src => {
    return new Promise((res, rej) => {
      try {
        const image = new Image();
        image.onload = () => res(image);
        image.src = src;
      } catch (err) {
        rej(err);
      }
    });
  };
}

(function() {
  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Loader = Loader;
})();
