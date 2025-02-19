import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  ADDITION,
  Brush,
  Evaluator,
  SUBTRACTION,
  REVERSE_SUBTRACTION,
  INTERSECTION,
  HOLLOW_SUBTRACTION,
  HOLLOW_INTERSECTION,
} from "three-bvh-csg";


import { Text } from "troika-three-text";

const scene = new THREE.Scene();
// scene.background = new THREE.Color( '#f2f2f2' );
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  1,
  7500
);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1800);
camera.position.set(0, 0, 1000);

const directionalLight = new THREE.DirectionalLight("white", 0.4);
directionalLight.position.set(150, 150, 100);
// directionalLight.target();
const targetObject = new THREE.Object3D();
targetObject.position.set(100, -100, -100);
// directionalLight.add(targetObject);

directionalLight.target = targetObject;
directionalLight.target.updateMatrixWorld();

// directionalLight.lookAt(100,100,200);
// scene.add( directionalLight );

const helper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add( helper );

const pointLight = new THREE.PointLight(0xffffff, 0.2, Infinity, 0.1);
pointLight.position.set(-200, -10);
// pointLight.lookAt(500,100);
// camera.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
// camera.add(pointLightHelper);
// scene.add(pointLight);
const hemisphereLight = new THREE.HemisphereLight("white", "white", 1);
// scene.add( hemisphereLight );

const axesHelper = new THREE.AxesHelper(500);
// scene.add(axesHelper);

//#region Hole in the Extruded path and line in the both end faces...
// const origin = new THREE.Vector2(0,0);
// const shapeWidth = 50;
// const shapeHeight = 50;
// const extrudeWidth = 300;
// const shape = new THREE.Shape();
// shape.moveTo(origin.x,origin.y);
// shape.lineTo(origin.x + shapeWidth, origin.y);
// shape.lineTo(origin.x + shapeWidth, origin.y + shapeHeight);
// shape.lineTo(origin.x, origin.y + shapeHeight);
// shape.lineTo(origin.x, origin.y);

//   const path = new THREE.CurvePath();
//   const line = new THREE.LineCurve3(
//     new THREE.Vector3(origin.x, origin.y, origin.z ),
//     new THREE.Vector3(origin.x + extrudeWidth, origin.y, origin.z)
//   );
//   path.add(line);

//   const extrudeSettings = {
//     steps: 1,
//     extrudePath: path,
//     bevelEnabled: false,
//   };
//   const holeShape = new THREE.CylinderGeometry(shapeWidth/4,shapeWidth/4,shapeHeight*2 ,32,1,false,0,Math.PI *2);
//   const holematerial = new THREE.MeshBasicMaterial({color: 'yellow', side: THREE.DoubleSide});
//   const extrudeShape = new THREE.ExtrudeGeometry(shape, extrudeSettings);
//   const material = new THREE.MeshBasicMaterial({color: 'red'});

//   const geometry1 = new Brush(extrudeShape, material);
//   geometry1.updateMatrixWorld();

//   const geometry2 = new Brush(holeShape, holematerial);
//   geometry2.rotation.x += Math.PI/2;
//   geometry2.position.set(extrudeWidth/2,shapeHeight/2,0);

//   geometry2.updateMatrixWorld();
//   console.log(geometry2.updateMatrixWorld);
//   const evaluator = new Evaluator();
//   const result = evaluator.evaluate(geometry1, geometry2, SUBTRACTION);

//   scene.add(result)

//   extrudeShape.computeVertexNormals(); // Ensure normals are computed

// const positionAttribute = geometry1.geometry.getAttribute("position"); // Get the position attribute
// const verticesFront = [];
// const verticesBack = [];

// for (let i = 0; i < positionAttribute.count; i++) {
//   const x = positionAttribute.getX(i);
//   const y = positionAttribute.getY(i);
//   const z = positionAttribute.getZ(i);

//   if(x === origin.x){
//     if(y === shapeHeight){
//       positionAttribute.setX(i, x + y * 100);
//       positionAttribute.needsUpdate = true;

//     }
//   verticesFront.push(new THREE.Vector3(x, y, z)); // Store the verticesFront
//   }
//   geometry1.updateMatrixWorld();

//   if(x === extrudeWidth)
//   verticesBack.push(new THREE.Vector3(x, y, z)); // Store the verticesBack
// }

// console.log(verticesFront);
// console.log(verticesBack);
// const lineShapeFront = new THREE.BufferGeometry().setFromPoints(verticesFront);
// const lineShapeBack = new THREE.BufferGeometry().setFromPoints(verticesBack)
// const edgesFront = new THREE.EdgesGeometry(lineShapeFront);
// const edgesBack = new THREE.EdgesGeometry(lineShapeBack);
// const edgesMaterial = new THREE.LineBasicMaterial({color: "white"});
// const linedEdgesFront = new THREE.LineSegments(edgesFront, edgesMaterial);
// const linedEdgesBack = new THREE.LineSegments(edgesBack, edgesMaterial);
// scene.add(linedEdgesFront);
// scene.add(linedEdgesBack);

//#endregion

