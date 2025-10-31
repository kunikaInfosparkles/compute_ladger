import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const languageSchema = yup.object().shape({
  language: yup.string().required("Please select a language"),
});

export const MembershipRoleSchema = yup.object().shape({
  role: yup.string().required("Please select a membership role"),
});


export const registerIndividualSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  profession: yup.string().required("Profession is required"),
  country: yup.string().required("Country is required"),
  // --- Association logic ---
  association: yup.string().when("membertype", {
    is: (val) => val === "association" || val === "both",
    then: (schema) => schema.required("Association is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  associationName: yup.string().when(["membertype", "association"], {
    is: (membertype, association) =>
      (membertype === "association" || membertype === "both") &&
      association === "others",
    then: (schema) => schema.required("Association name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // --- Enterprise logic ---
  enterprise: yup.string().when("membertype", {
    is: (val) => val === "enterprise" || val === "both",
    then: (schema) => schema.required("Enterprise is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  enterpriseName: yup.string().when(["membertype", "enterprise"], {
    is: (membertype, enterprise) =>
      (membertype === "enterprise" || membertype === "both") &&
      enterprise === "others",
    then: (schema) => schema.required("Enterprise name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});


export const registerAssociationSchema = yup.object().shape({
  associationName: yup.string().required("Association name is required"),
  // email: yup.string().email("Invalid email").required("Email is required"),
  associationContactPersonEmail: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  associationType: yup.string().required("Association type is required"),
  associonContactPerson: yup.string().required("Contact person is required"),
  associationContactPersonPhone: yup
    .string()
    .required("Phone number is required")
    .test('valid-phone', 'Please enter a valid phone number', function (value) {
      if (!value) return false;

      // Split by spaces to separate country code from phone number
      const parts = value.split(' ');

      // If there's only country code part or empty parts after country code
      if (parts.length <= 1) return false;

      // Join all parts except the first one (country code) and remove non-digits
      const numberPart = parts.slice(1).join('').replace(/\D/g, '');

      // Check if the actual number part has at least 5 digits
      return numberPart.length >= 5;
    }),
  country: yup.string().required("Country is required"),
});

export const registerEnterpriseSchema = yup.object().shape({
  enterpriseName: yup.string().required("Enterprise name is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  enterpriseIndustry: yup.string().required("Enterprise industry is required"),
  enterpriseContactPerson: yup.string().required("Contact person is required"),
  enterpriseContactPersonEmail: yup.string().email("Invalid email").required("Contact person email is required"),
  isLoyalityProgram: yup.boolean(),
  country: yup.string().required("Country is required"),
});

export const judgeRegistrationSchema = yup.object().shape({
  // full_name: yup.string().required('Full name is required'),
  // email: yup.string().email('Invalid email').required('Email is required'),
  // password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  bio: yup.string().required('Professional bio is required'),
  experience: yup
    .string()
    .matches(/^\d+$/, 'Experience must contain only numbers') // Validate it contains only digits
    .required('Experience is required')
    .test('min-value', 'Experience must be at least 0', (value) => {
      if (!value) return false;
      return parseInt(value) >= 0;
    })
    .test('max-value', 'Experience seems too high', (value) => {
      if (!value) return false;
      return parseInt(value) <= 100;
    }),
  language_skills: yup.string().required('Language skills are required'),
  region_of_expertise: yup.string().required('Region of expertise is required'),
});


export const judgeRegistrationUploadPhotoSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File too large (max 10MB)", (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    }),
});

export const judgeRegistrationUploadCetificationsSchema = yup.object().shape({
  fileList: yup.array().min(1, 'At least one certification is required').required("File is required")
});


export const registerTeamsSchema = yup.object().shape({
  name: yup.string().required("Team name is required"),
  country: yup.string().required("Country is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test('valid-phone', 'Please enter a valid phone number', function (value) {
      if (!value) return false;

      // Split by spaces to separate country code from phone number
      const parts = value.split(' ');

      // If there's only country code part or empty parts after country code
      if (parts.length <= 1) return false;

      // Join all parts except the first one (country code) and remove non-digits
      const numberPart = parts.slice(1).join('').replace(/\D/g, '');

      // Check if the actual number part has at least 5 digits
      return numberPart.length >= 5;
    }),
  email: yup.string().required("Email is required").email("Enter a valid email"),
  file: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File too large (max 10MB)", (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    }),
});

export const uploadValidationSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File too large (max 100MB)", (value) => {
      return value && value.size <= 100 * 1024 * 1024;
    }),
});


export const uploadTeamQualificationValidationSchema = yup.object().shape({
  videoFile: yup
    .mixed()
    .required("Please upload your signature dish video.")
    .test("fileSize", "Video size should not exceed 100MB", (value) => {
      return value && value.size <= 100 * 1024 * 1024; // 100MB limit
    })
    .test("fileType", "Only video files are allowed", (value) => {
      return (
        value &&
        ["video/mp4", "video/mov", "video/avi", "video/mpeg"].includes(value.type)
      );
    }),

  recipeFile: yup
    .mixed()
    .nullable()
    .test("fileSize", "Recipe file size should not exceed 10MB", (value) => {
      if (!value) return true; // optional
      return value.size <= 10 * 1024 * 1024; // 10MB limit
    })
    .test("fileType", "Only PDF or Word documents are allowed", (value) => {
      if (!value) return true;
      return (
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
          .includes(value.type)
      );
    }),

  plan: yup
    .string()
    .trim()
    .required("Notes are required."),
});

// Validation schema for judging image uploads - accepts all image types with 100MB limit, images required
export const judgingImageValidationSchema = yup.object().shape({
  images: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileSize", "Image size should not exceed 100MB", (value) => {
          return value && value.size <= 100 * 1024 * 1024; // 100MB limit
        })
        .test("fileType", "Only image files are allowed", (value) => {
          return value && value.type.startsWith('image/');
        })
    )
    .min(1, "At least one image is required for judging")
    .required("Images are required for judging"),
});

