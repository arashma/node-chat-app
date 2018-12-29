var {isRealString} = require('./validation');


describe('isRealString' , () =>{
    it('should rejects non-string values ' , () =>{
       var res = isRealString(98);
       expect(res).toBe(false);
    });

    it('should reject string with only space ' , () =>{
        var res = isRealString('  ');
        expect(res).toBe(false);
    })

    it('should allow string with non-space characters ' , () =>{
        var res = isRealString(' arash ');
        expect(res).toBe(true);
    })
})