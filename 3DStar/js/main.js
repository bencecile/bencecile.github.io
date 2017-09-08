angular.module("star", []).controller("starCont", function() {
    this.numPoints = 5;
    this.radius = 100;
    this.colour = "#000000";
    
    //Find the canvas's context
    this.canvas = document.getElementById("starCanvas");
    this.drawCont = this.canvas.getContext("2d");
    this.canvas.width = 0;
    this.canvas.height = 0;
    
    this.makeStar = function  makeStar () {
        this.canvas.width = this.radius*2;
        this.canvas.height = this.radius*2;
        this.drawCont.fillStyle = this.colour;
        //Clear the canvas
        this.drawCont.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        //Find all of the vertices
        var numVertex = this.numPoints*2;
        var vertices = [];
        
        for (var i = 0; i < numVertex; i++) {
            var angle = (i/numVertex)*2*Math.PI;
            
            if (i%2 == 1) {
                var r = this.radius*0.3;
            } else {
                var r = this.radius;
            }
            
            vertices[i] = [Math.floor(Math.cos(angle)*r+this.radius), Math.floor(Math.sin(angle)*r+this.radius)];
        }
        
        //Draw all of the triangles
        for (var i = 0; i < numVertex; i++) {
            this.drawTriangle(vertices[i], vertices[(i+1)%numVertex], [this.radius, this.radius], i%2 == 0);
        }
    };
    
    this.drawTriangle = function drawTriangle (point1, point2, point3, fill) {
        console.log(point1, point2, point3, fill);
        this.drawCont.beginPath();
        this.drawCont.lineWidth = "1";
        this.drawCont.moveTo(point1[0], point1[1]);
        this.drawCont.lineTo(point2[0], point2[1]);
        this.drawCont.lineTo(point3[0], point3[1]);
        this.drawCont.closePath();

        if (fill) {
            this.drawCont.fill();
        } else {
            this.drawCont.stroke();
        }
    }; 
});