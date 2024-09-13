import { DevTool } from '@hookform/devtools';
import React from 'react'
import { useForm } from 'react-hook-form'
import { string } from 'zod';

type FData = {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        facebook: string;
    };
    phoneNumbers: string[];
}
export const ReackHookForm = () => {

    const form = useForm<FData>({
        defaultValues: {
            username: "priyal",
            email: "",
            channel: "",
            social: {
                twitter: "", facebook: ""
            },
            phoneNumbers: ["", ""]
        }
    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState

    const dataSubmit = (data: FData) => {
        console.log("i am form data submit funaction", data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(dataSubmit)} noValidate>
                <label htmlFor='username'>UserName</label>
                <input type='text' id='username' {...register('username', {
                    required: {
                        value: true,
                        message: "UserName is Empty"
                    },

                })} />
                <p style={{ color: "red", fontSize: "12px" }}>{errors.username?.message}</p>
                <br />
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' {...register('email', {
                    pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid Emial Formate"
                    },
                    validate: {
                        EmailValidation: (value) => {
                            return (
                                value !== "priyal@gmail.com" ||
                                "This domain is not suppoted"
                            )
                        }
                    }
                })} />
                <p style={{ color: "red", fontSize: "12px" }}>{errors.email?.message}</p>
                <br />
                <label htmlFor='channel'>Channel</label>
                <input type='text' id='channel' {...register('channel', { required: { value: true, message: "Invalid Chnnel" } })} />
                <p style={{ color: "red", fontSize: "12px" }}>{errors.channel?.message}</p>

                <br />
                <label htmlFor='twitter'>Twitter</label>
                <input type='text' id='twitter' {...register('social.twitter')} />
                <br />
                <label htmlFor='facebook'>Facebook</label>
                <input type='text' id='facebook' {...register('social.facebook')} />
                <br />

                <label htmlFor='primary-phone'>Primary Phone Number</label>
                <input type='text' id='primaryphone' {...register('phoneNumbers.0')} />
                <br />

                <label htmlFor='secondry-phone'>Secondry Phone Number</label>
                <input type='text' id='secondryphone' {...register('phoneNumbers.1')} />
                <br />
                <button>Submit</button>
                <DevTool control={control} />
            </form>
        </>
    )
}
