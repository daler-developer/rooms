import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const useTypedDispatch = (): AppDispatch => {
  return useDispatch();
};

export default useTypedDispatch;
