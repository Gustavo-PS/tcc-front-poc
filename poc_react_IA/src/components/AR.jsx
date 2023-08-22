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
        loader.current.load('/Phone.glb', setGltf, undefined, console.error);
        loader.current.load('/Pen.glb', setPen, undefined, console.error);
        loader.current.load('/CreditCard.glb', setCoin, undefined, console.error);
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
                    {gltf && <Model gltf={gltf} scale={[1, 1, 1]} position={[0, 0, 0]} />}
                    {coin && <Model gltf={coin} scale={[0.4, 0.4, 0.4]} position={[1.2, 0.8, 0]} rotation={[3.1, Math.PI, 1.6]}/>}
                </Canvas>
            </div>
        </section>
    );
}

export default AR;