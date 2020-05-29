// import 'three.js/examples/js/controls/OrbitControls';
//  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class BoardController {
  options = null;
  containerEl = null;
  assetsUrl = '';
  renderer;
  scene;
  camera;
  cameraController;

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
    // instantiate the WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(viewWidth, viewHeight);
    // create the scene
    this.scene = new THREE.Scene();

    // create camera
    this.camera = new THREE.PerspectiveCamera(35, viewWidth / viewHeight, 1, 1000);
    this.camera.position.set(0, 120, 150);
    this.cameraController = new THREE.OrbitControls(this.camera, this.containerEl);
    this.scene.add(this.camera);
    this.containerEl.appendChild(this.renderer.domElement);
  }

  initObjects(callback) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
    scene.add(cube);
    callback();
  }

  onAnimationFrame() {
    this.requestAnimationFrame(this.onAnimationFrame);
    this.cameraController.update();
    this.renderer.render(this.scene, this.camera);
  }
};