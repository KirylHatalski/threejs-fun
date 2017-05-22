import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {THREE} from 'three.js';
import {getRandomColor} from '../utils'


const STEP = Math.PI / 50

class App extends React.Component {
  constructor(props) {
    super(props);

    this.elem = null;
    this.interval = null;
    this.coords = {x: 0, y: 0, z: 0};
    this.nextCoords = {x: 0, y: 0, z: 0};
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    this.light = new THREE.AmbientLight(0xffffff);
    this.geometry = new THREE.SphereGeometry(30, 30, 50, 50);
    this.material = new THREE.MeshPhongMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  componentDidMount() {
    // let renderer = new THREE.WebGLRenderer({canvas: this.elem}),
    // scene = new THREE.Scene(),
    // camera = new THREE.PerspectiveCamera(45, this.elem.clientWidth/this.elem.clientHeight, 0.1, 5000),
    // light = new THREE.AmbientLight(0xffffff),
    // geometry = new THREE.SphereGeometry(30, 30, 12, 12),
    // material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}),
    // mesh = new THREE.Mesh(geometry, material);

    this.camera.position.set(0, 0, 100);
    this.scene.add(this.light);
    this.scene.add(this.mesh);

    //this.material.color(getRandomColor())
    this.geometry.faces.forEach(value => {
      value.color.setRGB(Math.random(), Math.random(), Math.random())
    })

    // this.mesh.position = this.coords;

    // console.log(this.elem.clientWidth);

    this.renderer.setSize(this.elem.clientWidth, this.elem.clientHeight)
    this.elem.appendChild(this.renderer.domElement)

    let handleMouseMove = e => {
      if (!(e.x - this.elem.clientWidth/2) || !(e.y - this.elem.clientHeight/2)) return
      if (e.x - this.elem.clientWidth/2 === 0 || e.y - this.elem.clientWidth/2 === 0) return;
      this.mesh.rotation.x += Math.PI/(e.x - this.elem.clientWidth/2)
      this.mesh.rotation.y += Math.PI/(e.y - this.elem.clientHeight/2)
    }

    window.addEventListener('keypress', e => {
      switch (e.code) {
        case 'KeyA':
          this.mesh.rotation.y -= STEP
          return;
        case 'KeyW':
          this.mesh.rotation.x -= STEP
          return;
        case 'KeyS':
          this.mesh.rotation.x += STEP
          return;
        case 'KeyD':
          this.mesh.rotation.y += STEP
          return;
        default:
          return;
      }
    })
    window.addEventListener('mousedown', e => {
      window.addEventListener('mousemove', handleMouseMove)
      // this.interval = setInterval(() => {
        // this.nextCoords.x -= e.x
        // this.nextCoords.y -= e.y
        // console.log(this.mesh.rotation);
      // }, 1000/60)
      // this.nextCoords.x -= e.x
      // this.nextCoords.y -= e.y
    })
    window.addEventListener('mouseup', e => {
      // this.nextCoords.x -= e.x
      // this.nextCoords.y -= e.y
      //
      // this.mesh.rotation.x = this.nextCoords.x
      // this.mesh.rotation.y = this.nextCoords.y
      //
      // console.log(this.mesh.position);
      this.nextCoords = {x: 0, y: 0, z: 0};
      // clearInterval(this.interval)
      window.removeEventListener('mousemove', handleMouseMove)
    })

  }

  componentWillReceiveProps(nextProps) {}

  setPosition(x, y, z){
    this.mesh.position = {x, y, z}
  }

  renderRec() {
    requestAnimationFrame(this.renderRec.bind(this))

    this.renderer.render(this.scene, this.camera)
  }

  render() {
    this.renderRec();
    return (
      <div className='three' ref={el => this.elem = el}></div>
    );
  }
}

App.propTypes = {};

export default connect()(App)
