import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
 
  Brush,
  Evaluator,
  ADDITION,
  SUBTRACTION,
  REVERSE_SUBTRACTION,
  INTERSECTION,
  HOLLOW_SUBTRACTION,
  HOLLOW_INTERSECTION,
  DIFFERENCE,
} from "three-bvh-csg";


import { Text } from "troika-three-text";
import { HelperFunction } from "./helperFunctions";

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
const ambiantLight = new THREE.AmbientLight("gray", 1);
scene.add(ambiantLight);
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
scene.add( directionalLight );

const helper = new THREE.DirectionalLightHelper(directionalLight, 100);
// scene.add( helper );

const pointLight = new THREE.PointLight(0xffffff, 0.2, Infinity, 0.1);
pointLight.position.set(-200, -10);
// pointLight.lookAt(500,100);
camera.add(pointLight);
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
//     new THREE.Vector3(origin.x, origin.y, 0 ),
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

//#region Creating Window pane by mouse click the points shifting the points with lines...

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
// console.log("Clicked Points : ",clickedPoints);


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
//   const cutLinePointY = shapeWidth * Math.tan(angleRad);
//     const cutLinePts = [
//       new THREE.Vector3(clickedPoints[0].x, shapeWidth, 0),
//       new THREE.Vector3(shapeWidth, clickedPoints[0].y + cutLinePointY, 0)
//     ];
//     console.log(cutLinePts);

//     const cutLine = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(cutLinePts), new THREE.LineBasicMaterial({ color: "Yellow"}));
//     scene.add(cutLine);
//   for(let i = 0;i<clickedPoints.length - 2;i++){

//     const a = clickedPoints[i].distanceTo(clickedPoints[i+1]);
//     const b = clickedPoints[i + 1].distanceTo(clickedPoints[i+2]);
//     const c = clickedPoints[i + 2].distanceTo(clickedPoints[i % (clickedPoints.length - 2)]);
     
//     const cosA = (b ** 2 + c ** 2 - a ** 2) / (2*b*c);
//     const angleRad = Math.acos(cosA);
//     angles.push(angleRad);

//     const cutLinePointY = shapeWidth * Math.tan(angleRad);
//     const cutLinePts = [
//       new THREE.Vector3(clickedPoints[i].x, shapeWidth, 0),
//       new THREE.Vector3(clickedPoints[(i + 1) % (clickedPoints.length - 2) ].x, clickedPoints[(i + 1) % (clickedPoints.length - 2) ].y + cutLinePointY, 0)
//     ];
//     console.log(cutLinePts);

//     const cutLine = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(cutLinePts), new THREE.LineBasicMaterial({ color: "Yellow"}));
//     scene.add(cutLine);
    
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


// const line1Start = new THREE.Vector2(0, 100);
// const line1End = new THREE.Vector2(0, 0);
// const line2Start = new THREE.Vector2(0, 0);
// const line2End = new THREE.Vector2(100, 0);

// const pointsArr = [
//   new THREE.Vector3(line1Start.x, line1Start.y, 0),
//   new THREE.Vector3(line1End.x, line1End.y, 0),
//   new THREE.Vector3(line2Start.x, line2Start.y, 0),
//   new THREE.Vector3(line2End.x, line2End.y, 0),
// ];




// function findAngleBetweenLines(start1, end1, start2, end2) {
//   const dir1 = new THREE.Vector2(end1.x - start1.x, end1.y - start1.y);
//   const dir2 = new THREE.Vector2(end2.x - start2.x, end2.y - start2.y);

//   const dotProduct = dir1.dot(dir2);

//   const angleRad = Math.acos(dotProduct / (dir1.length() * dir2.length()));

//   // Convert to degrees
//   const angleDeg = THREE.MathUtils.radToDeg(angleRad);

//   return (180 - angleDeg);
// }
// const angle = findAngleBetweenLines(line1Start, line1End, line2Start, line2End);
// const angleRad = THREE.MathUtils.degToRad(angle);
// const cutLinePointY = (line2End.distanceTo(line2Start)) * Math.tan(angleRad/2);

// const cutPoints = [
//   new THREE.Vector3(line1End.x, line1End.y, 0),
//   new THREE.Vector3(line2End.x, line2End.y + cutLinePointY, 0),
// ];


