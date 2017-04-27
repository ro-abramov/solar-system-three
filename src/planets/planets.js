import {
  Mesh,
  SphereGeometry,
  MeshPhongMaterial as Material,
  MeshNormalMaterial,
  TextureLoader,
  PointsMaterial,
  Geometry,
  Vector3,
  Points,
  RingGeometry
} from 'three';

const createOrbit = radius => {
  var planetOrbitGeom = new Geometry();
  var planetOrbitMat = new PointsMaterial({
    size: 1,
    color: 0x6e6e6e,
    sizeAttenuation: false
  });

  for (let i = 0; i < 400; i++) {
    let vertex = new Vector3();
    vertex.x = Math.sin(Math.PI / 180 * i) * radius;
    vertex.z = Math.cos(Math.PI / 180 * i) * (radius - 200);
    planetOrbitGeom.vertices.push(vertex);
  }

  const orbit = new Points(planetOrbitGeom, planetOrbitMat);
  orbit.castShadow = true;
  return orbit;
};

const createRings = (diametr, textureLoader) => {
  let ringsGeom = new RingGeometry(diametr + 20, diametr + 250, 100);
  const texture = textureLoader.load(
    `${process.env.PUBLIC_URL}/saturn_ring.jpg`
  );
  let ringsMaterial = new Material({
    bumpMap: texture,
    map: texture
  });
  const ring = new Mesh(ringsGeom, ringsMaterial);
  ring.castShadow = true;
  ring.rotation.x = -Math.PI / 3;
  ring.rotation.y = Math.PI / 10;
  return ring;
};

const planetCreator = ({
  name,
  diametr,
  radius,
  rotation,
  textureLoader,
  withRing = false
}) => {
  let ring;
  const texture = textureLoader.load(`${process.env.PUBLIC_URL}/${name}.jpg`);

  const planet = new Mesh(
    new SphereGeometry(diametr, 150, 150),
    new Material({
      bumpMap: texture,
      map: texture
    })
  );
  planet.castShadow = true;
  planet.planetName = name;
  let t = Math.PI * Math.random() * 1000000 / 180;
  planet.position.x = Math.sin(t * rotation) * radius;
  planet.position.z = Math.cos(t * rotation) * (radius - 200);
  if (withRing) {
    ring = createRings(diametr, textureLoader);
  }
  const rotate = () => {
    planet.position.x = Math.sin(t * rotation) * radius;
    planet.position.z = Math.cos(t * rotation) * (radius - 200);
    planet.rotation.y += 0.01;
    if (withRing) {
      ring.position.x = planet.position.x;
      ring.position.z = planet.position.z;
      ring.rotation.z -= 0.008;
    }
    t += Math.PI / 180 * 2;
  };

  return {
    planet,
    ring,
    rotate,
    orbit: createOrbit(radius)
  };
};

export const addPlanetsToScene = (planets, scene) => {
  for (let key in planets) {
    scene.add(planets[key].planet);
    scene.add(planets[key].orbit);
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
      rotation: 0.8,
      textureLoader
    }),
    venus: planetCreator({
      name: 'venus',
      diametr: 50,
      radius: 4500,
      rotation: 0.2,
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
      rotation: 0.06,
      textureLoader
    }),
    jupiter: planetCreator({
      name: 'jupiter',
      diametr: 400,
      radius: 10000,
      rotation: 0.02,
      textureLoader
    }),
    saturn: planetCreator({
      name: 'saturn',
      diametr: 350,
      radius: 12000,
      rotation: 0.008,
      textureLoader,
      withRing: true
    }),
    uranus: planetCreator({
      name: 'uranus',
      diametr: 300,
      radius: 15000,
      rotation: 0.005,
      textureLoader
    }),
    neptune: planetCreator({
      name: 'neptune',
      diametr: 280,
      radius: 18000,
      rotation: 0.001,
      textureLoader
    })
  };
};

export const lookAtPlanet = ({ planet, camera, controls }) => {
  if (planet === null) {
    controls.enabled = true;
    return;
  }
  
  var distance = distanceToPlanet(planet.planetName);

  camera.position.set(planet.position.x, planet.position.y, planet.position.z + distance);
  camera.lookAt(planet.position);
};

export const lookAtPlanetAnimation = ({planet, camera, controls}) => {
  if (planet === null) {
    controls.enabled = true;
    return;
  }

  let planetRadius = planet.geometry.boundingSphere.radius;
  let distance = planetRadius * 3;

  let delta = new Vector3(0, 0, distance);

  const rotationSpeed = planetRadius * 10; // time of full rotation is ms
  const rotationState = (new Date).getTime() / rotationSpeed;

  delta = delta.applyAxisAngle(new Vector3(0, 1, 0), rotationState)

  const targetPosition = new Vector3(
    delta.x + planet.position.x,
    delta.y + planet.position.y,
    delta.z + planet.position.z
  );

  camera.position.x = targetPosition.x;
  camera.position.y = targetPosition.y;
  camera.position.z = targetPosition.z;

  camera.lookAt(planet.position);
};
