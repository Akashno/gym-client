<template>
<v-container fluid >
  <v-card width="100%" class="py-4 rounded-xl" outlined height="280px">
    <v-row justify="center" class="mt-10" >
      <div class="text-center " >
        <span class="grey--text  font-weight-medium text-h2">12</span>
        <p class="text-center text-caption">clients this month</p>
      </div>
    </v-row>
      <v-sparkline
      class="mt-n14"
    :value="value"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
  ></v-sparkline> 
  </v-card>
</v-container>
  
</template>


<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    data: () => ({
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [10, 0, 1, 1, 1, 1, 3, 1, 2, 3, 1, 1, 0,0, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
  }
</script>