//#region Extruded shape cut and lines in the face
// const origin = new THREE.Vector3(0,0,0);
// const shapeWidth = 50;
// const shapeHeight = shapeWidth;
// const innerWidth = 40;
// const innerHeight = innerWidth;
// const extrudeWidth = 300;
// const shape = new THREE.Shape();
// shape.moveTo(origin.x,origin.y);
// for(let i = 0; i <= shapeWidth;i++ ){
//   shape.lineTo(origin.x + i, origin.y);
// }
// for(let i = 0;i <= shapeHeight;i++){
//   shape.lineTo(origin.x + shapeWidth, origin.y + i);

// }
// for(let i = shapeWidth;i >= 0;i--){
//   shape.lineTo(origin.x + i, origin.y + shapeHeight);

// }
// for(let i = shapeHeight;i>=0;i--){
//   shape.lineTo(origin.x, origin.y + i);

// }
// shape.closePath();

// //#region playing with lines ...
// // // bottom line points
// // shape.lineTo(origin.x + shapeWidth/3, origin.y);
// // shape.lineTo(origin.x + shapeWidth/2, origin.y);
// // shape.lineTo(origin.x + shapeWidth - shapeWidth/3, origin.y);
// // shape.lineTo(origin.x + shapeWidth, origin.y);

// // // right side line points

// // shape.lineTo(origin.x + shapeWidth, origin.y + shapeHeight/3);
// // shape.lineTo(origin.x + shapeWidth, origin.y + shapeHeight/2);
// // shape.lineTo(origin.x + shapeWidth, origin.y + shapeHeight - shapeHeight/3);
// // shape.lineTo(origin.x + shapeWidth, origin.y + shapeHeight);

// // // Top line points
// // shape.lineTo(origin.x + shapeWidth - shapeWidth/3, origin.y + shapeHeight);
// // shape.lineTo(origin.x + shapeWidth/2, origin.y + shapeHeight);
// // shape.lineTo(origin.x + shapeWidth/3, origin.y + shapeHeight);
// // shape.lineTo(origin.x , origin.y + shapeHeight);

// // // Left line points
// // shape.lineTo(origin.x, origin.y + shapeHeight);
// // shape.lineTo(origin.x, origin.y + shapeHeight - shapeHeight/3);
// // shape.lineTo(origin.x, origin.y + shapeHeight/2);
// // shape.lineTo(origin.x, origin.y + shapeHeight/3);

// // shape.lineTo(origin.x, origin.y);

// //#endregion
// const innerOffset = (shapeWidth - innerWidth) /2;
// for(let i = 0;i<=innerHeight;i++){
//   shape.lineTo(origin.x + innerOffset, origin.y + innerOffset + i);
// }
// for(let i = 0;i<=innerWidth;i++){
//   shape.lineTo(origin.x + innerOffset + i, origin.y + innerOffset + innerHeight);
// }
// for(let i = innerOffset + innerHeight;i>= innerOffset;i--){
//   shape.lineTo(origin.x + innerOffset + innerWidth, origin.y + i);

// }
// for(let i = innerOffset + innerWidth;i>=innerOffset;i--){
//   shape.lineTo(origin.x + i, origin.y + innerOffset);

// }

//   const path = new THREE.CurvePath();
//   const line = new THREE.LineCurve3(
//     new THREE.Vector3(origin.x, origin.y, origin.z ),
//     new THREE.Vector3(origin.x + extrudeWidth, origin.y , origin.z)
//   );
//   path.add(line);

//   const extrudeSettings = {
//     steps: 1,
//     // depth: 20,
//     extrudePath: path,
//     bevelEnabled: false,
//   };

//   const extrudeShape = new THREE.ExtrudeGeometry(shape, extrudeSettings);
//   const material = new THREE.MeshBasicMaterial({color: 'red', wireframe: false});
//   const verticesFront = [];
//   const verticesBack = [];
//   const pos = extrudeShape.getAttribute('position');

//   for(let i = 0;i<pos.count;i++){
//     const x = pos.getX(i);
//     const y = pos.getY(i);
//     const z = pos.getZ(i);
//     // if(x === origin.x){
//     //   const theta = Math.atan(shapeWidth/innerWidth);
//     //   pos.setX(i,origin.x + x + origin.y + y * theta)
//     //   verticesFront.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//     // }
//     // else if(x === origin.x + extrudeWidth){
//     //   verticesBack.push(new THREE.Vector3(x, y, z));
//     // }

//     if (x === origin.x && y > shapeHeight / 2) {
//       const theta = Math.atan((shapeWidth / 2) / (shapeHeight / 2));
//       const dx = (y - shapeHeight / 2) * theta;
//       pos.setX(i, origin.x + dx);

//       verticesFront.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//   }

//   else if (x === origin.x && y <= shapeHeight / 2) {
//     const theta = Math.atan((shapeWidth / 2) / (shapeHeight / 2));
//     const dx = (shapeHeight / 2 - y) * theta;
//     pos.setX(i, origin.x + dx);

//     verticesFront.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
// }

//     else if(x === origin.x + extrudeWidth){
//       verticesBack.push(new THREE.Vector3(x, y, z));
//     }

