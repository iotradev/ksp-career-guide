export interface GlossaryTerm {
  id: string
  term: string
  termEn: string
  category: '轨道力学' | '推进系统' | '任务规划' | '游戏机制' | '天体名称'
  definition: string
  relatedTerms?: string[]
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'dv',
    term: 'Δv (Delta-v)',
    termEn: 'Delta-v',
    category: '轨道力学',
    definition: '速度变化量，衡量火箭"能飞多远"的核心指标。由火箭方程 Δv = Isp × g₀ × ln(m₀/mf) 决定。',
    relatedTerms: ['比冲', '火箭方程']
  },
  {
    id: 'isp',
    term: '比冲 (Isp)',
    termEn: 'Specific Impulse',
    category: '推进系统',
    definition: '衡量发动机效率的指标，单位为秒。表示每千克燃料能产生多少千克力的推力持续多少秒。越高越省燃料。',
    relatedTerms: ['Δv', '推力']
  },
  {
    id: 'twr',
    term: '推重比 (TWR)',
    termEn: 'Thrust-to-Weight Ratio',
    category: '推进系统',
    definition: '推力与重力之比。TWR > 1 才能起飞，推荐 TWR = 1.3-2.0。过高会导致难以控制，过低会浪费燃料。',
    relatedTerms: ['推力', '重力']
  },
  {
    id: 'apoapsis',
    term: '远地点 (Ap)',
    termEn: 'Apoapsis',
    category: '轨道力学',
    definition: '椭圆轨道上离主天体最远的点。在此点加速可以最有效地改变轨道形状。',
    relatedTerms: ['近地点', '轨道']
  },
  {
    id: 'periapsis',
    term: '近地点 (Pe)',
    termEn: 'Periapsis',
    category: '轨道力学',
    definition: '椭圆轨道上离主天体最近的点。在此点加速可以最有效地改变轨道高度。',
    relatedTerms: ['远地点', '轨道']
  },
  {
    id: 'gravity-turn',
    term: '重力转向',
    termEn: 'Gravity Turn',
    category: '轨道力学',
    definition: '利用重力自然改变火箭飞行方向的技术。在发射时轻微倾斜，让重力帮助转向，是最省Δv的发射方式。',
    relatedTerms: ['发射', '轨道插入']
  },
  {
    id: 'hohmann',
    term: '霍曼转移',
    termEn: 'Hohmann Transfer',
    category: '轨道力学',
    definition: '最省Δv的轨道转移方式。通过在低轨道加速进入椭圆转移轨道，在高轨道减速完成转移。',
    relatedTerms: ['转移轨道', 'Δv']
  },
  {
    id: 'inclination',
    term: '轨道倾角',
    termEn: 'Inclination',
    category: '轨道力学',
    definition: '轨道平面与参考平面（通常是赤道面）的夹角。改变倾角需要大量Δv，在高轨道改变更省力。',
    relatedTerms: ['轨道', '节点']
  },
  {
    id: 'launch-window',
    term: '发射窗口',
    termEn: 'Launch Window',
    category: '任务规划',
    definition: '行星际旅行时，目标行星处于最佳相对位置的时间段。错过窗口可能需要等待数年。',
    relatedTerms: ['行星际转移', '相位角']
  },
  {
    id: 'gravity-assist',
    term: '引力辅助',
    termEn: 'Gravity Assist',
    category: '轨道力学',
    definition: '利用天体引力改变航天器速度和方向的技术。可以节省大量Δv，是远距离任务的关键技术。',
    relatedTerms: ['飞越', '轨道改变']
  },
  {
    id: 'rcs',
    term: 'RCS推进器',
    termEn: 'RCS Thruster',
    category: '推进系统',
    definition: '反应控制系统，用于精确控制航天器的位置和姿态。主要用于对接和轨道微调。',
    relatedTerms: ['单甲肼', '对接']
  },
  {
    id: 'sas',
    term: 'SAS稳定系统',
    termEn: 'SAS',
    category: '游戏机制',
    definition: '稳定辅助系统，自动保持航天器的当前姿态。有多种模式：Prograde、Retrograde、Normal等。',
    relatedTerms: ['姿态控制', '稳定性']
  },
  {
    id: 'biome',
    term: '生态区 (Biome)',
    termEn: 'Biome',
    category: '游戏机制',
    definition: '天体表面的不同区域，如高地、低地、陨石坑等。不同biome提供不同的科学数据。',
    relatedTerms: ['科学', '表面采样']
  },
  {
    id: 'eva',
    term: '舱外活动 (EVA)',
    termEn: 'Extra-Vehicular Activity',
    category: '游戏机制',
    definition: '航天员离开航天器进行外部活动。可以收集科学数据、修理设备、采集样本。',
    relatedTerms: ['航天员', '科学']
  },
  {
    id: 'isru',
    term: '原位资源利用 (ISRU)',
    termEn: 'In-Situ Resource Utilization',
    category: '任务规划',
    definition: '利用当地资源生产燃料、氧气等物资。可以大大减少补给需求，是长期任务的关键技术。',
    relatedTerms: ['采矿', '精炼']
  },
  {
    id: 'kerbin',
    term: 'Kerbin',
    termEn: 'Kerbin',
    category: '天体名称',
    definition: 'KSP中的"地球"，玩家的母星。有大气层、海洋和两颗卫星（Mun和Minmus）。',
    relatedTerms: ['Mun', 'Minmus']
  },
  {
    id: 'mun',
    term: 'Mun',
    termEn: 'Mun',
    category: '天体名称',
    definition: 'Kerbin的天然卫星，类似月球。没有大气层，重力约0.16g，是最理想的第一个深空目标。',
    relatedTerms: ['Kerbin', 'Minmus']
  },
  {
    id: 'minmus',
    term: 'Minmus',
    termEn: 'Minmus',
    category: '天体名称',
    definition: 'Kerbin的第二颗卫星。重力极低(0.05g)，有平坦的冰原区域，非常适合练习着陆。',
    relatedTerms: ['Kerbin', 'Mun']
  },
  {
    id: 'duna',
    term: 'Duna',
    termEn: 'Duna',
    category: '天体名称',
    definition: 'KSP中的"火星"，有稀薄大气层和一颗卫星Ike。是最受欢迎的行星际目标。',
    relatedTerms: ['Ike', '行星际旅行']
  },
  {
    id: 'jool',
    term: 'Jool',
    termEn: 'Jool',
    category: '天体名称',
    definition: 'KSP中的气态巨行星，有5颗卫星（Laythe、Vall、Tylo、Bop、Pol）。是外太阳系的主要目标。',
    relatedTerms: ['Laythe', 'Tylo']
  },
  {
    id: 'prograde',
    term: '顺行 (Prograde)',
    termEn: 'Prograde',
    category: '轨道力学',
    definition: '航天器当前速度的方向。沿此方向加速会增大轨道高度。',
    relatedTerms: ['逆行', '轨道']
  },
  {
    id: 'retrograde',
    term: '逆行 (Retrograde)',
    termEn: 'Retrograde',
    category: '轨道力学',
    definition: '与航天器当前速度相反的方向。沿此方向加速会降低轨道高度。',
    relatedTerms: ['顺行', '轨道']
  },
  {
    id: 'normal',
    term: '法向 (Normal)',
    termEn: 'Normal',
    category: '轨道力学',
    definition: '垂直于轨道平面的方向。沿此方向加速会改变轨道倾角。',
    relatedTerms: ['反法向', '轨道倾角']
  },
  {
    id: 'staging',
    term: '分级',
    termEn: 'Staging',
    category: '推进系统',
    definition: '火箭设计技术，通过丢弃已耗尽的燃料箱来减轻重量，提高效率。是火箭设计的核心概念。',
    relatedTerms: ['分离器', '火箭设计']
  },
  {
    id: 'orbit',
    term: '轨道',
    termEn: 'Orbit',
    category: '轨道力学',
    definition: '航天器围绕天体运行的路径。由速度和高度决定，可以是圆形或椭圆形。',
    relatedTerms: ['远地点', '近地点']
  },
  {
    id: 'delta-v-map',
    term: 'Δv地图',
    termEn: 'Delta-v Map',
    category: '任务规划',
    definition: '显示到达各天体所需Δv的参考图表。是任务规划的重要工具。',
    relatedTerms: ['Δv', '任务规划']
  },
  {
    id: 'maneuver-node',
    term: '机动节点',
    termEn: 'Maneuver Node',
    category: '游戏机制',
    definition: '地图视图中用于规划轨道机动的工具。可以预览机动效果和所需Δv。',
    relatedTerms: ['轨道机动', 'Δv']
  },
  {
    id: 'docking',
    term: '对接',
    termEn: 'Docking',
    category: '游戏机制',
    definition: '将两个航天器在太空中连接的过程。需要RCS推进器进行精确控制，是建造空间站的关键技术。',
    relatedTerms: ['RCS', '空间站']
  },
  {
    id: 'heat-shield',
    term: '隔热罩',
    termEn: 'Heat Shield',
    category: '推进系统',
    definition: '保护航天器在大气层再入时免受高温的装置。必须安装在返回舱底部。',
    relatedTerms: ['重返大气层', '返回舱']
  },
  {
    id: 'solar-panel',
    term: '太阳能板',
    termEn: 'Solar Panel',
    category: '推进系统',
    definition: '将太阳能转化为电能的装置。是航天器的主要电力来源，在阴影中需要电池供电。',
    relatedTerms: ['电力', '电池']
  }
]
