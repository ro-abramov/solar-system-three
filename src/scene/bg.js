import {
    Mesh,
    MeshStandardMaterial,
    TextureLoader,
    SphereGeometry,
    BackSide,
} from 'three';

const textureLoader = new TextureLoader();

const texture = textureLoader.load(`${process.env.PUBLIC_URL}/starfield.jpg`);

export default new Mesh(
    new SphereGeometry(100000, 200, 200),
    new MeshStandardMaterial({
        map: texture,
        alphaMap: texture,
        transparent: true,
        side: BackSide,
        opacity: 1,
    })
);