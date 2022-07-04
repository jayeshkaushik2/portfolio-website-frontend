function NotifyDataMsg(msg) {
    let temp =  window.confirm(`${msg} Data?`)
    if (temp === true){
        return true
    }
    else{
        return false
    }
}

export default NotifyDataMsg;