import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class BoardController {
  options = null;
  containerEl = null;
  assetsUrl = '';
  renderer;
  scene;
  camera;
  cameraController;
  scope = this;

  constructor(options) {
    this.options = options;
    if (this.options) {
      this.containerEl = options.containerEl;
      this.assetsUrl = options.assetsUrl;
    }
  }

  drawBoard() {
    this.initEngine();
    this.initObjects(() => this.onAnimationFrame());
  };

  initEngine() {
    var viewWidth = this.containerEl.offsetWidth;
    var viewHeight = this.containerEl.offsetHeight;
    console.log(viewWidth);
    console.log(viewHeight);
    // instantiate the WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(viewWidth, viewHeight);

    // create the scene
    this.scene = new THREE.Scene();

    // create camera
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera = new THREE.PerspectiveCamera(35, viewWidth / viewHeight, 1, 1000);

    this.camera.position.z = 5;
    // this.camera.position.set(0, 120, 150);

    this.cameraController = new OrbitControls(this.camera, this.containerEl);
    this.scene.add(this.camera);
    this.containerEl.appendChild(this.renderer.domElement);

  }

  initObjects(callback) {
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));

    this.scene.add(cube);
    callback();
  }

  onAnimationFrame() {
    requestAnimationFrame(this.onAnimationFrame.bind(this));
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    this.cameraController.update();
    this.renderer.render(this.scene, this.camera);
  }
};