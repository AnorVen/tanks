require("./engine/Loader");
import { Loader } from "./engine/Loader";
import heroes from "./static/heroes.jpg";
import persons from "./static/person.json";

const loader = new Loader();
loader.addImage("heroes", heroes);
loader.addJson("persons", persons);
console.log(loader);
const callback = () => {
  console.log(loader);
};
//loader.load(callback);
GameEngine.Loader.loadImage(heroes).then(image => {
  document.body.append(image);
});