// const geometry = new THREE.BufferGeometry().setFromPoints(pointsArr);
// const material = new THREE.LineBasicMaterial({ color: "red" });
// const line = new THREE.LineSegments(geometry, material);
// const cutLine = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(cutPoints),material);
// line.add(cutLine);

// scene.add(line);
// console.log("Angle between the two lines:", angle, "degrees");

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


//#region Createing window pane by mouse Clicks and cutting of vertices ..
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// let clickedPoints = [];
// let lines = [];
// let tempLine = null;
// const planeSize = 1500;
// const shapeWidth = 50;
// let lineSegments = null;
// let lineHelper = [];
// const angleBetweenLines = [];
// let cutLineArray = [];
// let parallelLine, parallelLine2;
// let intersectionPointsArray = [];

// // Drawing board (plane)
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

// // mouse click event handling
// function onMouseClick(event) {
//   updateMousePosition(event);

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObject(plane);

//   if (intersects.length > 0) {
//     let point = new THREE.Vector3(Math.round(intersects[0].point.x), Math.round(intersects[0].point.y), Math.round(intersects[0].point.z));
//     clickedPoints.push(point);
    
//     if (clickedPoints.length >= 2) {
//       const prevPoint = clickedPoints[clickedPoints.length - 2];
//       if(point.distanceTo(clickedPoints[0]) >= 10){
//         lines.push(new THREE.LineCurve3(prevPoint, point));
//       }
//       else{
//         clickedPoints[clickedPoints.length - 1] = clickedPoints[0];
//         lines.push(new THREE.LineCurve3(prevPoint, clickedPoints[0]));        
//       }
//       drawLine(prevPoint, point);
//     }
//     if (clickedPoints.length > 2 && point.distanceTo(clickedPoints[0]) < 10) {
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

//   tempLine.computeLineDistances(); // used for Dashed line
//   scene.add(tempLine);
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
// console.log("Clicked Points : ",clickedPoints);


// function createPane(lines, shapeWidth, clickedPoints) {
  
//   const finalObj = new THREE.Object3D();
//   const shape = new THREE.Shape();
//   let extrudeShape;
  
//   for(let i = 0;i<clickedPoints.length - 1;i++){

//     const start1 = clickedPoints[i];
//     const end1 = clickedPoints[i+1];
//     const start2 = clickedPoints[i+1];
//     const end2 = clickedPoints[(i + 2) % (clickedPoints.length - 1)];
    
//     angleBetweenLines.push(getAngleBetweenLines(start1, end1, start2, end2));
//     console.log("angle between lines",angleBetweenLines);

//     const lineLengthX = Math.round((clickedPoints[i]).distanceTo(clickedPoints[(i + 1) % clickedPoints.length ])) / 4;
//     const cutLineHeightY = findPerpendicular(lineLengthX , angleBetweenLines[i]/2);
//     const cutLinePointLeftTop = new THREE.Vector2(Math.round(clickedPoints[(i + 1) % clickedPoints.length ].x) - lineLengthX, Math.round(clickedPoints[(i + 1) % clickedPoints.length ].y) + cutLineHeightY );
//     const cutLineMidPoint = clickedPoints[(i + 1) % clickedPoints.length ];
//     const cutLinePointLeftBottom = new THREE.Vector2(Math.round(clickedPoints[(i + 1) % clickedPoints.length ].x) - lineLengthX, Math.round(clickedPoints[(i + 1) % clickedPoints.length ].y) - cutLineHeightY );
//     const cutLinePointRightTop = new THREE.Vector2(Math.round(clickedPoints[(i + 1) % clickedPoints.length ].x) + lineLengthX, Math.round(clickedPoints[(i + 1) % clickedPoints.length ].y) + cutLineHeightY );
//     const cutLinePointRightBottom = new THREE.Vector2(Math.round(clickedPoints[(i + 1) % clickedPoints.length ].x) + lineLengthX, Math.round(clickedPoints[(i + 1) % clickedPoints.length ].y) - cutLineHeightY );
//     const cutLineStartPoint = cutLinePointLeftTop;
//     const cutLineEndPoint = cutLinePointRightBottom;

