import {Tiled2DPixiTrack} from './Tiled2DPixiTrack.js';
import {tileProxy} from './TileProxy.js';
import {heatedObjectMap} from './colormaps.js';
import slugid from 'slugid';
import {colorDomainToRgbaArray} from './utils.js';
import {colorToHex} from './utils.js';
import {scaleLinear} from 'd3-scale';
import {scaleLog} from 'd3-scale';
import {AxisPixi} from './AxisPixi.js';

const COLORBAR_MAX_HEIGHT = 200;
const COLORBAR_WIDTH = 10;
const COLORBAR_LABELS_WIDTH = 40;
const COLORBAR_MARGIN = 5;

export class HeatmapTiledPixiTrack extends Tiled2DPixiTrack {
    constructor(scene, server, uid, handleTilesetInfoReceived, options, animate) {
        /**
         * @param scene: A PIXI.js scene to draw everything to.
         * @param server: The server to pull tiles from.
         * @param uid: The data set to get the tiles from the server
         */
        super(scene, server, uid, handleTilesetInfoReceived, options, animate);


        // Graphics for drawing the colorbar
        this.pColorbarArea = new PIXI.Graphics();
        this.pMasked.addChild(this.pColorbarArea);

        this.pColorbar = new PIXI.Graphics();
        this.pColorbarArea.addChild(this.pColorbar);

        this.axis = new AxisPixi();
        this.pColorbarArea.addChild(this.axis.pAxis);

        this.scale = {};

        // [[255,255,255,0], [237,218,10,4] ...
        // a 256 element array mapping the values 0-255 to rgba values
        // not a d3 color scale for speed
        //this.colorScale = heatedObjectMap;
        this.colorScale = heatedObjectMap;

        if (options && options.colorRange) {
            this.colorScale = colorDomainToRgbaArray(options.colorRange);
        }

        this.prevOptions = '';
    }

    rerender(options) {
        super.rerender(options);

        let strOptions = JSON.stringify(options);

        if (strOptions === this.prevOptions)
            return;
        else
            this.prevOptions = strOptions;

        if (options && options.colorRange) {
            this.colorScale = colorDomainToRgbaArray(options.colorRange);
        }

        for (let tile of this.visibleAndFetchedTiles()) {
            this.initTile(tile);
        }
    }

    tileDataToCanvas(pixData) {
        let canvas = document.createElement('canvas');

        canvas.width = 256;
        canvas.height = 256;

        let ctx = canvas.getContext('2d');

        ctx.fillStyle = 'transparent';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        let pix = new ImageData(pixData, canvas.width, canvas.height);

        ctx.putImageData(pix, 0,0);

        return canvas;
    }
    
    exportData() {
    
    }

    setSpriteProperties(sprite, zoomLevel, tilePos, mirrored) {
        let {tileX, tileY, tileWidth, tileHeight} = this.getTilePosAndDimensions(zoomLevel, tilePos);

        let tileEndX = tileX + tileWidth;
        let tileEndY = tileY + tileHeight;

        let spriteWidth = this._refXScale(tileEndX) - this._refXScale(tileX) ;
        let spriteHeight = this._refYScale(tileEndY) - this._refYScale(tileY)

        sprite.width = this._refXScale(tileEndX) - this._refXScale(tileX)
        sprite.height = this._refYScale(tileEndY) - this._refYScale(tileY)

        if (mirrored) {
            // this is a mirrored tile that represents the other half of a
            // triangular matrix
            sprite.x = this._refXScale(tileY);
            sprite.y = this._refYScale(tileX);

            //sprite.pivot = [this._refXScale()[1] / 2, this._refYScale()[1] / 2];

            // I think PIXIv3 used a different method to set the pivot value
            // because the code above no longer works as of v4
            sprite.rotation = -Math.PI / 2;
            sprite.scale.x = Math.abs(sprite.scale.x) * -1;

            sprite.width = spriteHeight;
            sprite.height = spriteWidth;
        } else {
            sprite.x = this._refXScale(tileX);
            sprite.y = this._refYScale(tileY);
        }

    }


    refXScale(_) {
        super.refXScale(_);

        this.draw();
    }

    refYScale(_) {
        super.refYScale(_);

        this.draw();
    }

