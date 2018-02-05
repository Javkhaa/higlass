import {mix, Mixin} from 'mixwith';

import PixiTrack from './PixiTrack.js';
import { colorToHex } from './utils';
import { RuleMixin } from './RuleMixin';

import SVGTrack from './SVGTrack.js';

export const HorizontalRuleMixin = Mixin((superclass) => class extends superclass {
  drawHorizontalRule(graphics) {
    const strokeWidth = 1;

    let stroke = colorToHex('black');

    if (this.highlighted) {
      stroke = colorToHex('red');
    }

    graphics.lineStyle(2, stroke, 1);

    let pos = 0;

    let dashLength = 5;
    let dashGap = 3;

    // console.log('this._yScale.range()', this._yScale.range());

    while (pos < this.dimensions[0]) {
      graphics.moveTo(pos, this._yScale(this.yPosition));
      graphics.lineTo(pos + dashLength, this._yScale(this.yPosition));

      pos += dashLength + dashGap;
    }
  }

  isMouseOverHorizontalLine(mousePos) {
      if (Math.abs(mousePos.y - this.position[1] - this._yScale(this.yPosition)) < this.MOUSEOVER_RADIUS) {
        return true;
      }
    return false;
  }
});

export class HorizontalD3Rule extends SVGTrack {
  constructor(svgElement, yPosition, options, animate) {
    super(svgElement);

    this.yPosition = yPosition;
    this.gLine = this.gMain.append('line');
  }


  mouseMoveHandler(mousePos) {
    if (this.isWithin(mousePos.x, mousePos.y) &&
      this.isMouseOverHorizontalLine(mousePos)) {
        this.highlighted = true;
        this.draw();
        return;
    }

    this.highlighted = false;
    this.draw();
  }

  draw() {
    console.log('draw:', this.position[0]);

    this.gLine
      .attr('x1', 0)
      .attr('y1', this._yScale(this.yPosition))
      .attr('x2', this.dimensions[0])
      .attr('y2', this._yScale(this.yPosition))
      .attr('stroke', 'black')
      .attr('width', 2)

      /*
    const graphics = this.pMain;
    graphics.clear();

    this.drawHorizontalRule(graphics);
    this.animate();
    */
  }

  zoomed(newXScale, newYScale) {
    super.zoomed(newXScale, newYScale);

    this.draw();
  }
}

export default HorizontalD3Rule;
