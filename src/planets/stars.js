import { Geometry, PointsMaterial, Vector3, Points } from 'three';

export default scaling => {
  const starsGeometry = new Geometry();
  const starsMaterial = new PointsMaterial({
    size: 1,
    sizeAttenuation: false
  });

  for (let i = 0; i < 25000; i++) {
    let vertex = new Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.multiplyScalar(scaling);
    starsGeometry.vertices.push(vertex);
  }
  const stars = new Points(starsGeometry, starsMaterial);
  stars.scale.set(10, 10, 10);
  return stars;
};
