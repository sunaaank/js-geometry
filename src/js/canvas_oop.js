/*  HTML
<canvas id="game" width="640" height="480" style="border:1px solid #000000"></canvas>

*/

// Game 이라는 클래스는 canvas에 나타낼 사항들을 관리하는 책임(화면 관리자)
//Game 클래스(화면관리자): 게임에 필요한 데이터 불러와 화면에 띄워줌
class Game {
  constructor() {
    this.canvas = document.getElementById('game');
    this.context = this.canvas.getContext('2d');
    // 이미지를 불러올 내장객체를 넣어줌.
    // Image 클래스: 이미지 데이터의 기능을 제어
    this.spriteImg = new Image();
    this.spriteImg.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdwyb2yliOsvEfUOMBNB-zQzA-ssdONhzyNA&usqp=CAU';

    const game = this;
    this.spriteImg.onload = function () {
      const options = {
        context: game.context,
        height: this.height,
        width: this.width,
        image: this,
      };

      game.sprite = new Sprite(options);
      game.sprite.render();
    };
  }
}

// Sprite 클래스: 핵심 기능: 이미지 객체를 화면에 보여줌(렌더링)
class Sprite {
  constructor(options) {
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
  }

  render() {
    this.context.drawImage(this.image, 200, 100);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const game = new Game();
});
