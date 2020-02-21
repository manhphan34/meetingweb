export default class User {
  constructor(id, name, creator, description, time, address, is_end) {
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.description = description;
    this.time = time;
    this.address = address;
    this.is_end = is_end;
  }
}
