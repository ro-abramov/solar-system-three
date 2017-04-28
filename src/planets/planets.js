import {
  Vector3,
} from 'three';

import planetCreator from './../scene/planets/index';

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
  return {
    mercury: planetCreator({
      name: 'mercury',
      diametr: 20,
      radius: 3000,
      rotation: 0.8
    }),
    venus: planetCreator({
      name: 'venus',
      diametr: 50,
      radius: 4500,
      rotation: 0.2
    }),
    earth: planetCreator({
      name: 'earth',
      diametr: 60,
      radius: 5500,
      rotation: 0.1
    }),
    mars: planetCreator({
      name: 'mars',
      diametr: 40,
      radius: 6500,
      rotation: 0.06
    }),
    jupiter: planetCreator({
      name: 'jupiter',
      diametr: 400,
      radius: 10000,
      rotation: 0.02
    }),
    saturn: planetCreator({
      name: 'saturn',
      diametr: 350,
      radius: 12000,
      rotation: 0.008,
      withRing: true
    }),
    uranus: planetCreator({
      name: 'uranus',
      diametr: 300,
      radius: 15000,
      rotation: 0.005
    }),
    neptune: planetCreator({
      name: 'neptune',
      diametr: 280,
      radius: 18000,
      rotation: 0.001
    })
  };
};

export const lookAtPlanetAnimation = ({ planet, camera, controls }) => {
  if (planet === null) {
    controls.enabled = true;
    return;
  }

  let planetRadius = planet.geometry.boundingSphere.radius;
  let distance = planetRadius * 5;

  let delta = new Vector3(0, 0, distance);

  const rotationSpeed = Math.max(1000, planetRadius * 10); // TODO: check the value of 1000 on final product.
  const rotationState = new Date().getTime() / rotationSpeed;

  delta = delta.applyAxisAngle(new Vector3(0, 1, 0), rotationState);

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
