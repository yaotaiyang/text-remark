<template>
  <el-row :gutter="10" type="flex">
    <el-col :span="18">
      <div class="content" ref="text-remark"></div>
    </el-col>
    <el-col :span="6" class="right-col">
      <div class="panel">
        <el-row class="option">
          <el-col :span="8"><el-button size="mini" @click="addRemark" type="primary">添加标注</el-button></el-col>
          <el-col :span="8"><el-button size="mini" type="success" @click="getJson">获取json</el-button></el-col>
          <el-col :span="8"><el-button size="mini" @click="clearActive" type="info">清除选中</el-button></el-col>
        </el-row>
        <div class="title">请选择一个标签</div>
        <el-select size="small" style="width:100%" v-model="remarkIndex" filterable placeholder="请选择" @change="remarkChange">
          <el-option v-for="(item, index) in remarkList" :key="index" :label="getRemarkText(item, index)" :value="index"> </el-option>
        </el-select>
        <el-form size="small" class="remark-form" v-if="remark && remarkIndex !== ''">
          <el-form-item label="标注类型" v-if="remark">
            <el-select style="width:100%" v-model="remark.type" @change="changeRemarkType" filterable placeholder="请选择">
              <el-option v-for="item in remarkTypes" :key="item.type" :label="item.text" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="标注名称">
            <el-input v-model="form.text"></el-input>
          </el-form-item> -->
          <el-form-item label="标注内容" v-if="remark && remark.type === 0">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
          <i @click="removeRemark" class="remark-delete el-icon-delete"></i>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TextRemark from '../../../src/index'
import { str2Color } from './utils'
import filterClone from 'filter-clone'
// 引入默认样式，text-remark会根据type，自动生成class  text-remark-{type}
import '../../../src/style.css'

const str =
  '要想清楚，我的大学，到底是一种怎么样的存在。 每个人都不得不面对这些问题。 在面对这种问题时， 每个人都不得不面对这些问题。 在面对这种问题时， 我认为， 要想清楚，我的大学，到底是一种怎么样的存在。 既然如何， 就我个人来说，我的大学对我的意义，不能不说非常重大。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 而这些并不是完全重要，更加重要的问题是， 所谓我的大学，关键是我的大学需要如何写。我的大学，到底应该如何实现。 白哲特曾经提到过，坚强的信念能赢得强者的心，并使他们变得更坚强。 这似乎解答了我的疑惑。 每个人都不得不面对这些问题。 在面对这种问题时， 我们都知道，只要有意义，那么就必须慎重考虑。 我们不得不面对一个非常尴尬的事实，那就是， 我们都知道，只要有意义，那么就必须慎重考虑。 我们不得不面对一个非常尴尬的事实，那就是， 既然如此， 我的大学的发生，到底需要如何做到，不我的大学的发生，又会如何产生。 所谓我的大学，关键是我的大学需要如何写。一般来说， 那么， 斯宾诺莎在不经意间这样说过，最大的骄傲于最大的自卑都表示心灵的最软弱无力。这似乎解答了我的疑惑。 每个人都不得不面对这些问题。 在面对这种问题时， 我的大学，到底应该如何实现。 问题的关键究竟为何？ 一般来说， 所谓我的大学，关键是我的大学需要如何写。 塞涅卡说过一句富有哲理的话，真正的人生，只有在经过艰难卓绝的斗争之后才能实现。这启发了我， 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 我的大学，发生了会如何，不发生又会如何。 我的大学因何而发生？ 那么， 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 赫尔普斯说过一句富有哲理的话，有时候读书是一种巧妙地避开思考的方法。这启发了我， 而这些并不是完全重要，更加重要的问题是， 我的大学因何而发生？ 从这个角度来看， 吉格·金克拉说过一句富有哲理的话，如果你能做梦，你就能实现它。这句话语虽然很短，但令我浮想联翩。 带着这些问题，我们来审视一下我的大学。 问题的关键究竟为何？ 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 西班牙说过一句富有哲理的话，自知之明是最难得的知识。这启发了我， 我们不得不面对一个非常尴尬的事实，那就是， 我们不得不面对一个非常尴尬的事实，那就是， 吕凯特曾经提到过，生命不可能有两次，但许多人连一次也不善于度过。这启发了我， 现在，解决我的大学的问题，是非常非常重要的。 所以， 既然如何， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 这样看来， 了解清楚我的大学到底是一种怎么样的存在，是解决一切问题的关键。 对我个人而言，我的大学不仅仅是一个重大的事件，还可能会改变我的人生。 了解清楚我的大学到底是一种怎么样的存在，是解决一切问题的关键。 问题的关键究竟为何？ 一般来讲，我们都必须务必慎重的考虑考虑。 我们都知道，只要有意义，那么就必须慎重考虑。 问题的关键究竟为何？ 一般来讲，我们都必须务必慎重的考虑考虑。 我的大学因何而发生？ 每个人都不得不面对这些问题。 在面对这种问题时， 那么， 而这些并不是完全重要，更加重要的问题是， 每个人都不得不面对这些问题。 在面对这种问题时， 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 每个人都不得不面对这些问题。 在面对这种问题时， 德谟克利特在不经意间这样说过，节制使快乐增加并使享受加强。这启发了我， 所谓我的大学，关键是我的大学需要如何写。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 问题的关键究竟为何？ 一般来说， 而这些并不是完全重要，更加重要的问题是， 带着这些问题，我们来审视一下我的大学。 我认为， 问题的关键究竟为何？ 总结的来说， 总结的来说， 我的大学，到底应该如何实现。 在这种困难的抉择下，本人思来想去，寝食难安。 对我个人而言，我的大学不仅仅是一个重大的事件，还可能会改变我的人生。 阿卜·日·法拉兹曾经说过，学问是异常珍贵的东西，从任何源泉吸收都不可耻。这句话语虽然很短，但令我浮想联翩。 西班牙在不经意间这样说过，自己的鞋子，自己知道紧在哪里。带着这句话，我们还要更加慎重的审视这个问题： 培根在不经意间这样说过，阅读使人充实，会谈使人敏捷，写作使人精确。带着这句话，我们还要更加慎重的审视这个问题： 我的大学，发生了会如何，不发生又会如何。 所谓我的大学，关键是我的大学需要如何写。 经过上述讨论， 可是，即使是这样，我的大学的出现仍然代表了一定的意义。 我的大学的发生，到底需要如何做到，不我的大学的发生，又会如何产生。 一般来说， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 拉罗什夫科说过一句富有哲理的话，取得成就时坚持不懈，要比遭到失败时顽强不屈更重要。这句话语虽然很短，但令我浮想联翩。 我的大学的发生，到底需要如何做到，不我的大学的发生，又会如何产生。 莎士比亚曾经说过，本来无望的事，大胆尝试，往往能成功。带着这句话，我们还要更加慎重的审视这个问题： 既然如何， 带着这些问题，我们来审视一下我的大学。 生活中，若我的大学出现了，我们就不得不考虑它出现了的事实。 我认为， 所谓我的大学，关键是我的大学需要如何写。 奥普拉·温弗瑞说过一句富有哲理的话，你相信什么，你就成为什么样的人。这不禁令我深思。 一般来说。'

