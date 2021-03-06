<template>
  <div class="food" v-show="showFlag" ref="foodd">
    <transition name="move">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" alt="#">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :selectType="selectType" :onlyContent="onlyContent"
                      :desc="desc" :ratings="food.ratings"
                      v-on:ratingtypeselect="select"
                      v-on:contenttoggle="content"></ratingselect>
        <div class="rating-wrapper">
          <ul class="rating-ul" v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" class="rating-item" v-for="rating in food.ratings" :key="rating.index">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" class="avatar" width="12" height="12">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import Vue from 'vue';
import {formatDate} from '../../common/js/date.js';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
// eslint-disable-next-line
const POSITIVE = 0;
// eslint-disable-next-line
const NEGATIVE = 1;
// eslint-disable-next-line
const ALL = 2;
export default {
  // 把时间戳转化为时间字符串,把formatDate方法封装成一个模块
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: {
    food: {
      type: Object
    }
  },
  // 监听跟踪数据
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    select(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    content() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    show() {
      // 每次初始化的状态为all, true 把这两个状态始终初始化
      this.selectType = ALL;
      this.onlyContent = true;
      this.showFlag = true;
      // 当页面被展示，出现滚动条，$nextTick（异步更新）
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodd, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst() {
      // console.log('click');
      // if (event._constructed) {
      //   return;
      // }
      // 设置第一次点击数量加1，因为第一次可能没有
      Vue.set(this.food, 'count', 1);
    },
    // 关联事件，改变评价的描述情况
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
     } if (this.selectType === ALL) {
       return true;
     } else {
       return type === this.selectType;
     }
    }
  }
  // created() {
  //   this.$on('ratingtype.select',)
  // }
};
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin";
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: opacity .5s
    &.move-enter, &.move-leave-to
      opacity: 0;
    .food-content
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
      .content
        padding: 18px
        position: relative
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          border-radius: 12px
          font-size: 10px
          color: #fff
          background: rgb(0, 160, 220)
      .info
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 6px
          font-size: 14px
          color: rgb(7, 17, 27)
        .text
          line-height: 24px
          padding: 0 8px
          font-size: 12px
          color: rgb(77, 85, 93)
      .rating
        padding: 12px 18px
        .title
          font-size: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .rating-wrapper
          padding: 0
          .rating-ul
            padding: 0
            margin: 0
            list-style: none
            .rating-item
              position: relative
              padding: 16px 0
              border-1px(rgba(7, 17, 27, 0.1))
              .user
                position: absolute
                right: 0
                top: 16px
                font-size: 0
                line-height: 12px
                .name
                  display: inline-block
                  margin-right: 6px
                  vertical-align: top
                  font-size: 10px
                  color: rgb(147, 153, 159)
                .avatar
                  border-radius: 50%
              .time
                margin-bottom: 6px
                line-height: 12px
                font-size: 10px
                color: rgb(147, 153, 159)
              .text
                line-height: 16px
                font-size: 12px
                color: rgb(7, 17, 27)
                .icon-thumb_up, .icon-thumb_down
                  margin-right: 4px
                  line-height: 16px
                  font-size: 12px
                .icon-thumb_up
                  color: rgb(0, 160, 220)
                .icon-thumb_down
                  color: rgb(147, 153, 159)
            .no-rating
              padding: 16px 0
              font-size: 12px
              color: rgb(147, 153, 159)
</style>
