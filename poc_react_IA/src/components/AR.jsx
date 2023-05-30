import React, { useState, useEffect, useRef } from 'react';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import QrScanner from 'react-qr-scanner';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

extend({ OrbitControls });

function Model({ gltf }) {
    return <primitive object={gltf.scene} />;
}

function Controls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef();

    useFrame(() => controlsRef.current.update());

    return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}


const AR = () => {
    const [result, setResult] = useState('');
    const [gltf, setGltf] = useState(null);
    const loader = useRef(new GLTFLoader());

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    useEffect(() => {
        loader.current.load('/Phone.glb', setGltf, undefined, console.error);
    }, []);

    const [setIsFrontCamera] = useState(false);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <div style={{ position: 'relative' }}>
                <Canvas style={{ width: '800px', height: '1000px' }}>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Controls />
                    {gltf && <Model gltf={gltf} />}
                </Canvas>
            </div>

        </div>
    );
}

export default AR