interface IRegisterFormFields {
  name: string;
  phone: string;
  password: string;
  confirmedPassword: string;
  otpCode: string;
  referralCode?: string;
}

interface ILoginFormFields {
  phone: string;
  password: string;
}

interface IOtpFormFields {
  phone: string;
  otpCode: string;
}

interface IForgotPasswordFormFields {
  phone: string;
}

interface IResetPasswordFormFields {
  password: string;
  confirmedPassword: string;
  phone: string;
  otpCode: string;
}

interface IChangePasswordFormFields {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface ProfileFormFields {
  phone: string;
  password: string;
  gender: number;
  hometown: string;
  birthday: string;
  companyAddress: string;
  company: number | undefined;
  companyName: string;
  role: string;
  career: string;
  startTime: string;
  careerName: string;
  roleName: string;
}

export type {
  IRegisterFormFields,
  ILoginFormFields,
  IOtpFormFields,
  IForgotPasswordFormFields,
  IResetPasswordFormFields,
  ProfileFormFields,
  IChangePasswordFormFields,
};
