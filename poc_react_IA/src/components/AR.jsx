import React, { useState, useEffect, useRef } from 'react';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import './AR.css'

import Webcam from "react-webcam";


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
    const [gltf, setGltf] = useState(null);
    const loader = useRef(new GLTFLoader());

    useEffect(() => {
        loader.current.load('/Phone.glb', setGltf, undefined, console.error);
    }, []);

    const [setIsFrontCamera] = useState(false);

    const videoConstraints = {
        facingMode: { exact: "environment" }
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
                    {gltf && <Model gltf={gltf} />}
                </Canvas>
            </div>
        </section>

    );

    
}

export default AR