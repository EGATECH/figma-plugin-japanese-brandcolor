import './ui.css'

import Vue from 'vue'
import axios from 'axios'

const app = new Vue({
  el: '#app',
  data: {
    keyword: '',
    brandcolors: [],
    allBrandcolors: []
  },
  computed: {
    filteredBrandcolors: function () {
      if (!this.keyword) {
        return this.allBrandcolors;
      }
      const lcaseKeyword = this.keyword.toLowerCase();
      return this.allBrandcolors.filter(brandcolor => {
        if (brandcolor.name.toLowerCase().indexOf(lcaseKeyword) >= 0 || brandcolor.url.indexOf(lcaseKeyword) >= 0) {
          return true;
        } else {
          return false;
        }
      });

    }
  },
  methods : {
    fill: function(color) {
      parent.postMessage({
        pluginMessage: { type: 'fill', color: color }
      }, '*')
    }
  },
  mounted() {
    this.$refs.searchKeyword.focus();
    axios.get('https://brandcolor.info/api/v1/data.json')
      .then((response) => {
        this.allBrandcolors = response.data.brandcolors;
        this.allBrandcolors.forEach(brandcolor => {
          this.brandcolors.push(brandcolor);
        });
      })
      .catch(function (error) {
      });
  }
});

