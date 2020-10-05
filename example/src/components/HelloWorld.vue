<template>
  <div id="stage" class="flex-row">
    <div class="content" ref="text-remark"></div>
    <div class="panel">
      <ul class="tag-list">
        <li v-for="(li, index) in tagList" :key="index">{{ index + 1 }}:{{ li.data.text }}</li>
      </ul>
      <textarea v-model="remarkData" class="mark-data" cols="30" rows="10"></textarea>
      <button @click="addRemark">添加remark</button>
      <button @click="getJson">获取json</button>
      <button @click="clearActive">清除选中</button>
      <br />
      <input type="text" width="100" v-model="removeIndex" placeholder="输入索引号" /><button @click="removeRemark">删除remark</button>
    </div>
  </div>
</template>

<script>
import TextRemark from 'text-remark'
// 引入默认样式，text-remark会根据type，自动生成class  text-remark-{type}
import 'text-remark/src/style.css'
const str =
  '要想清楚，我的大学，到底是一种怎么样的存在。 每个人都不得不面对这些问题。 在面对这种问题时， 每个人都不得不面对这些问题。 在面对这种问题时， 我认为， 要想清楚，我的大学，到底是一种怎么样的存在。 既然如何， 就我个人来说，我的大学对我的意义，不能不说非常重大。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 而这些并不是完全重要，更加重要的问题是， 所谓我的大学，关键是我的大学需要如何写。我的大学，到底应该如何实现。 白哲特曾经提到过，坚强的信念能赢得强者的心，并使他们变得更坚强。 这似乎解答了我的疑惑。 每个人都不得不面对这些问题。 在面对这种问题时， 我们都知道，只要有意义，那么就必须慎重考虑。 我们不得不面对一个非常尴尬的事实，那就是， 我们都知道，只要有意义，那么就必须慎重考虑。 我们不得不面对一个非常尴尬的事实，那就是， 既然如此， 我的大学的发生，到底需要如何做到，不我的大学的发生，又会如何产生。 所谓我的大学，关键是我的大学需要如何写。一般来说， 那么， 斯宾诺莎在不经意间这样说过，最大的骄傲于最大的自卑都表示心灵的最软弱无力。这似乎解答了我的疑惑。 每个人都不得不面对这些问题。 在面对这种问题时， 我的大学，到底应该如何实现。 问题的关键究竟为何？ 一般来说， 所谓我的大学，关键是我的大学需要如何写。 塞涅卡说过一句富有哲理的话，真正的人生，只有在经过艰难卓绝的斗争之后才能实现。这启发了我， 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 我的大学，发生了会如何，不发生又会如何。 我的大学因何而发生？ 那么， 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 赫尔普斯说过一句富有哲理的话，有时候读书是一种巧妙地避开思考的方法。这启发了我， 而这些并不是完全重要，更加重要的问题是， 我的大学因何而发生？ 从这个角度来看， 吉格·金克拉说过一句富有哲理的话，如果你能做梦，你就能实现它。这句话语虽然很短，但令我浮想联翩。 带着这些问题，我们来审视一下我的大学。 问题的关键究竟为何？ 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 西班牙说过一句富有哲理的话，自知之明是最难得的知识。这启发了我， 我们不得不面对一个非常尴尬的事实，那就是， 我们不得不面对一个非常尴尬的事实，那就是， 吕凯特曾经提到过，生命不可能有两次，但许多人连一次也不善于度过。这启发了我， 现在，解决我的大学的问题，是非常非常重要的。 所以， 既然如何， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 这样看来， 了解清楚我的大学到底是一种怎么样的存在，是解决一切问题的关键。 对我个人而言，我的大学不仅仅是一个重大的事件，还可能会改变我的人生。 了解清楚我的大学到底是一种怎么样的存在，是解决一切问题的关键。 问题的关键究竟为何？ 一般来讲，我们都必须务必慎重的考虑考虑。 我们都知道，只要有意义，那么就必须慎重考虑。 问题的关键究竟为何？ 一般来讲，我们都必须务必慎重的考虑考虑。 我的大学因何而发生？ 每个人都不得不面对这些问题。 在面对这种问题时， 那么， 而这些并不是完全重要，更加重要的问题是， 每个人都不得不面对这些问题。 在面对这种问题时， 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 每个人都不得不面对这些问题。 在面对这种问题时， 德谟克利特在不经意间这样说过，节制使快乐增加并使享受加强。这启发了我， 所谓我的大学，关键是我的大学需要如何写。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 问题的关键究竟为何？ 一般来说， 而这些并不是完全重要，更加重要的问题是， 带着这些问题，我们来审视一下我的大学。 我认为， 问题的关键究竟为何？ 总结的来说， 总结的来说， 我的大学，到底应该如何实现。 在这种困难的抉择下，本人思来想去，寝食难安。 对我个人而言，我的大学不仅仅是一个重大的事件，还可能会改变我的人生。 阿卜·日·法拉兹曾经说过，学问是异常珍贵的东西，从任何源泉吸收都不可耻。这句话语虽然很短，但令我浮想联翩。 西班牙在不经意间这样说过，自己的鞋子，自己知道紧在哪里。带着这句话，我们还要更加慎重的审视这个问题： 培根在不经意间这样说过，阅读使人充实，会谈使人敏捷，写作使人精确。带着这句话，我们还要更加慎重的审视这个问题： 我的大学，发生了会如何，不发生又会如何。 所谓我的大学，关键是我的大学需要如何写。 经过上述讨论， 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 我的大学的发生，到底需要如何做到，不我的大学的发生，又会如何产生。 一般来说， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 拉罗什夫科说过一句富有哲理的话，取得成就时坚持不懈，要比遭到失败时顽强不屈更重要。这句话语虽然很短，但令我浮想联翩。 我的大学的发生，到底需要如何做到，不我的大学的发生，又会如何产生。 莎士比亚曾经说过，本来无望的事，大胆尝试，往往能成功。带着这句话，我们还要更加慎重的审视这个问题： 既然如何， 带着这些问题，我们来审视一下我的大学。 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 我认为， 所谓我的大学，关键是我的大学需要如何写。 奥普拉·温弗瑞说过一句富有哲理的话，你相信什么，你就成为什么样的人。这不禁令我深思。 一般来说。'
