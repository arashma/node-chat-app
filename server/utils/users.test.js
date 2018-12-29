var {Users} = require('./users');



describe('Users' , () =>{

  var  users;
    beforeEach(()=>{
       users = new Users();
        users.users = [{
            id:'1',
            name:'arash',
            room:'The Office'
        },{
            id:'2',
            name:'Ali',
            room:'The park'
        },{
            id:'3',
            name:'reza',
            room:'The Office'
        }];
    });


    it('should add new user' , () =>{
        var users = new Users();
        var user = {
            id:'123',
            name:'arash',
            room:'The Office'
        };
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    
    it('should remove user' , () =>{
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove user' , () =>{
        var userId = '90';
        var user = users.removeUser(userId);
  
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user' , () =>{
      var userId = '2';
      var user = users.getUser(userId);

      expect(user.id).toBe(userId);
    });

    it('should not find user' , () =>{
     var userId = '99';
     var user = users.getUser(userId);

     expect(user).toBeFalsy();
    });

    it('should return names for The Office ' , () =>{
        var usersList = users.getUserList('The Office');

        expect(usersList).toEqual(['arash','reza']);
    });


    it('should return names for The park ' , () =>{
        var usersList = users.getUserList('The park');

        expect(usersList).toEqual(['Ali']);
    })
})