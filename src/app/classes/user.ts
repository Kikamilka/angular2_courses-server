export class User {
  name: string;
  password: string;
  constructor (name: string, password: string) {
    this.password = password;
    this.name = name;
  }
}