//     if(i < clickedPoints.length - 2){
//       parallelLine = getParallelLine(clickedPoints[i], clickedPoints[i+1], shapeWidth);
//       parallelLine2 = getParallelLine(clickedPoints[i + 1], clickedPoints[i + 2], shapeWidth);
//     }
//     else{
//       parallelLine = getParallelLine(clickedPoints[i], clickedPoints[0], shapeWidth);
//       parallelLine2 = getParallelLine(clickedPoints[0], clickedPoints[1], shapeWidth);
//     }
    
//     const intersectionPoint = getInterSectionPoint(parallelLine2.x, parallelLine2.y, parallelLine.x, parallelLine.y);
//     intersectionPointsArray.push(intersectionPoint);

//     cutLineArray.push(new THREE.Vector2(cutLineStartPoint, cutLineEndPoint));    
//     const cutLine = new THREE.BufferGeometry().setFromPoints([cutLinePointLeftTop, cutLineMidPoint, cutLinePointLeftBottom, cutLineMidPoint, cutLinePointRightTop, cutLineMidPoint, cutLinePointRightBottom]);
//     const lineMat = new THREE.LineBasicMaterial({color: "yellow"});
//     const line = new THREE.Line(cutLine, lineMat);
//     finalObj.add(line);

//     }
   

//     // const intersectionPoint = getInterSectionPoint(cutLineArray[0].x, cutLineArray[0].y, parallelLine.x, parallelLine.y);
//     console.log(intersectionPointsArray);
  
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

//   let Line1StartPoint = null;
//   let Line1EndPoint = null;
//   let Line2StartPoint = null;
//   let Line2EndPoint = null;
//   for (const line of lines) {
//     const extrudeSettings = {
//       steps: 10,
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

//   const pos = extrudeShape.getAttribute("position");
//     for (let i = 0; i < pos.count; i++) {
//       let x = pos.getX(i);
//       let y = pos.getY(i);
//       let z = pos.getZ(i);
      
//       x = Math.round(x);
//       y = Math.round(y);
//       z = Math.round(z);

//       // if(x === Math.round(clickedPoints[1].x) - shapeWidth){
//       //   pos.setY(i, Math.round(intersectionPointsArray[0].y));
//       //   pos.setX(i, Math.round(intersectionPointsArray[0].x));
//       // }

//       // if(y === Math.round(clickedPoints[1].y) + shapeWidth && x === Math.round(clickedPoints[1].x)){
//       //   pos.setX(i, Math.round(intersectionPointsArray[0].x));
//       //   pos.setY(i, Math.round(intersectionPointsArray[0].y));
//       // }
      
//       // if(x === Math.round(clickedPoints[2].x) - shapeWidth ){
//       //   pos.setY(i, Math.round(intersectionPointsArray[1].y));
//       //   pos.setX(i, Math.round(intersectionPointsArray[1].x));
//       // }

//       // if(y === Math.round(clickedPoints[2].y) - shapeWidth){
//       //   pos.setX(i, Math.round(intersectionPointsArray[1].x));
//       //   pos.setY(i, Math.round(intersectionPointsArray[1].y));
//       // }


//       // if(x === Math.round(clickedPoints[3].x) + shapeWidth ){
//       //   pos.setY(i, Math.round(intersectionPointsArray[2].y));
//       //   pos.setX(i, Math.round(intersectionPointsArray[2].x));
//       // }

//       // if(y === Math.round(clickedPoints[3].y - shapeWidth)){
//       //   pos.setY(i, Math.round(intersectionPointsArray[2].y));
//       //   pos.setX(i, Math.round(intersectionPointsArray[2].x));
//       // }
//       // if(x === Math.round(clickedPoints[0].x) + shapeWidth ){
//       //   pos.setY(i, Math.round(intersectionPointsArray[3].y));
//       //   pos.setX(i, Math.round(intersectionPointsArray[3].x));
//       // }

//       // if(y === Math.round(clickedPoints[0].y) + shapeWidth){
//       //   pos.setY(i, Math.round(intersectionPointsArray[3].y));
//       //   pos.setX(i, Math.round(intersectionPointsArray[3].x));
//       // }
//     }
//   const edges = new THREE.EdgesGeometry(extrudeShape);
//   const edgesMaterial = new THREE.LineBasicMaterial({color: "white"});
//   const edgesOfMesh = new THREE.LineSegments(edges, edgesMaterial);
//   finalObj.add(edgesOfMesh);
//   }
  
