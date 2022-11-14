import { getModelForClass, prop } from "@typegoose/typegoose";

export class AgentDetails {
  @prop({ required: true })
  public companyName: string;

  @prop({ required: true, unique: true })
  public contactNo: string;

  @prop({ required: true, unique: true })
  public contactEmail: string;

  @prop({ required: true })
  public packageName: string;

  @prop({ required: true })
  public packageDesc: string;

  @prop({ required: true })
  public packageCost: string;
}
export const agentsModel = getModelForClass(AgentDetails, {
  schemaOptions: {
    timestamps: true,
  },
});
