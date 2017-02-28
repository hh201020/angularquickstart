const fs = require('fs')
const path = require('path')

const logError = err => err && console.error(err)

let images = []

exports.save = (picturesPath, contents, done) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, '')
  const imgPath = path.join(picturesPath, `${new Date()}.png`)
  fs.writeFile(imgPath, base64Data, { encoding: 'base64' }, err => {
    if (err) return logError(err)

    done(null, imgPath)
  })
}

exports.getPicturesDir = app => {
  return path.join(app.getPath('pictures'), 'photobombth')
}

exports.mkdir = picturesPath => {
  fs.stat(picturesPath, (err, stats) => {
    if (err && err.code !== 'ENOENT')
      return logError(err)
    else if (err || !stats.isDirectory())
      fs.mkdir(picturesPath, logError)
  })
}

exports.cache = imgPath => {
  images = images.concat([imgPath])
  return images
}
