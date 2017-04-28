import {
    Mesh,
    MeshPhongMaterial,
    SphereGeometry,
    TextureLoader,
} from 'three';

const textureLoader = new TextureLoader();

const texture = textureLoader.load(`${process.env.PUBLIC_URL}/${name}/color.jpg`);

export default ({
    diametr
}) => (
    new Mesh(
        new SphereGeometry(diametr, 150, 150),
        new MeshPhongMaterial({
            bumpMap: textureLoader.load(`${process.env.PUBLIC_URL}/earth/bump.jpg`),
            map: textureLoader.load(`${process.env.PUBLIC_URL}/earth/color.jpg`),
            specular: 0x555555,
            specularMap: textureLoader.load(`${process.env.PUBLIC_URL}/earth/reflection.jpg`),
            roughness: 1,
            shininess: 30,
        })
    )
);