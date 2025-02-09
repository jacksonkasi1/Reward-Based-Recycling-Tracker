// Import 3rd-party
import { z } from "zod";

// Define the validation schema using Zod
export const validationSchema = z.object({
  visitor_id: z.string().nonempty({ message: "visitor_id is required" }),
  device_info: z.object({
    osName: z.string().nonempty({ message: "osName is required" }),
    osVersion: z.string().nonempty({ message: "osVersion is required" }),
  }),
  ip_address: z.string().nonempty({ message: "ip_address is required" }),
  ip_location: z.object({
    accuracyRadius: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    postalCode: z.string().optional(),
    timezone: z.string().optional(),
    city: z.object({ name: z.string().optional() }).optional(),
    country: z
      .object({ name: z.string().optional(), code: z.string().optional() })
      .optional(),
    continent: z
      .object({ name: z.string().optional(), code: z.string().optional() })
      .optional(),
    subdivisions: z.array(z.string()).optional(),
  }),
  image_url: z.string().url({ message: "Invalid URL format for image_url" }),
  item_type: z.string().nonempty({ message: "item_type is required" }),
});
