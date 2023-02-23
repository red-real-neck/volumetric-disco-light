import * as THREE from "three";
// @ts-ignore
import fragmentShader from "../shaders/fragmentShader.glsl";
// @ts-ignore
import vertexShader from "../shaders/vertexShader.glsl";

export default class DiscoSphere {
  private _scene: THREE.Scene;
  constructor(scene: THREE.Scene) {
    this._scene = scene;
    this.init();
  }

  init() {
    const geometry = new THREE.SphereGeometry(0.5, 30, 30);
    const material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const sphere = new THREE.Mesh(geometry, material);

    this._scene.add(sphere);
  }
}
