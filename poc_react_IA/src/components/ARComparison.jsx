import React, { useContext, useState, useEffect, useRef } from 'react';
import { QuizContext } from '../context/quiz';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './ARComparison.css'
import backArrow from '../img/back-arrow.png'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
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

    useFrame(() => controlsRef.current.update());

    return <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

const ARComparison = () => {
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
        loader.current.load('/pen.glb', setPen, undefined, console.error);
        loader.current.load('/coin.glb', setCoin, undefined, console.error);
        loader.current.load('/CreditCard.glb', setCard, undefined, console.error);
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

    return (
        <div className='modelComparison'>
            <Link to={`/product/info/${JSON.stringify(product)}`}>
                <img id='back-arrow' src={backArrow} ></img>
            </Link>

            <div className='modelContainer'>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Controls />
                    {gltf && <Model gltf={gltf} scale={[width*35, height*35, thickness*35]} position={[0, -2.6, 0]} />}
                    {object == 'coin' && <Model gltf={coin} scale={[0.001, 0.001, 0.001]} position={[2.5, -1.6, -0.4]} rotation={[2.45, 0, -0.8]} />}
                    {object == 'pen' && <Model gltf={pen} scale={[0.115, 0.115, 0.115]} position={[4.8, -2.5, 0]} rotation={[0, 0, 1.55]} />}
                    {object == 'card' && <Model gltf={card} scale={[0.26, 0.26, 0.26]} position={[-0.8, -1.8, 0.2]} rotation={[0, 4.7, 0]} />}
                </Canvas>
            </div>
            <p className='infoText'>Selecione o objeto para comparar em tamanho real</p>
            <div className='objectSelection'>
                <div onClick={() => handleObjectSelection('card')}>
                    {object != 'card' && <img id='object' src={cardInactive}></img>}
                    {object == 'card' && <img id='object' src={cardActive}></img>}
                </div>
                <div onClick={() => handleObjectSelection('coin')}>
                    {object != 'coin' && <img id='object' src={coinInactive}></img>}
                    {object == 'coin' && <img id='object' src={coinActive}></img>}
                </div>
                <div onClick={() => handleObjectSelection('pen')}>
                    {object != 'pen' && <img id='object' src={penInactive}></img>}
                    {object == 'pen' && <img id='object' src={penActive}></img>}
                </div>
            </div>

        </div>
    );
}

export default ARComparison;