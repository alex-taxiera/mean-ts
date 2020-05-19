import {
  Request,
  Response,
} from 'express'

export interface CRUDController {

  getAll (req: Request, res: Response): Promise<Response>
  post (req: Request, res: Response): Promise<Response>
  get (req: Request, res: Response): Promise<Response>
  patch (req: Request, res: Response): Promise<Response>
  delete (req: Request, res: Response): Promise<Response>

}
