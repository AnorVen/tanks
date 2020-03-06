export class Loader {
  constructor() {
    this.loadOrder = {
      images: [],
      jsons: []
    };
    this.resources = {
      images: [],
      jsons: []
    };
  }

  addImage = (name, src) => {
    this.loadOrder.images.push({ name, src });
  };
  addJson = (name, address) => {
    this.loadOrder.jsons.push({ name, address });
  };

  load = callback => {
    this.loadImages(callback);
    this.loadJsons(callback);
  };

  loadImages = callback => {
    const promises = [];
    for (const imageData of this.loadOrder.images) {
      const { name, src } = imageData;
      const promise = Loader.loadImage(src)
        .then(image => {
          this.resources.images[name] = image;
          if (this.loadOrder.images.includes(imageData)) {
            const index = this.loadOrder.images.indexOf(imageData);
            this.loadOrder.images.splice(index, 1);
          }
        })
        .catch(err => console.log(err));
      promises.push(promise);
    }
    Promise.all(promises).then(() => callback());
  };

  loadJsons = callback => {
    const promises = [];
    for (const jsonData of this.loadOrder.jsons) {
      const { name, address } = jsonData;
      const promise = Loader.loadJson(address)
        .then(res => {
          this.resources.jsons[name] = res;
          if (this.loadOrder.jsons.includes(jsonData)) {
            const index = this.loadOrder.jsons.indexOf(jsonData);
            this.loadOrder.jsons.splice(index, 1);
          }
        })
        .catch(err => console.log(err));
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
  static loadJson = url => {
    console.log(typeof url);
    if (typeof url === "object") {
      return new Promise((res, rej) => {
        return res(url);
      });
    }
    return fetch(url)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.json());
          return res.json();
        }
        console.log(res.status);
      })
      .catch(error => console.log(error));
  };
}

(function() {
  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Loader = Loader;
})();
