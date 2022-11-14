import { object, TypeOf, any, string } from "zod";
//const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 500000;
//const ACCEPTED_IMAGE_TYPES = process.env.ACCEPTED_IMAGE_TYPES || [
//"image/jpeg
//"image/jpg",
//"image/png",
//"image/webp",
//];
export const registerPackageSchema = {
  body: object({
    companyName: string({
      required_error: "Company name is required!",
    }),
    contactNo: string({
      required_error: "phone number is required!",
    }),
    contactEmail: string({
      required_error: "email ID is required!",
    }).email("must be a valid email!!!"),
    packageName: string({
      required_error: "pls provide a package name!",
    }),
    packageDesc: string({
      required_error: "pls provide a package description!",
    }),
    packageCost: string({
      required_error: "pls provide a package cost!",
    }),
  }),
};
export type registerPackageBody = TypeOf<typeof registerPackageSchema.body>;
