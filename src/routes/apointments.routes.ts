import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Array<Appointment> = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parseDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(a => isEqual(a.date, parseDate));

  if (findAppointmentInSameDate != undefined) {
    return res.status(401).json('Already exists an appointment with same date');
  }

  const appointment = new Appointment(provider, parseDate);

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;