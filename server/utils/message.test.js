
var {generateMessage,generateLocationMessage}  = require('./message');

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

});

describe('generateLocationMessage' , () =>{

    test('should generate correct location object', () =>{
        var from = 'arash';
        var latitude = 12;
        var longitude = 23;
        var url = 'https://www.google.com/maps?q=12,23';
        var message = generateLocationMessage(from , latitude,longitude );

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            url
        });
    })

});