import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findAppointmentByDate(date: Date): boolean {
    const appointment = this.appointments.find(a => isEqual(a.date, date));

    return appointment != undefined ? true : false;
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }
}

export default AppointmentsRepository;