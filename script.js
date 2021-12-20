var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class vertex {
        constructor(x, y, z) {
                this.location = [x, y, z];
        }
}


var canvaswidth = 1200;
var canvasheight = 800;

var x = 100;
var y = 100;
var width = 100;
var height = 100;
var width2 = 100;
var zindex = 0;


var cube = [
        new vertex(x, y, zindex),  //0 left top
        new vertex(x, y+height, zindex),  //1 left bottom
        new vertex(x+width, y, zindex),  //2 right top
        new vertex(x+width, y+height, zindex),  //3 right bottom

        new vertex(x, y, zindex+width2), //4 left top
        new vertex(x, y+height, zindex + width2), //5 left bottom 
        new vertex(x+width, y, zindex + width2), //6 right top
        new vertex(x+width, y+height, zindex + width2)  //7 right bottom
];

var angle = 0.01;

var rotateX = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
];

var rotateY = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
];

var rotateZ = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
];

var orthoproject = [
        [1, 0, 0],
        [0, 1, 0]
];

function matmul(a, b) {
        var sum ;
        var rowA = a.length;
        var colB = b[0].length;
        var colA = a[0].length;
        var rowB = b.length;


        if(colA != rowB) {
                console.log("Number of columns in first array and number of rows in second array are different.");
                return null;
        }

        colB = (colB == undefined) ? 1 : colB;

        var mul = new Array(rowA).fill(0).map(() => new Array(colB).fill(0));
       
        for(var i=0; i<rowA; i++) {
                for(var j=0; j<colB; j++) {
                        sum = 0;
                        for(var k=0; k<colA; k++) {
                                if(colB < 2)
                                        sum += a[i][k] * b[k];
                                else
                                        sum += a[i][k] * b[k][j];
                        }
                        mul[i][j] = sum;
                }
        }
        return mul;
}


function animate() {
        for(var i=0; i<8; i++) {
               var rotated = matmul(rotateX, cube[i].location);
               rotated = matmul(rotateY, rotated);
               //rotated = matmul(rotateZ, rotated);

               cube[i].location = rotated;
        }
        
        ctx.clearRect(0, 0, canvaswidth, canvasheight );
        var colors = ["red", "blue", "green", "orange"];
        var projected;
        for(var i=0; i<8; i++) {
                ctx.beginPath();
                projected = matmul(orthoproject, cube[i].location);
                ctx.arc(projected[0], projected[1], 6, 0, Math.PI * 2, true);
                ctx.fillStyle = colors[i%4];
                ctx.fill();
        }

        ctx.beginPath();
        ctx.moveTo(cube[0].location[0], cube[0].location[1]);
        ctx.lineTo(cube[1].location[0], cube[1].location[1]);
        ctx.lineTo(cube[3].location[0], cube[3].location[1]);
        ctx.lineTo(cube[2].location[0], cube[2].location[1]);
        ctx.lineTo(cube[0].location[0], cube[0].location[1]);


        ctx.moveTo(cube[4].location[0], cube[4].location[1]);
        ctx.lineTo(cube[5].location[0], cube[5].location[1]);
        ctx.lineTo(cube[7].location[0], cube[7].location[1]);
        ctx.lineTo(cube[6].location[0], cube[6].location[1]);
        ctx.lineTo(cube[4].location[0], cube[4].location[1]);

        ctx.moveTo(cube[0].location[0], cube[0].location[1]);
        ctx.lineTo(cube[4].location[0], cube[4].location[1]);

        ctx.moveTo(cube[1].location[0], cube[1].location[1]);
        ctx.lineTo(cube[5].location[0], cube[5].location[1]);

        ctx.moveTo(cube[2].location[0], cube[2].location[1]);
        ctx.lineTo(cube[6].location[0], cube[6].location[1]);

        ctx.moveTo(cube[3].location[0], cube[3].location[1]);
        ctx.lineTo(cube[7].location[0], cube[7].location[1]);

        ctx.stroke();

        setTimeout(animate, 10);
}

animate();