//     // if(y === origin.y){
//     //   const theta = Math.atan(shapeWidth/innerWidth);
//     //   pos.setY(i, origin.y + y + origin.z - z * theta)
//     //   verticesFront.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//     // }
//     // else if(y === origin.y + extrudeWidth){
//     //   verticesBack.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//     // }
//     pos.needsUpdate = true;

//   }

//   const edgesMaterial = new THREE.LineBasicMaterial({color: "white"});
//   const frontFaceLines = new THREE.LineSegments(new THREE.EdgesGeometry( new THREE.BufferGeometry().setFromPoints(verticesFront)), edgesMaterial);

//   const backFaceLines =new THREE.LineSegments(new THREE.EdgesGeometry( new THREE.BufferGeometry().setFromPoints(verticesBack)), edgesMaterial);
//   const extrudeMesh = new THREE.Mesh(extrudeShape, material);
//   scene.add(extrudeMesh, frontFaceLines,backFaceLines );

//#endregion

//#region Window project ..................
// function Pane(extrudeWidth, origin){
//   const line1 = new THREE.Vector2(origin.x, origin.y);
// const line2 = new THREE.Vector2(origin.x + extrudeWidth, origin.y);
// const line3 = new THREE.Vector2(origin.x + extrudeWidth, origin.y + extrudeWidth);
// const line4 = new THREE.Vector2(origin.x, origin.y + extrudeWidth);
//   const Shape = new THREE.Shape();
//   Shape.moveTo(0,0);
//   Shape.lineTo(50,0);
//   Shape.lineTo(50,50);
//   Shape.lineTo(0,50);
//   Shape.lineTo(0,0);

//   const bottomLine = new THREE.LineCurve3(
//         new THREE.Vector3(origin.x, origin.y, origin.z),
//         new THREE.Vector3(origin.x + extrudeWidth, origin.y, origin.z)
//       );
//   const rightLine = new THREE.LineCurve3(
//     new THREE.Vector3(origin.x + extrudeWidth , origin.y , origin.z),
//     new THREE.Vector3(origin.x + extrudeWidth, origin.y + extrudeWidth , origin.z)
//   );
//   const topLine = new THREE.LineCurve3(
//     new THREE.Vector3(origin.x+ extrudeWidth , origin.y + extrudeWidth , origin.z),
//     new THREE.Vector3(origin.x , origin.y + extrudeWidth, origin.z)
//   );

//   const leftLine = new THREE.LineCurve3(
//     new THREE.Vector3(origin.x, origin.y + extrudeWidth , origin.z),
//     new THREE.Vector3(origin.x, origin.y , origin.z)
//   )

//   const allLines = [];
//   allLines.push(bottomLine, topLine, leftLine, rightLine);
//   const finalObj = new THREE.Object3D();

//   const texture = new THREE.TextureLoader().load("./image.png");
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(1/200, 1/200);

//   // console.log("texture: ", texture);
//   for(const line of allLines){
//     const extrudeSettings = {
//       steps: 1 ,
//       extrudePath: line,
//     }

//     const extrudeShape = new THREE.ExtrudeGeometry(Shape, extrudeSettings);

//     const Material = new THREE.MeshPhysicalMaterial({
//       color: "white",
//       emissive: "red",
//       roughness: 0.9,
//       side: THREE.DoubleSide
//     });

//     const mesh = new THREE.Mesh(extrudeShape, Material);
//     mesh.userData = line;

//     finalObj.add(mesh);

//     const line1Vertices = [];
//     const line2Vertices = [];
//     const line3Vertices = [];
//     const line4Vertices = [];

//     // window pan cuts.....
//     const pos = extrudeShape.getAttribute("position");
//     for (let i = 0; i < pos.count; i++) {
//           const x = pos.getX(i);
//           const y = pos.getY(i);
//           const z = pos.getZ(i);

//           if(line1){
//             if(x === origin.x && y === origin.y + 50){
//               pos.setX(i, line1.x + 50);

//             }
//             else if(x === origin.x + 50 && y === origin.y ){
//               pos.setY(i, line1.y + 50);
//             }
//             if(x >= origin.x && x <= 50 && y >= origin.y && y <= 50){
//               line1Vertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//             }
//             // console.log(`x: ${pos.getX(i)}, y: ${pos.getY(i)}, z: ${pos.getZ(i)}`)
//           }
//           if(line2){
//             if(x === origin.x + extrudeWidth && y === origin.y + 50){
//               pos.setX(i, line2.x - 50);
//             }
//             else if(x === origin.x + extrudeWidth - 50 && y === origin.y){
//               pos.setY(i, line2.y + 50);
//             }
//             if(x >= extrudeWidth - 50 && x <= extrudeWidth && y>= origin.y && y <= 50){
//               line2Vertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//             }
//           }
//           if(line3){
//             if(x === origin.x + extrudeWidth - 50 && y === origin.y + extrudeWidth){
//               pos.setY(i, line3.y - 50);
//             }
//             else if(x === origin.x + extrudeWidth && y === origin.y + extrudeWidth - 50){
//               pos.setX(i, line3.x - 50);
//             }
//             if(x >= extrudeWidth - 50 && x <= extrudeWidth && y>= origin.y + extrudeWidth - 50 && y <= origin.y + extrudeWidth){
//               line3Vertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//             }
//           }

