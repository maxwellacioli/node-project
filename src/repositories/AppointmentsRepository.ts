import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date) {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findAppointmentByDate(date: Date): boolean {
    const appointment = this.appointments.find(a => isEqual(a.date, date));

    return appointment != undefined ? true : false;
  }
}

export default AppointmentsRepository;