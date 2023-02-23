import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import DiscoSphere from "../3DObjects/DiscoSphere";
import { AudioController } from "../Controllers/AudioController/AudioController";

import PerspectiveCameraController from "../Controllers/CameraController/PerspectiveCameraController";
import { PostController } from "../Controllers/PostController/PostController";
import { RendererController } from "../Controllers/RendererController/RendererController";
import { ScreenSizesController } from "../Controllers/ScreenSizesController/ScreenSizesController";

export default class App {
  private _canvas: HTMLCanvasElement;
  constructor() {}

  init() {
    this._canvas = document.querySelector("canvas.webgl")!;
    const scene = new THREE.Scene();
    const discoSphere = new DiscoSphere(scene);

    scene.background = new THREE.Color("black");

    const sizesController = new ScreenSizesController(this._canvas);
    sizesController.init();

    const cameraController = new PerspectiveCameraController(
      scene,
      sizesController
    );

    cameraController.camera.position.z = 3;
    scene.add(cameraController.camera);

    const controls = new OrbitControls(cameraController.camera, this._canvas);
    controls.enableDamping = true;

    const rendererController = new RendererController(
      this._canvas,
      sizesController
    );

    sizesController.setControllers(cameraController, rendererController);

    const postController = new PostController(sizesController.sizes);

    const clock = new THREE.Clock();

    const audioController = new AudioController();

    const tick = () => {
      if (audioController.context) {
        // console.log("frequencyAnalyze:", audioController.frequencyAnalyze);
        postController.materialOrtho.uniforms.uLowFrequency.value =
          audioController.frequencyAnalyze.low;
        postController.materialOrtho.uniforms.uMidFrequency.value =
          audioController.frequencyAnalyze.mid;
        postController.materialOrtho.uniforms.uHighFrequency.value =
          audioController.frequencyAnalyze.high;
      }
      const elapsedTime = clock.getElapsedTime();

      controls.update();
      discoSphere.update(elapsedTime);

      rendererController.renderer.setRenderTarget(postController.postTexture);
      rendererController.renderer.render(scene, cameraController.camera);

      postController.updateUniform();

      rendererController.renderer.setRenderTarget(null);
      rendererController.renderer.render(
        postController.scene,
        postController.camera
      );

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
