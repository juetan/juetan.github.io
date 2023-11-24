---
title: 基于 transform 的 translate 和 scale 属性进行平移和缩放(基于光标位置)
date: 2023-10-24 11:44:00
---

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      .box {
        width: 800px;
        height: 400px;
        background-color: #fafafa;
        margin: 8px auto;
        overflow: hidden;
      }
      .scene {
        position: relative;
        width: 1440px;
        height: 900px;
        background-color: #3c9;
        transform-origin: 50% 50%;
      }
      .item {
        width: 60px;
        height: 30px;
        background-color: #09f;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="scene">
        <div class="item"></div>
      </div>
    </div>
    <script>
      // https://stackoverflow.com/questions/70210288/zoom-image-in-out-on-mouse-point-using-wheel-with-transform-origin-center-need
      class Scene {
        startX = 0;
        startY = 0;
        cacheX = 0;
        cacheY = 0;
        x = 0;
        y = 0;
        zoom = 1;

        constructor(el) {
          this.el = el;
          this.onMouseDown = this.onMouseDown.bind(this);
          this.onMouseMove = this.onMouseMove.bind(this);
          this.onMouseUp = this.onMouseUp.bind(this);
          this.onMouseWheel = this.onMouseWheel.bind(this);
          this.el.addEventListener('mousedown', this.onMouseDown);
          this.el.addEventListener('wheel', this.onMouseWheel);
        }

        onMouseDown(e) {
          this.startX = e.x;
          this.startY = e.y;
          this.cacheX = this.x;
          this.cacheY = this.y;
          window.addEventListener('mousemove', this.onMouseMove);
          window.addEventListener('mouseup', this.onMouseUp);
        }

        onMouseMove(e) {
          this.x = this.cacheX + e.x - this.startX;
          this.y = this.cacheY + e.y - this.startY;
          this.setTransform();
        }

        onMouseUp() {
          window.removeEventListener('mousemove', this.onMouseMove);
          window.removeEventListener('mouseup', this.onMouseUp);
        }

        setTransform() {
          this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale(${this.zoom})`;
        }

        onMouseWheel(e) {
          e.preventDefault();

          const rect = this.el.getBoundingClientRect();
          const x = (e.clientX - rect.x) / this.zoom;
          const y = (e.clientY - rect.y) / this.zoom;
          const delta = -event.deltaY > 0 ? 0.1 : -0.1;

          this.zoom += delta;
          if (this.zoom < 0.1) {
            this.zoom = 0.1;
          }
          if (this.zoom > 10) {
            this.zoom = 10;
          }

          this.x += -x * delta + this.el.offsetWidth * (delta / 2);
          this.y += -y * delta + this.el.offsetHeight * (delta / 2);
          this.setTransform();
        }
      }
      new Scene(document.querySelector('.scene'));
    </script>
  </body>
</html>
```