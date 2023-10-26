import React, { useContext, useState, useEffect, useRef } from 'react';
import { QuizContext } from '../context/quiz';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './ARCam.css'
import GlbLoading from './GlbLoading';
import backArrow from '../img/back-arrow.png'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam'
import expand from '../img/expand.png'
import cardInactive from '../img/comparison/card.png'
import cardActive from '../img/comparison/cardActive.png'
import coinInactive from '../img/comparison/coin.png'
import coinActive from '../img/comparison/coinActive.png'
import penInactive from '../img/comparison/pen.png'
import penActive from '../img/comparison/penActive.png'

extend({ OrbitControls });

function Model({ gltf, scale, position, rotation }) {
    return <primitive object={gltf.scene} scale={scale} position={position} rotation={rotation} />;
}

function Controls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef();

    useFrame(() => {
        //controlsRef.current.enablePan = false; // Desativar Pan
        //controlsRef.current.enableZoom = false; // Desativar Zoom
        controlsRef.current.update();
    });

    return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

const ARCam = () => {
    const [gltf, setGltf] = useState(null);
    const [pen, setPen] = useState(null);
    const [coin, setCoin] = useState(null);
    const [card, setCard] = useState(null);
    const loader = useRef(new GLTFLoader());
    const [object, setObject] = useState(null);
    const [quizState, dispatch] = useContext(QuizContext);
    const device = quizState.product._3dmodel

    const { id } = useParams()

    const product = JSON.parse(id)

    useEffect(() => {
        //loader.current.load('/Phone_1x1x1.glb', setGltf, undefined, console.error);
        loader.current.load(device, setGltf, undefined, console.error);
        loader.current.load('/circle1x1x1.glb', setCoin, undefined, console.error);
    }, []);

    function handleObjectSelection(selectedObject) {
        if (selectedObject === object) {
            setObject(null)
        } else {
            setObject(selectedObject)
        }
    }

    const height = product.dimensions.height
    const width = product.dimensions.width
    const thickness = product.dimensions.thickness

    //cam
    const videoConstraints = {
        facingMode: 'environment',
    }

    const webcamRef = React.useRef(null)

    const cameraContainerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    };

    if (coin == null || gltf == null) {
        return (
            <GlbLoading></GlbLoading>
        )
    } else {
        return (
            <div className='modelComparison'>
                <div className='webcamCompare'>
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        style={{ height: '100%'}}
                    />
                </div>

                <Link to={`/product/info/${JSON.stringify(product)}`}>
                    <img id='back-button' src={backArrow} ></img>
                </Link>

                <h2 className='phone-title'>{product.name}</h2>

                <div className='glbCompare'>
                    <Canvas>
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <Controls />
                        {gltf && <Model gltf={gltf} scale={[width * 30, height * 30, thickness * 30]} position={[-0.5, -1.5, 0]} />}
                        {coin && <Model gltf={coin} scale={[0.027*30, 0.027*30, 0.002*30]} position={[1.2, -1, 0]} rotation={[-0, 0, 0]} />}
                    </Canvas>
                </div>

            </div>
        );

    }


}

export default ARCam;