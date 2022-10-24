export default function authHeader() {
    let user = '';
    user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {

        return { authorization: user.token };

    } else {
        return {};
    }
}