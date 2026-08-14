import { useForm } from "react-hook-form"
import "./confirmForm.css";




export default function ConfirmFrom(){
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;

    const confirForm = (data) => {
        console.log(data);
    }

    return <div className='confirmShipping'>
          <form className="confirm_form" onSubmit={handleSubmit(confirForm)}>
            <div className="form_row">
              <div className="input_group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  {...register('fullname', {
                    required: { value: true, message: 'Your full name is required' }
                  })}
                />
                {errors.fullname && <p className="fullnameErrorMessage">{errors.fullname.message}</p>}
              </div>

              <div className="input_group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  {...register('email', {
                    required: { value: true, message: 'Your email address is required' }
                  })}
                />
                {errors.email && <p className="emailErrorMessage">{errors.email.message}</p>}
              </div>
            </div>

            <button type="submit" className="send_btn">Confirm Shipping</button>
          </form>
        </div>

}