import type { Cors } from '../env/cors'
import { Server } from 'socket.io'
import authorization from '../middlewares/ws'
import http from 'http'
import path from 'path'
import fs from 'fs'

const createSockets = async (server: http.Server, cors: Cors, dirPath: string, mainFolderName: string) => {
  const options = { cors }
  const io = new Server(server, options)
  
  io.use(authorization)

  // Get path relative to where package.json is
  const resolvedPath = path.resolve('./', dirPath)
  const files = fs.readdirSync(resolvedPath, { withFileTypes: true })

  io.on('connection', async (socket) => {
    console.log('🚗🚗🚗 Connection Established')
    const ping = setInterval(() => {
      socket.send(JSON.stringify(new Date()), () => {})
    }, 1000)

    socket.on('close', () => {
      clearInterval(ping)
    })

    // Loop through all files in directory
    for (const file of files) {
      if (file.isDirectory()) {
        // If it's a folder, get all files within the folder
        const filesAndFolders = fs.readdirSync(`${resolvedPath}/${file.name}`, { withFileTypes: true })
  
        // Files in the directory
        const directoryFiles = filesAndFolders.filter(dirent => !dirent.isDirectory())
  
        // For each file in the directory get the Name of the file
        for (const { name } of directoryFiles) {
          // Import file and get properties from it
          const content = await import(`${resolvedPath}/${file.name}/${name}`)
          const path = `${file.name}/${name.split('.')[0]}`
          const event = content['default']

          console.log('@PATH EXAMPLE', path)
          
          socket.on(path, (data, callback) => event({...data, callback}, io, socket))
        }
    
        // Folders inside the directory
        const nestedDirectories = filesAndFolders.filter(dirent => dirent.isDirectory())
  
        // For each folder in the directory, run function again
        for (const { name } of nestedDirectories) {
          await createSockets(server, cors, `${resolvedPath}/${file.name}/${name}`, mainFolderName)
        }
      } else {
        // If it's just a file..
        const content = await import(`${resolvedPath}/${file.name}`)
        const event = content['default']
  
        // Get path name from the file name
        const nestedPath = resolvedPath.split(mainFolderName)[1]
        const mainPath = `${nestedPath && nestedPath}/${file.name.split('.')[0]}`
        
        socket.on(mainPath.substring(1), (data, callback) => event({...data, callback}, io, socket))
      }
    }
  })
}

export default createSockets