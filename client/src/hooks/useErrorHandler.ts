import { useNavigate } from "react-router-dom";
import CONSTANT from "../constant";
import { toast } from "react-toastify";

const useErrorHandler = () => {
  const navigate = useNavigate();

  const errorHandler = (error: any) => {
    const {
      response: { status, data },
    } = error;

    const message = data.message || CONSTANT.ERROR_MESSAGE.SERVER;

    if (message === CONSTANT.ERROR_MESSAGE.REFRESH_TOKEN) {
      navigate("/auth");
    }

    toast.error(message);
    return;
  };

  return errorHandler;
};

export default useErrorHandler;
