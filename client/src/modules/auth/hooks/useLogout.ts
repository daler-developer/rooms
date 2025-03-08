const useLogout = () => {
  return () => {
    localStorage.removeItem("token");
    location.href = "/login";
  };
};

export default useLogout;
