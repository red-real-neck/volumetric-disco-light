import * as THREE from "three";
import { ScreenSizes } from "../ScreenSizesController/ScreenSizesController";
// @ts-ignore
import vertexPost from "../../shaders/post/vertexShaderPost.glsl";
// @ts-ignore
import fragmentPost from "../../shaders/post/fragmentShaderPost.glsl";

export class PostController {
  private _postTexture: THREE.WebGLRenderTarget;
  private _scene: THREE.Scene;
  private _camera: THREE.Camera;
  private _renderTarget: THREE.Mesh;
  private _materialOrtho: THREE.RawShaderMaterial;

  constructor(sizes: ScreenSizes) {
    const frustumSize = 1;
    const aspect = 1;
    this._camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );

    this._postTexture = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    this._materialOrtho = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMap: { value: null },
        uLowFrequency: { value: 0 },
        uMidFrequency: { value: 0 },
        uHighFrequency: { value: 0 },
      },
      vertexShader: vertexPost,
      fragmentShader: fragmentPost,
    });

    this._renderTarget = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      this._materialOrtho
    );

    this._scene = new THREE.Scene();

    this._scene.add(this._renderTarget);
  }

  updateUniform() {
    this._materialOrtho.uniforms.uMap.value = this._postTexture.texture;
  }

  get camera() {
    return this._camera;
  }

  get scene() {
    return this._scene;
  }

  get postTexture() {
    return this._postTexture;
  }

  get materialOrtho() {
    return this._materialOrtho;
  }
}
