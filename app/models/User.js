import Mongo from "../../vendor/Support/Facades/Mongo";
import { UserSchema } from "../../database/schema/UserSchema";

class User extends Mongo {
  constructor() {
    super(UserSchema);
  }
}
export default new User();
