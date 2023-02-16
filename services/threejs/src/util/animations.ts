import { Object3D } from "three";
import gsap from "gsap";

const animations = (object: Object3D): Object => {
  return {
    spin: () => {
      gsap.to(object.rotation, {
        duration: 3,
        y: object.rotation.y + Math.PI * 2,
      });
    },
  };
};

export default animations;
