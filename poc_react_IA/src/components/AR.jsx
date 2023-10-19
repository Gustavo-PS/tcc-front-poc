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

    useFrame(() => {
        controlsRef.current.enablePan = false; // Desativar Pan
        controlsRef.current.enableZoom = false; // Desativar Zoom
        controlsRef.current.update();
    });

    return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

const AR = ({ product }) => {
    const [quizState, dispatch] = useContext(QuizContext);
    const [gltf, setGltf] = useState(null);
    const loader = useRef(new GLTFLoader());
    const device = quizState.product._3dmodel
    //const glb = device._3dmodel

    useEffect(() => {
        //loader.current.load('/Phone_1x1x1.glb', setGltf, undefined, console.error);
        loader.current.load(device, setGltf, undefined, console.error);
        console.log(device)
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
                {gltf && <Model gltf={gltf} scale={[width * 35, height * 35, thickness * 35]} position={[0, -2.6, 0]} />}
            </Canvas>
            {/* <p>{glb}</p> */}
        </div>
    );
}

export default AR;

