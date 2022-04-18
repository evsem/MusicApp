// player
const wrapper = document.querySelector('.wrapper')

// buttons
const openListButton = wrapper.querySelector('.iconList__iconOpenList')
const closeListButton = wrapper.querySelector('.iconCloseList__icon')
const playAndPauseButton = wrapper.querySelector('.play__icon')
const prevButton = wrapper.querySelector('.prevArrow__icon')
const nextButton = wrapper.querySelector('.nextArrow__icon')

// info about song
const imgSong = document.querySelector('.imgBox__img')
const titleSong = document.querySelector('.textBox__titleSong')
const singerSong = document.querySelector('.textBox__singerSong')
const audioSong = document.querySelector('.srcAudioSong')

// range
const rangeBox = wrapper.querySelector('.rangeBox')
const rangeLine = wrapper.querySelector('.rangeBox__range')

const musicList = wrapper.querySelector('.musicList')
// item in music list
const item__titleSong = wrapper.querySelector('.item__titleSong')
const item__singerSong = wrapper.querySelector('.item__singerSong')
const item_durationSong = wrapper.querySelector('.item_durationSong')

// start indexSong
let indexSong = 1

window.addEventListener('load', () => {
  loadSong(indexSong)
})

function loadSong(idxSong) {
  titleSong.innerHTML = arraySongs[idxSong - 1].title
  singerSong.innerHTML = arraySongs[idxSong - 1].singer
  imgSong.src = `./src/img/${arraySongs[idxSong - 1].img}.jpg`
  audioSong.src = `./src/audio/${arraySongs[idxSong - 1].srcAudio}.mp3`
}

let playSong = () => {
  wrapper.classList.add('paused')
  playAndPauseButton.src = './src/icons/pause_navbar.svg'
  audioSong.play()
}

let pauseSong = () => {
  wrapper.classList.remove('paused')
  playAndPauseButton.src = './src/icons/play_navbar.svg'
  audioSong.pause()
}

let prevSong = () => {
  if (indexSong == 1) {
    indexSong = arraySongs.length
    loadSong(indexSong)
    playSong()
  } else {
    indexSong--
    loadSong(indexSong)
    playSong()
  }
}

let nextSong = () => {
  if (indexSong == 5) {
    indexSong = 1
    loadSong(indexSong)
    playSong()
  } else {
    indexSong++
    loadSong(indexSong)
    playSong()
  }
}

let openList = () => {}

let closeList = () => {
  musicList.classList.remove('open')
  openListButton.src = `./src/icons/openList.svg`
}

playAndPauseButton.addEventListener('click', () => {
  isMusicPaused = wrapper.classList.contains('paused')
  isMusicPaused ? pauseSong() : playSong()
})

nextButton.addEventListener('click', () => {
  nextSong()
})

prevButton.addEventListener('click', () => {
  prevSong()
})

audioSong.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime
  const duration = e.target.duration
  const progressWidth = (currentTime / duration) * 100
  rangeLine.style.width = `${progressWidth}%`
})

rangeBox.addEventListener('click', (event) => {
  const rangeWidth = rangeBox.clientWidth
  const clickedRangeBox = event.offsetX
  const songDuration = audioSong.duration

  audioSong.currentTime = (clickedRangeBox / rangeWidth) * songDuration
})

const ulTag = wrapper.querySelector('ul')

for (let i = 0; i < arraySongs.length; i++) {
  let liTagItem = `
            <li class="musicList__item" li-idx='${i + 1}'>
              <div class="item__infoSong">
                <h3 class="item__titleSong">${arraySongs[i].title}</h3>
                <p class="item__singerSong">${arraySongs[i].singer}</p>
                <audio class='${arraySongs[i].srcAudio}' src='./src/audio/${
    arraySongs[i].srcAudio
  }.mp3'></audio>
              </div>
              <span id='${
                arraySongs[i].srcAudio
              }' class="item_durationSong">3:42</span>
            </li>`
  ulTag.insertAdjacentHTML('beforeend', liTagItem)

  let liAudioTag = ulTag.querySelector(`.${arraySongs[i].srcAudio}`)
  let liAudioDuration = ulTag.querySelector(`#${arraySongs[i].srcAudio}`)

  liAudioTag.addEventListener('loadeddata', () => {
    let audioDuration = liAudioTag.duration
    let totalMinute = Math.floor(audioDuration / 60)
    let totalSecond = Math.floor(audioDuration % 60)
    if (totalSecond < 10) {
      totalSecond = `0${totalSecond}`
    }
    liAudioDuration.innerHTML = `${totalMinute}:${totalSecond}`
  })
}

const allLiTags = ulTag.querySelectorAll('li')
for (let f = 0; f < allLiTags.length; f++) {
  if (allLiTags[f].getAttribute('li-idx') == indexSong) {
    allLiTags[f].classList.add('playing')
  }
  allLiTags[f].setAttribute('onclick', 'clicked(this)')
}

function clicked(element) {
  let getIndex = element.getAttribute('li-idx')
  indexSong = getIndex
  loadSong(indexSong)
  playSong()
}

openListButton.addEventListener('click', () => {
  musicList.classList.add('open')
})

closeListButton.addEventListener('click', () => {
  musicList.classList.remove('open')
})
