<template>
    <div ref="higlassContainer"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { HiGlassComponent } from 'higlass';

export default {
  name: 'HeatmapExample',
  setup() {
    const higlassContainer = ref(null);

    onMounted(() => {
      // Matrix data
      const matrixData = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];

      // HiGlass options
      const options = {
        viewConfig: {
          tracks: {
            top: [],
            left: [],
            center: [
              {
                type: 'heatmap',
                data: {
                  type: 'matrix',
                  matrix: matrixData
                },
                options: {
                  colorRange: ['white', 'blue'] // Customize the color range
                }
              }
            ],
            right: [],
            bottom: []
          }
        }
      };

      // Create HiGlass instance and load the data
      const higlass = new HiGlassComponent(higlassContainer.value, options);
      console.log(higlass)
    });

    return {
      higlassContainer
    };
  }
};
</script>
