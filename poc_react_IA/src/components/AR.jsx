import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'ar.js';

const ARComponent = () => {
  const arContainer = useRef(null);

  useEffect(() => {
    const container = arContainer.current;
    const scene = document.createElement('a-scene');
    container.appendChild(scene);

    // Adicione a câmera
    const camera = document.createElement('a-camera');
    camera.setAttribute('gps-camera', '');
    scene.appendChild(camera);

    // Adicione um modelo 3D
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', '/path/to/your/model.gltf');
    model.setAttribute('scale', '0.1 0.1 0.1'); // Defina a escala inicial aqui
    scene.appendChild(model);
  }, []);

  return <div ref={arContainer}></div>;
};

export default ARComponent;