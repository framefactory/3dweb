import * as THREE from "three";

import OrbitControllerScene from "./OrbitControllerScene";

import dat from "dat.gui/build/dat.gui.module";
import { WebGLBufferRenderer, Camera, Vector3 } from "three";
import { STATUS_CODES } from "http";
import { arch } from "os";

class Particle{
    readonly damping = 0.99;

    position : THREE.Vector3;
    speed: THREE.Vector3;

    updatePosition(position : THREE.Vector3, speed : THREE.Vector3){
        this.position.add(speed.multiplyScalar(this.damping));
    }
}

class Food extends Particle{

}

function bubbleSort(array: number[], food : THREE.Vector3[])
{
    let l = array.length;
    for (let i = 0; i<l-1; ++i)
    {
        for (let j = 0; j<l-i-1; ++j)
        {
            if( array[j] > array[j+1])
            {

                let temp = array[j];
                array[j + 1] = temp;

                let temp_ = food[j];
                food[j + 1] = temp_;
            }
        }
    }
}
  
class Fish extends Particle{

    readonly maxVel = 0.1;

    live(target : THREE.Vector3[]){
        this.smell(target, this.position);
    }

    smell(food : THREE.Vector3[], position : THREE.Vector3){
        let dist = THREE.Vector3[food.length];
        food.forEach(function(value : Vector3, index : number) {
            dist[index] = value.sub(position);
        });
        dist.sort(function(a,b){
            return a - b;
        });

    }

    moveToTarget(target : THREE.Vector3, position : THREE.Vector3, speed : THREE.Vector3){
        let vec = new THREE.Vector3;
        vec = target.sub(position);
        vec.normalize;
        vec.multiplyScalar(this.maxVel);
        this.speed = vec;
    }
}

export default class Test extends OrbitControllerScene
{
    boxMeshes : THREE.Mesh[];
    gui: dat.GUI;
    controls: THREE.OrbitControls;

    speed: number;
    adjTime: number;
    rotationRadius: number;

    setup(scene: THREE.Scene): THREE.Camera
    {
        const camera = super.setup(scene, new THREE.Vector3(0, 0, 20));

        scene.background = new THREE.Color("black");
        this.adjTime = 0;
        //this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
        //this.camera.position.set(0, 0, 20);

        const boxGeo = new THREE.SphereBufferGeometry(0.3,10,10);
        const boxMat = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            metalness: 0.3,
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
        this.speed = 0.05;
        this.gui.add(this, "speed", 0, 0.1, 0.001);

        this.rotationRadius = 1;
        this.gui.add(this, "rotationRadius", 0, 5, 0.05);
        
        console.log("hallo stadt");
        return camera;
    }

    update(time: number, delta: number)
    {
        super.update(time, delta);

        this.adjTime += this.speed*delta;

        for (let i = 0; i<100; ++i){

            this.boxMeshes[i].position.y = this.rotationRadius*Math.sin(i*this.adjTime+i);
            this.boxMeshes[i].position.z = this.rotationRadius*Math.cos(i*this.adjTime+i);
        }
    }
}