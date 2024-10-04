export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};

export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "Military ID Card",
    "National Identity Card/ Aadhar Card",
    "Passport",
    "Student ID Card",
    "Voter ID Card",
];

export const Doctors = [
    {
        image: "/assets/images/dr-green.png",
        name: "Dr. Ajay Kumar",
    },
    {
        image: "/assets/images/dr-cameron.png",
        name: "Dr. Mohani Kumari",
    },
    {
        image: "/assets/images/dr-livingston.png",
        name: "Dr. Lalit Mondal",
    },
    {
        image: "/assets/images/dr-peter.png",
        name: "Dr. Pankaj Kumar",
    },
    {
        image: "/assets/images/dr-powell.png",
        name: "Dr. Sushmita Singh",
    },
    {
        image: "/assets/images/dr-remirez.png",
        name: "Dr. Ram Pandey",
    },
    {
        image: "/assets/images/dr-lee.png",
        name: "Dr. Jasmeen Lee",
    },
    {
        image: "/assets/images/dr-cruz.png",
        name: "Dr. Elina D Cruz",
    },
    {
        image: "/assets/images/dr-sharma.png",
        name: "Dr. Hardik Sharma",
    },
    // {
    //     image: "/assets/images/none-selected.png",
    //     name: "Not Applicable",
    // },
];

export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
};
