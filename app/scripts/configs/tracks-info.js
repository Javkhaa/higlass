import {
  svg1DAxisIcon,
  svg1DTilesIcon,
  svg2DHeatmapIcon,
  svg2DTilesIcon,
  svgArrowheadDomainsIcon,
  svgGeneAnnotationsIcon,
  svgHorizontalLineIcon,
  svgVertical1DAxisIcon,
  svgVertical1DTilesIcon,
  svgVerticalGeneAnnotationsIcon,
  svgVerticalLineIcon,
  svgInsetsIcon,
} from '../icons';

export const TRACKS_INFO = [
  {
    type: 'left-axis',
    datatype: ['axis'],
    local: true,
    orientation: '1d-vertical',
    name: 'Left Axis',
    thumbnail: svgVertical1DAxisIcon,
    minWidth: 100,
  },
  {
    type: 'top-axis',
    datatype: ['axis'],
    local: true,
    orientation: '1d-horizontal',
    name: 'Top Axis',
    thumbnail: svg1DAxisIcon,
    defaultOptions: {},
  },
  {
    type: 'horizontal-rule',
    datatype: ['x-coord'],
    local: true,
    orientation: 'whole',
    name: 'Horizontal Rule',
    thumbnail: null,
    defaultOptions: {},
  },
  {
    type: 'vertical-rule',
    datatype: ['y-coord'],
    local: true,
    orientation: 'whole',
    name: 'Vertical Rule',
    thumbnail: null,
    defaultOptions: {},
  },
  {
    type: 'cross-rule',
    datatype: ['xy-coord'],
    local: true,
    orientation: 'whole',
    name: 'Cross Rule',
    thumbnail: null,
    defaultOptions: {},
  },
  {
    type: 'heatmap',
    datatype: ['matrix'],
    local: false,
    minHeight: 100,
    minWidth: 100,
    orientation: '2d',
    thumbnail: svg2DHeatmapIcon,
    defaultOptions: {
      labelPosition: 'bottomRight',
      colorRange: [ // corresponding to the fall colormap
        'white', 'rgba(245,166,35,1.0)', 'rgba(208,2,27,1.0)', 'black'
      ],
      maxZoom: null,
      colorbarPosition: 'topRight',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      heatmapValueScaling: 'log',
      showMousePosition: false,
      mousePositionColor: '#999999',
    },
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'colorRange',
      'maxZoom',
      'dataTransform',
      'colorbarPosition',
      'trackBorderWidth',
      'trackBorderColor',
      'heatmapValueScaling',
      'showMousePosition',
      'mousePositionColor',
    ],
  },
  {
    type: 'horizontal-heatmap',
    datatype: ['matrix'],
    local: false,
    minHeight: 40,
    minWidth: 100,
    orientation: '1d-horizontal',
    thumbnail: svg2DHeatmapIcon,
    defaultOptions: {
      labelPosition: 'bottomRight',
      labelColor: 'black',
      colorRange: [ // corresponding to the fall colormap
        'white', 'rgba(245,166,35,1.0)', 'rgba(208,2,27,1.0)', 'black'
      ],
      maxZoom: null,
      trackBorderWidth: 0,
      trackBorderColor: 'black',
    },
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'colorRange',
      'maxZoom',
      'dataTransform',
      'oneDHeatmapFlipped',
      'colorbarPosition',
      'trackBorderWidth',
      'trackBorderColor',
      'heatmapValueScaling'
    ],
  },
  {
    type: 'vertical-heatmap',
    datatype: ['matrix'],
    local: false,
    minWidth: 50,
    minHeight: 100,
    orientation: '1d-vertical',
    thumbnail: svg2DHeatmapIcon,
    defaultOptions: {
      labelPosition: 'bottomRight',
      labelColor: 'black',
      colorRange: [ // corresponding to the fall colormap
        'white', 'rgba(245,166,35,1.0)', 'rgba(208,2,27,1.0)', 'black'
      ],
      maxZoom: null,
      colorbarPosition: 'topRight',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
    },
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'colorRange',
      'maxZoom',
      'dataTransform',
      'oneDHeatmapFlipped',
      'colorbarPosition',
      'trackBorderWidth',
      'trackBorderColor',
      'heatmapValueScaling'],
  },
  {
    type: 'horizontal-line',
    datatype: ['vector'],
    local: false,
    orientation: '1d-horizontal',
    thumbnail: svgHorizontalLineIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal',
      'lineStrokeWidth',
      'lineStrokeColor',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor',
      'trackType',
      'showMousePosition',
      'mousePositionColor',
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'topLeft',
      axisPositionHorizontal: 'right',
      lineStrokeColor: 'blue',
      lineStrokeWidth: 1,
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
      showMousePosition: false,
      mousePositionColor: '#999999'
    },
  },
  {
    type: 'horizontal-multivec',
    datatype: ['multivec'],
    local: false,
    orientation: '1d-horizontal',
    thumbnail: null,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'valueScaling',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'colorRange',
      'trackBorderWidth',
      'trackBorderColor',
      'trackType'
    ],
    defaultOptions: {
      labelPosition: 'topLeft',
      labelColor: 'black',
      labelTextOpacity: 0.4,
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
    },
  },
  {
    type: 'vertical-line',
    datatype: ['vector'],
    local: false,
    orientation: '1d-vertical',
    thumbnail: svgVerticalLineIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionVertical',
      'lineStrokeWidth',
      'lineStrokeColor',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor',
      'showMousePosition',
      'mousePositionColor',
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'bottomLeft',
      axisPositionVertical: 'top',
      lineStrokeWidth: 1,
      lineStrokeColor: 'blue',
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
      showMousePosition: false,
      mousePositionColor: '#999999'
    },
  },
  {
    type: 'horizontal-point',
    datatype: ['vector'],
    local: false,
    orientation: '1d-horizontal',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal',
      'pointColor',
      'pointSize',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'topLeft',
      axisPositionHorizontal: 'right',
      pointColor: 'red',
      pointSize: 3,
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
    },
  },
  {
    type: 'horizontal-divergent-bar',
    datatype: ['vector'],
    local: false,
    orientation: '1d-horizontal',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal',
      'barFillColorTop',
      'barFillColorBottom',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor',
      'barOpacity'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'topLeft',
      axisPositionHorizontal: 'right',
      barFillColorBottom: 'red',
      barFillColorTop: 'green',
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
      barOpacity: 1,
    },
  },
  {
    type: 'horizontal-bar',
    datatype: ['vector'],
    local: false,
    orientation: '1d-horizontal',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal',
      'barFillColor',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor',
      'barOpacity'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'topLeft',
      axisPositionHorizontal: 'right',
      barFillColor: 'darkgreen',
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
      barOpacity: 1,
    },
  },
  {
    type: 'vertical-bar',
    datatype: ['vector'],
    local: false,
    orientation: '1d-vertical',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal',
      'barFillColor',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor',
      'barOpacity'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'topLeft',
      axisPositionHorizontal: 'right',
      barFillColor: 'darkgreen',
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
      barOpacity: 1,
    },
  },
  {
    type: 'vertical-point',
    datatype: ['vector'],
    local: false,
    orientation: '1d-vertical',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal',
      'lineStrokeWidth',
      'lineStrokeColor',
      'valueScaling',
      'trackBorderWidth',
      'trackBorderColor'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'topLeft',
      axisPositionHorizontal: 'right',
      lineStrokeColor: 'red',
      lineStrokeWidth: 1,
      valueScaling: 'linear',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      labelTextOpacity: 0.4,
    },
  },
  {
    type: '2d-tiles',
    datatype: ['matrix'],
    local: false,
    orientation: '2d',
    name: '2D Tile Outlines',
    thumbnail: svg2DTilesIcon,
  },
  {
    type: 'horizontal-1d-value-interval',
    datatype: ['bed-value'],
    local: false,
    orientation: ['1d-horizontal'],
    name: '1D Rectangles',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionHorizontal'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'bottomLeft',
      axisPositionHorizontal: 'left',
      lineStrokeColor: 'blue',
      valueScaling: 'linear',
    },
  },
  {
    type: 'vertical-1d-value-interval',
    datatype: ['bed-value'],
    local: false,
    orientation: ['1d-vertical'],
    name: '1D Rectangles',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'axisPositionVertical'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'bottomLeft',
      axisPositionVertical: 'top',
      lineStrokeColor: 'blue',
      valueScaling: 'linear',
    },
  },
  {
    type: 'top-stacked-interval',
    datatype: ['stacked-interval'],
    local: false,
    orientation: '1d-horizontal',
    thumbnail: 'horizontal-stacked-interval.png',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity'
    ],
  },
  {
    type: 'left-stacked-interval',
    datatype: ['stacked-interval'],
    local: false,
    orientation: '1d-vertical',
    thumbnail: 'vertical-stacked-interval.png',
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity'
    ],
  },
  {
    type: 'viewport-projection-vertical',
    datatype: ['1d-projection'],
    local: true,
    hidden: true,
    orientation: '1d-vertical',
    name: 'Viewport Projection',
    thumbnail: 'viewport-projection-center.png',
    availableOptions: [
      'projectionFillColor', 'projectionStrokeColor'
    ],
    defaultOptions: {
      projectionFillColor: '#777',
      projectionStrokeColor: '#777',
      projectionFillOpacity: 0.3,
      projectionStrokeOpacity: 0.3,
    },
  },
  {
    type: 'viewport-projection-horizontal',
    datatype: ['1d-projection'],
    local: true,
    hidden: true,
    orientation: '1d-horizontal',
    name: 'Viewport Projection',
    thumbnail: 'viewport-projection-center.png',
    availableOptions: [
      'projectionFillColor', 'projectionStrokeColor'
    ],
    defaultOptions: {
      projectionFillColor: '#777',
      projectionStrokeColor: '#777',
      projectionFillOpacity: 0.3,
      projectionStrokeOpacity: 0.3,
    },
  },
  {
    type: 'viewport-projection-center',
    datatype: ['2d-projection'],
    local: true,
    hidden: true,
    orientation: '2d',
    name: 'Viewport Projection',
    thumbnail: 'viewport-projection-center.png',
    availableOptions: [
      'projectionFillColor', 'projectionStrokeColor'
    ],
    defaultOptions: {
      projectionFillColor: '#777',
      projectionStrokeColor: '#777',
      projectionFillOpacity: 0.3,
      projectionStrokeOpacity: 0.3,
    },
  },
  {
    type: 'horizontal-gene-annotations',
    datatype: ['gene-annotation'],
    local: false,
    minHeight: 55,
    orientation: '1d-horizontal',
    name: 'Gene Annotations',
    thumbnail: svgGeneAnnotationsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'plusStrandColor',
      'minusStrandColor',
      'trackBorderWidth',
      'trackBorderColor',
      'showMousePosition',
      'mousePositionColor',
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      plusStrandColor: 'blue',
      minusStrandColor: 'red',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      showMousePosition: false,
      mousePositionColor: '#999999',
    },
  },
  {
    type: 'vertical-gene-annotations',
    datatype: ['gene-annotation'],
    local: false,
    minWidth: 55,
    orientation: '1d-vertical',
    name: 'Gene Annotations',
    thumbnail: svgVerticalGeneAnnotationsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'plusStrandColor',
      'minusStrandColor',
      'trackBorderWidth',
      'trackBorderColor',
      'showMousePosition',
      'mousePositionColor',
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      plusStrandColor: 'blue',
      minusStrandColor: 'red',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      showMousePosition: false,
      mousePositionColor: '#999999'
    },
  },

  {
    type: 'arrowhead-domains',
    datatype: ['arrowhead-domains'],
    local: false,
    orientation: '2d',
    name: 'Arrowhead Domains',
    thumbnail: svgArrowheadDomainsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'trackBorderWidth',
      'trackBorderColor'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
    },
  },

  {
    type: 'vertical-2d-rectangle-domains',
    datatype: ['2d-rectangle-domains'],
    local: false,
    orientation: '1d-vertical',
    name: 'Vertical 2D Rectangle Domains',
    thumbnail: svgArrowheadDomainsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'trackBorderWidth',
      'trackBorderColor'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
    },
  },

  {
    type: 'horizontal-2d-rectangle-domains',
    datatype: ['2d-rectangle-domains'],
    local: false,
    orientation: '1d-horizontal',
    name: 'Horizontal 2D Rectangle Domains',
    thumbnail: svgArrowheadDomainsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'trackBorderWidth',
      'trackBorderColor',
      'rectangleDomainFillColor',
      'rectangleDomainStrokeColor',
      'rectangleDomainOpacity',
      'minSquareSize',
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'bottomLeft',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      rectangleDomainFillColor: 'grey',
      rectangleDomainStrokeColor: 'black',
      rectangleDomainOpacity: 0.6,
      minSquareSize: 'none',
    },
  },

  {
    type: '2d-rectangle-domains',
    datatype: ['2d-rectangle-domains'],
    local: false,
    orientation: '2d',
    name: '2D Rectangle Domains',
    thumbnail: svgArrowheadDomainsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'trackBorderWidth',
      'trackBorderColor',
      'rectangleDomainFillColor',
      'rectangleDomainStrokeColor',
      'rectangleDomainOpacity',
      'minSquareSize'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      rectangleDomainFillColor: 'grey',
      rectangleDomainStrokeColor: 'black',
      rectangleDomainOpacity: 0.6,
      minSquareSize: 'none',
    },
  },

  {
    type: '2d-annotations',
    datatype: ['2d-annotations'],
    local: false,
    orientation: '2d',
    name: '2D Annotations',
    thumbnail: svgArrowheadDomainsIcon,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'trackBorderWidth',
      'trackBorderColor',
      'rectangleDomainFillColor',
      'rectangleDomainStrokeColor',
      'rectangleDomainOpacity',
      'minSquareSize'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      rectangleDomainFillColor: 'grey',
      rectangleDomainStrokeColor: 'black',
      rectangleDomainOpacity: 0.6,
      minSquareSize: 'none',
    },
  },

  {
    type: 'square-markers',
    datatype: ['bedpe'],
    local: false,
    orientation: '2d',
    name: 'Square Markers',
    thumbnail: svgArrowheadDomainsIcon,
    availableOptions: [
      'labelPosition', 'labelColor'
    ],
    defaultOptions: {
      labelColor: 'black',
      labelPosition: 'hidden',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
    },
  },
  {
    type: 'combined',
    datatype: 'any',
    local: true,
    orientation: 'any',
  },
  {
    type: '2d-chromosome-grid',
    datatype: ['chromsizes'],
    local: false,
    orientation: '2d',
    name: 'Chromosome Grid',
    chromInfoPath: '//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv',
    thumbnail: null,
    availableOptions: [
      'lineStrokeWidth', 'lineStrokeColor'
    ],
    defaultOptions: {
      lineStrokeWidth: 1,
      lineStrokeColor: 'grey',
    },
  },
  {
    type: '2d-chromosome-annotations',
    local: true,
    orientation: '2d',
    name: '2D Chromosome Annotations',
    thumbnail: null,
    hidden: true,
  },
  {
    type: '2d-chromosome-labels',
    datatype: ['chromsizes'],
    local: true,
    orientation: '2d',
    name: 'Pairwise Chromosome Labels',
    thumbnail: null,
  },
  {
    type: 'horizontal-chromosome-labels',
    datatype: ['chromsizes'],
    orientation: '1d-horizontal',
    minHeight: 30,
    name: 'Chromosome Axis',
    thumbnail: null,
    availableOptions: [
      'showMousePosition',
      'mousePositionColor',
    ],
    defaultOptions: {
      showMousePosition: false,
      mousePositionColor: '#999999'
    },
  },
  {
    type: 'vertical-chromosome-labels',
    datatype: ['chromsizes'],
    orientation: '1d-vertical',
    minWidth: 20,
    minHeight: 30,
    name: 'Chromosome Axis',
    thumbnail: null,
    availableOptions: [
      'showMousePosition',
      'mousePositionColor',
    ],
    defaultOptions: {
      showMousePosition: false,
      mousePositionColor: '#999999'
    },
  },
  {
    type: 'vertical-1d-tiles',
    datatype: ['1d-tiles'],
    local: false,
    orientation: '1d-vertical',
    name: 'Vertical 1D Tile Outlines',
    thumbnail: svgVertical1DTilesIcon,
  },
  {
    type: 'horizontal-1d-tiles',
    datatype: ['vector', 'stacked-interval', 'gene-annotation'],
    local: false,
    orientation: '1d-horizontal',
    name: 'Horizontal 1D Tile Outlines',
    thumbnail: svg1DTilesIcon,
  },
  {
    type: 'osm-tiles',
    datatype: ['map-tiles'],
    local: true,
    orientation: '2d',
    hidden: true,
    name: 'OSM Tiles',
    thumbnail: null,
    defaultOptions: {
      minPos: 0,
      maxPos: 3120000000,
    },
  },
  {
    type: 'mapbox-tiles',
    datatype: ['map-tiles'],
    local: true,
    orientation: '2d',
    hidden: true,
    name: 'Mapbox Tiles',
    thumbnail: null,
    availableOptions: [
      'mapboxStyle'
    ],
    defaultOptions: {
      mapboxStyle: 'mapbox.streets',
    },
  },
  {
    type: 'image-tiles',
    datatype: ['image-tiles'],
    local: true,
    orientation: '2d',
    hidden: true,
    name: 'Image Tiles',
    thumbnail: null,
  },
  {
    type: 'bedlike',
    datatype: ['bedlike'],
    local: false,
    minHeight: 55,
    orientation: '1d-horizontal',
    name: 'BED-like track',
    thumbnail: null,
    availableOptions: [
      'labelPosition',
      'labelColor',
      'labelTextOpacity',
      'labelBackgroundOpacity',
      'trackBorderWidth',
      'trackBorderColor',
      'valueColumn',
    ],
    defaultOptions: {
      axisPositionHorizontal: 'right',
      labelColor: 'black',
      labelPosition: 'hidden',
      trackBorderWidth: 0,
      trackBorderColor: 'black',
      valueColumn: null
    },
  },
  {
    type: 'insets',
    datatype: ['cooler', 'image'],
    minHeight: 24,
    minWidth: 24,
    orientation: '2d',
    thumbnail: svgInsetsIcon,
    defaultOptions: {
      minRes: 8,
      maxRes: 16,
      resStepSize: 2,
      scale: 3,
      fill: 'white',
      fillOpacity: 1,
      borderColor: 'red',
      borderWidth: 2,
      borderOpacity: 1,
      leaderLineColor: 'red',
      leaderLineWidth: 2,
      leaderLineOpacity: 1,
      dropDistance: 1,
      dropBlur: 3,
      dropOpacity: 0.8,
      opacity: 1
    },
    availableOptions: [
      'minRes',
      'maxRes',
      'resStepSize',
      'scale',
      'colorRange',
      'fill',
      'fillOpacity',
      'borderColor',
      'borderWidth',
      'borderOpacity',
      'leaderLineColor',
      'leaderLineWidth',
      'leaderLineOpacity',
      'dropDistance',
      'dropBlur',
      'dropOpacity',
      'opacity',
    ],
  },
];

export default TRACKS_INFO;
