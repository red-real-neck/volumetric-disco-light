import PerspectiveCameraController from "../CameraController/PerspectiveCameraController";
import { RendererController } from "../RendererController/RendererController";

export type ScreenSizes = {
  width: number;
  height: number;
};

export class ScreenSizesController {
  private _sizes: ScreenSizes;
  private _cameraController: PerspectiveCameraController;
  private _rendererController: RendererController;
  private _canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this._sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this._canvas = canvas;
  }

  init() {
    window.addEventListener("resize", () => {
      // Update sizes
      this._sizes.width = window.innerWidth;
      this._sizes.height = window.innerHeight;

      // Update camera
      this._cameraController.updateSizes(this._sizes);

      // Update renderer
      this._rendererController.updateRendererSizes(this._sizes);
    });

    window.addEventListener("dblclick", () => {
      const fullscreenElement =
        // @ts-ignore
        document.fullscreenElement || document.webkitFullscreenElement;

      if (!fullscreenElement) {
        if (this._canvas.requestFullscreen) {
          this._canvas.requestFullscreen();
          // @ts-ignore
        } else if (this._canvas.webkitRequestFullscreen) {
          // @ts-ignore
          this._canvas.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          // @ts-ignore
        } else if (document.webkitExitFullscreen) {
          // @ts-ignore
          document.webkitExitFullscreen();
        }
      }
    });
  }

  setControllers(
    cameraController: PerspectiveCameraController,
    rendererController: RendererController
  ) {
    this._cameraController = cameraController;
    this._rendererController = rendererController;
  }

  get sizes() {
    return this._sizes;
  }
}
