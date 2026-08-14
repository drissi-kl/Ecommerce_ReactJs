import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "./confirmForm.css";
import { X, LoaderCircle } from "lucide-react";
import axios from "axios";
import toast from 'react-hot-toast';

export default function ConfirmFrom({ data, confirmed, closeConfirm }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const confirForm = async (informations) => {
        try {
            setIsSubmitting(true);
            informations.message = `the order of ${informations.fullname} is ${data}`;
            const response = await axios.post("https://formspree.io/f/xvkpqwon", informations);
            
            if (response.status === 200) {
                setIsSubmitting(false);
                toast.success("Order confirmed successfully!");
                confirmed();
            }
        } catch (error) {
            setIsSubmitting(false);
            console.log(error);
            toast.error("Failed to confirm order. Please try again.");
        }
    };

    return (
        <div className='confirmShipping'>
            <form className="confirm_form" onSubmit={handleSubmit(confirForm)}>
                
                {/* Close Button */}
                <X 
                    className="close_confirm" 
                    onClick={() => { if (!isSubmitting) closeConfirm(); }} 
                />

                <div className="confirm_form_row">
                    <div className="confirm_input_group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="John Doe"
                            disabled={isSubmitting}
                            {...register('fullname', {
                                required: { value: true, message: 'Your full name is required' }
                            })}
                        />
                        {errors.fullname && <p className="fullnameErrorMessage">{errors.fullname.message}</p>}
                    </div>

                    <div className="confirm_input_group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="john@example.com"
                            disabled={isSubmitting}
                            {...register('email', {
                                required: { value: true, message: 'Your email address is required' }
                            })}
                        />
                        {errors.email && <p className="emailErrorMessage">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Submit Button with Dynamic Loading State */}
                <button type="submit" className="confirm_btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div className="btn_loading_content">
                            <LoaderCircle className="btn_spinner" />
                            <span>Confirming...</span>
                        </div>
                    ) : (
                        "Confirm Shipping"
                    )}
                </button>
            </form>
        </div>
    );
}