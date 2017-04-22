var express = require('express');
var router = express.Router();
//initializing Firebase
var firebase = require('firebase');

var config = {
  apiKey: "AAAAcxsiQoE:APA91bEs_qfkINulghkFKyT6QPqwh7Rd1Axr1GBztr4cULnXywjmoiQlUCpFy0CoXQyZ-rivyIdhB3_4PhEVKas2OQJ9_-d7Gnn1hAXm59Keduw_hXRiFssPSstPvnYOgf-wKbk1IHD5",
  authDomain: "hollywood-basement.firebaseapp.com",
  databaseURL: "https://hollywood-basement.firebaseio.com/"
};

firebase.initializeApp(config);

var ref = firebase.database().ref('user');
var id1 = ref.child('uid1');
var id2 = ref.child('uid2');

//Route to get the landing page

router.get('/', function(req, res, next) {
    console.log('The Raven that refused to sing');
    res.render('page1');
  });

// post route to sending data to database for user1

  router.post('/send1', function(req, res, next){
      var id1ref = id1.push();
      var key = id1ref.key;
      var data={};
      var message = {
        name:req.body.id1,
        isNew: true
      };
      data['/uid1'+key]=message;
      id1.push(message);
      return res.redirect('/get-data1');
      return next();
      });

      // post route to sending data to database for user2


      router.post('/send2', function(req, res, next){
          var id2ref = id2.push();
          var key = id2ref.key;
          var data={};
          var message = {
            name:req.body.id2,
            isNew: true
          };
          data['/uid2'+key]=message;
          id2.push(message);
          return res.redirect('/get-data2');
          return next();
        });



  /*router.post('/send1', function(req, res, next){
      id1.push({
        name:req.body.id1,
        isNew: true
      });
         res.redirect('/get-data1');
      });*/

  /*router.post('/send2', function(req, res, next){
      id2.push({
        name:req.body.id2,
        isNew: true
      });
        return res.redirect('/get-data2');
        return next();
      });*/

//Route to get the details of data added

router.get('/cA1', function(req, res){
      ref.child('uid1').limitToLast(1).on('child_added', function(snap){
        res.render('page1',{statement:'The last child entered-uid1 is ', value:snap.val().name});
            });
          });

          //Route to get the details of data added

router.get('/cA2', function(req, res){
      ref.child('uid2').limitToLast(1).on('child_added', function(snap){
        res.render('page1',{statement:'The last child entered-uid2 is ',value:snap.val().name});

    });
  });


  router.get('/get-data1', function(req, res, next){
      var one;
      ref.child('uid1').limitToLast(1).on('child_added', function(snap){

          key=snap.key;
          console.log(key, "\n\n");
          console.log('added to user 1', snap.val());
          two = snap.val().name;
          res.render('page3', {id1:one,flag1:snap.val().isNew,id2:'not added this time',flag2:'not available'});
        });
});

  router.get('/get-data2', function(req, res, next){
      var two;
      ref.child('uid2').limitToLast(1).on('child_added', function(snap){

          key=snap.key;
          console.log(key, "\n\n");
          console.log('added to user 2', snap.val());
          two = snap.val().name;
          res.render('page2', {id1:'none added this time',flag1:'not applicable',id2:two,flag2:snap.val().isNew});
        });
});

//Route to update isNew attribute for user 1

router.get('/load1', function(req, res, next){
  ref.child('uid1').limitToLast(1).on('child_added', function(snap){
    var one;
    key=snap.key;
    one = snap.val().name;

    var data={};
    var message = {
      name:snap.val().name,
      isNew:false
    }
    data['uid1/'+key]=message;
          ref.update(data, function(err){
            if(err)
            console.log(err);
            else {
              console.log('isNew attribute updated to false');
              res.render('page3', {id1:one,id2:'none added this time',flag1:message.isNew,flag2:'not applicable'});
            }
    });
});
});

//Route to update isNew attribute for user 1


router.get('/load2', function(req, res, next){
  ref.child('uid2').limitToLast(1).on('child_added', function(snap){
    var two;
    key=snap.key;
    two = snap.val().name;

    var data={};
    var message = {
      name:snap.val().name,
      isNew:false
    }
    data['uid2/'+key]=message;
    ref.update(data, function(err){
        if(err)
            console.log(err);
        else {
            console.log('isNew attribute updated to false');
            res.render('page2', {id1:'none added this time',id2:two, flag2:message.isNew,flag1:'not applicable'});
        }
    });
});

});
module.exports = router;
