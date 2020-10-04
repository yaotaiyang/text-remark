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
  '同志们：此次会议，我们组织了十九届四中全会精神学习培训，组织了先进单位经验交流，分享了海尔大学办学经验，桂平行长作了重要讲话，为今后办学明确了思路，指明了方向，可以说，办好建行大学是建行新金融战略的重要组成部分，为建行新金融战略提供思想、文化、组织保证和人才、智力、技术支持，是建行大学的使命追求和责任担当。只有深深扎根在新金融的土壤里，深度融合在新金融的实践中，建行大学才有价值，才有力量，才有希望，才有未来。过去的一年里，在总行党委、校委会的领导下，建行大学全体教职员工扎根新金融，拥抱新金融，服务新金融，团结奉献、努力拼博，在建设“新时代新金融新生态企业大学”的新事业中创造了优良业绩，做出了重要贡献。建行业务发展的数据充分证实，总行党委开启包括以“三大战略”、建行大学为新引擎的第二发展曲线，不仅推动建行实现了高质量发展，更是开创了新金融的大情怀大格局。开办仅一年，建行大学确实做了不少的事，可以说是起点高、思路新、步伐快，确实为建行的创新发展，提升竞争力做了很有成效的工作，是建行发展不可或缺的重要部分，将其说成战略的战略，一点不为过，因为它是为“三大战略”作支撑的。会抓工作的领导一定去抓队伍素质，抓队伍素质就要抓培训，建行大学是抓培训工作非常好的一个平台，因此，大家一定要将这个平台搭建好，充分地运用好。这次会议是在建行大学成立一周年的新起点上，站在更高平台、要求更高水准上，为推动构建普惠性的、服务全民终身学习的教育体系，探讨更好地服务国家战略、服务建行战略、服务普罗大众、服务广大员工的一次重要会议。桂平行长的重要讲话，我想大家经过一个半天加一个晚上的学习理解，一定有了深入的思考。学思践悟，方能行稳致远。我们身处在一个“百年未有之大变局”的时代，要有分析大势、客观判断、立意高远的情怀格局。这完全顺应中央对新形势、新阶段做好金融工作、发展职业教育的总要求，对做好建行大学今后的各项工作具有重要的指导意义。各单位回去后要认真学习落实，对年度工作精心谋划、制定切实可行的贯彻措施，把各项工作做深做细做实。这次会议，更是一次“深悟初心使命、重整行装再出发”的会议。是统一思想、提高认识的会议，是一次明确方向的会议，是研究新情况、探索新办法的会议。这次具有“思想性、科技性、探索性、前瞻性、特色性”的交流研讨，让建行大学工作会议、庆祝一周年校庆活动充满砥砺奋进的活力动力。对于开创建行大学工作新未来，必将产生重要作用。从贯彻习近平新时代中国特色社会主义思想的高度，从落实党的十九届四中全会精神的高度，从健全有利于更充分更高质量就业的促进机制、构建服务全民终身学习的教育体系的高度，从建行新金融行动的高度，以全新理念来谋划和推动“新时代新金融新生态企业大学”建设，是我们开创建行大学新未来的关键和前提。下面我讲几点意见。同志们！要做伟大的银行，就需要有一所伟大的大学作支撑。新金融与新大学，都是我们要开创的伟大事业。“金融 + 科技 + 教育”的融合之力，必将大有可为，大有作为。现在的关键，就是抓好落实。我们要统一思想，提高认识。要把思想和行动统一到这次会议精神上来，充分认识办好建行大学的重要性、长期性、复杂性和艰巨性，进一步增强责任感、使命感、时代感和紧迫感，以建行大学核心文化要素为根基，将我们的校训、愿景、使命、目标定位、办学理念，融于心，践于行。我们要调查研究，摸清情况，增强针对性、实效性、主动性和创造性。摸清基本情况，抓住问题症结，克服薄弱环节，提出有效对策，既有长远规划又有近期安排，既有宏观要求又有具体措施。坚决避免摆花架子，作表面文章的现象。教育一旦与社会需求紧密融合，与时代大势高度关联，与企业实践融为一体，便成为创新创造的策源地，成为社会经济发展的新引擎。高水准的新金融人才产教融合，聚合政府、银行、高校和企业的智慧和力量，必将为新时代新金融人才培养闯出一条善建之道，让全民教育、终身学习成为中华民族复兴之路、新金融行动征程上最美的画图，为国家、为人民交出建行人书写的最好答卷。我的总结就到这里，谢谢大家！'
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
