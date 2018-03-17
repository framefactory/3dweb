import * as THREE from "three";
import Scene from "./Scene";

import dat from "dat.gui/build/dat.gui.module";

export default class Test extends Scene
{
    boxMeshes : THREE.Mesh[];

    start(scene: THREE.Scene): THREE.Camera
    {
        scene.background = new THREE.Color("darkblue");

        const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
        camera.position.set(0, 0, 20);

        const boxGeo = new THREE.BoxBufferGeometry(1, 1, 1);
        const boxMat = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            metalness: 0,
            roughness: 0.5,
        });

        this.boxMeshes = [];
        for (let i = 0; i<20; ++i){
            const current = new THREE.Mesh(boxGeo,boxMat);
            current.position.set(i-10,0,0);
            this.boxMeshes.push(current);
            scene.add(current);

        }
        //const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        //scene.add(boxMesh);

        const light = new THREE.PointLight("white",1,0,1);
        light.position.set(-10,10,10);
        scene.add(light);

        const light2 = new THREE.PointLight("red",1,0,1);
        light2.position.set(10,-10,-10);
        scene.add(light2);
        
        
        console.log("hallo stadt");
        return camera;
    }

    update(time: number, delta: number)
    {
        for (let i = 0; i<20; ++i){
            this.boxMeshes[i].position.y = Math.sin(time+i);
            this.boxMeshes[i].position.z = Math.cos(time+i);
        }
    }

}