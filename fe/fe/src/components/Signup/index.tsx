import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IUser } from "../../../../interface/auth";
import { useSignupMutation } from "../../../../api/auth";
import { notification } from "antd";
import { signupSchema } from "@/schemas/login";
type NotificationType = "success" | "info" | "warning" | "error";
const Signup = () => {
  const { handleSubmit, register, setError, formState } = useForm<IUser>();
  const navigate = useNavigate();

  const [signup] = useSignupMutation();
  const openNotification = (type: NotificationType, message: string) => {
    notification[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const onSubmit = async (data: IUser) => {
    try {
      await signupSchema.validateAsync(data, { abortEarly: false });

      const res = await signup(data).unwrap();

      if (res?.data) {
        openNotification("success", "Đăng ký thành công");
        console.log("Đăng ký thành công");
        navigate("/signin");
      } else {
        openNotification("warning", "Đăng ký không thành công");
        console.log("Đăng ký không thành công. Messages:", res.messages);
      }
    } catch (error) {
      if (error.details) {
        error.details.forEach((detail: any) => {
          setError(detail.path[0], {
            type: "manual",
            message: detail.message,
          });
        });
      }
    }
  };

  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
        defer
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>
      <style>
        @import
        url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
      </style>

      <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-black rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-black py-10 px-10">
              <img
                src="https://bouncin.net/storage/posts/1345/YFyAqfIwqKJ1SVW9M11UqRRZjpnIdYLJQgYTzDpf.jpeg"
                className=""
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900 mb-5">
                  Đăng ký
                </h1>
                <p>Nhập thông tin của bạn để đăng ký</p>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Họ và tên
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập họ và tên"
                          id="fullname"
                          {...register("fullname")}
                        />
                      </div>
                      {formState.errors.fullname && (
                        <p className="text-red-500">
                          {formState.errors.fullname.message}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Tên tài khoản
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập tên tài khoản"
                          id="username"
                          {...register("username")}
                        />
                      </div>
                      {formState.errors.username && (
                        <p className="text-red-500">
                          {formState.errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Số điện thoại
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập số điện thoại"
                          id="phone"
                          {...register("phone")}
                        />
                      </div>
                      {formState.errors.phone && (
                        <p className="text-red-500">
                          {formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Địa chỉ
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập địa chỉ"
                          id="address"
                          {...register("address")}
                        />
                      </div>
                      {formState.errors.address && (
                        <p className="text-red-500">
                          {formState.errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập email có dạng johnsmith@example.com"
                          id="email"
                          {...register("email")}
                        />
                      </div>
                      {formState.errors.email && (
                        <p className="text-red-500">
                          {formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Mật khẩu
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập mật khẩu"
                          id="password"
                          {...register("password")}
                        />
                      </div>
                      {formState.errors.password && (
                        <p className="text-red-500">
                          {formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Xác nhận mật khẩu
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập lại mật khẩu"
                          {...register("confirmPassword")}
                        />
                      </div>
                      {formState.errors.confirmPassword && (
                        <p className="text-red-500">
                          {formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3 mt-5">
                    <div className="w-full px-3 mb-5">
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-slate-900 text-white w-full py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex -mx-3 mt-3">
                  <div className="w-full px-3 mb-5 text-center text-black hover:text-blue-400">
                    <Link to="/signin">
                      Bạn có muốn chuyển sang trang đăng nhập?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
