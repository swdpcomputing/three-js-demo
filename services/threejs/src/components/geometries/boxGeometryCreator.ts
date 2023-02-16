import * as THREE from 'three';

type Keys = keyof typeof GeometryFactory.geometryMap;
const sizeMult: number = 8;

export const boxGenerator = (): number[] => {
  return [
    rand(0.1, 1.6) * sizeMult,
    rand(0.1, 3) * sizeMult,
    rand(0.1, 3) * sizeMult,
  ];
};

export const capsuleGenerator = (): number[] => {
  return [rand(0.1, 0.7) * sizeMult, rand(0.1, 2), rand(1, 10), rand(3, 20)];
};

export const coneGenerator = (): number[] => {
  return [rand(0.1, 0.7) * sizeMult, rand(0.1, 2), rand(3, 25), rand(1, 20)];
};

export const circleGenerator = (): number[] => {
  return [rand(0.1, 1) * sizeMult, rand(1, 70)];
};

export const cylinderGenerator = (): number[] => {
  return [
    rand(0.1, 1) * sizeMult,
    rand(0.1, 1),
    rand(0.1, 2),
    rand(1, 20),
    rand(1, 20),
  ];
};

export const hedronGenerator = (): number[] => {
  return [rand(0.3, 1.2) * sizeMult];
};

export const torusGenerator = (): number[] => {
  return [rand(0.1, 0.7) * sizeMult, rand(0.01, 0.6), rand(2, 24), rand(1, 40)];
};

export const torusKnotGenerator = (): number[] => {
  return [
    rand(0.1, 0.7) * sizeMult,
    rand(0.01, 0.2),
    rand(3, 150),
    rand(3, 20),
    rand(1, 20),
    rand(1, 20),
  ];
};

export class GeometryFactory {
  

  static geometryMap: {
    [index: string]: {
      geometry: typeof THREE.BufferGeometry;
      generator: Function;
    };
  } = {
    box: { geometry: THREE.BoxGeometry, generator: boxGenerator },
    capsule: { geometry: THREE.CapsuleGeometry, generator: capsuleGenerator },
    cone: { geometry: THREE.ConeGeometry, generator: coneGenerator },
    circle: { geometry: THREE.CircleGeometry, generator: circleGenerator },
    cylinder: {
      geometry: THREE.CylinderGeometry,
      generator: cylinderGenerator,
    },
    dodecahedron: {
      geometry: THREE.DodecahedronGeometry,
      generator: hedronGenerator,
    },
    icosahedron: {
      geometry: THREE.IcosahedronGeometry,
      generator: hedronGenerator,
    },
    octahedron: {
      geometry: THREE.OctahedronGeometry,
      generator: hedronGenerator,
    },
    tetrahedron: {
      geometry: THREE.TetrahedronGeometry,
      generator: hedronGenerator,
    },
    torus: { geometry: THREE.TorusGeometry, generator: torusGenerator },
    torusKnot: {
      geometry: THREE.TorusKnotGeometry,
      generator: torusKnotGenerator,
    },
  };

  private static parameterGenerator = (key: Keys) => {
    return GeometryFactory.geometryMap[key]['generator']();
  };

  public static getGeometry(k: Keys): THREE.BufferGeometry {
    const arr = this.parameterGenerator(k);
    // Was originally ..arr. No idea why this works
    return new GeometryFactory.geometryMap[k]['geometry'](...(arr as []));
  }

  public static getRandomGeometry = (): THREE.BufferGeometry => {
    var keys = Object.keys(GeometryFactory.geometryMap);

    return GeometryFactory.getGeometry(
      keys[Math.floor(Math.random() * keys.length)],
    );
  };
}

function rand(min: number = 0, max: number = 1) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number = 0, max: number = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
