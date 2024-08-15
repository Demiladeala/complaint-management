import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";
import api from "./api";

type PasswordFormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type PasswordErrors = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

const SettingsForm = () => {
    const [formData, setFormData] = useState<PasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<PasswordErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): PasswordErrors => {
        const errors: PasswordErrors = {};
        if (!formData.currentPassword) errors.currentPassword = "Current password is required.";
        if (!formData.newPassword) {
            errors.newPassword = "New password is required.";
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.newPassword)) {
            errors.newPassword = "Password must contain at least one symbol, one uppercase letter, and one number.";
        }
        if (formData.confirmPassword !== formData.newPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        return errors;
    };

    const handlePasswordChange = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            const payload = {
                new_password: formData.newPassword,
                old_password: formData.currentPassword,
            };

            await api.post(`/auth/change-password`, payload, {
            });
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            setErrors({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            toast.success('Password updated successfully');
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.detail || 'Invalid password.';
                toast.error(errorMessage);
            }
            if (error.response && error.response.status === 422) {
                const errorMessage = error.response.data.detail.msg || 'Invalid password.';
                toast.error(errorMessage);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="pb-[4rem]">
            <Toaster />
            <div className="h-[17rem] w-full relative">
                <div className="absolute inset-0 bg-black/50"></div>
                <img src="/settings.jpg" alt="settings-hero"
                    className="w-full h-full object-cover bg-cover bg-no-repeat" />
            </div>

            <div className="w-[90%] mx-auto text-primary-darkblue">
                <div className="flex items-start gap-3">
                    <div className="relative h-40 w-40 rounded-full bg-white p-2">
                        <img src="/profile.png" alt="profile"
                            className="z-[1] relative top-[-3rem] w-full h-full rounded-full object-cover border-4" />
                    </div>

                    <div>
                        <h3 className="text-2xl mt-3 font-semibold">Settings</h3>
                        <p className="text-primary-gray">user@gmail.com</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold">Password</h2>
                    <p className="mt-1 2xl:text-xl font-medium text-gray-500">
                        Please enter your current password to change your password
                    </p>

                    <form onSubmit={handlePasswordChange}>
                        <div>
                            <div className="mt-10 lg:mt-16 flex flex-col lg:flex-row lg:items-center gap-5">
                                <label className="font-medium">Current Password</label>
                               <div className="w-full lg:w-[80%]">
                               <input 
                               type="password" 
                               name="currentPassword" 
                               value={formData.currentPassword}
                                    onChange={handleChange}
                                    className={`mt-1 outline-none p-3 w-full lg:w-[60%] border border-primary-gray rounded-lg 
                                    ${errors.currentPassword && 'border border-red-500'}`} 
                                />
                                <div className="h-4 block ">
                                {errors.currentPassword && <p className="text-red-500 text-sm mt-1">
                                    {errors.currentPassword}</p>}
                                 </div>
                               </div>
                            </div>
                        </div>

                        <div>
                            <div className="mt-4 lg:mt-12 flex flex-col lg:flex-row lg:items-center gap-5">
                                <label className="font-medium">New Password</label>
                               <div className="w-full lg:w-[80%]">
                                <input type="password" name="newPassword" value={formData.newPassword}
                                        onChange={handleChange}
                                        className={`mt-1 outline-none p-3 w-full lg:w-[60%] border border-primary-gray rounded-lg 
                                            ${errors.newPassword && 'border border-red-500'}`} />
                                    <div className="h-4 block ">
                                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                                    </div>
                               </div>
                            </div>
                        </div>

                        <div>
                            <div className="mt-4 lg:mt-12 flex flex-col lg:flex-row lg:items-center gap-5">
                                <label className="font-medium">Confirm Password</label>
                                <div className="w-full lg:w-[80%]">
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`mt-1 outline-none p-3 w-full lg:w-[60%] border border-primary-gray rounded-lg 
                                            ${errors.confirmPassword && 'border border-red-500'}`} />
                                    <div className="h-4 block ">
                                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit"
                            className="mt-9 w-full lg:w-[60%] py-3 bg-primary-darkblue text-white flex items-center justify-center rounded
                                transition-colors duration-300 hover:bg-opacity-80">
                            {isSubmitting ? 
                                <RiLoader4Fill size={20} className="text-white animate-spin mx-16" />
                                : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default SettingsForm;