import React, { useState, useEffect, useRef } from 'react';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './AR.css'
import Webcam from "react-webcam";

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

const AR = () => {
    const [gltf, setGltf] = useState(null);
    const [pen, setPen] = useState(null);
    const [coin, setCoin] = useState(null);
    const loader = useRef(new GLTFLoader());

    useEffect(() => {
        loader.current.load('/Phone_1x1x1.glb', setGltf, undefined, console.error);
        loader.current.load('/Pen.glb', setPen, undefined, console.error);
        loader.current.load('/Phone_1x1x1.glb', setCoin, undefined, console.error);
    }, []);

    const [isFrontCamera] = useState(false);

    const videoConstraints = {
        facingMode: { exact: isFrontCamera ? "user" : "environment" }
    };

    return (
        <section>
            <div className='bg'>
                <Webcam
                    height={650}
                    width={500}
                    videoConstraints={videoConstraints}>
                </Webcam>
            </div>
            <div className='model'>
                <Canvas >
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Controls />
                    {gltf && <Model gltf={gltf} scale={[0.0715, 0.1467, 0.00765]} position={[0, 0, 0]} />}
                    {coin && <Model gltf={coin} scale={[0.0781, 0.1608, 0.00765]} position={[0.1, 0, 0]} rotation={[0, 0, 0]}/>}
                </Canvas>
            </div>
        </section>
    );
}

export default AR;