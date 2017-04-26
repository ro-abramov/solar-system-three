import * as THREE from 'three';

export default () => {
    var camera, scene, renderer;
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    // Camera

    camera = new THREE.PerspectiveCamera(60, width/height, 1, 10000);
    camera.position.z = 1000;

    // Elements

      //Cube
    var cubeGeom = new THREE.CubeGeometry(300, 300, 300, 10, 10, 10);
    var texture = new THREE.TextureLoader().load("cube.jpg")
    var cubeMat = new THREE.MeshBasicMaterial({
      map : texture
    });

    var cube = new THREE.Mesh(cubeGeom, cubeMat);

    //Scene
    scene = new THREE.Scene();
    scene.add(cube);

    // Rendere
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    document.body.appendChild(renderer.domElement);

    function animation () {
        requestAnimationFrame(animation);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;
        renderer.render(scene, camera);
    }

    animation();

}