import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 * Canvas
 */
const canvas = document.createElement("canvas")
const computerMain = document.querySelector(".computer__main")

const sizes = {
  width: computerMain.clientWidth,
  height: computerMain.clientHeight,
}

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Objects
 */
const objects = []

for (let i = 0; i < 20; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: "#0000ff" })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = (Math.random() - 0.5) * 10
  mesh.position.y = (Math.random() - 0.5) * 10
  mesh.position.z = (Math.random() - 0.5) * 10

  mesh.rotation.x = Math.random() * Math.PI
  mesh.rotation.y = Math.random() * Math.PI
  mesh.rotation.z = Math.random() * Math.PI

  objects.push(mesh)
  scene.add(mesh)
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#ffffff", 0.9)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight("#ffffff", 2.1)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)

/**
 * Camera
 */
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 100)
camera.position.z = 15
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Drag Controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
controls.autoRotateSpeed = 0.5
controls.maxDistance = 35

/**
 * Animate
 */
let isAnimating = false

const tick = () => {
  if (isAnimating) {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }
}

const startAnimation = () => {
  if (!isAnimating) {
    isAnimating = true
    tick()
  }
}

const stopAnimation = () => {
  isAnimating = false
}

/**
 * Event Listeners
 */
canvas.addEventListener("resize", () => {
  // Update sizes
  sizes.width = canvas.parentElement.clientWidth
  sizes.height = canvas.parentElement.clientHeight

  const aspectRatio = sizes.width / sizes.height

  // Update camera
  camera.aspect = aspectRatio
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const startButton = document.querySelector(".computer__start-button")

startButton.addEventListener("click", () => {
  if (computerMain.contains(canvas)) {
    computerMain.removeChild(canvas)
    stopAnimation()
  } else {
    computerMain.appendChild(canvas)
    startAnimation()
  }
})