//   finalObj.position.z = shapeWidth;
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

// function getAngleBetweenLines(p1,p2,p3,p4){
//   let v1 = new THREE.Vector2(p2.x - p1.x, p2.y - p1.y);
//   let v2 = new THREE.Vector2(p4.x - p3.x, p4.y - p3.y);

//   let dotProduct = v1.dot(v2);

//   let magnitude1 = v1.length();
//   let magnitude2 = v2.length();

//   let angleRad = Math.acos(dotProduct / (magnitude1 * magnitude2));

//   let angleDeg = 180 - THREE.MathUtils.radToDeg(angleRad);

//   return angleDeg;
// }

// function getInterSectionPoint(p1,p2,p3,p4){
//   const denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
//   if(denominator === 0){
//     return null;
//   }

//   const interSectX = ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x))/ denominator;
//   const interSectY = ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x))/ denominator;
//   const intPointXY = new THREE.Vector2(interSectX, interSectY);
 
//   const minX = Math.min(p1.x, p2.x);
//   const minY = Math.min(p1.y, p2.y);
//   const maxX = Math.max(p1.x, p2.x);
//   const maxY = Math.max(p1.y, p2.y);

//   if(intPointXY.x >= minX && intPointXY.x <= maxX && intPointXY.y >= minY && intPointXY.y <= maxY){
//     return intPointXY;
//   }
//   else{
//     return null;
//   }
// }

// function findPerpendicular(base, angleDegrees) {
//   let angleRadians = THREE.MathUtils.degToRad(angleDegrees);
//   return base * Math.tan(angleRadians);
// }

// function getParallelLine(start, end, offset) {
//   let direction = new THREE.Vector2(end.x - start.x, end.y - start.y);
//   direction.normalize();

//   let perpendicular = new THREE.Vector2(-direction.y, direction.x);

//   let newStart = new THREE.Vector2(start.x + perpendicular.x * offset, start.y + perpendicular.y * offset);
//   let newEnd = new THREE.Vector2(end.x + perpendicular.x * offset, end.y + perpendicular.y * offset);

//   return new THREE.Vector2(newStart, newEnd);
// }

// // Example Usage
// let start = new THREE.Vector2(0, 0);
// let end = new THREE.Vector2(50, 0);
// let offset = 20; // Distance of the parallel line

// let parallelLines = getParallelLine(start, end, offset);
// console.log("Parallel Line Start:", parallelLines.x);
// console.log("Parallel Line End:", parallelLines.y);


//#endregion


//#region csg shape cutter 
// const shape = new THREE.Shape();
// shape.moveTo(0, 0);
// shape.lineTo(50, 0);
// shape.lineTo(50, 50);
// shape.lineTo(0, 50);
// shape.lineTo(0, 0);

// // Extrude Paths
// const extrudePath = new THREE.LineCurve3(
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(500, 0, 0)
// );

// const extrudeLeftPath = new THREE.LineCurve3(
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(0, 500, 0)
// );

// const extrudeRightPath = new THREE.LineCurve3(
//   new THREE.Vector3(500, 0, 0),
//   new THREE.Vector3(500, 500, 0)
// );

// const extrudeTopPath = new THREE.LineCurve3(
//   new THREE.Vector3(500, 500, 0),
//   new THREE.Vector3(0, 500, 0)
// );

// // Extrude Settings
// const extrudeSettings = { steps: 1, extrudePath: extrudePath };
// const extrudeLeftSettings = { steps: 1, extrudePath: extrudeLeftPath };
// const extrudeRightSettings = { steps: 1, extrudePath: extrudeRightPath };
// const extrudeTopSettings = { steps: 1, extrudePath: extrudeTopPath };

// const bottomMesh = new Brush(new THREE.ExtrudeGeometry(shape, extrudeSettings), new THREE.MeshStandardMaterial({ color: "red" }));
// bottomMesh.updateMatrixWorld();

// const leftMesh = new Brush(new THREE.ExtrudeGeometry(shape, extrudeLeftSettings), new THREE.MeshStandardMaterial({ color: "red" }));
// leftMesh.position.set(50, 0, 0);
// leftMesh.updateMatrixWorld();

