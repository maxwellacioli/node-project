import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parseDate = startOfHour(parseISO(date));

  if (appointmentsRepository.findAppointmentByDate(parseDate)) {
    return res.status(401).json('Already exists an appointment with same date');
  }

  const appointment = appointmentsRepository.create(provider, parseDate);

  return res.json(appointment);
});

export default appointmentsRouter;