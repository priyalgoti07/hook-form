import { SubmitHandler, useForm } from 'react-hook-form'
import './App.css';
import { z } from "zod"

function App() {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })


  type FormFileds = z.infer<typeof schema>
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset, } = useForm<FormFileds>({
  })

  const onSubmitABC: SubmitHandler<FormFileds> = async (data) => {
    try {
      await new Promise((reslove) => setTimeout(reslove, 1000))
      // throw Error
      console.log("data------->", data);
      reset()
    } catch (error) {
      setError("root", {
        message: "This email is already taken"
      }
      )
    }


  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitABC)} autoComplete="off">
        <div>
          <input
            type='text'
            placeholder='Email'
            {...register("email", {
              required: "Emial is required",
              // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              validate: {
                containsAtSymbol: value => value.includes("@") || "Email must contain '@'",
                containDot: value => value.includes('.') || "Email must contain '.'"
              }
            })}
            autoComplete="off" />
        </div>
        {errors.email ? <div style={{ color: "red" }}>{errors.email.message}</div> : <div></div>}
        <div>
          <input
            type='password'
            placeholder='Password'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
              },
            })}
            autoComplete="off" />
        </div>
        {errors.password ? <div style={{ color: "red" }}>{errors.password.message}</div> : <div></div>}
        <button
          type='submit'
          disabled={isSubmitting}
        >{isSubmitting ? "Loading" : "Submit"}</button>
        {errors.root && <div style={{ color: "red" }}>{errors.root.message}</div>}
      </form>
    </div>
  )
}

export default App
