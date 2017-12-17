const Dat = require('dat-node')

const key = '1acff5f5229429c3d6474e06d9035fd91055bbde9d80c9973a18ae559b435d03'

const options = {
  key,
  temp: true,
  sparse: true
}

Dat('./my-dir', options, (err, dat) => {
  if (err) {
    console.error('Error', err)
    return
  }
	dat.joinNetwork(function (err) {
    if (err) throw err

    // After the first round of network checks, the callback is called
    // If no one is online, you can exit and let the user know.
    if (!dat.network.connected || !dat.network.connecting) {
      console.error('No users currently online for that key.')
      process.exit(1)
    }
  })
	dat.archive.metadata.update(readdir)
	function readdir () {
		dat.archive.readdir('/', (err, folders) => {
			if (err) {
				console.error('Error', err)
				return
			}
			console.log('Version', dat.archive.version)
			console.log(folders)
		})
	}
})
