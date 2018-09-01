describe("My first jasmine specification test",function(){
    it("should say hello and fail!",function(){
        console.log("Hello, Jasmine!");
        throw new Error();

    });
})