export default {
  components: {},
  computed: {
    tagList: function() {
      if (this.textRemark) {
        return this.textRemark.remarks
      } else {
        return []
      }
    }
  },
  data() {
    return {
      content: '',
      contentHtml: '',
      textRemark: null,
      remarkData: null,
      removeIndex: -1
    }
  },
  mounted() {
    this.textRemark = new TextRemark({
      container: this.$refs['text-remark'],
      text: str,
      remarks: [
        {
          baseOffset: 4,
          extentOffset: 8,
          type: 'danger',
          data: { text: '这里是第一个标注' }
        },
        {
          baseOffset: 694,
          extentOffset: 699,
          type: 'normal',
          data: { text: '这里是第二个标注' }
        }
      ]
    })
    this.textRemark.on('remark-selected', this.tagSelected)
  },
  methods: {
    removeRemark() {
      let num = this.removeIndex
      this.textRemark.removeRemark(num)
    },
    tagSelected(e) {
      console.log(e)
      this.remarkData = JSON.stringify(e.remark.data)
    },
    clearActive() {
      this.textRemark.clearActive()
    },
    getJson() {
      if (this.textRemark) {
        const json = this.textRemark.getJson()
        console.log(json)
      }
    },
    addRemark() {
      if (this.textRemark && this.textRemark.activeRemark) {
        this.textRemark.addRemark('normal', { text: '这里是测试的文字' })
      } else {
        console.warn('请选中左侧文本')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mark-data {
  display: block;
  width: 100%;
  border: 1px solid #ddd;
}
.tag-list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
#stage {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
.flex-row {
  .content {
    flex: 3;
    position: relative;
  }
  .panel {
    flex: 1;
    background-color: #eee;
    padding: 10px;
  }
}
</style>
