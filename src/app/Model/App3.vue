<template>
  <div class="model-app">
    <div class="small-12">
      <span v-for="classify in classifies" @click="selectClassify(classify)" class="label primary clickable"
            v-bind:class="{'secondary': classify.active}">{{ classify.name }}</span>
    </div>
    <div class="small-12" v-for="classify in classifies" v-if="classify.active">
      <h3>{{ classify.name }}</h3>
      <ul class="accordion" data-accordion data-allow-all-closed="true" data-deep-link="false"
          data-update-history="true"
          data-deep-link-smudge="true"
          data-deep-link-smudge-delay="500">
        <li class="accordion-item is-active" data-accordion-item
            v-for="data in classify['model_'+ model_name +'_classify']">
          <a href="#deeplink1" class="accordion-title">{{ data.name }}</a>
          <div class="accordion-content" data-tab-content id="deeplink1">
            <div class="small-12 margin-bottom-10">
              <span class="label default">Field:</span>
              <span class="label clickable"
                    v-for="class_name in data.data"
                    v-bind:class="{'secondary': checkActive(class_name)}"
                    @click="reActive(class_name)">{{ class_name }}</span>
            </div>
            <div class="input-group small-12" v-for="xxx, i in filter(data.name)" v-bind:key="i" v-if="xxx.active">
              <div class="input-group-label movable">{{ xxx.name }}</div>
              <model-input :id="data.name + i" :name="xxx.name" :value="xxx.data" :type="xxx.type"
                           @done="updateValue($event, i, data.name)"></model-input>
              <div class="input-group-label">
                <i aria-hidden="true" class="fa fa-times-circle clickable" @click="deActive(xxx.name)"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import model from '../../api/model'
  import draggable from 'vuedraggable'
  import ModelInput from '../Input/App.vue'

  export default {
    components: {draggable: draggable, ModelInput: ModelInput},

    props: ['model_name', 'properties'],

    updated() {
      $(this.$el).foundation()
      this.$emit('addProperty', {'properties': this.properties_temp})
    },

    data: () => {
      return {
        fields: [],
        properties_temp: []
      }
    },

    methods: {
      selectClassify(classify) {
        var classifies = this.fields
        for (var i in classifies) {
          if (classifies[i].id === classify.id) {
            if (classifies[i].active) {
              this.$set(classifies[i], 'active', false)
              for (var index in this.properties_temp) {
                if (this.properties_temp[index].class === classify.name) {
                  this.properties_temp[index].active = false
                }
              }
            } else {
              this.$set(classifies[i], 'active', true)
            }
          }
        }
        this.classifies = []
        this.classifies = classifies
      },

      filter(classify_name) {
        return this.properties_temp.filter(property => property.sub_class === classify_name)
      },

      checkActive(class_name) {
        for (var xxx in this.properties_temp) {
          if (this.properties_temp[xxx].name === class_name) {
            return this.properties_temp[xxx].active
          }
        }
        return false
      },

      reActive(class_name) {
        for (var xxx in this.properties_temp) {
          if (this.properties_temp[xxx].name === class_name) {
            this.properties_temp[xxx].active = !this.properties_temp[xxx].active
          }
        }
      },

      deActive(class_name) {
        for (var xxx in this.properties_temp) {
          if (this.properties_temp[xxx].name === class_name) {
            this.properties_temp[xxx].active = false
          }
        }
      },

      updateValue(event, field_id, classify_name) {
        this.filter(classify_name)[field_id].type = event.type
        this.filter(classify_name)[field_id].data = event.data
      },

    },

    created() {
      model.getTypes(this.model_name,
        data => {
          this.classifies = data
          for (var index in this.fields) {
            this.fields[index]['active'] = false
            var subclass_temp = this.fields[index]['model_' + this.model_name + '_classify']
            for (var index_1 in subclass_temp) {
              var field_temp = subclass_temp[index_1].data
              for (var index_2 in field_temp) {
                this.properties_temp.push(
                  {
                    name: field_temp[index_2],
                    class: this.fields[index].name,
                    sub_class: subclass_temp[index_1].name,
                    active: false
                  }
                )
              }
            }
          }
          for (var index in this.fields) {
            for (var index_2 in this.properties) {
              if (this.fields[index].name === this.properties[index_2].class) {
                this.fields[index]['active'] = true
                break
              }
            }
          }
          for (var index in this.properties) {
            for (var index_2 in this.properties_temp) {
              if (this.properties[index].name === this.properties_temp[index_2].name
                && this.properties[index].sub_class === this.properties_temp[index_2].sub_class
                && typeof this.properties[index].data !== 'undefined') {
                this.properties_temp[index_2].type = this.properties[index].type
                this.properties_temp[index_2].data = this.properties[index].data
                this.properties_temp[index_2].active = this.properties[index].active
              }
            }
          }
        }, error => {
          console.log(error)
        }
      )
    }
  }
</script>
<!--for (var index_i in this.fields) {-->
<!--if (this.fields[index].fields.indexOf(this.fields[index_i].name) !== -1) {-->
<!--this.fields[index]['active'] = true-->
<!--}-->
<!--}-->
