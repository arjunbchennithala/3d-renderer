var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

const canvaswidth = 1200;
const canvasheight = 800;


class Point3D {
        constructor(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
        }
}

class Point2D {
        constructor(x, y){
                this.x = x;
                this.y = y;
        }
}

class Cube {
        constructor(x, y, z, size){
                var d = size/2;
                this.x = x;
                this.y = y;
                this.z = z;
                this.points = [
                        new Point3D(x-d, y-d, z-d), //Front Left Top      0
                        new Point3D(x-d, y-d, z+d), //Back Left Top       1
                        new Point3D(x+d, y-d, z-d), //Front Right Top     2
                        new Point3D(x+d, y-d, z+d), //Back Right Top      3
                        new Point3D(x-d, y+d, z-d), //Front Left Bottom   4
                        new Point3D(x-d, y+d, z+d), //Back Left Bottom    5 
                        new Point3D(x+d, y+d, z-d), //Front Right Bottom  6
                        new Point3D(x+d, y+d, z+d)  //Back Right Bottom   7
                ];

                this.faces = [
                        [this.points[0], this.points[2], this.points[6], this.points[4]], //Front
                        [this.points[1], this.points[3], this.points[7], this.points[5]], //Back
                        [this.points[0], this.points[1], this.points[5], this.points[4]], //Left
                        [this.points[2], this.points[3], this.points[7], this.points[6]], //Right
                        [this.points[0], this.points[1], this.points[3], this.points[2]], //Top
                        [this.points[4], this.points[5], this.points[7], this.points[6]]  //Bottom
                ];
        }


        rotateX(angle) {
                var ct = Math.cos(angle);
                var st = Math.sin(angle);
                for(var i=0; i<this.faces.length;i++) {
                        for(var j=0; j<this.faces[i].length;j++) {
                                var y = this.faces[i][j].y - this.y;
                                var z = this.faces[i][j].z - this.z;

                                this.faces[i][j].y = ct * y - st * z + this.y;
                                this.faces[i][j].z = st * y + ct * z + this.z;
                        }        
                }
        }

        rotateY(angle) {
                var ct = Math.cos(angle);
                var st = Math.sin(angle);
                for(var i=0; i<this.faces.length;i++) {
                        for(var j=0; j<this.faces[i].length;j++) {
                                var x = this.faces[i][j].x - this.x;
                                var z = this.faces[i][j].z - this.z;

                                this.faces[i][j].x = ct * x - st * z + this.x;
                                this.faces[i][j].z = st * x + ct * z + this.z;
                        }        
                }
        }

        rotateZ(angle) {
                var ct = Math.cos(angle);
                var st = Math.sin(angle);
                for(var i=0; i<this.faces.length;i++) {
                        for(var j=0; j<this.faces[i].length;j++) {
                                var x = this.faces[i][j].x - this.x;
                                var y = this.faces[i][j].y - this.y;

                                this.faces[i][j].x = ct * x - st * y + this.x;
                                this.faces[i][j].y = st * x + ct * y + this.y;
                        }        
                }
        }
}

function project(points) {
        return new Point2D(points.x, points.y);
}

function render(object) {
        for(var i=0; i<object.faces.length; i++) {
                for(var j=0; j<object.faces[i].length; j++) {
                        ctx.beginPath();
                        p = project(object.faces[i][j]);
                        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.moveTo(p.x, p.y);
                        p = project(object.faces[i][(j+1)%4]);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                }
        }
}




var cube = new Cube(100, 100, 100, 100);
function animate(){
        ctx.clearRect(0,0,canvaswidth, canvasheight);
        render(cube);
        var theta = 0.010;
        cube.rotateX(theta);
        cube.rotateY(theta);
        cube.rotateZ(theta);
        setTimeout(animate, 20);
}

animate();