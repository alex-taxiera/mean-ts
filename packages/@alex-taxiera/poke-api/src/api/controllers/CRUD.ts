import {
  Request,
  Response,
} from 'express'

export interface CRUDController {

  getAll (req: Request, res: Response): Promise<typeof res>
  post (req: Request, res: Response): Promise<typeof res>
  get (req: Request, res: Response): Promise<typeof res>
  patch (req: Request, res: Response): Promise<typeof res>
  delete (req: Request, res: Response): Promise<typeof res>

}
