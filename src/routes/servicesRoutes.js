import express from 'express'
import { getServices, createService, getServiceById, updateService, deleteService } from '../controllers/servicesController.js'

const router = express.Router()

// router.get('/', getServices)
// router.post('/', createService)
router.route('/')
    .get(getServices)
    .post(createService)

// router.get('/:id', getServiceById)
// router.put('/:id', updateService)
// router.delete('/:id', deleteService)
router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)



export default router