// const rightMesh = new Brush(new THREE.ExtrudeGeometry(shape, extrudeRightSettings), new THREE.MeshStandardMaterial({ color: "red" }));
// rightMesh.updateMatrixWorld();

// const topMesh = new Brush(new THREE.ExtrudeGeometry(shape, extrudeTopSettings), new THREE.MeshStandardMaterial({ color: "red"}));
// topMesh.updateMatrixWorld();

// // Cut shape
// const cutShape = new THREE.Shape();
// cutShape.moveTo(0, 0);
// cutShape.lineTo(50, 50);
// cutShape.lineTo(50, 50);
// cutShape.lineTo(0, 50);
// cutShape.lineTo(0, 0);

// const extrudeCutShapeSettings = { steps: 1, depth: 50 };
// const cutShapeBrushGeometry =new THREE.ExtrudeGeometry(cutShape, extrudeCutShapeSettings);
// const cutShapeBrushMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
// // Cutting geometries
// const bottomLeftCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// bottomLeftCut.position.set(0, 0, -50);
// bottomLeftCut.updateMatrixWorld();

// const LeftBottomCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// LeftBottomCut.position.set(50, 50, -50);
// LeftBottomCut.rotation.z -= Math.PI;
// LeftBottomCut.updateMatrixWorld();

// const rightBottomCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// rightBottomCut.position.set(500 - 50,50,0);
// rightBottomCut.rotation.x -= Math.PI
// rightBottomCut.updateMatrixWorld();

// const bottomRightCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// bottomRightCut.position.set(500, 0, 0);
// bottomRightCut.rotation.y += Math.PI;
// bottomRightCut.updateMatrixWorld();

// const rightTopCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// rightTopCut.position.set(500 - 50, 500 - 50, -50);
// rightTopCut.updateMatrixWorld();

// const topRightCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// topRightCut.position.set(500 , 500 , -50);
// topRightCut.rotation.z += Math.PI;
// topRightCut.updateMatrixWorld();

// const topLeftCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// topLeftCut.position.set(0, 500,0);
// topLeftCut.rotation.x = Math.PI;
// topLeftCut.updateMatrixWorld();

// const leftTopCut = new Brush(cutShapeBrushGeometry, cutShapeBrushMaterial);
// leftTopCut.position.set(50, 500 - 50,0);
// leftTopCut.rotation.y = Math.PI;
// leftTopCut.updateMatrixWorld();


// // CSG Evaluator
// const evaluator = new Evaluator();


// const bottomMeshLeftCut = evaluator.evaluate(bottomMesh, bottomLeftCut, SUBTRACTION);
// const leftMeshBottomCut = evaluator.evaluate(leftMesh, LeftBottomCut, SUBTRACTION);
// const rightMeshBottomCut = evaluator.evaluate(rightMesh, rightBottomCut, SUBTRACTION);
// const bottomMeshRightCut = evaluator.evaluate(bottomMesh, bottomRightCut, SUBTRACTION);
// const righMeshTopCut = evaluator.evaluate(rightMesh, rightTopCut, SUBTRACTION);
// const topMeshRightCut = evaluator.evaluate(topMesh,topRightCut, SUBTRACTION );
// const topMeshLeftCut = evaluator.evaluate(topMesh, topLeftCut, SUBTRACTION);
// const leftMehsTopCut = evaluator.evaluate(leftMesh, leftTopCut, SUBTRACTION);

// const bottomLeftMesh = evaluator.evaluate(bottomMeshLeftCut, leftMeshBottomCut, ADDITION);
// const bottomRightMesh = evaluator.evaluate(bottomMeshRightCut, rightMeshBottomCut, ADDITION);
// const bottomMeshConnector = evaluator.evaluate(bottomLeftMesh, bottomRightMesh, ADDITION);


// const topLeftMesh = evaluator.evaluate(topMeshLeftCut, leftMehsTopCut, ADDITION);
// const topRightMesh = evaluator.evaluate(topMeshRightCut, righMeshTopCut, ADDITION);
// const topMeshConnector = evaluator.evaluate(topLeftMesh, topRightMesh, ADDITION);


// const edgesTop = new THREE.Line(new THREE.EdgesGeometry(topMeshConnector.geometry), new THREE.LineBasicMaterial({color: "white"}));
// const edgesBottom = new THREE.Line(new THREE.EdgesGeometry(bottomMeshConnector.geometry), new THREE.LineBasicMaterial({color: "white"}));



