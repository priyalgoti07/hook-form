import { DevTool } from '@hookform/devtools';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type FData = {
    username: string;
}
export const ControllerForm = () => {

    const form = useForm<FData>({
        defaultValues: {
            username: "",
        },
    });

    const { register, control, handleSubmit, formState, watch, getValues, reset, resetField, setFocus, } = form;
    const { errors } = formState

    const dataSubmit = (data: FData) => {
        console.log("i am form data submit funaction", data)
        reset()
        setFocus("username")
    }

    const dataError = (err: any) => {
        console.log("err------------>", err)
    }

    const watchUsername = watch()

    return (
        <>
            {JSON.stringify(watchUsername)}
            <form onSubmit={handleSubmit(dataSubmit, dataError)} noValidate>
                {/* <label htmlFor='username'>UserName</label>
                <input type='text' id='username' {...register('username', {
                    required: {
                        value: true,
                        message: "UserName is Empty",
                    },
                    minLength: 3

                })} /> */}
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <TextField id="username" label="Firstname" variant="outlined" {...field}/>
                    )}
                />
                {errors?.username?.type === "required" && <p style={{ color: "red", fontSize: "12px" }}>{errors.username?.message}</p>}
                {errors?.username?.type === "minLength" && <p style={{ color: "red", fontSize: "12px" }}>{"Plese enter 3 minmum Lenght"}</p>}

                <button>Submit</button>
                <DevTool control={control} />
            </form>
        </>
    )
}
