import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {

  try {
    const { provider, date } = req.body;

    const parseDate = parseISO(date);

    const createAppointmentService =
      new CreateAppointmentService(appointmentsRepository);

    const appointment =
      createAppointmentService.execute({ date: parseDate, provider });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});



export default appointmentsRouter;