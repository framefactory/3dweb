import * as THREE from "three";
import "../../node_modules/three/examples/js/controls/OrbitControls";
import Scene from "./Scene";

import dat from "dat.gui/build/dat.gui.module";
import { WebGLBufferRenderer } from "three";
import { STATUS_CODES } from "http";

export default class Test extends Scene
{
    boxMeshes : THREE.Mesh[];
    gui: dat.GUI;
    controls: THREE.OrbitControls;
    camera: THREE.PerspectiveCamera;

    speed: number;
    adjTime: number;
    rotationRadius: number;

    start(scene: THREE.Scene): THREE.Camera
    {
        scene.background = new THREE.Color("black");
        this.adjTime = 0;
        this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
        this.camera.position.set(0, 0, 20);

        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 4;
        this.controls.enableRotate = true;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.rotateSpeed = 0.0001;
        this.controls.enableKeys = true;

        const boxGeo = new THREE.SphereBufferGeometry(0.3,10,10);
        const boxMat = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            metalness: 0,
            roughness: 0.5,
        });

        this.boxMeshes = [];
        for (let i = 0; i<100; ++i){
            const current = new THREE.Mesh(boxGeo,boxMat);
            current.position.set(0.3*(i-50),0,0);
            this.boxMeshes.push(current);
            scene.add(current);

        }
        //const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        //scene.add(boxMesh);

        const light = new THREE.PointLight("#00ffcc",1,0,1);
        light.position.set(-10,10,10);
        scene.add(light);

        const light2 = new THREE.PointLight("#ff0066",1,0,1);
        light2.position.set(10,-10,-10);
        scene.add(light2);

        this.gui = new dat.GUI();
        this.speed = 0.1;
        this.gui.add(this, "speed", 0, 0.3, 0.001);

        this.rotationRadius = 1;
        this.gui.add(this, "rotationRadius", 0, 5, 0.05);
        
        console.log("hallo stadt");
        return this.camera;
    }

    update(time: number, delta: number)
    {
        //this.controls.addEventListener('change',this.render  );
        this.controls.update();

        this.adjTime += this.speed*delta;

        console.log(this.camera.position);

        for (let i = 0; i<100; ++i){

            this.boxMeshes[i].position.y = this.rotationRadius*Math.sin(i*this.adjTime+i);
            this.boxMeshes[i].position.z = this.rotationRadius*Math.cos(i*this.adjTime+i);
        }
    }
}