export default {
  filters: {},
  components: {},
  computed: {
    remarkList: function() {
      if (this.textRemark) {
        return this.textRemark.remarks
      } else {
        return []
      }
    },
    remark: function() {
      if (this.remarkList && this.remarkIndex !== '' && this.remarkList !== null && this.remarkList !== undefined) {
        let remark = this.remarkList[this.remarkIndex]
        return remark
      } else {
        return null
      }
    }
  },
  data() {
    return {
      content: '',
      contentHtml: '',
      textRemark: null,
      remarkIndex: '',
      remarkTypes: [
        { id: 1, text: '重要' },
        { id: 2, text: '一般' },
        // 自定义标签 id为0
        { id: 0, text: '自定义' }
      ],
      form: {
        text: '',
        content: ''
      }
    }
  },
  mounted() {
    let json = {
      text: str,
      remarks: [
        {
          baseOffset: 5,
          extentOffset: 8,
          type: 1,
          data: { content: '这里为第一条标注的内容' }
        },
        {
          baseOffset: 694,
          extentOffset: 699,
          type: 2,
          data: { content: '这里为第二条标注的内容' }
        }
      ]
    }
    // 处理颜色
    json.remarks.forEach(item => {
      item.backgroundColor = str2Color(item)
    })
    this.textRemark = new TextRemark({
      container: this.$refs['text-remark'],
      ...json
    })
    this.textRemark.on('remark-selected', this.tagSelected)
  },
  methods: {
    changeRemarkType(str) {
      let curRemark = this.textRemark.remarks[this.remarkIndex]
      // 更新背景色
      this.textRemark.updateRemark(this.remarkIndex, { backgroundColor: str2Color(curRemark), type: str })
      this.textRemark.setSelectedRemark(this.remarkIndex)
    },
    remarkChange() {
      this.form = this.remarkList[this.remarkIndex].data
      this.textRemark.setSelectedRemark(this.remarkIndex)
    },
    removeRemark() {
      let num = this.remarkIndex
      this.textRemark.removeRemark(num)
      this.remarkIndex = ''
    },
    tagSelected(e) {
      this.form = e.remark.data
      this.remarkIndex = e.index
    },
    clearActive() {
      this.textRemark.clearActive()
    },
    getJson() {
      if (this.textRemark) {
        // 排除backgroundColor
        const json = filterClone(this.textRemark.getJson(), [], ['backgroundColor'])
        console.log(json)
      }
    },
    addRemark() {
      if (this.textRemark && this.textRemark.activeRemark) {
        let index = this.textRemark.remarks.length
        this.textRemark.addRemark(1)
        this.remarkIndex = index
        let curRemark = this.textRemark.remarks[index]
        this.form = curRemark.data
        // 更新背景色
        this.textRemark.updateRemark(index, { backgroundColor: str2Color(curRemark) })
        this.textRemark.setSelectedRemark(index)
      } else {
        console.warn('请选中左侧文本')
      }
    },
    getRemarkText(item, index) {
      let option = this.remarkTypes.filter(it => it.id === item.type)[0]
      return index + 1 + '.' + option.text
    }
  }
}
</script>
<style lang="less" scoped>
#stage {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
.option {
  padding: 0 0 10px 0;
}
.remark-delete {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.right-col {
  text-align: left;
  font-size: 14px;
  background-color: #eee;
}
.panel {
  padding: 10px;
}
.remark-form {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px;
  position: relative;
}
</style>
