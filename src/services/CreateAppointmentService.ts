import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import appointmentsRouter from '../routes/apointments.routes';

interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    if (this.appointmentsRepository.findByDate(appointmentDate)) {
      throw Error('Already exists an appointment with same date');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;