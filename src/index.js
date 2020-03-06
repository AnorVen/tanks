require("./engine/Loader");
import { Loader } from "./engine/Loader";
import heroes from "./static/heroes.jpg";

const loader = new Loader();
loader.addImage("heroes", heroes);
//loader.load(()=>console.log(1));
GameEngine.Loader.loadImage(heroes).then(image => {
  document.body.append(image);
});
