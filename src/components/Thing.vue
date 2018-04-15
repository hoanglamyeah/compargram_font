<template>
  <div class="row mt-20">
    <div class="columns small-12 medium-6">
      <h1>Apple</h1>
      <div id="model_gallery">
        <swiper :options="swiperOption">
          <swiper-slide class="slide-1">
            <img
              src="http://compargram.com/media/__sized__/images/2018/2/28/6d20f3865bdb4c399dde7e0d9e91d13a-crop-c0-5__0-5-400x400-70.jpg"/>
          </swiper-slide>
          <swiper-slide class="slide-1">
            <img
              src="http://compargram.com/media/__sized__/images/2018/2/28/e5ded632f3344a769a449532478fed97-crop-c0-5__0-5-400x400-70.jpg"/>
          </swiper-slide>
          <swiper-slide class="slide-1">
            <img
              src="http://compargram.com/media/__sized__/images/2018/2/28/5c14afc3d96542f3885f127436095252-crop-c0-5__0-5-400x400-70.jpg"/>
          </swiper-slide>
          <swiper-slide class="slide-1">
            <img
              src="http://compargram.com/media/__sized__/images/2018/2/28/5c14afc3d96542f3885f127436095252-crop-c0-5__0-5-400x400-70.jpg"/>
          </swiper-slide>
          <swiper-slide class="slide-1">
            <img
              src="http://compargram.com/media/__sized__/images/2018/2/28/5c14afc3d96542f3885f127436095252-crop-c0-5__0-5-400x400-70.jpg"/>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <p>Gain insight into your customers' purchasing behavior, by tracking and analyzing your sales and growth trends.
        Understand where your traffic originates and what encourages conversion. Reporting helps you make informed
        decisions and grow your business.</p>
      <p><a href="#" class="custom-button">View all ›</a></p>
      <h2>Apple compare</h2>
      <div class="row small-up-2 small-12 compare-list">
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/c4946d08724c4dcc877f2f1cd00f7e3d-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/d204b7f988da4737a0d32b62a693ca49-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/apple-and-banana">Apple
              and Banana</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/apple-and-banana">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/c4946d08724c4dcc877f2f1cd00f7e3d-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2a9109f1fff145ce867c098badced022-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/apple-and-cucumber">Apple
              and Cucumber</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/apple-and-cucumber">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/c4946d08724c4dcc877f2f1cd00f7e3d-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2018/2/28/6d20f3865bdb4c399dde7e0d9e91d13a-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/apple-and-watermelon">Apple
              and Watermelon</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/apple-and-watermelon">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/d204b7f988da4737a0d32b62a693ca49-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2a9109f1fff145ce867c098badced022-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/banana-and-cucumber">Banana
              and Cucumber</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/banana-and-cucumber">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/d204b7f988da4737a0d32b62a693ca49-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2018/2/28/6d20f3865bdb4c399dde7e0d9e91d13a-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/banana-and-watermelon">Banana
              and Watermelon</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/banana-and-watermelon">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/2a9109f1fff145ce867c098badced022-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2018/2/28/6d20f3865bdb4c399dde7e0d9e91d13a-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/cucumber-and-watermelon">Cucumber
              and Watermelon</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/cucumber-and-watermelon">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/c4946d08724c4dcc877f2f1cd00f7e3d-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2a9109f1fff145ce867c098badced022-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/apple-and-cucumber">Apple
              and Cucumber</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/apple-and-cucumber">See compare</a>
          </div>
        </div>
      </div>
      <div class="column column-block">
        <div class="compare-card">
          <div class="small-12 compare-card-top">
              <span class="model-icon"><img
                src="http://compargram.com/media/__sized__/images/c4946d08724c4dcc877f2f1cd00f7e3d-crop-c0-5__0-5-400x400-70.jpg"></span>
            <span><i class="fa fa-compress" aria-hidden="true"></i></span>
            <span class="model-icon"><img
              src="http://compargram.com/media/__sized__/images/2018/2/28/6d20f3865bdb4c399dde7e0d9e91d13a-crop-c0-5__0-5-400x400-70.jpg"></span>
          </div>
          <div class="small-12 compare-card-middle">
            <a href="/food/apple-and-watermelon">Apple
              and Watermelon</a>
          </div>
          <div class="small-12 compare-card-bottom">
            <a href="/food/apple-and-watermelon">See compare</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="columns small-12 medium-6 compare-list small-up-2 medium-up-2">
      <table>
        <thead>
        <tr>
          <th width="30%">Table Header</th>
          <th width="70%">Table Header</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Content Goes Here</td>
          <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
        </tr>
        <tr>
          <td>Content Goes Here</td>
          <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
        </tr>
        <tr>
          <td>Content Goes Here</td>
          <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thing',
  data () {
    return {
      swiperOption: {
        lazy: true,
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 4,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
