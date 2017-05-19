import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {THREE} from 'three'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.elem = null;
  }

  componentDidMount(){
    let renderer = new THREE.WebGLRenderer({canvas: this.elem}),
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(45, this.elem.innerWidth/this.elem.innerHeight, 0.1, 5000),
        light = new THREE.AmbientLight(0xffffff),
        geometry = new THREE.PlaneGeometry(300, 300, 12, 12),
        material = new THREE.MeshBasicMaterial({color: 0x333333, wireframe: true}),
        mesh = new THREE.Mesh(geometry, material);

    renderer.setClearColor(0x000000);
    camera.position.set(0, 0, 1000);
    scene.add(light);
    scene.add(mesh);

    renderer.render(scene, camera)

  }

  render() {
    return (<canvas ref={ el => this.elem = el}></canvas>);
  }
}

App.propTypes = {
};
