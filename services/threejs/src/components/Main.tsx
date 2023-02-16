import { useRef } from 'react';
import { useEffectOnce } from '../hooks/useEffectOnce';
import * as THREE from 'three';
import ThreeBasics from '../util/threeBasics';
import { MeshStandardMaterialTweakFactory } from './tweak/meshStandardMaterialTweakFactory';
import { MeshStandardMaterialTweak } from './tweak/meshStandardMaterialTweak';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { MeshStandardMaterialRandomiser } from './tweak/meshStandardMaterialRandomiser';
import Textures from '../util/textures';
import MeshParams from './meshes/types/meshParams';
import { MeshStandardMaterial } from 'three';
import { GeometryFactory } from './geometries/boxGeometryCreator';
import * as d3 from 'd3';

const numObjects = 200;
const textString = 'Refresh!';
const randomColor = require('randomcolor');

export default function Game() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffectOnce(() => {
    // SETUP
    const { current } = mountRef;
    if (!current) return;
    const clock = new THREE.Clock();
    const threeBasics = new ThreeBasics();
    const { scene, camera, renderer, mouseCam } = threeBasics.getThreeBasics();
    const { domElement } = renderer;
    current.appendChild(domElement);

    // ADD OBJECTS
    (async function addObjects() {
      const textures = new Textures(); // Do not delete - initial creation to initialise
      await Textures.initialise();
      createGeometries();

      const materialTweak: MeshStandardMaterialTweak =
        new MeshStandardMaterialTweakFactory().createTweak();
      loadFonts(materialTweak.material);
    })();

    // MULTI-MESHES
    const meshes: Array<MeshParams> = [];

    async function createGeometries() {
      const randomiser = new MeshStandardMaterialRandomiser();

      for (let i = 0; i < numObjects; i++) {
        const mesh = new THREE.Mesh(
          GeometryFactory.getRandomGeometry(),
          randomiser.newRandomisedMeshStandardMaterial(),
        );

        mesh.geometry.setAttribute(
          'uv2',
          new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2),
        );

        setMeshPositionAndRotation(mesh);
        pushMesh(mesh);
        scene.add(mesh);
      }
    }

    const setMeshPositionAndRotation = (mesh: THREE.Mesh) => {
      const positions = ifObjectInWordPushToBackground(randCoords());
      mesh.position.set(positions[0], positions[1], positions[2]);
      mesh.rotation.set(randRotation(), randRotation(), randRotation());
    };

    const pushMesh = (mesh: THREE.Mesh) => {
      meshes.push({
        mesh: mesh,
        rotationSpeeds: { x: randDiv(2), y: randDiv(2), z: randDiv(2) },
      });
    };

    // FONTS
    function loadFonts(material: MeshStandardMaterial) {
      const fontLoader = new FontLoader();
      const bevelSize = 0.02;
      const bevelThickness = 0.005;

      fontLoader.load(
        `${process.env.NEXT_PUBLIC_CLOUD_FONTS_DOMAIN}kgMelonheads.json`,
        (font) => {
          const textGeometry = new TextGeometry(textString, {
            font: font,
            size: 1.0,
            height: 0.6,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelOffset: 0,
            bevelSegments: 5,
          });
          textGeometry.computeBoundingBox();
          textGeometry.center();

          const newColorInteger: number = parseInt(
            randomColor({
              luminosity: 'bright',
            }).substring(1),
            16,
          );

          material['color'].set('#' + newColorInteger.toString(16));
          const text = new THREE.Mesh(textGeometry, material);

          scene.add(text);
        },
      );
    }

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 100, 50, 5);
    var pointLight2 = new THREE.PointLight(0xaaaaaa, 30, 150, 2);
    pointLight.position.set(110, 0, 110);
    pointLight2.position.set(45, 0, 30);

    pointLight.castShadow = true;
    scene.add(pointLight);
    scene.add(pointLight2);

    // ANIMATE
    (function animate() {
      const scaleRatio = threeBasics.updateScreenSize();
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      mouseCam.updateCamera();
      threeBasics.animateFunctions();

      meshes.forEach((mesh) => {
        mesh.mesh.rotation.x = mesh.rotationSpeeds.x * elapsedTime;
        mesh.mesh.rotation.y = mesh.rotationSpeeds.y * elapsedTime;
        mesh.mesh.rotation.z = mesh.rotationSpeeds.z * elapsedTime;

        if (scaleRatio > 1) mesh.mesh.scale.set(1, 1 - scaleRatio, 1);
        else if (scaleRatio < 1) mesh.mesh.scale.set(1, scaleRatio + 1, 1);
        else mesh.mesh.scale.set(1, 1, 1);
      });

      pointLight.rotation.x = 0.4 * elapsedTime;
      pointLight.rotation.y = 0.4 * elapsedTime;
      pointLight.rotation.z = 0.4 * elapsedTime;

      renderer.render(scene, camera);
    })();

    // CLOSING UTIL
    window.addEventListener('resize', threeBasics.windowResize(), false);

    return () => {
      current.removeChild(domElement);
    };
  });

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
}

function ifObjectInWordPushToBackground(coords: number[]) {
  if (
    isBetween(coords[0], -4, 4) &&
    isBetween(coords[1], -2, 2) &&
    isBetween(coords[2], -2, 6)
  ) {
    coords[2] = getRandomRange(-3, -15);
  }

  return coords;
}

function randDiv(divider: number) {
  return Math.random() / divider;
}

function isBetween(a: number, rangeStart: number, rangeEnd: number) {
  return a >= rangeStart && a <= rangeEnd ? true : false;
}

function randCoords(): number[] {
  let x = d3.randomNormal(0, 65)();
  let y = d3.randomNormal(0, 65)();
  let z = d3.randomNormal(0, 65)();
  return [x, y, z];
}

function randRotation() {
  return Math.random() * Math.PI;
}

function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