    draw() {
        //console.trace('drawing', this);
        super.draw();
        
        this.pColorbar.clear(); 
        // draw a colorbar

        if (!this.options.colorbarPosition || this.options.colorbarPosition == 'hidden') {
            this.pColorbarArea.visible = false;
            return;
        } 

        this.pColorbarArea.visible = true;

        if (!this.valueScale)
            return;

        let colorbarAreaHeight = Math.min(this.dimensions[1], COLORBAR_MAX_HEIGHT);
        let colorbarHeight = colorbarAreaHeight - 2 * COLORBAR_MARGIN;
        let colorbarAreaWidth = COLORBAR_WIDTH + COLORBAR_LABELS_WIDTH + 2 * COLORBAR_MARGIN;

        if (this.options.colorbarPosition == 'topLeft') {
            // draw the background for the colorbar
            this.pColorbarArea.x = this.position[0];
            this.pColorbarArea.y = this.position[1];

            this.pColorbar.y = COLORBAR_MARGIN;
            this.axis.pAxis.y = COLORBAR_MARGIN;

            if (this.options.colorbarLabelsPosition == 'inside') {
                this.axis.pAxis.x = COLORBAR_WIDTH;

                this.pColorbar.x = 0;
            } else if (this.options.colorbarLabelsPosition == 'outside') {
                this.axis.pAxis.x = COLORBAR_LABELS_WIDTH + COLORBAR_MARGIN;

                this.pColorbar.x = COLORBAR_LABELS_WIDTH + COLORBAR_MARGIN;
            }
        }

        if (this.options.colorbarPosition == 'topRight') {
            // draw the background for the colorbar
            this.pColorbarArea.x = this.position[0] + this.dimensions[0] - colorbarAreaWidth;
            this.pColorbarArea.y = this.position[1];

            this.pColorbar.y = COLORBAR_MARGIN;
            this.axis.pAxis.y = COLORBAR_MARGIN;

            if (this.options.colorbarLabelsPosition == 'outside') {
                this.axis.pAxis.x = COLORBAR_WIDTH;

                this.pColorbar.x = 0;
            } else if (this.options.colorbarLabelsPosition == 'inside') {
                this.axis.pAxis.x = COLORBAR_LABELS_WIDTH + COLORBAR_MARGIN;

                this.pColorbar.x = COLORBAR_LABELS_WIDTH + COLORBAR_MARGIN;
            }
        }

        if (this.options.colorbarPosition == 'bottomRight') {
            this.pColorbarArea.x = this.position[0] + this.dimensions[0] - COLORBAR_WIDTH;
            this.pColorbarArea.y = this.position[1] + this.dimensions[1] - colorbarHeight;
        }

        if (this.options.colorbarPosition == 'bottomLeft') {
            // draw the background for the colorbar
            this.pColorbarArea.x = this.position[0];
            this.pColorbarArea.y = this.position[1] - colorbarHeight;
        }

        this.pColorbarArea.beginFill(colorToHex('white'), 1);
        this.pColorbarArea.drawRect(0, 0, colorbarAreaWidth, colorbarAreaHeight);

        //let centerY = this.position[1] + this.dimensions[1] / 2;
        let centerY = colorbarHeight / 2;

        let xPos = 0;
        let yPos = centerY - colorbarHeight / 2; 

        let posScale = scaleLinear()
            .domain([0,255])
            .range([0,colorbarHeight])

        let colorHeight = (colorbarHeight) / 256.;

        // draw a small rectangle for each color of the colorbar
        for (let i = 0; i < 256; i++) {
            this.pColorbar.beginFill(colorToHex(`rgb(${this.colorScale[i][0]},
                                                  ${this.colorScale[i][1]},
                                                  ${this.colorScale[i][2]})`));

            //console.log('posScale(i)', posScale(i));
            this.pColorbar.drawRect(xPos, posScale(i), COLORBAR_WIDTH, colorHeight);
        }
        
        // draw an axis on the right side of the colorbar
        this.pAxis.position.x = xPos + COLORBAR_WIDTH;
        this.pAxis.position.y = posScale(0);

        let axisValueScale = this.valueScale.copy().range([colorbarHeight, 0]);

        console.log('hello');

        if (this.options.colorbarOrientation == 'vertical') {
            if (this.options.colorbarPosition == 'topLeft'
                || this.options.colorbarPosition == 'bottomLeft') {
                if (this.options.colorbarLabelsPosition == 'inside') {
                    this.axis.drawAxisRight(axisValueScale, colorbarHeight - 2 * COLORBAR_MARGIN);
                } else {
                    this.axis.drawAxisLeft(axisValueScale, colorbarHeight - 2 * COLORBAR_MARGIN);
                }
            } else if (this.options.colorbarPosition == 'topRight'
                       || this.options.colorbarPosition == 'bottomRight') {
                if (this.options.colorbarLabelsPosition == 'inside') {
                    this.axis.drawAxisLeft(axisValueScale, colorbarHeight);
                } else {
                    this.axis.drawAxisRight(axisValueScale, colorbarHeight);
                }
            } 
        }
    }

