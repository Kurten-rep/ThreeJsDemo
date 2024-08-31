import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createEmmeraldVaseScene() {
    const goldVaseScene = new THREE.Scene();
    goldVaseScene.background = new THREE.Color(0x808080);

    const goldVaseLightLeft = new THREE.PointLight(0xffffff, 0.5, 100);
    const goldVaseLightRight = new THREE.PointLight(0xffffff, 0.5, 100);
    const goldVaseLightFront = new THREE.PointLight(0xffffff, 0.5, 100);
    const goldVaseLightBack = new THREE.PointLight(0xffffff, 0.5, 100);
    const goldVaseLightTop = new THREE.PointLight(0xffffff, 2, 100);
    const goldVaseLightBot = new THREE.PointLight(0xffffff, 2, 100);

    goldVaseLightLeft.position.set(10, 2, 0);
    goldVaseLightRight.position.set(-10, 2, 0);
    goldVaseLightFront.position.set(0, 2, 10);
    goldVaseLightBack.position.set(0, 2, -10);
    goldVaseLightTop.position.set(0, 20, 0);
    goldVaseLightBot.position.set(0, -10, 0);


    goldVaseScene.add(goldVaseLightLeft)
    goldVaseScene.add(goldVaseLightRight)
    goldVaseScene.add(goldVaseLightFront)
    goldVaseScene.add(goldVaseLightBack)
    goldVaseScene.add(goldVaseLightTop)
    goldVaseScene.add(goldVaseLightBot)

    const loader = new GLTFLoader();
    loader.load('./Public/Models/JarronEsmeralda.gltf', (gltf) => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(7, 0, 0); // Adjust position as needed
        goldVaseScene.add(model);
    }, 
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.log('An error happened:', error);
    });

    /*const gridHelper = new THREE.GridHelper(50, 50); // 50 units, 50 divisions
    goldVaseScene.add(gridHelper);*/

    return goldVaseScene;
}