export const checkLogin = () => {
    const login = JSON.parse(localStorage.getItem('loggedInUser'));
    if (login){
        return {
            isLoggedIn: true,
            userName:login.name,
            isAdmin: login.role === 'admin'
        }
    }
    return {
    isLoggedIn :false,
    userName: '',
    isAdmin: false
    }
}