//           if(line4){
//             if(x === origin.x && y === origin.y + extrudeWidth - 50){
//               pos.setX(i,line4.x + 50)
//             }
//             else if(x === origin.x + 50 && y === origin.y + extrudeWidth){
//               pos.setY(i, line4.y - 50)
//             }
//             if(x >= origin.x && x <= 50 && y>= origin.y + extrudeWidth - 50 && y <= origin.y + extrudeWidth){
//               line4Vertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
//             }
//           }

//     }

//     const face1 = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(line1Vertices), new THREE.LineBasicMaterial({color: "white"}));
//     const face2 = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(line2Vertices), new THREE.LineBasicMaterial({color: "white"}));
//     const face3 = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(line3Vertices), new THREE.LineBasicMaterial({color: "white"}));
//     const face4 = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(line4Vertices), new THREE.LineBasicMaterial({color: "white"}));

//     finalObj.add(face1,face2, face3, face4);
//   }

//   const glassShape = new THREE.Shape();
//   glassShape.moveTo(50,50);
//   glassShape.lineTo(extrudeWidth - 50,50);
//   glassShape.lineTo(extrudeWidth - 50, extrudeWidth - 50);
//   glassShape.lineTo(50,extrudeWidth - 50);

//   const glassExtrudeSettings = {
//     steps: 1,
//     depth: 5,
//     bevelEnabled: false,
//   }

//   const extrudeGlassShape = new THREE.ExtrudeGeometry(glassShape, glassExtrudeSettings);
//   const glassMaterial = new THREE.MeshPhysicalMaterial({
//     // color: "white",
//     // emissive: "gray",
//     transparent: true,
//     opacity: 0.9,
//     roughness: 0,
//     transmission: 0.9,
//     metalness: 0.1,
//     reflectivity: 0.9,
//   });

//   const glassMaterial2 = new THREE.MeshPhongMaterial({
//     color: "white",
//     transparent: true,
//     opacity: 1,
//     shininess: 30,
//   })

//   const glassMesh = new THREE.Mesh(extrudeGlassShape, glassMaterial);
//   glassMesh.position.set(0,0,-(25));
//   finalObj.add(glassMesh);

// scene.add(camera);
// finalObj.position.set(-extrudeWidth/2, - extrudeWidth/2)
// return finalObj;

// }

// function createWindow(extrudeWidth, origin){
// const parentObj = new THREE.Object3D();
// const Mesh = Pane(extrudeWidth, origin);
// parentObj.add(Mesh);

// scene.add(parentObj);
// }
// const origin = new THREE.Vector3(0,0,0);
// const extrudeWidth = 350;

// createWindow(extrudeWidth, origin);

//#endregion

//#region faced line helper function

// Hellper function for adding line to the face edges
// it takes a Extrude geometry mesh and make the face edges lines
// function addFaceLines(mesh, xVertices) {
//   const verticesFront = [];
//   const verticesBack = [];
//   const pos = mesh.geometry.getAttribute("position");
//   let min = new THREE.Vector3(0, 0, 0);
//   let max = new THREE.Vector3(0, 0, 0);
//   for (let i = 0; i < pos.count; i++) {
//     const x = pos.getX(i);
//     const y = pos.getY(i);
//     const z = pos.getZ(i);
//     min.x = Math.min(min.x, x);
//     min.y = Math.min(min.y, y);
//     min.z = Math.min(min.z, z);

//     max.x = Math.max(max.x, x);
//     max.y = Math.max(max.y, y);
//     max.z = Math.max(max.z, z);

//     if (x === xVertices[i]) {
//       verticesFront.push(
//         new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
//       );
//     } else if (x === max.x) {
//       verticesBack.push(
//         new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
//       );
//     }

//     pos.needsUpdate = true;
//   }

//   const edgesMaterial = new THREE.LineBasicMaterial({ color: "white" });
//   const frontFaceLines = new THREE.LineSegments(
//     new THREE.EdgesGeometry(
//       new THREE.BufferGeometry().setFromPoints(verticesFront)
//     ),
//     edgesMaterial
//   );

//   const backFaceLines = new THREE.LineSegments(
//     new THREE.EdgesGeometry(
//       new THREE.BufferGeometry().setFromPoints(verticesBack)
//     ),
//     edgesMaterial
//   );
//   const extrudeMesh = new THREE.Mesh(extrudeShape, material);
//   scene.add(extrudeMesh, frontFaceLines, backFaceLines);
// }

// // Mesh
// const origin = new THREE.Vector3(0, 0, 0);
// const shapeWidth = 50;
// const shapeHeight = shapeWidth;
// const innerWidth = 49;
// const innerHeight = innerWidth;
// const extrudeWidth = 400;
// const midPointCut = shapeHeight / 3;
// const shape = new THREE.Shape();
// shape.moveTo(origin.x, origin.y);
// for (let i = 0; i <= shapeWidth; i++) {
//   shape.lineTo(origin.x + i, origin.y);
// }
// for (let i = 0; i <= shapeHeight; i++) {
//   shape.lineTo(origin.x + shapeWidth, origin.y + i);
// }
// for (let i = shapeWidth; i >= 0; i--) {
//   shape.lineTo(origin.x + i, origin.y + shapeHeight);
// }
// for (let i = shapeHeight; i >= 0; i--) {
//   shape.lineTo(origin.x, origin.y + i);
// }
// shape.closePath();

