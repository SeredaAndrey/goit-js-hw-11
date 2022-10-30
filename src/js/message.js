import Notiflix from 'notiflix';

export default class Message {
  constructor() {}
  // вывод информационного сообщения
  info(message) {
    Notiflix.Notify.info(message);
  }
  // вывод сообщения об ошибке
  failure(message) {
    Notiflix.Notify.failure(message);
    console.log(message);
  }
  // Вывод сообщеня об удачной операции
  succes(message) {
    Notiflix.Notify.success(message);
    console.log(message);
  }
}