// scene.add(topMeshConnector, bottomMeshConnector, edgesTop, edgesBottom);

// // Corrected position extraction loop
// const pos = finalResult.geometry.getAttribute("position");
// for (let i = 0; i < pos.count; i++) {
//   const x = pos.getX(i);
//   const y = pos.getY(i);
//   const z = pos.getZ(i); // Fix: Should be getZ(i)

//   console.log(x, y, z);
// }

// scene.add(cutMesh);

//#endregion

//#region 
const shapeWidth = 50;
const extrudeWidth = 200;
const parentObj = new THREE.Object3D();
const shape = new THREE.Shape();
shape.moveTo(0,0);
shape.lineTo(shapeWidth, 0);
shape.lineTo(shapeWidth, shapeWidth);
shape.lineTo(0, shapeWidth);
shape.lineTo(0,0);
const side = HelperFunction.Side;
const bottomPath = new THREE.LineCurve3(
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(extrudeWidth, 0,0),
);

const rightPath = new THREE.LineCurve3(
  new THREE.Vector3(extrudeWidth,0,0),
  new THREE.Vector3(extrudeWidth, extrudeWidth,0),
)

const topPath = new THREE.LineCurve3(
  new THREE.Vector3(extrudeWidth,extrudeWidth,0),
  new THREE.Vector3(0, extrudeWidth,0),
)

const leftPath = new THREE.LineCurve3(
  new THREE.Vector3(0, extrudeWidth,0),
  new THREE.Vector3(0,0,0),
)

const paths = [bottomPath, rightPath, topPath, leftPath];
// for (const path of paths) {
  const extrudeSettings = {
    steps: 1,
    extrudePath: bottomPath,
  }

  const extrudeSettings2 = {
    steps: 1,
    extrudePath: rightPath,
  }
  
  
  const extrudeShape = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const material = new THREE.MeshStandardMaterial({color: "red"});
  const mesh = new THREE.Mesh(extrudeShape, material);
  const mesh2 = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, extrudeSettings2), material);

// }


// cutLine
const upperLine = new THREE.Vector2(
  new THREE.Vector2(0, shapeWidth),
  new THREE.Vector2(extrudeWidth, shapeWidth)
);

const bottomLine = new THREE.Vector2(
  new THREE.Vector2(0,0),
  new THREE.Vector2(extrudeWidth, 0)
);

const upperLine2 = new THREE.Vector2(
  new THREE.Vector2(extrudeWidth - shapeWidth, 0),
  new THREE.Vector2(extrudeWidth - shapeWidth, extrudeWidth)
);
const bottomLine2 = new THREE.Vector2(
  new THREE.Vector2(extrudeWidth , 0),
  new THREE.Vector2(extrudeWidth, extrudeWidth)
);

const angleBetLines = HelperFunction.getAngleBetweenLines(bottomLine.x, bottomLine.y, bottomLine2.x, bottomLine2.y);

// const angleBetLeftLines = HelperFunction.getAngleBetweenLines(bottomLine.x, bottomLine.y, new THREE.Vector2(leftPath.v2.x, leftPath.v2.y), new THREE.Vector2(leftPath.v1.x, leftPath.v1.y));

// side are considered as per the base line
const cutLine = getCutLine(bottomLine, angleBetLines, side.right, side.top, side.left);
// const cutLineBottomLeft = getCutLine(bottomLine,angleBetLeftLines, side.left, side.top, side.right);
// const cutLinePoints = [cutLine.x, cutLine.y, cutLineBottomLeft.x, cutLineBottomLeft.y];
const cutLinePoints = [cutLine.x, cutLine.y];

const cutLineHelper = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cutLinePoints), new THREE.LineBasicMaterial({color: "yellow"}));
linePolygonCutter(cutLine, bottomLine, upperLine, bottomLine2, upperLine2, mesh, side.right);
linePolygonCutter(cutLine, bottomLine, upperLine, bottomLine2, upperLine2, mesh2, side.left);
// linePolygonCutter(cutLineBottomLeft, bottomLine, upperLine, bottomLine2, upperLine2, mesh, side.left);

