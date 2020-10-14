function serializeToJson(form) {
    var result = {};
    //获取到表单中输入的内容
    var f = form.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value;
    })
    return result;
}