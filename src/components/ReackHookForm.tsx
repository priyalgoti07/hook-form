import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form'

type FData = {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        facebook: string;
    };
    phoneNumbers: string[];
    phNumbers: {
        number: string
    }[];
    age: number;
    dob: Date;
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
            phoneNumbers: ["", ""],
            phNumbers: [{ number: "" }],
            age: 0,
            dob: new Date()
        },
        mode: "all"
    });

    const { register, control, handleSubmit, formState, watch, getValues, reset, resetField, setFocus, trigger } = form;
    const { errors, dirtyFields } = formState

    console.log({dirtyFields})
    const dataSubmit = (data: FData) => {
        console.log("i am form data submit funaction", data)
        // reset()
        resetField("channel")
        setFocus("username")
    }

    const dataError = (err: any) => {
        console.log("err------------>", err)
    }
    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control,
    })
    const watchUsername = watch()
    // console.log("watchUsername---->", watchUsername);


    // useEffect(() => {
    //     const sub = watch((value) => {
    //         console.log("value--------->", value);
    //         return () => sub.unsubscribe()
    //     })
    // }, [watch])

    const handleGetvalue = () => {
        console.log("getValue Methos", getValues("username"))
    }

    return (
        <>
            {JSON.stringify(watchUsername)}
            <form onSubmit={handleSubmit(dataSubmit, dataError)} noValidate>
                <label htmlFor='username'>UserName</label>
                <input type='text' id='username' {...register('username', {
                    required: {
                        value: true,
                        message: "UserName is Empty",
                    },
                    minLength: 3

                })} />
                {errors?.username?.type === "required" && <p style={{ color: "red", fontSize: "12px" }}>{errors.username?.message}</p>}
                {errors?.username?.type === "minLength" && <p style={{ color: "red", fontSize: "12px" }}>{"Plese enter 3 minmum Lenght"}</p>}

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
                <div>
                    <label>List of phone Numbers</label>
                    <div>
                        {fields.map((field, index) => {
                            return (
                                <div key={field.id}>
                                    <input type='text' {...register(`phNumbers.${index}.number` as const)} />
                                    {index > 0 && (
                                        <button onClick={() => remove(index)}>Remove</button>

                                    )}
                                </div>
                            )
                        })}
                        <button onClick={() => append({ number: "" })}>Add Phone Number</button>
                    </div>
                </div>

                <br />
                <label htmlFor='age'>Age</label>
                <input type='number' id='age' {...register('age', { valueAsNumber: true, required: { value: true, message: "Enter age" } })} />
                <p style={{ color: "red", fontSize: "12px" }}>{errors.age?.message}</p>

                <br />
                <label htmlFor='dob'>Date of birth</label>
                <input type='date' id='dob' {...register('dob', { valueAsDate: true, required: { value: true, message: "Enter Date of birth" } })} />
                <p style={{ color: "red", fontSize: "12px" }}>{errors.dob?.message}</p>

                <button>Submit</button>
                {/* <button onClick={handleGetvalue}>Get Value</button> */}
                <button onClick={() => { trigger(["username","channel"]) }}>Click to Tigger</button>
                <DevTool control={control} />
            </form>
        </>
    )
}