const meshEdgeLines = new THREE.LineSegments(new THREE.EdgesGeometry(extrudeShape), new THREE.LineBasicMaterial({color: "white"}));
const meshEdgeLines2 = new THREE.LineSegments(new THREE.EdgesGeometry(mesh2.geometry),new THREE.LineBasicMaterial({color: "white"}) );
mesh.add(meshEdgeLines, meshEdgeLines2);
  parentObj.add(mesh, mesh2);
parentObj.add(cutLineHelper);

scene.add(parentObj);


function getCutLine(baseLine, AngleDeg, horSide, verSide, towards){
  const baseLength = (baseLine.x).distanceTo(baseLine.y);
 let cutLine;
  const perpendicularHeight = HelperFunction.getPerpendicularHeight(baseLength, AngleDeg/2);

  // for bottom
  if(horSide === HelperFunction.Side.right && verSide === HelperFunction.Side.top && towards == HelperFunction.Side.left){
    cutLine = new THREE.Vector2(baseLine.y, new THREE.Vector2(
      baseLine.x.x, Math.round((baseLine.x.y) + perpendicularHeight)
    ));
  }
  // else if(horSide === HelperFunction.Side.left && verSide === HelperFunction.Side.top && towards == HelperFunction.Side.right){
  //   cutLine = new THREE.Vector2(baseLine.x, new THREE.Vector2(
  //     baseLine.x.x + perpendicularHeight, Math.round((baseLine.x.y) + perpendicularHeight)
  //   ));
  // }
  else if(horSide === HelperFunction.Side.right && verSide === HelperFunction.Side.bottom && towards == HelperFunction.Side.left){
    cutLine = new THREE.Vector2(baseLine.y, new THREE.Vector2(
      baseLine.x.x, Math.round((baseLine.x.y) - perpendicularHeight)
    ));
  }
  else if(horSide === HelperFunction.Side.right && verSide === HelperFunction.Side.top && towards == HelperFunction.Side.right){
    cutLine = new THREE.Vector2(baseLine.x, new THREE.Vector2(
      baseLine.y.x, Math.round((baseLine.y.y) + perpendicularHeight)
    ));
  }
  else if(horSide === HelperFunction.Side.right && verSide === HelperFunction.Side.bottom && towards == HelperFunction.Side.right){
    cutLine = new THREE.Vector2(baseLine.x, new THREE.Vector2(
      baseLine.y.x, Math.round((baseLine.y.y) - perpendicularHeight)
    ));
  }

  return cutLine;
}


function linePolygonCutter(cutLine, bottomLine, upperLine, bottomLine2, upperLine2, parentObj, side){
  const upperIntersectionPoint = HelperFunction.getIntersectionPoint(upperLine.x, upperLine.y, cutLine.x, cutLine.y);
  const bottomIntersectionPoint = HelperFunction.getIntersectionPoint(bottomLine.x, bottomLine.y, cutLine.x, cutLine.y);
  const pos = parentObj.geometry.getAttribute("position");
  console.log(upperIntersectionPoint,bottomIntersectionPoint );

  for(let i = 0;i<pos.count; i++){
    console.log(pos.getX(i), pos.getY(i));
    if(side === HelperFunction.Side.right && pos.getX(i) == upperLine.y.x && pos.getY(i) == upperLine.y.y ){
      pos.setX(i, upperIntersectionPoint.x);
      pos.setY(i, upperIntersectionPoint.y);
    }
    if(side === HelperFunction.Side.right && pos.getX(i) == bottomLine.y.x && pos.getY(i) == bottomLine.y.y ){
      pos.setX(i, bottomIntersectionPoint.x);
      pos.setY(i, bottomIntersectionPoint.y);
    }
    if(side === HelperFunction.Side.left && pos.getX(i) === upperLine2.x.x && pos.getY(i) === upperLine2.x.y){
      pos.setX(i, upperIntersectionPoint.x);
      pos.setY(i, upperIntersectionPoint.y);
    }
    if(side === HelperFunction.Side.left && pos.getX(i) == bottomLine2.x.x && pos.getY(i) == bottomLine2.x.y ){
      pos.setX(i, bottomIntersectionPoint.x);
      pos.setY(i, bottomIntersectionPoint.y);
    }
  }
  pos.needsUpdate = true;

}

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
