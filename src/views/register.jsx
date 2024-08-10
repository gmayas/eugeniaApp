import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { signUp } from "../controllers/auth/auth";
import { alertMsg } from "../components/alertMsg";

//
const Register = () => {
    //
    let navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset, } = useForm({
        defaultValues: {
            name_user: "",
            last_name_user: "",
            email_user: "",
            password_user: "",
            confirm_password: "",
            apartment_num_user: ""
        },
    });
    //
    const password_user = useRef(null);
    password_user.current = watch("password_user", "");
    //
    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log('data:' , data);
            const response = await signUp(data);
            console.log('response: ', response);
            if (response.data?.success) {
              localStorage.setItem("token", response.data.token);
              setAuthState({
                id_user: response.data.id_user,
                name_user: response.data.name_user,
                last_name_user: response.data.last_name_user,
                email_user: response.data.email_user,
                apartment_num_user: response.data.email_user,
                success: response.data.success
              });
              alertMsg(`Hello ${response.data.name_user} welcome. 🙂👍`, 'Mensaje de Eugenia.', 'success');
              reset();
              navigate("/");
            } else {
              alertMsg(`${response.error?.response?.data?.message}.`, 'Mensaje de Eugenia.', 'info');
            }
          }
          catch (e) {
            console.log(e);
            alertMsg(`Error: ${e.message}.`, 'Mensaje de Eugenia.', 'error');
          }; 
    });

    //
    return (
        <div className="registerContainer">
            <div className="card border-primary" style={{ width: "400px" }}>
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="form-label">Name:</label>
                            <input type="text" name="name_user"
                                className="form-control border border-success" laceholder="Enter Name"
                                {...register("name_user", {
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                    maxLength: 20,
                                    minLength: 2,
                                })}
                            />
                            {errors.name_user?.type === "required" && (
                                <span className="text-danger">Name is required</span>
                            )}
                            {errors.name_user?.type === "maxLength" && (
                                <span className="text-danger">Name must not be longer than 20 characters</span>
                            )}
                            {errors.name_user?.type === "minLength" && (
                                <span className="text-danger">Name must be more than 2 characters</span>
                            )}
                        </div>
                        <div>
                            <label className="form-label mt-1">Last name:</label>
                            <input type="text" name="last_name_user"
                                className="form-control border border-success" laceholder="Enter Last name"
                                {...register("last_name_user", {
                                    required: {
                                        value: true,
                                        message: "Last name is required",
                                    },
                                    maxLength: 30,
                                    minLength: 2,
                                })}
                            />
                            {errors.last_name_user?.type === "required" && (
                                <span className="text-danger">Last name is required</span>
                            )}
                            {errors.last_name_user?.type === "maxLength" && (
                                <span className="text-danger">Last name must not be longer than 30 characters</span>
                            )}
                            {errors.last_name_user?.type === "minLength" && (
                                <span className="text-danger">Last name must be more than 2 characters</span>
                            )}
                        </div>
                        <div>
                            <label className="form-label mt-1">Apartment number:</label>
                            <input type="text" name="apartment_num_user"
                                className="form-control border border-success" laceholder="Enter apartment number"
                                {...register("apartment_num_user", {
                                    required: {
                                        value: true,
                                        message: "Apartment number is required",
                                    },
                                    maxLength: 30,
                                    minLength: 1,
                                })}
                            />
                            {errors.apartment_num_user?.type === "required" && (
                                <span className="text-danger">Apartment number is required</span>
                            )}
                            {errors.apartment_num_user?.type === "maxLength" && (
                                <span className="text-danger">Apartment number must not be longer than 30 characters</span>
                            )}
                            {errors.apartment_num_user?.type === "minLength" && (
                                <span className="text-danger">Apartment number must be more than 2 characters</span>
                            )}
                        </div>
                        <div>
                            <label className="form-label mt-1">Email:</label>
                            <input type="email" name="email_user"
                                className="form-control border border-success" laceholder="Enter email"
                                {...register("email_user", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Email not válid",
                                    },
                                })}
                            />
                            {errors.email_user && <span className="text-danger">{errors.email_user.message}</span>}
                        </div>
                        <div>
                            <label className="form-label mt-1">Password:</label>
                            <input type="password" name="password_user"
                                className="form-control border border-success" laceholder="Enter Password"
                                {...register("password_user", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must be more than 6 characters",
                                    },
                                })}
                            />
                            {errors.password_user && <span className="text-danger">{errors.password_user.message}</span>}
                        </div>
                        <div>
                            <label className="form-label mt-1">Confirm password:</label>
                            <input type="password" name="confirm_password"
                                className="form-control border border-success" laceholder="Enter Confirm password"
                                {...register("confirm_password", {
                                    required: {
                                        value: true,
                                        message: "Confirm password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Confirm password must be more than 6 characters",
                                    },
                                    validate: (value) =>
                                        value === password_user.current || "Passwords do not match",
                                })}
                            />
                            {errors.confirm_password && <span className="text-danger">{errors.confirm_password.message}</span>
                            }
                        </div>
                        <div className="mt-3 d-md-flex justify-content-md-end">
                            <button className="btn btn-primary" data-placement="top" title="Click Register" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill mb-1" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                                </svg> Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register;