
re_researchstyle={
  "width":"200px",
  "min-height":"0px",
  "height":"60px",
  "text-align":"left",
  "border-radius":"1px"
}
addLayer("re",{
  name: "research hub",
  symbol: "RE",
  startData() {
    return {
      points: new Decimal(0),
      paused:true,
      fastfwd:false,
      ticklength: .5,
      simtime: 0, //time incemented in the update loop by diff, will almost never be above ticklength
      inputports: [],
      outputports: [],
      blueprint_name: "blueprint",
    }
  },
  type: "none",
  color: "#ffd541",
  upgrades: {
    11: {
      canAfford(){return cr_getitem("dust").gte(100)},
      fullDisplay:`devise manual crafting aparatus
      <div style="text-align: right">
      &lt;REQ 100 DUST><br>
      &lt;USE 30 DUST><br>
      &lt;>
      </div>`,
      pay(){cr_subitem("dust",30)},
      style: re_researchstyle,
    },
    21: {
      canAfford(){return cr_hasitem("logic slate",4) && cr_hasitem("responsive cable",10) && Object.keys(player.ma.solved_puzzles).length>=4},
      fullDisplay:`devise simulator for logic systems
      <div style="text-align: right">
      &lt;REQ 4 LOGIC SLATE><br>
      &lt;USE 10 RESPONSIVE CABLE><br>
      &lt;>
      </div>`,
      pay(){cr_subitem("responsive cable",10)},
      style: re_researchstyle,
    },
    31: {
      canAfford(){return cr_hasitem("dust shard",30) && cr_hasitem("lively dust",10)},
      fullDisplay:`devise constuction drone
      <div style="text-align: right">
      &lt;REQ 4 FUNCTIONAL DESIGNS><br>
      &lt;USE 30 DUST SHARDS><br>
      &lt;USE 10 LIVELY DUST>
      </div>`,
      pay(){cr_subitem("dust shards",30);cr_subitem("lively dust",10)},
      style: re_researchstyle,
    },
  },
  buyables: {
    11: {
      costs:[
        {i:"dust",a:40},
        {i:"compressed dust",a:40},
        {i:"dust bricks",a:40}
      ],
      cost(x){
        return this.costs[x]||{i:"unknown",a:Infinity}
      },
      display() {
        let amt=getBuyableAmount(this.layer, this.id)
        return `ENHANCE GATHERING
        CURRENT: ${amt}
        &lt;USE ${`${this.cost().a}`.toUpperCase()} ${this.cost().i.toUpperCase()}>
        EFFECT: x${this.effect()}`
      },
      canAfford() { return cr_getitem(this.cost().i).gte(this.cost().a) },
      buy() {
          cr_setitem(this.cost().i,cr_getitem(this.cost().i).sub(this.cost().a))
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x){
        return 2**(x||getBuyableAmount(this.layer, this.id))
      }
      
    }
  },
  layerShown(){return player.co.lifetime_scrounged.gte(50)},
  tooltip(){return "devise new systems"}
})
//cr_getobj("responsive dust").haveseen