// const innerOffset = (shapeWidth - innerWidth) / 2;
// for (let i = 0; i <= innerHeight; i++) {
//   shape.lineTo(origin.x + innerOffset, origin.y + innerOffset + i);
// }
// for (let i = 0; i <= innerWidth; i++) {
//   shape.lineTo(
//     origin.x + innerOffset + i,
//     origin.y + innerOffset + innerHeight
//   );
// }
// for (let i = innerOffset + innerHeight; i >= innerOffset; i--) {
//   shape.lineTo(origin.x + innerOffset + innerWidth, origin.y + i);
// }
// for (let i = innerOffset + innerWidth; i >= innerOffset; i--) {
//   shape.lineTo(origin.x + i, origin.y + innerOffset);
// }

// const path = new THREE.CurvePath();
// const line = new THREE.LineCurve3(
//   new THREE.Vector3(origin.x, origin.y, origin.z),
//   new THREE.Vector3(origin.x + extrudeWidth, origin.y, origin.z)
// );
// path.add(line);

// const extrudeSettings = {
//   steps: 1,
//   // depth: 20,
//   extrudePath: path,
//   bevelEnabled: false,
// };
// // console.log(path)

// const extrudeShape = new THREE.ExtrudeGeometry(shape, extrudeSettings);
// const material = new THREE.MeshBasicMaterial({
//   color: "red",
//   wireframe: false,
// });
// const extrudeMesh = new THREE.Mesh(extrudeShape, material);
// const pos = extrudeShape.getAttribute("position");
// // const frontCulLine = new THREE.Vector2(new THREE.Vector2(origin.x , origin.y), new THREE.Vector2(origin.x + 100, origin.y + shapeHeight));
// const xVertices = [];
// // const BackCulLine = new THREE.Vector2(new THREE.Vector2(origin.x + extrudeWidth , origin.y), new THREE.Vector2(origin.x + extrudeWidth - 100, origin.y + shapeHeight));
// for (let i = 0; i < pos.count; i++) {
//   const x = pos.getX(i);
//   const y = pos.getY(i);
//   const z = pos.getZ(i);
//   if(x === origin.x){
//     const theta = Math.cos(shapeWidth);
//     pos.setX(i,origin.x + x + origin.y + y * theta);
//     xVertices.push(pos.getX(i));
//   }

//   // if (x === origin.x && y > midPointCut) {
//   //   const theta = Math.atan(shapeWidth / 2 / midPointCut);
//   //   const dx = (y - midPointCut) * theta;
//   //   pos.setX(i, origin.x + dx);
//   //   xVertices.push(pos.getX(i));
//   // }
//   // else if (x === origin.x && y <= midPointCut) {
//   //   const theta = Math.atan(shapeWidth / 2 / midPointCut);
//   //   const dx = (midPointCut - y) * theta;
//   //   pos.setX(i, origin.x + dx);
//   //   xVertices.push(pos.getX(i));
//   // }

//   pos.needsUpdate = true;
// }

// addFaceLines(extrudeMesh, xVertices);

//#endregion

//#region Drawing lines from clicked points

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// let clickedPoints = [];

// const size = 1000;
// const planeGeometry = new THREE.PlaneGeometry(size, size);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   color: "#273143",
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);

// window.addEventListener("click", onMouseClick);
// window.addEventListener("dblclick", onDoubleClick);

// function onMouseClick(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObject(plane);

//   if (intersects.length > 0) {
//     const point = intersects[0].point;
//     clickedPoints.push(point);
//     console.log("Clicked Point:", point);

//     const clickedPointsLength = clickedPoints.length;
//     if (clickedPointsLength >= 2) {
//       drawLine(
//         clickedPoints[clickedPointsLength - 2],
//         clickedPoints[clickedPointsLength - 1]
//       );
//       console.log(
//         "line distance: ",
//         clickedPoints[1].distanceTo(clickedPoints[0])
//       );
//     }

//     if (
//       clickedPointsLength >= 2 &&
//       clickedPoints[clickedPointsLength - 1].distanceTo(clickedPoints[0]) < 5
//     ) {
//       drawLine(clickedPoints[clickedPointsLength - 1], clickedPoints[0]);
//       console.log("Shape closed...");
//       clickedPoints = [];
//     }
//   }
// }

// function onDoubleClick() {
//   console.log("Line drawing off...");
//   clickedPoints = [];
// }

// function drawLine(start, end) {
//   const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
//   const material = new THREE.LineBasicMaterial({ color: "white" });
//   const line = new THREE.LineSegments(geometry, material);
//   scene.add(line);
// }

//#endregion

//#region Creating Window pane by mouse click the points

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// let clickedPoints = [];
// let lines = [];
// let tempLine = null;
// const planeSize = 1000;
// const shapeWidth = 50;
// let lineSegments = null;
// let lineHelper = [];

// let len;

// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(planeSize, planeSize),
//   new THREE.MeshBasicMaterial({ color: "#243143", side: THREE.DoubleSide })
// );
// scene.add(plane);

// window.addEventListener("click", onMouseClick);
// window.addEventListener("mousemove", onMouseMove);
// window.addEventListener("keydown", function (event) {
//   if (event.key === "Escape") {
//     resetDrawing();
//   }
// });

// function onMouseClick(event) {
//   updateMousePosition(event);

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObject(plane);

//   if (intersects.length > 0) {
//     const point = intersects[0].point;  
//     clickedPoints.push(point);
    
//     if (clickedPoints.length >= 2) {
//       const prevPoint = clickedPoints[clickedPoints.length - 2];
//       if(point.distanceTo(clickedPoints[0]) >= 5){
//         lines.push(new THREE.LineCurve3(prevPoint, point));
//       }
//       else{
//         lines.push(new THREE.LineCurve3(prevPoint, clickedPoints[0]));
        
//       }
//       drawLine(prevPoint, point);
//     }
//     if (clickedPoints.length > 2 && point.distanceTo(clickedPoints[0]) < 5) {
//       createPane(lines, shapeWidth, clickedPoints);
      
//       resetDrawing();
//     }
//   }

// }
// const mouseText = new Text();
// mouseText.fontSize = 20;
// mouseText.color = "yellow";
// mouseText.position.set(0, 0, 0);

// function onMouseMove(event) {
//   if (clickedPoints.length === 0) return;

//   updateMousePosition(event);
//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObject(plane);

//   if (intersects.length > 0) {
//     updateTempLine(
//       clickedPoints[clickedPoints.length - 1],
//       intersects[0].point
//     );
//   }

//   updateMousePosition(event);
//   if (intersects.length > 0) {
//     const point = intersects[0].point;
//     mouseText.text = `X: ${Math.floor(point.x)}, Y: ${Math.floor(point.y)}`;
//     mouseText.position.set(point.x - 50, point.y + 40, point.z);
//   }
//   scene.add(mouseText);
// }

// function updateMousePosition(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

// function drawLine(start, end) {
//   const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
//   const material = new THREE.LineDashedMaterial({
//     color: "white",
//     dashSize: 10,
//     gapSize: 3,
//   });
//   lineSegments = new THREE.Line(geometry, material);
//   lineSegments.computeLineDistances();
//   scene.add(lineSegments);
//   lineHelper.push(lineSegments);
// }

// function updateTempLine(start, end) {
//   if (tempLine) scene.remove(tempLine);

//   tempLine = new THREE.Line(
//     new THREE.BufferGeometry().setFromPoints([start, end]),
//     new THREE.LineDashedMaterial({ color: "gray", dashSize: 5, gapSize: 5 })
//   );

//   tempLine.computeLineDistances();
//   scene.add(tempLine);
// }

// function getPerpendicularLength(base, angle) {
//   return base * Math.tan(angle);
// }

// function isClockwise(lines) {
//   let sum = 0;
//   for (let i = 0; i < lines.length; i++) {
//     const current = lines[i].v1;
//     const next = lines[(i + 1) % lines.length].v1;
//     sum += (next.x - current.x) * (next.y + current.y);
//   }
//   return sum > 0;
// }
// console.log(clickedPoints);


// // Extruded shape for the window panes
// function createPane(lines, shapeWidth, clickedPoints) {
  
//   const finalObj = new THREE.Object3D();
//   const shape = new THREE.Shape();
//   let extrudeShape;
//   const angles = [];
//   const a = clickedPoints[0].distanceTo(clickedPoints[1]);
//   const b = clickedPoints[1].distanceTo(clickedPoints[clickedPoints.length - 2]);
//   const c = clickedPoints[clickedPoints.length - 2].distanceTo(clickedPoints[0]);
   
//   const cosA = (b ** 2 + c ** 2 - a ** 2) / (2*b*c);
//   const angleRad = Math.acos(cosA);
//   angles.push(angleRad);

//   for(let i = 0;i<clickedPoints.length - 2;i++){

//     const a = clickedPoints[i].distanceTo(clickedPoints[i+1]);
//     const b = clickedPoints[i + 1].distanceTo(clickedPoints[i+2]);
//     const c = clickedPoints[i + 2].distanceTo(clickedPoints[i % (clickedPoints.length - 2)]);
     
//     const cosA = (b ** 2 + c ** 2 - a ** 2) / (2*b*c);
//     const angleRad = Math.acos(cosA);
//     angles.push(angleRad);
    
//     }
  
//   if (isClockwise(lines)) {
//     shape.moveTo(0, 0);
//     shape.lineTo(0, -shapeWidth);
//     shape.lineTo(shapeWidth, -shapeWidth);
//     shape.lineTo(shapeWidth, 0);
//   } else {
//     shape.moveTo(0, 0);
//     shape.lineTo(shapeWidth, 0);
//     shape.lineTo(shapeWidth, shapeWidth);
//     shape.lineTo(0, shapeWidth);
//   }
//   shape.closePath();


