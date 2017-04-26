import {
  Mesh,
  SphereGeometry,
  MeshPhongMaterial as Material,
  TextureLoader,
  PointsMaterial,
  Geometry,
  Vector3,
  Points
} from 'three';

const planetCreator = ({
  name,
  diametr,
  radius,
  rotation,
  textureLoader,
  withRing = false
}) => {
  let ring;
  const texture = textureLoader.load(`/${name}.jpg`);
  const planet = new Mesh(
    new SphereGeometry(diametr, 80, 80),
    new Material({
      map: texture
    })
  );
  planet.castShadow = true;
  planet.planetName = name;
  let t = 0;
  if (withRing) {
    let ringsGeom = new Geometry();
    let ringsMaterial = new PointsMaterial({
      size: 0.8,
      color: 0x6e6e6e,
      sizeAttenuation: false
    });
    for (let i = 0; i < 90000; i++) {
      let vertex = new Vector3();
      vertex.x =
        Math.sin(Math.PI / 180 * i) * (diametr * 1.2 - i) / diametr * 1.8;
      vertex.y = Math.random() * 10;
      vertex.z =
        Math.cos(Math.PI / 180 * i) * (diametr * 1.2 - i) / diametr * 1.8;
      ringsGeom.vertices.push(vertex);
    }
    ring = new Points(ringsGeom, ringsMaterial);
    ring.castShadow = true;
    ring.rotation.z = -Math.PI / 8;
  }
  const rotate = () => {
    planet.position.x = Math.sin(t * rotation) * radius;
    planet.position.z = Math.cos(t * rotation) * (radius - 200);
    planet.rotation.y += rotation / 10;
    if (withRing) {
      ring.position.x = planet.position.x;
      ring.position.z = planet.position.z;
      ring.rotation.y -= 0.008;
    }
    t += Math.PI / 180 * 2;
  };

  return {
    planet,
    ring,
    rotate
  };
};
export const addPlanetsToScene = (planets, scene) => {
  for (let key in planets) {
    scene.add(planets[key].planet);
    if (typeof planets[key].ring !== 'undefined') {
      scene.add(planets[key].ring);
    }
  }
  return scene;
};

export const rotatePlanets = planets => {
  for (let key in planets) {
    planets[key].rotate();
  }
  return planets;
};

export const createPlanets = () => {
  const textureLoader = new TextureLoader();
  return {
    mercury: planetCreator({
      name: 'mercury',
      diametr: 20,
      radius: 3000,
      rotation: 0.1,
      textureLoader
    }),
    venus: planetCreator({
      name: 'venus',
      diametr: 50,
      radius: 4500,
      rotation: 0.1,
      textureLoader
    }),
    earth: planetCreator({
      name: 'earth',
      diametr: 60,
      radius: 5500,
      rotation: 0.1,
      textureLoader
    }),
    mars: planetCreator({
      name: 'mars',
      diametr: 40,
      radius: 6500,
      rotation: 0.1,
      textureLoader
    }),
    jupiter: planetCreator({
      name: 'jupiter',
      diametr: 400,
      radius: 10000,
      rotation: 0.1,
      textureLoader
    }),
    saturn: planetCreator({
      name: 'saturn',
      diametr: 350,
      radius: 12000,
      rotation: 0.1,
      textureLoader,
      withRing: true
    }),
    uranus: planetCreator({
      name: 'uranus',
      diametr: 300,
      radius: 15000,
      rotation: 0.1,
      textureLoader
    }),
    neptune: planetCreator({
      name: 'neptune',
      diametr: 280,
      radius: 18000,
      rotation: 0.1,
      textureLoader
    })
  };
};

export const lookAtPlanet = ({ planet, camera, controls }) => {
  var distance;

  if (planet === null) {
    controls.enabled = true;
    return;
  }

  switch (planet.planetName) {
    case 'mercury':
      distance = 300;
      break;
    case 'venus':
      distance = 400;
      break;
    case 'earth':
      distance = 500;
      break;
    case 'mars':
      distance = 450;
      break;
    case 'jupiter':
      distance = 900;
      break;
    case 'saturn':
      distance = 900;
      break;
    case 'uranus':
      distance = 600;
      break;
    case 'neptune':
      distance = 600;
      break;
    default:
      distance = 900;
  }

  camera.position.z = planet.position.z + distance;
  camera.position.x = planet.position.x;
  camera.position.y = planet.position.y;
  camera.rotation.x = 0;
  camera.rotation.y = 0;
  camera.rotation.z = 0;
};
