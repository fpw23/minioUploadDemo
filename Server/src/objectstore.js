var Minio = require('minio')

const minioBucket = 'test'
const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9002,
    secure: false,
    accessKey: 'PAS86XA3D23TYTO4TSVL',
    secretKey: 'rGiALsHl237poM95Ix+XEHY+QeiN6L1B1C3BnZY83'
})

const ObjectStore = {
    saveFile: (name, data, size) => {
        let ret = new Promise(async (resolve, reject) => {
            await minioClient.putObject(minioBucket, name, data, size, function(err, etag) {
                if (err) {
                    reject(err)
                } else {
                    resolve(etag)
                }
            })
        })
        return ret
    },
    getFile: (name) => {
        let ret = new Promise(async (resolve, reject) => {
          try {
            let data = await minioClient.getObject(minioBucket, name)
            resolve(data)
          } catch (err) {
            reject(err)
          }
        })
        return ret
    },
    getFileList: () => {
        let ret = new Promise(async (resolve, reject) => {
            let docs = []
            let objectsStream = await minioClient.listObjects(minioBucket, '', true)
            
            objectsStream.on('data', function (obj) {
                docs.push(obj)
            })

            objectsStream.on('error', function (e) {
                console.log(e)
                reject(e)
            })

            objectsStream.on('end', function (e) {
                resolve(docs)
            })
        })

        return ret
    }
}

module.exports = ObjectStore