//   for (const line of lines) {
//     const extrudeSettings = {
//       steps: 1,
//       bevelEnabled: false,
//       extrudePath: line,
//     };
//     extrudeShape = new THREE.ExtrudeGeometry(shape, extrudeSettings);
//     const material = new THREE.MeshPhysicalMaterial({
//       color: "white",
//       emissive: "red",
//       roughness: 0.9,
//       side: THREE.DoubleSide,
//     });
//     finalObj.add(new THREE.Mesh(extrudeShape, material));
    

//     const pos = extrudeShape.getAttribute("position");
//     for (let i = 0; i < pos.count; i++) {
//       let x = pos.getX(i);
//       let y = pos.getY(i);
//       let z = pos.getZ(i);
//       console.log(x,y,z);
      
//       //Bottom Left corner
//       if (y >= clickedPoints[0].y - shapeWidth && y <= clickedPoints[0].y + shapeWidth && x >= clickedPoints[0].x - shapeWidth && x <= clickedPoints[0].x + shapeWidth) {
//         const shiftAmountX = (y - clickedPoints[0].y) * Math.tan(angles[0]);
//         console.log("shiftAmountX: ", shiftAmountX);
//         pos.setX(i, x + shiftAmountX);
//         const shiftAmountY = (x - clickedPoints[0].x) * Math.tan(angles[0]);
//         pos.setY(i, y + shiftAmountY);
//         console.log("shiftAmountY: ", shiftAmountY);
//       }

//       //Bottom Right Corner
//       if(x >= clickedPoints[1].x - shapeWidth && x <= clickedPoints[1].x + shapeWidth && y >= clickedPoints[1].y - shapeWidth && y <= clickedPoints[1].y + shapeWidth){
//         const shiftAmountX = (y - clickedPoints[1].y) * Math.tan(angles[1]);
//         pos.setX(i, x - shiftAmountX);
//         const shiftAmountY = (clickedPoints[1].x - x) * Math.tan(angles[1]);
//         pos.setY(i, y + shiftAmountY)
//       }


//       // Top-right corner transformation
//     if (x >= clickedPoints[2].x - shapeWidth && x <= clickedPoints[2].x + shapeWidth && y >= clickedPoints[2].y - shapeWidth && y <= clickedPoints[2].y + shapeWidth) {
//       const shiftAmountY = (clickedPoints[2].x - x) * Math.tan(angles[2]);
//       pos.setY(i, y - shiftAmountY);
//       const shiftAmountX = (clickedPoints[2].y - y) * Math.tan(angles[2]);
//       pos.setX(i, x - shiftAmountX);
//     }

//       // Top-left corner transformation
//     if (y >= clickedPoints[3].y - shapeWidth && y <= clickedPoints[3].y + shapeWidth && x >= clickedPoints[3].x - shapeWidth && x <= clickedPoints[3].x + shapeWidth) {
//       const shiftAmountX = (clickedPoints[3].y - y) * Math.tan(angles[3]);
//       pos.setX(i, x + shiftAmountX);
//       const shiftAmountY = (x -clickedPoints[3].x) * Math.tan(angles[3]);
//       pos.setY(i, y - shiftAmountY);
//     }


//   }
  
//     const edges = new THREE.EdgesGeometry(extrudeShape);
//   const edgesMaterial = new THREE.LineBasicMaterial({color: "white"});
//   const edgesOfMesh = new THREE.LineSegments(edges, edgesMaterial);
//   finalObj.add(edgesOfMesh);
//   }

  
//   finalObj.position.z = shapeWidth + 2;
//   scene.add(finalObj);
// }



// function resetDrawing() {
//   if (tempLine) {
//     scene.remove(tempLine);
//     tempLine = null;
//   }
//   clickedPoints = [];
//   lines = [];
//   if (lineSegments) {
//     lineHelper.forEach((element) => {
//       scene.remove(element);
//     });
//     lineSegments = null;
//   }
//   scene.remove(mouseText);
// }


//#endregion

//#region CutLine concept...


const line1Start = new THREE.Vector2(0, 100);
const line1End = new THREE.Vector2(0, 0);
const line2Start = new THREE.Vector2(0, 0);
const line2End = new THREE.Vector2(100, 0);

const pointsArr = [
  new THREE.Vector3(line1Start.x, line1Start.y, 0),
  new THREE.Vector3(line1End.x, line1End.y, 0),
  new THREE.Vector3(line2Start.x, line2Start.y, 0),
  new THREE.Vector3(line2End.x, line2End.y, 0),
];




function findAngleBetweenLines(start1, end1, start2, end2) {
  const dir1 = new THREE.Vector2(end1.x - start1.x, end1.y - start1.y);
  const dir2 = new THREE.Vector2(end2.x - start2.x, end2.y - start2.y);

  const dotProduct = dir1.dot(dir2);

  const angleRad = Math.acos(dotProduct / (dir1.length() * dir2.length()));

  // Convert to degrees
  const angleDeg = THREE.MathUtils.radToDeg(angleRad);

  return (180 - angleDeg);
}
const angle = findAngleBetweenLines(line1Start, line1End, line2Start, line2End);
const angleRad = THREE.MathUtils.degToRad(angle);
const cutLinePointY = (line2End.distanceTo(line2Start)) * Math.tan(angleRad/2);

