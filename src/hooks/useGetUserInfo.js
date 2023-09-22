export const useGetUserInfo = () => {
    const { name, profilePhoto, userID, isAuth } =
        JSON.parse(localStorage.getItem("auth")) || {};

    return { name, profilePhoto, userID, isAuth };
};
//    return { name, profilePhoto, userID, isAuth } this type statement is flexible, sometimes i only need name, userID 