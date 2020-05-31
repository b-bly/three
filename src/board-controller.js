import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const images = ['board_texture.jpg', 'ground.png', 'piece_shadow.png', 'square_dark_texture.jpb', 'square_light_texture.jpg'];
// const loadEntries = (entries) =>
//   Promise.all(entries.map((entry) => import(`./3d_assets/${entry}.md`)));
// loadEntries(images);

import BoardTexture from './3d_assets/board_texture.jpg';
import Ground from './3d_assets/ground.png';
import PieceShadow from './3d_assets/piece_shadow.png';
import SquareDarkTexture from './3d_assets/square_light_texture.jpg';
import SquareLightTexture from './3d_assets/square_dark_texture.jpg';
import Board from './3d_assets/board.json';
import Piece from './3d_assets/piece.json';

export default class BoardController {
  options = null;
  containerEl = null;
  assetsUrl = '';
  renderer;
  scene;
  camera;
  cameraController;
  lights = {};
  materials = {};
  pieceGeometry = null;
  boardModel;
  groundModel;
  squareSize = 10;


  constructor(options) {
    this.options = options;
    if (this.options) {
      this.containerEl = options.containerEl;
      this.assetsUrl = options.assetsUrl;
    }
  }

  drawBoard() {
    this.initEngine();
    this.initLights();
    this.initMaterials();
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
    // var geometry = new THREE.BoxGeometry();
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // // var cube = new THREE.Mesh(geometry, material);
    // var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
    // this.scene.add(cube);

    var loader = new THREE.ObjectLoader(); // replaced deprecated .JSONLoader(); 
    var totalObjectsToLoad = 2; // board + the piece
    var loadedObjects = 0; // count the loaded pieces

    // checks if all the objects have been loaded

    function checkLoad() {
      loadedObjects++;

      if (loadedObjects === totalObjectsToLoad && callback) {
        callback();
      }
    }
    console.log('Piece');
    console.log(Piece)
    console.log(Board);

    // load board

    loader.load(Board, (geom) => {
      this.boardModel = new THREE.Mesh(geom, this.materials.boardMaterial);
      this.scene.add(boardModel);
      checkLoad();
    });

    // load piece

    loader.load(Piece, (geometry) => {
      this.pieceGeometry = geometry;
      checkLoad();
    });
    this.scene.add(new THREE.AxisHelper(200));

    callback();
  }

  initLights() {
    // top light
    this.lights.topLight = new THREE.PointLight();
    this.lights.topLight.position.set(0, 150, 0);
    this.lights.topLight.intensity = 1.0;

    // add the lights in the scene
    this.scene.add(this.lights.topLight);
  }

  initMaterials() {
    // board material
    console.log(BoardTexture);
    this.materials.boardMaterial = new THREE.MeshLambertMaterial({
      // map: THREE.ImageUtils.loadTexture(this.assetsUrl + 'board_texture.jpg')
      map: THREE.ImageUtils.loadTexture(BoardTexture)

    });

    // ground material
    this.materials.groundMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      // map: THREE.ImageUtils.loadTexture(this.assetsUrl + 'ground.png')
      map: THREE.ImageUtils.loadTexture(Ground.png)

    });

    // dark square material
    this.materials.darkSquareMaterial = new THREE.MeshLambertMaterial({
      // map: THREE.ImageUtils.loadTexture(this.assetsUrl + 'square_dark_texture.jpg')
      map: THREE.ImageUtils.loadTexture(SquareDarkTexture)

    });
    //
    // light square material
    this.materials.lightSquareMaterial = new THREE.MeshLambertMaterial({
      // map: THREE.ImageUtils.loadTexture(this.assetsUrl + 'square_light_texture.jpg')
      map: THREE.ImageUtils.loadTexture(SquareLightTexture)
    });

    // white piece material
    this.materials.whitePieceMaterial = new THREE.MeshPhongMaterial({
      color: 0xe9e4bd,
      shininess: 20
    });

    // black piece material
    this.materials.blackPieceMaterial = new THREE.MeshPhongMaterial({
      color: 0x9f2200,
      shininess: 20
    });

    // pieces shadow plane material
    this.materials.pieceShadowPlane = new THREE.MeshBasicMaterial({
      transparent: true,
      // map: THREE.ImageUtils.loadTexture(this.assetsUrl + 'piece_shadow.png')
      map: THREE.ImageUtils.loadTexture(PieceShadow)

    });
  }


  onAnimationFrame() {
    requestAnimationFrame(this.onAnimationFrame.bind(this));
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    this.cameraController.update();
    this.renderer.render(this.scene, this.camera);
  }
};