const cutPoints = [
  new THREE.Vector3(line1End.x, line1End.y, 0),
  new THREE.Vector3(line2End.x, line2End.y + cutLinePointY, 0),
];


const geometry = new THREE.BufferGeometry().setFromPoints(pointsArr);
const material = new THREE.LineBasicMaterial({ color: "red" });
const line = new THREE.LineSegments(geometry, material);
const cutLine = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(cutPoints),material);
line.add(cutLine);

scene.add(line);
console.log("Angle between the two lines:", angle, "degrees");

//#endregion

//#region Concept play area.....
// const origin = new THREE.Vector2(0, 0);
// const extrudeLength = 200;

// const base = 30;
// const angle = 45;
// const angleRad = THREE.MathUtils.degToRad(angle);
// const perpendicular = base * Math.tan(angleRad);


// const shape = new THREE.Shape();
// shape.moveTo(origin.x, origin.y);
// shape.lineTo(origin.x + 30, origin.y);
// shape.lineTo(origin.x + 30, origin.y + 30);
// shape.lineTo(origin.x, origin.y + 30);
// shape.lineTo(origin.x, origin.y);

// const bottomPath = new THREE.LineCurve3(
//   new THREE.Vector3(origin.x, origin.y, 0),
//   new THREE.Vector3(origin.x + extrudeLength, origin.y, 0),
// );

// const rightPath = new THREE.LineCurve3(
//   new THREE.Vector3(origin.x + extrudeLength, origin.y, 0),
//   new THREE.Vector3(origin.x + extrudeLength, origin.y + extrudeLength, 0)
// );

// const topPath = new THREE.LineCurve3(
//   new THREE.Vector3(origin.x + extrudeLength, origin.y + extrudeLength, 0),
//   new THREE.Vector3(origin.x, origin.y + extrudeLength, 0),
// )

// const leftPath = new THREE.LineCurve3(
//   new THREE.Vector3(origin.x, origin.y + extrudeLength, 0),
//   new THREE.Vector3(origin.x, origin.y, 0)
// )
// const path = [];
// path.push(bottomPath, rightPath, topPath, leftPath);

// for (const line of path) {
//   const extrudeSettings = {
//     steps: 1,
//     bevelEnabled: false,
//     extrudePath: line,
//   };

//   const extrudeShape = new THREE.ExtrudeGeometry(shape, extrudeSettings);
//   const material = new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide });
//   const mesh = new THREE.Mesh(extrudeShape, material);
//   const pos = extrudeShape.attributes.position;

//   for (let i = 0; i < pos.count; i++) {
//     let x = pos.getX(i);
//     let y = pos.getY(i);
  
//     // Bottom-left corner transformation
//     if (y >= origin.y && y <= origin.y + base && x >= origin.x && x <= origin.x + base) {
//       const shiftAmountX = (y - origin.y) * Math.tan(angleRad);
//       pos.setX(i, x + shiftAmountX);
//       const shiftAmountY = (x - origin.x) * Math.tan(angleRad);
//       pos.setY(i, y + shiftAmountY);
//     }
  
//     // Bottom-right corner transformation
//     if (x >= origin.x + extrudeLength - base && x <= origin.x + extrudeLength && y >= origin.y && y <= origin.y + base) {
//       const shiftAmountX = (y - origin.y) * Math.tan(angleRad);
//       pos.setX(i, x - shiftAmountX);
//       const shiftAmountY = (origin.x + extrudeLength - x) * Math.tan(angleRad);
//       pos.setY(i, y + shiftAmountY);
//     }
  
//     // Top-right corner transformation
//     if (x >= origin.x + extrudeLength - base && x <= origin.x + extrudeLength && y >= origin.y + extrudeLength - base && y <= origin.y + extrudeLength) {
//       const shiftAmountY = (origin.x + extrudeLength - x) * Math.tan(angleRad);
//       pos.setY(i, y - shiftAmountY);
//       const shiftAmountX = (origin.y + extrudeLength - y) * Math.tan(angleRad);
//       pos.setX(i, x - shiftAmountX);
//     }
  
//     // Top-left corner transformation
//     if (y >= origin.y + extrudeLength - base && y <= origin.y + extrudeLength && x >= origin.x && x <= origin.x + base) {
//       const shiftAmountX = (origin.y + extrudeLength - y) * Math.tan(angleRad);
//       pos.setX(i, x + shiftAmountX);
//       const shiftAmountY = (x - origin.x) * Math.tan(angleRad);
//       pos.setY(i, y - shiftAmountY);
//     }
//   }
  
//   const lineMat = new THREE.LineBasicMaterial({ color: "white" });
//   const edges = new THREE.LineSegments(new THREE.EdgesGeometry(extrudeShape), lineMat);
//   mesh.add(edges);
//   scene.add(mesh);

// }


//#endregion


//#region  Renderer setup
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.localClippingEnabled = true;

renderer.render(scene, camera);
//#endregion

//#region Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableRotate = false;
controls.enableDamping = true;
controls.dampingFactor = 0.1;

controls.update();
//#endregion

// Handle window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//#region animation
function animate() {
  controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // mouseText.sync();
}
animate();
//#endregion
