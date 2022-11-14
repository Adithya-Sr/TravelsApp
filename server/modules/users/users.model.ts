import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import argon2 from "argon2";
@pre<Users>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await argon2.hash(this.password);

    this.password = hash;

    return next();
  }
})
export class Users {
  @prop({ required: true, unique: true, sparse: true })
  public username: string;
  @prop({ required: true, unique: true, sparse: true })
  public email: string;
  @prop({ required: true })
  public password: string;
  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}
export const userModel = getModelForClass(Users, {
  schemaOptions: { timestamps: true },
});
