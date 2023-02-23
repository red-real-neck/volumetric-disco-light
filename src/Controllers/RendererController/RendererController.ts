import * as THREE from "three";
import {
  ScreenSizesController,
  ScreenSizes,
} from "../ScreenSizesController/ScreenSizesController";

export class RendererController {
  private _renderer: THREE.WebGLRenderer;
  private _canvas: HTMLCanvasElement;

  constructor(
    canvas: HTMLCanvasElement,
    sizesController: ScreenSizesController
  ) {
    this._canvas = canvas;

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    });
    this._renderer.setSize(
      sizesController.sizes.width,
      sizesController.sizes.height
    );
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  updateRendererSizes(sizes: ScreenSizes) {
    this._renderer.setSize(sizes.width, sizes.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  get renderer() {
    return this._renderer;
  }
}
