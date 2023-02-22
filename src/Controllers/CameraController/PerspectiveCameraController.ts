import * as THREE from "three";
import {
  ScreenSizes,
  ScreenSizesController,
} from "../ScreenSizesController/ScreenSizesController";

export type Sizes = {
  width: number;
  height: number;
};

export default class PerspectiveCameraController {
  private _camera: THREE.PerspectiveCamera;
  private _scene: THREE.Scene;

  constructor(scene: THREE.Scene, sizesController: ScreenSizesController) {
    this._scene = scene;

    this._camera = new THREE.PerspectiveCamera(
      75,
      sizesController.sizes.width / sizesController.sizes.height,
      0.1,
      100
    );
    this._camera.position.z = 3;
    this._scene.add(this._camera);
  }

  updateSizes(sizes: ScreenSizes) {
    this._camera.aspect = sizes.width / sizes.height;
    this._camera.updateProjectionMatrix();
  }

  get camera() {
    return this._camera;
  }
}
