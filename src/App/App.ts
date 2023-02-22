import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import PerspectiveCameraController from "../Controllers/CameraController/PerspectiveCameraController";
import { RendererController } from "../Controllers/RendererController/RendererController";
import { ScreenSizesController } from "../Controllers/ScreenSizesController/ScreenSizesController";

export default class App {
  private _canvas: HTMLCanvasElement;
  constructor() {}

  init() {
    /**
     * Base
     */
    // Canvas
    this._canvas = document.querySelector("canvas.webgl")!;

    // Scene
    const scene = new THREE.Scene();

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Sizes
     */
    const sizesController = new ScreenSizesController(this._canvas);
    sizesController.init();

    /**
     * Camera
     */
    const cameraController = new PerspectiveCameraController(
      scene,
      sizesController
    );
    cameraController.camera.position.z = 3;
    scene.add(cameraController.camera);

    // Controls
    const controls = new OrbitControls(cameraController.camera, this._canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const rendererController = new RendererController(
      this._canvas,
      sizesController
    );

    sizesController.setControllers(cameraController, rendererController);

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      rendererController.renderer.render(scene, cameraController.camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
