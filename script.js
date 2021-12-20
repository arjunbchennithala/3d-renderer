var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const canvaswidth = 1200;
const canvasheight = 800;



class Vertex3D {
        constructor(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
        }
}

class Vertex2D {
        constructor(x, y) {
                this.x = x;
                this.y = y;
        }
}

class Cube {
        constructor(x ,y, z, size) {
                this.vertices = [
                        new Vertex3D(x, y, z),
                        new Vertex3D(x+size, y, z),
                        new Vertex3D(x, y+size, z),
                        new Vertex3D(x+size, y+size, z),

                        new Vertex3D(x, y, z+size),
                        new Vertex3D(x+size, y, z+size),
                        new Vertex3D(x, y+size, z+size),
                        new Vertex3D(x+size, y+size, z+size)
                ];
        }
}



class Cube2d {
        constructor(x, y) {
                this.vertices = [
                        new Vertex2D(x, y),
                        new Vertex2D(x, y),
                        new Vertex2D(x, y),
                        new Vertex2D(x, y),

                        new Vertex2D(x, y),
                        new Vertex2D(x, y),
                        new Vertex2D(x, y),
                        new Vertex2D(x, y)
                ];
        }
}


var angle = 0.025;


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
        [0, 1, 0],
        [0, 0, 1]
];

var colors = ["blue", "red", "green", "orange"];

function mul3d(a, b) {
        var sum = 0;
        var vertexx = new Vertex3D(0, 0, 0);
        for(var i=0; i<a.length; i++) {
                sum = 0;
                for(var j=0; j<3;j++) {
                        if(j==0) {
                                sum += a[i][j] * b.x;
                        }else if(j==1){
                                sum += a[i][j] * b.y;
                        }else if(j==2){
                                sum += a[i][j] * b.z;
                        }
                }
                if(i==0) {
                        vertexx.x = sum;
                }else if(i==1){
                        vertexx.y = sum;
                }else if(i==2){
                        vertexx.z = sum;
                }
        }
        return vertexx;
}

function mul2d(a, b) {
        var sum = 0;
        var vertexx = new Vertex2D(0,0);
        for(var i=0; i<a.length; i++) {
                sum = 0;
                for(var j=0; j<3; j++) {
                        if(j==0) {
                                sum += a[i][j] * b.x;
                        }else if(j==1){
                                sum += a[i][j] * b.y;
                        }else if(j==2){
                                sum += a[i][j] * b.z;
                        }
                }
                if(i==0) {
                        vertexx.x = sum;
                }else if(i==1){
                        vertexx.y = sum;
                }
        }
        return vertexx;
}

function orthoprojection() {   
        ctx.clearRect(0, 0, canvaswidth, canvasheight);
        for(var i=0; i<cube.vertices.length; i++) {
                ctx.beginPath();
                cube2d.vertices[i] = mul2d(orthoproject, cube.vertices[i]);
                ctx.arc(cube2d.vertices[i].x, cube2d.vertices[i].y, 6, 0, Math.PI * 2);
                ctx.fillStyle = colors[i%4];
                ctx.fill();
        }
        
}



function perspectivprojection() {
        ctx.clearRect(0, 0, canvaswidth, canvasheight);
        var distance = 100;
        for(var i=0; i<8;i++) {
                ctx.beginPath();
                var z = 1 / (distance - cube.vertices[i].z);
                var perspectiveproject = [
                        [z, 0, 0],
                        [0, z, 0]
                ]
                cube2d.vertices[i] = mul2d(perspectiveproject, cube.vertices[i]);
                ctx.arc(cube2d.vertices[i].x, cube2d.vertices[i].y, 6, 0, Math.PI * 2, true );
                ctx.fillStyle = colors[i%4];
                ctx.fill();

        }
}

function drawlines() {
        ctx.moveTo(cube2d.vertices[0].x, cube2d.vertices[0].y);
        ctx.lineTo(cube2d.vertices[1].x, cube2d.vertices[1].y);
        ctx.lineTo(cube2d.vertices[3].x, cube2d.vertices[3].y);
        ctx.lineTo(cube2d.vertices[2].x, cube2d.vertices[2].y);
        ctx.lineTo(cube2d.vertices[0].x, cube2d.vertices[0].y);

        ctx.fill();

        ctx.lineTo(cube2d.vertices[4].x, cube2d.vertices[4].y);
        ctx.lineTo(cube2d.vertices[6].x, cube2d.vertices[6].y);
        ctx.lineTo(cube2d.vertices[7].x, cube2d.vertices[7].y);
        ctx.lineTo(cube2d.vertices[5].x, cube2d.vertices[5].y);
        ctx.lineTo(cube2d.vertices[4].x, cube2d.vertices[4].y);
        ctx.lineTo(cube2d.vertices[6].x, cube2d.vertices[6].y);
        ctx.lineTo(cube2d.vertices[2].x, cube2d.vertices[2].y);
        ctx.moveTo(cube2d.vertices[1].x, cube2d.vertices[1].y);
        ctx.lineTo(cube2d.vertices[5].x, cube2d.vertices[5].y);
        ctx.moveTo(cube2d.vertices[3].x, cube2d.vertices[3].y);
        ctx.lineTo(cube2d.vertices[7].x, cube2d.vertices[7].y);

        ctx.stroke();
}

var cube = new Cube(300, 300 , 5, 100);

var cube2d = new Cube2d(0,0);

function animate() {
        for(var i=0; i<cube.vertices.length;i++) {
                //cube.vertices[i] = mul3d(rotateZ, cube.vertices[i]);
                cube.vertices[i] = mul3d(rotateY, cube.vertices[i]);
                cube.vertices[i] = mul3d(rotateX, cube.vertices[i]);
        }
        orthoprojection();
        drawlines();
        //perspectivprojection(cube);
        setTimeout(animate, 20);
}

animate();








