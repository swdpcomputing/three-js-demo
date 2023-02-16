import size2d from "../types/size2d";

const getScreenSize = (): size2d => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export default getScreenSize;
