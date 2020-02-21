export default class User {
  constructor(
    user_id,
    user_name,
    user_first_name,
    user_last_name,
    permission,
    user_group,
    is_admin
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.user_first_name = user_first_name;
    this.user_last_name = user_last_name;
    this.permission = permission;
    this.user_group = user_group;
    this.is_admin = is_admin;
  }
}
