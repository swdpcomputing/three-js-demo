# three-js-demo

An application to demonstrate standard materials and geometries with Three.js. Utilises Typescript and Next.js

Material property variations are:

- map
- alphaMap
- metalnessMap
- roughnessMap
- bumpMap
- displacementMap
- aoMap
- emissiveMap
- envMap
- lightMap
- normalMap
- wireframe

Geometries included are:

- box
- capsule
- cone
- circle
- cylinder
- dodecahedron
- icosahedron
- octahedron
- tetrahedron
- torus
- torusKnot

Both the paramaters and the maps where appropriate are randomised.

## Use

Use your mouse on desktop to move and zoom around the space. On mobile, use typical finger gestures to move and zoom.
Refresh the page to see a new set of randomised textures.

## Shortcomings

- Artifacts stretch when window is resized on desktop
- Sometimes the Refresh text 

## Disabled features

There is an in-built menu where you can change the texture and colour options of the 'Refresh' Text.
If you'd like to see a version with this feature, please let me know. You can see how it's 
implemented in the codebase.

## Possible extensions

- Different materials such as Toon, Phong, and Lambert
- More complex geometries such as Vectors
- Click on a mesh to see it's properties

## Coding notes.

This app is a summation of learning from Section 01 - Basics from the tutorial https://threejs-journey.com/
by Bruno Simon. It uses simple concepts from Three.js - materials, geometries, meshes, lights, etc - with 
more advanced Javascript / Typescript features. The MaterialTweak class, for example, has instances created 
using the Factory Method Design Pattern. However, it is still somewhat in the format of a sandbox and could 
do with some refactoring before developing new features.
