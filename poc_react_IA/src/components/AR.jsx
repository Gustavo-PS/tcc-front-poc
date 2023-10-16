import React, { useContext, useState, useEffect, useRef } from 'react';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { QuizContext } from '../context/quiz';
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

function GyroscopeRotation({ object3D }) {
    const deviceOrientation = useRef({ alpha: 0, beta: 0, gamma: 0 });

    const handleDeviceOrientation = (event) => {
        deviceOrientation.current = event;
    };

    useFrame(() => {
        const { alpha, beta, gamma } = deviceOrientation.current;
        if (object3D) {
            object3D.rotation.x = beta * (Math.PI / 180);
            object3D.rotation.y = gamma * (Math.PI / 180);
            object3D.rotation.z = alpha * (Math.PI / 180);
        }
    });

    useEffect(() => {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, []);

    return null;
}

const AR = ({ product }) => {
    const [quizState, dispatch] = useContext(QuizContext);
    const [gltf, setGltf] = useState(null);
    const loader = useRef(new GLTFLoader());
    const device = quizState.product._3dmodel;

    useEffect(() => {
        loader.current.load(device, setGltf, undefined, console.error);
    }, [device]);

    const height = product.dimensions.height;
    const width = product.dimensions.width;
    const thickness = product.dimensions.thickness;

    return (
        <div className='model'>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Controls />
                {gltf && <GyroscopeRotation object3D={gltf.scene} />}
                {gltf && <Model gltf={gltf} scale={[width * 35, height * 35, thickness * 35]} position={[0, -2.6, 0]} rotation={[0, 0, 0]} />}
            </Canvas>
        </div>
    );
}

export default AR;