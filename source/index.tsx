/**
 * 3D Graphics Template
 *
 * @author Ralph Wiedemeier <ralph@framefactory.io>
 * @copyright (c) 2018 Frame Factory GmbH
 */

import "./index.scss"

import * as React from "react";
import * as ReactDOM from "react-dom";

import Canvas3d from "./components/Canvas3d";
<<<<<<< HEAD
import SpinningCube from "./scenes/SpinningCube";
import Test from "./scenes/Test";

ReactDOM.render(
    <Canvas3d scene={Test} />,
=======

//import SpinningCube from "./scenes/SpinningCube";
//const scene = new SpinningCube();

import OrbitDemo from "./scenes/OrbitDemo";
const scene = new OrbitDemo();

ReactDOM.render(
    <Canvas3d scene={scene} />,
>>>>>>> 3a59283d3bf213cbbeaed46c7319199475429dc4
    document.getElementById("main")
);
