import type { Application } from 'express'
import type Route from '../types/Route'
import { Router } from 'express'
import path from 'path'
import fs from 'fs'
import env from '../env/env'

const createRoutes = async (dirPath: string, app: Application, mainFolderName: string) => {
  // Get path relative to where package.json is
  const resolvedPath = path.resolve('./', dirPath)
  const files = fs.readdirSync(resolvedPath, { withFileTypes: true })
 
  // Loop through all files in directory
  for (const file of files) {
    if (file.isDirectory()) {
      // If it's a folder, create a route and get all files within the folder
      const router = Router()
      const filesAndFolders = fs.readdirSync(`${resolvedPath}/${file.name}`, { withFileTypes: true })

      // Files in the directory
      const directoryFiles = filesAndFolders.filter(dirent => !dirent.isDirectory())
        
      // For each file in the directory get the Name of the file
      for (const { name } of directoryFiles) {
        // Import file and get properties from it
        const content = await import(`${resolvedPath}/${file.name}/${name}`)
        const { method, params, authorization, execute }: Route = content['default']

        // Get path name from the file name and params
        const mainPath = `${name.split('.')[0]}`
        const paramsPath = params ? `:${params.join('/:')}` : ''

        if (authorization) router[method](`/${mainPath}/${paramsPath}`, authorization, execute)
        if (!authorization) router[method](`/${mainPath}/${paramsPath}`, execute)
      }

      // Attach routes to the folder in directory
      app.use(`/${file.name}`, router)

      // Folders inside the directory
      const nestedDirectories = filesAndFolders.filter(dirent => dirent.isDirectory())

      // For each folder in the directory, run function again
      for (const { name } of nestedDirectories) {
        await createRoutes(`${resolvedPath}/${file.name}/${name}`, app, mainFolderName)
      }
    } else {
      // If it's just a file..
      const content = await import(`${resolvedPath}/${file.name}`)
      const { method, params, authorization, execute }: Route = content['default']
      
      // Get path name from the file name and params
      const nestedPath = resolvedPath.split(mainFolderName)[1]
      const mainPath = `${nestedPath && nestedPath}/${file.name.split('.')[0]}`
      const paramsPath = params ? `:${params.join('/:')}` : ''

      if (authorization) app[method](`${mainPath}/${paramsPath}`, authorization, execute)
      if (!authorization) app[method](`${mainPath}/${paramsPath}`, execute)
    }
  }
}

export default createRoutes