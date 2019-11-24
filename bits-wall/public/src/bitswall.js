//Mock
channelId = 1;

class BitsWall{
    constructor(){
        this.timestamp = 1;
        this.channelId = 1;
        this.bricks = [];
    }
}

// Your web app's Firebase configuration
let firebaseConfig = require('../firebase-config.json');
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        console.log('login');
    }else console.log('Only login');
});
firebase.auth().signInWithEmailAndPassword(USER_EMAIL, USER_PASSWORD).catch(function(error) {});
let database = firebase.database();
let bitsWallRef = firebase.database().ref(`bitsWalls/${channelId}`);
let bitsWall;
bitsWallRef.on('value', function (snapshot) {
    let newBitsWall = snapshot.val();
    console.log(newBitsWall);
    return;
    let bricks = newBitsWall.bricks;
    if(!bitsWall){
        bitsWall = newBitsWall;
        return;
    }

    //Check same bitsWall
    let isSameBitsWall = true;
    if(!isSameBitsWall){
        bitsWall = newBitsWall;
        return;
    }

    //Find explored bricks
    let exploredBricks = [];
    for (let brickId in bricks) {
        if(bricks[id].active === false && bitsWall === true){
            exploredBricks.push(bricks[brickId]);
        }
    }

    bitsWall = newBitsWall;
    handleReflash(bitsWall.bricks);
    drawBurst(bricks, exploredBricks);
});

function breakBrick(brickId) {
    bitsWall.bricks[brickId].active = false;
    bitsWallRef.update(bitsWall);
}

function updateBitsWall(bitsWall){
    bitsWallRef.update(bitsWall);
}



