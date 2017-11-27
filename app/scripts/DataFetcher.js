import slugid from 'slugid';
import {dictKeys, dictValues} from './utils';

// Services
import { tileProxy } from './services';
import {
  minNonZero,
  maxNonZero,
} from './worker';

export default class DataFetcher {
  constructor(dataConfig) {
    //console.log('data fetcher config:',  dataConfig);
    this.tilesetInfoLoading = true;
    this.dataConfig = dataConfig;
    this.uuid = slugid.nice();

    if (this.dataConfig.children) {
      // convert each child into an object
      this.dataConfig.children = dataConfig.children.map(c => new DataFetcher(c));
    }
  }

  tilesetInfo(finished) {
    /**
     * Obtain tileset infos for all of the tilesets listed
     *
     * If there is more than one tileset info, this function
     * should (not currently implemented) check if the tileset
     * infos have the same dimensions and then return a common
     * one.
     * 
     * Paremeters
     * ----------
     *  finished: function
     *    A callback that will be called when all tileset infos are loaded
     */

    if (!this.dataConfig.children) {
      if (!this.dataConfig.server && !this.dataConfig.tilesetUid) {
        console.warn('No dataConfig children, server or tilesetUid:', this.dataConfig);
        finished(null);
      } else {
        // pass in the callback
        tileProxy.trackInfo(this.dataConfig.server, this.dataConfig.tilesetUid, 
          (tilesetInfo) => {
            // tileset infos are indxed by by tilesetUids, we can just resolve
            // that here before passing it back to the track
            finished(tilesetInfo[this.dataConfig.tilesetUid]);
          });
      }
    } else {
      // this data source has children, so we need to wait to get
      // all of their tileset infos in order to return them to the track
      let promises = this.dataConfig.children.map((x) => {
        return new Promise((resolve, reject) => {
          x.tilesetInfo(resolve);
        });
      });

      Promise.all(promises).then(values => {
        // this is where we should check if all the children's tileset
        // infos match
        finished(values[0]);
      });
    }
  }

  fullTileId(tilesetUid, tileId) {
    /**
     * Convert a tilesetUid and tileId into a full tile
     * identifier
     *
     * Parameters
     * ----------
     *  tilesetUid: string
     *    Uid of the tileset on the server
     *
     *  tileId: string
     *    The tileId of the tile
     *
     *  Returns
     *  -------
     *    fullTileId: string
     *      The full tile id that the server will parse.
     *      E.g. xyxx.0.0.0.default
     */

    return `${tilesetUid}.${tileId}`
  }

  fetchTilesDebounced(receivedTiles, tileIds) {
    /**
     * Fetch a set of tiles.
     *
     * Because the track shouldn't care about tileset ids, the tile ids
     * should just include positions and any necessary transforms.
     *
     * Parameters
     * ----------
     *  receivedTiles: callback
     *    A function to call once the tiles have been
     *    fetched
     *  tileIds: []
     *    The tile ids to fetch
     */

    if (!this.dataConfig.children) {
      // no children, just return the fetched tiles as is
      tileProxy.fetchTilesDebounced({
        id: this.uuid,
        server: this.dataConfig.server,
        done: receivedTiles,
        ids: tileIds.map(x => `${this.dataConfig.tilesetUid}.${x}`),
      });
    } else {
       // multiple child tracks, need to wait for all of them to
       // fetch their data before returning to the parent
      let promises = this.dataConfig.children.map((x) => {
        return new Promise((resolve, reject) => {
          x.fetchTilesDebounced(resolve, tileIds);
        });
      });


      Promise.all(promises).then(returnedTiles => {
        //console.log('returnedTiles:', returnedTiles);

        // if we're trying to divide two datasets, 
        if (this.dataConfig.type == 'divided') {
          if (returnedTiles.length < 2) {
            console.warn("Only one tileset specified for a divided datafetcher:", this.dataConfig);
          }

          //console.log('tileUids:', tileIds);

          const numeratorTilesetUid = dictValues(returnedTiles[0])[0].tilesetUid;
          const denominatorTilesetUid = dictValues(returnedTiles[1])[0].tilesetUid;

          let newTiles = {};

          for (let i = 0; i < tileIds.length; i++) {
            const numeratorUid = this.fullTileId(numeratorTilesetUid, tileIds[i]);
            const denominatorUid = this.fullTileId(denominatorTilesetUid, tileIds[i]);

            newData = this.divideData(returnedTiles[0][numeratorUid].dense,
              returnedTiles[1][denominatorUid].dense);

            const zoomLevel = returnedTiles[0][numeratorUid].zoomLevel;
            const tilePos = returnedTiles[0][numeratorUid].tilePos;

            const newTile = {
              dense: newData,
              minNonZero: minNonZero(newData),
              maxNonZero: maxNonZero(newData),
              zoomLevel: zoomLevel,
              tilePos: tilePos,
            }

            // returned ids will be indexed by the tile id and won't include the 
            // tileset uid
            newTiles[tileIds[i]] = newTile;
          }

          receivedTiles(newTiles);
        } else {
          // assume we're just returning raw tiles
          console.warn('Unimplemented dataConfig type. Returning first data source.', this.dataConfig);
          
          
          receivedTiles(returnedTiles[0]);
        }
      });
    }
  }

  divideData(numeratorData, denominatorData) {
    /**
     * Return an array consisting of the division of the numerator
     * array by the denominator array
     *
     * Parameters
     * ----------
     *  numeratorData: array
     *    An array of numerical values
     *  denominatorData:
     *    An array of numerical values
     *
     * Returns
     * -------
     *  divided: array
     *    An array consisting of the division of the
     *    numerator by the denominator
     */
    let result = new Float32Array(numeratorData.length);

    for (let i = 0; i < result.length; i++) {
      if (denominatorData[i] == 0.)
        result[i] = NaN;
      else
        result[i] = numeratorData[i] / denominatorData[i];
    }

    return result;
  }
}
