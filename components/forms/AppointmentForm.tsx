"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { Doctors } from "@/constants";
import { createAppointment } from "@/lib/actions/appointment.actions";

const AppointmentForm = ({
    userId,
    patientId,
    type,
}: {
    userId: string;
    patientId: string;
    type: "create" | "cancel" | "schedule";
}) => {
    // routing
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    // Define your form.
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    });

    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;
        switch (type) {
            case "schedule": {
                status = "scheduled";
                break;
            }
            case "cancel": {
                status = "cancelled";
                break;
            }
            default: {
                status = "pending";
                break;
            }
        }

        try {
            if (type === "create" && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!, // to ensure it will be there
                    note: values.note,
                    status: status as Status,
                };

                const appointment = await createAppointment(appointmentData);
                
                if(appointment){
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    let btnLabel;

    switch (type) {
        case "cancel":
            btnLabel = "Cancel Appointment";
            break;
        case "create":
            btnLabel = "Create Appointment";
            break;
        case "schedule":
            btnLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex-1"
            >
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appoinment &#128203;</h1>
                    <p className="text-dark-700">
                        Looking to schedule a meet? Book an appointment now in
                        only 10 seconds.
                    </p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor: any) => (
                                <SelectItem
                                    key={doctor.name}
                                    className="hover:bg-slate-600 cursor-pointer"
                                    value={doctor.name}
                                >
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            alt={doctor.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="dd/MM/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col xl:flex-row gap-6">
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="eg. Monthly check up"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Additional comments/ Notes"
                                placeholder="eg. Prefer afternoon appointments, if possible"
                            />
                        </div>
                    </>
                )}

                {type == "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    className={`${
                        type === "cancel"
                            ? "shad-danger-btn"
                            : "shad-primary-btn"
                    } w-full`}
                >
                    {btnLabel}
                </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentForm;