    initTile(tile) {
        /**
         * Convert the raw tile data to a rendered array of values which can be represented as a sprite.
         *
         * @param tile: The data structure containing all the tile information. Relevant to
         *              this function are tile.tileData = {'dense': [...], ...}
         *              and tile.graphics
         */
        this.scale.minValue = this.minVisibleValue();
        this.scale.maxValue = this.maxVisibleValue();

        this.valueScale = scaleLog().range([254,0])
            .domain([this.scale.minValue, this.scale.minValue + this.scale.maxValue])

        tileProxy.tileDataToPixData(tile,
                                    this.valueScale,
                                    this.valueScale.domain()[0], //used as a pseudocount to prevent taking the log of 0
                                    this.colorScale,
                                    function(pixData) {
            // the tileData has been converted to pixData by the worker script and needs to be loaded
            // as a sprite
            let graphics = tile.graphics;
            let canvas = this.tileDataToCanvas(pixData);

            let sprite = null;

            sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas, PIXI.SCALE_MODES.NEAREST));
            /*
            if (tile.tileData.zoomLevel == this.maxZoom)
                sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas, PIXI.SCALE_MODES.NEAREST));
            else
                sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
                */

            tile.sprite = sprite;

            // store the pixData so that we can export it
            tile.canvas = canvas;
            this.setSpriteProperties(tile.sprite, tile.tileData.zoomLevel, tile.tileData.tilePos, tile.mirrored);

            graphics.removeChildren();
            graphics.addChild(tile.sprite);
        }.bind(this));

    }

    refScalesChanged(refXScale, refYScale) {
        super.refScalesChanged(refXScale, refYScale);

        for (let uid in this.fetchedTiles) {
            let tile = this.fetchedTiles[uid];

            if (tile.sprite) {
                this.setSpriteProperties(tile.sprite, tile.tileData.zoomLevel, tile.tileData.tilePos, tile.mirrored);
            } else {
                // console.log('skipping...', tile.tileId);
            }
        }
    }

    /*
    exportSVG() {
        let svg = `<g transform="translate(${this.pMain.position.x},${this.pMain.position.y})
                                 scale(${this.pMain.scale.x},${this.pMain.scale.y})">`
        for (let tile of this.visibleAndFetchedTiles()) {
            //console.log('sprite:', tile.canvas.toDataURL());
            let rotation = tile.sprite.rotation * 180 / Math.PI;

            svg += `<g
                    transform="translate(${tile.sprite.x}, ${tile.sprite.y})
                               rotate(${rotation})
                               scale(${tile.sprite.scale.x},${tile.sprite.scale.y})"
                >`;
            svg += '<image xlink:href="' + tile.canvas.toDataURL() + '"/>';
            svg += "</g>";
        }

        svg += '</g>';
        return svg;
    }
    */

    exportSVG() {
        let track=null, base=null;

        if (super.exportSVG) {
            [base, track] = super.exportSVG();
        } else {
            base = document.createElement('g');
            track = base;
        }

        let output = document.createElement('g');
        track.appendChild(output);

        output.setAttribute('transform',
                            `translate(${this.pMain.position.x},${this.pMain.position.y})
                             scale(${this.pMain.scale.x},${this.pMain.scale.y})`)

        for (let tile of this.visibleAndFetchedTiles()) {
            //console.log('sprite:', tile.canvas.toDataURL());
            let rotation = tile.sprite.rotation * 180 / Math.PI;
            let g = document.createElement('g');
            g.setAttribute('transform', 
                            `translate(${tile.sprite.x}, ${tile.sprite.y})
                               rotate(${rotation})
                               scale(${tile.sprite.scale.x},${tile.sprite.scale.y})`);


            let image = document.createElement('image');
            image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', tile.canvas.toDataURL());
            image.setAttribute('width', 256);
            image.setAttribute('height', 256);

            g.appendChild(image);
            output.appendChild(g);
        }

        return [base, base];
    }
}
