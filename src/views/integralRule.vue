<template>
  <div class="integralRule">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="副本分数线" name="0">
        <el-table :data="duplicate" border class="mb10 w100p">
          <el-table-column prop="name" label="副本"></el-table-column>
          <el-table-column prop="passScope" label="及格"></el-table-column>
          <el-table-column prop="goodScope" label="优秀"></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="每周副本奖励机制" name="1">
        <span style="color: red;">1、深渊副本 截止日期为每周五结算时</span>
        <el-divider></el-divider>
        <span style="color: red;">2、每周制定副本积分标准（其中一项优秀或三项及格均可）</span>
        <el-divider></el-divider>
        <span style="color: red;">3、副本积分最终解释权归家族管理层所有</span>
        <el-divider></el-divider>
        <span style="color: red;">4、每不合格一项-1分，每少参与一项-2分。当周有一项优秀+1分，可以叠加。</span>
      </el-collapse-item>
      <el-collapse-item title="深渊奖惩机制" name="2">
        <span style="color: red;">1、伤害排名前10的族员+3分，前20的+2分，前30名的+1分，30名以后未打满10次及以上次数的-1分。</span>
        <el-divider></el-divider>
        <span style="color: red;">2、族员贡献低于标准线的-1分，不请假又不参与者-5分，请假-3分。（未打满10次又低于标准线的共-2分）</span>
        <el-divider></el-divider>
        <span style="color: red;">3、伤害标准线：极忍以下为100W，极忍及以上为150W。</span>
      </el-collapse-item>
      <el-collapse-item title="家族战奖惩机制" name="3">
        <p>团战：</p>
        <span style="color: green;">1、MVP+2分（极限+3分） 前30名+1分，30名以外过及格线不加分不扣分。（单项）</span>
        <el-divider></el-divider>
        <span style="color: green;">2、及格线标准：河豚160 飞镖535 西瓜285 金币2900 蝙蝠 325 宝箱52 礼带60 逃离森林1900</span>
        <el-divider></el-divider>
        <span style="color: green;">3、团战时分数在30名以外又不及格的-1分（单项）</span>
        <p class="mt10">pvp：</p>
        <span style="color: green;">1、先锋上场+1分，胜利+2分</span>
        <el-divider></el-divider>
        <span style="color: green;">2、副将&主将上场 +1分，胜利+2分</span>
        <el-divider></el-divider>
        <span style="color: green;">3、王牌&头目 上场+1分，胜利+2分</span>
        <el-divider></el-divider>
        <span style="color: red;">
          （以上积分均不叠加，只取其中的最高的一项）
          <br />另：家族战无故缺席，一整场未到且未请假的一次-5分；请假一场-3分；家族战期间发无关悬赏一次-3分。
          <br />族战期间在公屏上主动引战的，轻则警告，重则请退
        </span>
      </el-collapse-item>
      <el-collapse-item title="其他积分" name="4">
        <span style="color: red;">1、SS悬赏统一交由渔夫安排+3分，奖励给本周积分靠前族员（自行安排不算)</span>
        <el-divider></el-divider>
        <span style="color: red;">2、每周满勤+1分（备战副本3项目打满、深渊15次以上、家族战团本4次打满）</span>
        <el-divider></el-divider>
        <span style="color: red;">3、给家族提供可执行的良好计划或方案可实施的每一次+3分</span>
        <el-divider></el-divider>
        <span style="color: red;">4、每推荐一名影5以上好友进家族+2分（团本能达标或肯练习的），成品王牌+5分，成品头目+10分</span>
        <el-divider></el-divider>
        <span style="color: red;">5、统计积分者，每统计1周（单项）+3分</span>
        <el-divider></el-divider>
        <span style="color: red;">6、打手或赞助者按以下积分兑换档次+2.3.5分</span>
      </el-collapse-item>
      <el-collapse-item title="备注" name="5">
        <span style="color: red;">1、家族战和深渊要听指挥，不能随意上或者随意开局</span>
        <el-divider></el-divider>
        <span style="color: red;">2、留意家族战名单，以及请假的要提早一些请假，不能快开打了再说，请假找当周统计登记</span>
        <el-divider></el-divider>
        <span style="color: red;">3、家族战量力而为，打好打坏都要有好的心态，多鼓励，少埋怨</span>
        <el-divider></el-divider>
        <span style="color: red;">4、以上条例对家族管理层及所有族员一视同仁</span>
        <el-divider></el-divider>
        <span style="color: red;">5、最早每周一公布上周最新积分结算，有误的及时联系管理，否则过太久的帐便不再计算</span>
        <el-divider></el-divider>
        <span style="color: red;">6、积分有正有负，当族员积分低于或等于-20分的时候，对不起，请你另谋高就。</span>
        <el-divider></el-divider>
        <span style="color: red;">7、诚招管理和提供福利者，无论你技术如何，只要热爱这个家族，都可以联系管理层加入我们。</span>
      </el-collapse-item>
      <el-collapse-item title="关于请假" name="6">
        <span style="color: red;">参战名单上成员请假找安排人员（当天19:00前）</span>
        <el-divider></el-divider>
        <span style="color: red;">同时本人也要在请加群里报备以免多扣分</span>
        <el-divider></el-divider>
        <span style="color: red;">深渊战同上</span>
      </el-collapse-item>
      <el-collapse-item title="关于管理人员" name="7">
        <span style="color: red;">积分事项太子安排</span>
        <el-divider></el-divider>
        <span style="color: red;">SS悬赏渔夫安排</span>
        <el-divider></el-divider>
        <span style="color: red;">深渊战啸海安排</span>
        <el-divider></el-divider>
        <span style="color: red;">家族战十三安排</span>
        <el-divider></el-divider>
        <span style="color: red;">首领暂由十三安排（按积分要求）</span>
        <el-divider></el-divider>
        <span style="color: red;">其它事项莫离安排</span>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component /*, Watch*/ } from "vue-property-decorator";
@Component({
  name: "IntegralRule"
})
export default class Home extends Vue {
  private activeNames: Array<number> = [];
  private duplicate: Array<object> = [
    {
      name: "收集宝箱",
      passScope: "52",
      goodScope: "59"
    },
    {
      name: "逃离森林",
      passScope: "1900",
      goodScope: "2150"
    },
    {
      name: "消灭蝙蝠",
      passScope: "325",
      goodScope: "390"
    },
    {
      name: "彩带",
      passScope: "60",
      goodScope: "69"
    },
    {
      name: "切西瓜",
      passScope: "285",
      goodScope: "312"
    },
    {
      name: "河豚",
      passScope: "160",
      goodScope: "180"
    },
    {
      name: "飞镖",
      passScope: "535",
      goodScope: "595"
    },
    {
      name: "金币",
      passScope: "2900",
      goodScope: "3070"
    }
  ];

  // get myNameLength(): number {
  // }

  // @Watch("myNameLength")
  // getmyNameLength(ov: number, nv: number) {
  //   if (ov !== nv) {
  //     console.log(ov, nv, "+++++");
  //   }
  // }
}
</script>

<style lang="less">
.integralRule {
  padding: 10px;
}
</style>
