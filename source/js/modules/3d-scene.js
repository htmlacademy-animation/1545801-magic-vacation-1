import * as THREE from './three.min';

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.size = {
      width: 1500,
      height: 1500,
    };
  }

  init() {
    const canvas = this.canvas;
    const dpr = devicePixelRatio || 1;

    this.scene = new THREE.Scene();
    this.camera = this.createCamera();

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true
    });

    this.renderer.setPixelRatio(dpr);
    this.setRendererSize(this.size.width, this.size.height);
    this.resizeOnFullScreen();

    document.body.addEventListener(`screenChanged`, (ev) => {
      const name = ev.detail.screenName;
      let sceneIndex;

      switch (name) {
        case `top`:
          sceneIndex = 0;
          break;

        case `story`:
          sceneIndex = ev.detail.screenElement.activeSlide;
          break;

        default:
          break;
      }

      if (typeof sceneIndex === `number`) {
        this.setScene(sceneIndex);
        this.update();
      }
    });
  }

  setRendererSize(width, height) {
    const renderer = this.renderer;

    renderer.setSize(width, height);
  }

  ciclicUpdate() {
    const tick = () => {
      this.update();
      requestAnimationFrame(tick);
    };

    tick();
  }

  update() {
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;

    renderer.render(scene, camera);
  }

  createCamera() {
    const fov = 45;
    const aspect = this.size.width / this.size.height;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 0, 120);

    return camera;
  }

  resize() {
    const resize = () => this.resizeOnFullScreen();

    window.addEventListener(`resize`, resize);
  }

  setCanvasToCenter() {
    const canvas = this.canvas;
    const parent = canvas.parentElement;
    const scale = canvas.scale;
    const left = (parent.offsetWidth * 0.5 - (canvas.width * scale) * 0.5);
    const top = (parent.offsetHeight * 0.5 - (canvas.height * scale) * 0.5);

    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
  }

  loadTextures(sources, endCB = () => {}) {
    const loader = new THREE.TextureLoader();

    const textures = {};
    const names = Object.keys(sources);
    const maxCount = names.length;
    const loadHandler = (texture, name) => {
      textures[name] = texture;
      counter += 1;

      if (counter >= maxCount) {
        endCB(textures);
      }
    };
    let counter = 0;

    names.forEach((name) => {
      loader.load(
          sources[name],
          function (texture) {
            loadHandler(texture, name);
          }
      );
    });
  }

  createScenes() {
    const scenes = [
      this.createPlane(this.textures.main),
      this.createPlane(this.textures.history1),
      this.createPlane(this.textures.history2),
      this.createPlane(this.textures.history3),
      this.createPlane(this.textures.history4),
    ];

    this.scenes = scenes;

    this.scene.add(...scenes);
  }

  setScene(id) {
    const scenes = this.scenes;
    const chosenScene = scenes[id];

    if (chosenScene) {
      chosenScene.visible = true;
    }

    scenes.forEach((scene) => {
      if (chosenScene !== scene && scene.visible) {
        scene.visible = false;
      }
    });
  }

  createPlane(texture) {
    const geometry = new THREE.PlaneGeometry(200, 100);
    const materialConfig = {
      map: texture,
      side: THREE.FrontSide,
    };
    const material = new THREE.MeshBasicMaterial(materialConfig);
    const plane = new THREE.Mesh(geometry, material);

    plane.visible = false;

    return plane;
  }

  loadScenesTextures(endCB) {
    const sources = {
      main: `./../../img/module-5/scenes-textures/scene-0.jpg`,
      history1: `./../../img/module-5/scenes-textures/scene-1.jpg`,
      history2: `./../../img/module-5/scenes-textures/scene-2.jpg`,
      history3: `./../../img/module-5/scenes-textures/scene-3.jpg`,
      history4: `./../../img/module-5/scenes-textures/scene-4.jpg`,
    };

    this.loadTextures(sources, endCB);
  }

  setCanvasSize(width, height) {
    const canvas = this.canvas;
    const drp = window.devicePixelRatio || 1;

    canvas.width = width * drp;
    canvas.height = height * drp;
    canvas.style.width = width + `px`;
    canvas.style.height = height + `px`;
  }

  setScaleCanvas(scale) {
    const canvas = this.canvas;

    canvas.scale = scale;
    canvas.style.transform = `scale(
      ${scale},
      ${scale}
    )`;
  }

  resizeOnFullScreen() {
    const canvas = this.canvas;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = width > height ? width : height;
    const scale = size / canvas.offsetWidth;

    this.setScaleCanvas(scale);
  }
}
