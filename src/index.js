import * as THREE from 'three';
// import * as WEBGL from 'three/examples/jsm/WebGL.js';
import Game from './game';
import './styles.css';
import './3d_assets/piece.obj';
import './3d_assets/board.obj';


function BoardContainer() {
  const boardContainer = document.createElement('div');
  boardContainer.setAttribute('id', 'boardContainer');
  return boardContainer;
}
document.body.appendChild(BoardContainer());

// const container = document.getElementById('boardContainer');
// console.log('container');
// console.log(document.body);
// console.log(container);

const game = new Game({
  containerEl: document.getElementById('boardContainer'),
  assetsUrl: './3d_assets/'
});


// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // cube

// var geometry = new THREE.BoxGeometry();
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;
// // camera.position.set(0, 120, 150);

// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }

// animate();