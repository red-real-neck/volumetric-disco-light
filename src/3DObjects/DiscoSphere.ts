import * as THREE from "three";
// @ts-ignore
import fragmentShader from "../shaders/fragmentShader.glsl";
// @ts-ignore
import vertexShader from "../shaders/vertexShader.glsl";

export default class DiscoSphere {
  private _scene: THREE.Scene;
  private _sphere: THREE.Mesh;
  constructor(scene: THREE.Scene) {
    this._scene = scene;
    this.init();
  }

  init() {
    const geometry = new THREE.SphereGeometry(0.5, 30, 30);
    const material = new THREE.RawShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMap: { value: new THREE.TextureLoader().load("./map.jpg") },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    this._sphere = new THREE.Mesh(geometry, material);

    this._scene.add(this._sphere);
  }

  update(dt) {
    this._sphere.rotation.y = Math.PI * dt * 0.2;
  }
}
