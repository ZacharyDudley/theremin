const lux = () => {
  window.addEventListener('devicelight', function(event){
    let light = event.value
    let lightMod = light * 10
    console.log(light, '/', lightMod)

    return lightMod
  })
}

export default lux
