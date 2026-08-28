import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { cancelAppointment, confirmPayment, createAppointment, getAppointments, getAppointmentsByDoctor, getAppointmentsByPatient, getRegisterdUserCount, getStats ,updateAppointment} from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

appointmentRouter.get("/", getAppointments);
appointmentRouter.get("/confirm", confirmPayment);
appointmentRouter.get("/", getStats);

// auth
appointmentRouter.post('/', clerkMiddleware(), requireAuth(), createAppointment);
appointmentRouter.get('/me', clerkMiddleware(), requireAuth(), getAppointmentsByPatient);

appointmentRouter.get("/doctor/:doctorId",  getAppointmentsByDoctor);
appointmentRouter.post("/:id/cancel", cancelAppointment);
appointmentRouter.post('/paitents/count', getRegisterdUserCount);
appointmentRouter.post("/:id", updateAppointment);

export default appointmentRouter;