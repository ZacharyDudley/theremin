const prompt = document.getElementById('prompt')
const amp = document.getElementById('amp')
const freq = document.getElementById('freq')

const assign = () => {
  prompt.innerHTML = 'Press \'q\' to modulate frequency\n' + 'Press \'p\' to modulate amplitude\n'
}

export default assign
