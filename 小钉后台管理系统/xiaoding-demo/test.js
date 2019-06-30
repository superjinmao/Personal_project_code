let obj = {
    fn:function (a,callback) {
        let result = a;
        callback&&callback(result);
        console.dir(callback)
    }
};

obj.fn(100,function (data) {
    console.log(data)
});

