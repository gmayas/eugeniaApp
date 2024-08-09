import React, { useRef } from "react";
import { useForm } from "react-hook-form";
//
const Register = () => {
    //
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset, } = useForm({
        defaultValues: {
            name_user: "",
            last_name_user: "",
            email_user: "",
            password_user: "",
            confirmarPassword: "",
            apartment_num_user: "",
            aceptaTerminos: false,
        },
    });

    const password = useRef(null);
    password.current = watch("password", "");

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        /* reset({
            name_user: "",
            last_name_user: "",
            email_user: "",
            password_user: "",
            confirmarPassword: "",
            apartment_num_user: "",
            aceptaTerminos: false,
         })*/
        reset();
    });

    //
    return (
        <div className="registerContainer">
            <div className="card border-primary">
                <div className="card-header">Register</div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="form-label mt-1">Name:</label>
                            <input type="text" className="form-control" name="name_user"
                                {...register("name_user", {
                                    required: {
                                        value: true,
                                        message: "Nombre es requerido",
                                    },
                                    maxLength: 20,
                                    minLength: 2,
                                })}
                            />
                            {errors.name_user?.type === "required" && (
                                <span className="text-danger">Nombre requerido</span>
                            )}
                            {errors.name_user?.type === "maxLength" && (
                                <span className="text-danger">Nombre no debe ser mayor a 20 caracteres</span>
                            )}
                            {errors.name_user?.type === "minLength" && (
                                <span className="text-danger">Nombre debe ser mayor a 2 caracteres</span>
                            )}
                        </div>
                        <div>
                            <label className="form-label mt-1">Last name:</label>
                            <input type="text" className="form-control" name="last_name_user"
                                {...register("last_name_user", {
                                    required: {
                                        value: true,
                                        message: "Last name es requerido",
                                    },
                                    maxLength: 30,
                                    minLength: 2,
                                })}
                            />
                            {errors.last_name_user?.type === "required" && (
                                <span className="text-danger">Last name requerido</span>
                            )}
                            {errors.last_name_user?.type === "maxLength" && (
                                <span className="text-danger">Last name no debe ser mayor a 30 caracteres</span>
                            )}
                            {errors.last_name_user?.type === "minLength" && (
                                <span className="text-danger">Last name debe ser mayor a 2 caracteres</span>
                            )}
                        </div>
                        <div className="mt-1 d-md-flex justify-content-md-end">
                            <button className="btn btn-primary" data-placement="top" title="Click Login" type="submit">
                                Register
                            </button>
                        </div>
                        <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre>
                        <h3>Hello {watch("name_user")}</h3>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register;