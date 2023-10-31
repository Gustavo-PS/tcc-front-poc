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
import Real from '../img/coins/1RealActive.png'
import RealActive from '../img/coins/1Real.png'
import Cinquenta from '../img/coins/50CentavosActive.png'
import CinquentaActive from '../img/coins/50Centavos.png'
import VinteCinco from '../img/coins/25CentavosActive.png'
import VinteCincoActive from '../img/coins/25Centavos.png'
import Dez from '../img/coins/10CentavosActive.png'
import DezActive from '../img/coins/10Centavos.png'


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
    const [largura, setLargura] = useState(0.02);
    const loader = useRef(new GLTFLoader());
    const [object, setObject] = useState('dez');
    const [quizState, dispatch] = useContext(QuizContext);
    const device = quizState.product._3dmodel

    const { id } = useParams()

    const product = JSON.parse(id)

    useEffect(() => {
        //loader.current.load('/Phone_1x1x1.glb', setGltf, undefined, console.error);
        loader.current.load(device, setGltf, undefined, console.error);
        loader.current.load('/greenCircle1x1x1.glb', setCoin, undefined, console.error);
    }, []);

    function handleObjectSelection(selectedObject, raio) {
        if (selectedObject === object) {
            setObject(null)
        } else {
            setObject(selectedObject)
            setLargura(raio)
            console.log(largura)
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
                        style={{ height: '100%' }}
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
                        {gltf && <Model gltf={gltf} scale={[width * 40, height * 40, thickness * 40]} position={[-0.5, -3, 0]} />}
                        {coin && <Model gltf={coin} scale={[largura * 40, 0.002 * 40, largura * 40]} position={[2, -2.5, 0]} rotation={[1.6, 0, 0]} />}
                    </Canvas>
                </div>

                <p className='infoTextCoin'>Selecione a moeda desejada para comparar em tamanho real</p>
                <div className='coinSelection'>
                    <div id='coin' onClick={() => handleObjectSelection('um', 0.027)}>
                        {object != 'um' && <img id='object' src={RealActive}></img>}
                        {object == 'um' && <img id='object' src={Real}></img>}
                    </div>
                    <div id='coin' onClick={() => handleObjectSelection('cinquenta', 0.023)}>
                        {object != 'cinquenta' && <img id='object' src={CinquentaActive}></img>}
                        {object == 'cinquenta' && <img id='object' src={Cinquenta}></img>}
                    </div>
                    <div id='coin' onClick={() => handleObjectSelection('vinteCinco', 0.025)}>
                        {object != 'vinteCinco' && <img id='object' src={VinteCincoActive}></img>}
                        {object == 'vinteCinco' && <img id='object' src={VinteCinco}></img>}
                    </div>
                    <div id='coin' onClick={() => handleObjectSelection('dez', 0.020)}>
                        {object != 'dez' && <img id='object' src={DezActive}></img>}
                        {object == 'dez' && <img id='object' src={Dez}></img>}
                    </div>
                </div>
                
            </div>
        );

    }


}

export default ARCam;