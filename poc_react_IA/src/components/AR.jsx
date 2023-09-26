import React, { useState, useEffect, useRef } from 'react';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './AR.css'

extend({ OrbitControls });

function Model({ gltf, scale, position, rotation }) {
    return <primitive object={gltf.scene} scale={scale} position={position} rotation={rotation} />;
}

function Controls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef();
    useFrame(() => controlsRef.current.update());
    return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

const AR = ({ product }) => {
    const [gltf, setGltf] = useState(null);
    const loader = useRef(new GLTFLoader());

    useEffect(() => {
        loader.current.load('/Phone_1x1x1.glb', setGltf, undefined, console.error);
    }, []);

    const height = product.dimensions.height
    const width = product.dimensions.width
    const thickness = product.dimensions.thickness

    return (
            <div className='model'>
                <Canvas >
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Controls />
                    {gltf && <Model gltf={gltf} scale={[width*35, height*35, thickness*35]} position={[0, -2.6, 0]} />}
                </Canvas>
            </div>
    );
}

export default AR;