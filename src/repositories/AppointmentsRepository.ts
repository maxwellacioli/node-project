import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): boolean {
    const appointment = this.appointments.find(a => isEqual(a.date, date));

    return appointment != undefined ? true : false;
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }
}

export default AppointmentsRepository;