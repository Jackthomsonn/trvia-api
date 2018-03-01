const pkg = require('./package.json')
const fs = require('fs')
const exec = require('child_process').exec
const async = require('async')

function AutomateRelease(options) {
}

function handleMajor() {
  let major = pkg.version.split('.')[0]
  let version = pkg.version

  return version.substr(0, 0) + (Number(major) + 1) + '.' + '0.0';
}

function handleMinor() {
  let minor = pkg.version.split('.')[1]
  let version = pkg.version

  return version.substr(0, 2) + (Number(minor) + 1) + '.' + version.substr(3 + 1)
}

function handlePatch() {
  let patch = pkg.version.split('.')[2]
  let version = pkg.version

  return version.substr(0, 4) + (Number(patch) + 1) + version.substr(5 + 1)
}

function determineVersion(type) {
  switch (type) {
    case 'major':
      return handleMajor()
      break;
    case 'minor':
      return handleMinor()
      break;
    case 'patch':
      return handlePatch()
      break;
  }
}

function prepareRelease(version) {
  exec('sh prepare-release.sh ' + version, function (err, stdout, stderr) {
    if (err != null) {
      return
    } else if (typeof (stderr) != "string") {
      console.log(stderr)
    } else {
      console.log(stdout)
    }
  });
}

AutomateRelease.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (params) {
    const args = process.argv.pop()
    const semverType = args
    let version;

    version = determineVersion(semverType)

    pkg.version = version

    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), err => {
      if (err) {
        console.log(err)
      }
    })

    prepareRelease(version)
  })
}

module.exports = AutomateRelease