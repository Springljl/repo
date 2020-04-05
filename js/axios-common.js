axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    switch (error.response.status) {
        case 401: console.log("需登录"); break;
        case 403: console.log("无权访问"); break;
        case 404: console.log("路径未找到"); break;
        case 500: console.log("服务器错误"); break;
    }
});