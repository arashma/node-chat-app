
var {generateMessage}  = require('./message');

describe('generateMessage' , () =>{

    test('should generate correct message object', () =>{
        var from = 'arash';
        var text = 'some message';
        var message = generateMessage(from , text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    })

})