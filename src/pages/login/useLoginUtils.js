import React from 'react'
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { successMsg, errorMsg } from "../../../utils/customFn";
import { loginSchema } from "../../../utils/yup";
import useAuthService from "../../../api/services/auth.service";
import { LoginContent } from '../../../constants/content';

const useLoginUtils = () => {
    const navigate = useNavigate();
    const { loading, login } = useAuthService();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (formData) => {
        const data = {
            email: formData?.email,
            password: formData?.password
        };
        const res = await login(data);
        if (res?.data?.success) {
            Cookies.set("__er_urAccess", res?.data?.data?.accessToken);
            successMsg(res?.data?.message || LoginContent?.login_success);
            reset();
            navigate("/welcome");
        }
    };
    return {
        handleSubmit,
        onSubmit,
        control,
        loading,
        errors,
    }
}

export default useLoginUtils    