const cols = document.querySelectorAll('.col')

// const generateRandomColors = () => {
// 	const hexCode = '0123456789ABCDEF'
// 	let color = ''
// 	for (let i = 0; i < 6; i++) {
// 		color += hexCode[Math.floor(Math.random() * hexCode.length)]
// 	}
// 	return '#' + color
// }

document.addEventListener('keydown', e => {
	e.preventDefault()
	if (e.code.toLowerCase() === 'space' || e.code.toLowerCase() === 'enter') {
		setRandomColors()
	}
})

document.addEventListener('click', e => {
	const type = e.target.dataset.type
	if (type === 'lock') {
		const node = e.target.tagName.toLowerCase()
			? e.target
			: e.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		copyToClickBoard(e.target.textContent)
	}
})

const setRandomColors = (isInitial) => {
  const colors = isInitial ? getColorsFromHash : []
	cols.forEach((col,index) => {
		const isLoked = col.querySelector('i').classList.contains('fa-lock')
		const text = col.querySelector('h2')
		const button = col.querySelector('button')
		

		if (isLoked) {
      colors.push(text.textContent)
			return
		}

    const colorText = isInitial 
    ? colors[index] 
      ? colors[index] 
     : chroma.random()
    : chroma.random()

    if (!isInitial) {
      colors.push(colorText)
    }

    // colors.push(colorText)
		text.textContent = colorText
		col.style.background = colorText
		setTextColor(text, colorText)
		setTextColor(button, colorText)
	})
  updateColorsHash(colors)
}

function copyToClickBoard(text) {
	return navigator.clipboard.writeText(text)
}

const setTextColor = (text, color) => {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map((col) => {
    return col.toString().substring(1)
  })
  .join('-')
}

  function getColorsFromHash() {
    if(document.location.hash.length > 1) {
      return document.location.hash
      .substring(1)
      .split('-')
      .map(colorText => '#' + colorText)
    }
    return []
  }

setRandomColors(true)
