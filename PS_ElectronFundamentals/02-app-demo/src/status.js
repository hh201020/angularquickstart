const exec = require('child_process').exec
const fs = require('fs')
const os = require('os')

function removeStatus() {
  const el = document.getElementById('status')
  el.classList.remove('unknown', 'clean', 'dirty')
  return el
}

function setStatus(status) {
  const el = removeStatus()
  el.classList.add(status)
}

function formatDir(dir) {
  return /^~/.test(dir)                                 // if beginning with ~
    ? os.homedir() + dir.substr(1).trim()               // adding home directory after removing the leading ~
    : dir.trim()                                        // otherwise just use it
}

function isDir(dir) {
  try {
    return fs.lstatSync(formatDir(dir)).isDirectory()   // look status
  } catch (e) {
    console.log('dir check error', e)
    return false
  }
}

function checkGitStatus(dir) {
  exec('git status', {
    cwd: formatDir(dir)                                 // cwd: current working direcotry
  }, (err, stdout, stderr) => {
    if (err) return setStatus('unknown')

    if (/nothing to commit/.test(stdout)) return setStatus('clean')

    return setStatus('dirty')
  })
}

let timer
document.getElementById('input').addEventListener('keyup', (evt, a) => {
  removeStatus()
  clearTimeout(timer)
  timer = setTimeout(_ => {
    const dir = evt.target.value
    if (isDir(dir))
      checkGitStatus(dir)
  }, 500)
})