export const planValidationSchema = yup.object().shape({
  plan: yup
    .string()
    .required("Sustainability plan is required")
    .max(500, "Plan must not exceed 500 words")
    .min(10, "Plan must be at least 10 words")
});

export const memberSchema = yup.object().shape({

  memberName: yup.string().required("Member name is required"),
  country: yup.string().required("Country is required"),
  position: yup.string().required("Position is required"),
  age: yup.number()
    .typeError('Age must be a valid number')
    .required('Age is required')
    .min(15, 'Age must be at least 15')
    .max(75, 'Age must be no more than 75'),
  dateOfBirth: yup
    .date()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Invalid date format")
    .required("Date of Birth is required"), age: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Age must be a number")
      .required("Age is required"),
  passportNumber: yup.string().required("Passport number is required").min(6, "Passport number must be at least 6 characters"),
  passportExpiryDate: yup
    .date()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Invalid date format")
    .required("Passport Expiry Date is required")
    .min(new Date(), "Passport expiry date must be in the future"),
  nationality: yup.string().required("Nationality is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test('valid-phone', 'Please enter a valid phone number', function (value) {
      if (!value) return false;

      // Split by spaces to separate country code from phone number
      const parts = value.split(' ');

      // If there's only country code part or empty parts after country code
      if (parts.length <= 1) return false;

      // Join all parts except the first one (country code) and remove non-digits
      const numberPart = parts.slice(1).join('').replace(/\D/g, '');

      // Check if the actual number part has at least 5 digits
      return numberPart.length >= 5;
    }),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  idNumber: yup.string().required("ID number is required"),
});
export const uploadKycSchema = yup.object().shape({
  kycIdNumber: yup.string().required("ID number is required"),
  kyc_doc: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File too large (max 10MB)", (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    }),
});

export const createEventSchema = yup.object().shape({
  name: yup.string().required("Event name is required"),
  country: yup.string().required("Country is required"),
  venue: yup.string().required("Venue is required"),
  eventDate: yup.date().required("Event date is required").min(new Date(), "Event date must be in the future"),
  endEventDate: yup.date()
    .required("Event end date is required")
    .min(yup.ref('eventDate'), "End date must be after start date"),
  contactPersonEmail: yup.string().email("Invalid email").required("Contact person email is required"),
  contactPersonPhone: yup.string().required("Contact person phone is required"),
  // associationName: yup.string().required("Association name is required"),
  eventCode: yup.string().required("Event code is required"),
});

export const eventRulesSchema = yup.object().shape({
  eventId: yup.string().required("Event ID is required"),
  // age: yup.number().nullable().required("Age is required").min(18, "Minimum age is 18").max(65, "Maximum age is 65"),
  age: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "Minimum age is 18")
    .max(65, "Maximum age is 65"),

  teamSize: yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value)).nullable().required("Team size is required").min(1, "Minimum team size is 1").max(10, "Maximum team size is 10"),
  nationality: yup.string().nullable().required("Nationality is required"),
  // roles: yup.array().of(yup.string().required("Role is required")).min(1, "At least one role is required"),
  recipeRequirements: yup.array().of(yup.string().required("Recipe requirement is required")).min(1, "At least one recipe requirement is required"),
  videoSubmissionReq: yup.array().of(yup.string().required("Video submission requirement is required")).min(1, "At least one video submission requirement is required"),
  checklistForNotification: yup.array().of(yup.string().required("Checklist item is required")).min(1, "At least one checklist item is required"),
});

export const eventContentSchema = yup.object().shape({
  eventId: yup.string().required("Event ID is required"),
  overview: yup.string()
    .required("Overview is required")
    .test('min-content', 'Overview must contain at least 10 characters of content', function (value) {
      if (!value) return false;
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length >= 10;
    }),
  rules_formate: yup.string()
    .required("Rules & Format is required")
    .test('min-content', 'Rules & Format must contain at least 10 characters of content', function (value) {
      if (!value) return false;
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length >= 10;
    }),
  schedule: yup.string()
    .required("Schedule is required")
    .test('min-content', 'Schedule must contain at least 10 characters of content', function (value) {
      if (!value) return false;
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length >= 10;
    }),
  sustainabilityFocus: yup.string()
    .required("Sustainability Focus is required")
    .test('min-content', 'Sustainability Focus must contain at least 10 characters of content', function (value) {
      if (!value) return false;
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length >= 10;
    }),
});