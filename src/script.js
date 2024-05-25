const imageSize = {
  width: 1920,
  height: 1080,
}
const screenSize = {
  width: 876,
  height: 778,
}
const screenPosition = {
  top: 78,
  left: 522,
}

const imageAspect = imageSize.width / imageSize.height // 1920 / 1080
const screenAspect = screenSize.width / screenSize.height // 700 / 618

const screenRatio = {
  width: screenSize.width / imageSize.width, // 700 / 1920
  height: screenSize.height / imageSize.height, // 618 / 1080
}
const screenPositionRatio = {
  top: screenPosition.top / imageSize.height, // 174 / 1080
  left: screenPosition.left / imageSize.width, // 610 / 1920
}

const handleResize = () => {
  const windowAspect = window.innerWidth / window.innerHeight
  const screen = document.querySelector(".computer__screen")

  if (windowAspect < imageAspect) {
    // height is full and width is cropped
    // so, screen size is based on height

    const imageHeight = window.innerHeight
    const imageWidth = imageHeight * imageAspect
    // size of the computer image (not cropped)

    const croppedWidth = imageWidth - window.innerWidth

    const screenHeight = imageHeight * screenRatio.height
    const screenWidth = screenHeight * screenAspect

    const screenTop = imageHeight * screenPositionRatio.top // not cropped
    const screenLeft = imageWidth * screenPositionRatio.left - croppedWidth / 2 // cropped

    screen.style.height = `${screenHeight}px`
    screen.style.width = `${screenWidth}px`

    screen.style.top = `${screenTop}px`
    screen.style.left = `${screenLeft}px`
  } else {
    // width is full and height is cropped
    // so, screen size is based on width

    const imageWidth = window.innerWidth
    const imageHeight = imageWidth / imageAspect
    // size of the computer image (not cropped)

    const croppedHeight = imageHeight - window.innerHeight

    const screenWidth = imageWidth * screenRatio.width
    const screenHeight = screenWidth / screenAspect

    const screenLeft = imageWidth * screenPositionRatio.left // not cropped
    const screenTop = imageHeight * screenPositionRatio.top - croppedHeight / 2 // cropped

    screen.style.width = `${screenWidth}px`
    screen.style.height = `${screenHeight}px`

    screen.style.top = `${screenTop}px`
    screen.style.left = `${screenLeft}px`
  }
}

window.addEventListener("resize", handleResize)
handleResize()
