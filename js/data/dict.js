/* ============ 种子数据：内置词典与停用词 ============ */
  window.SeedDict = {
    sunday: 'n. 星期日', rain: 'n. 雨 v. 下雨', rained: 'v. 下雨（rain 过去式）', stay: 'v. 停留；保持',
    home: 'n. 家', made: 'v. 制作（make 过去式）', cup: 'n. 杯子', hot: 'adj. 热的', tea: 'n. 茶',
    sat: 'v. 坐（sit 过去式）', window: 'n. 窗户', sang: 'v. 唱歌（sing 过去式）', soft: 'adj. 轻柔的；柔软的',
    song: 'n. 歌曲', roof: 'n. 屋顶', whole: 'adj. 整个的', city: 'n. 城市', quiet: 'adj. 安静的',
    cat: 'n. 猫', jumped: 'v. 跳（jump 过去式）', legs: 'n. 腿（leg 复数）', fell: 'v. 掉落；变成（fall 过去式）',
    asleep: 'adj. 睡着的', smiled: 'v. 微笑（smile 过去式）', touched: 'v. 触摸（touch 过去式）',
    warm: 'adj. 温暖的', back: 'n. 背部 adv. 回', thought: 'v. 想（think 过去式） n. 想法',
    grandmother: 'n. 祖母；外婆', taught: 'v. 教（teach 过去式）', bread: 'n. 面包', kitchen: 'n. 厨房',
    smelled: 'v. 闻起来（smell 过去式）', ready: 'adj. 准备好的', afternoon: 'n. 下午',
    stopped: 'v. 停止（stop 过去式）', opened: 'v. 打开（open 过去式）', deep: 'adj. 深的',
    breath: 'n. 呼吸', air: 'n. 空气', fresh: 'adj. 新鲜的', clean: 'adj. 干净的 v. 打扫',
    birds: 'n. 鸟（bird 复数）', started: 'v. 开始（start 过去式）', sing: 'v. 唱歌', garden: 'n. 花园',
    picked: 'v. 摘；拿起（pick 过去式）', phone: 'n. 电话', called: 'v. 打电话（call 过去式）',
    best: 'adj. 最好的', friend: 'n. 朋友', talked: 'v. 谈话（talk 过去式）', laughed: 'v. 笑（laugh 过去式）',
    hours: 'n. 小时（hour 复数）', simple: 'adj. 简单的', felt: 'v. 感觉（feel 过去式）',
    happy: 'adj. 开心的', sometimes: 'adv. 有时', gift: 'n. 礼物',
    corner: 'n. 角落', street: 'n. 街道', bookshop: 'n. 书店', owner: 'n. 主人；老板',
    elderly: 'adj. 年长的', white: 'adj. 白色的', hair: 'n. 头发', round: 'adj. 圆的', glasses: 'n. 眼镜',
    knows: 'v. 知道（know 三单）', shelves: 'n. 书架（shelf 复数）', saturday: 'n. 星期六',
    students: 'n. 学生（student 复数）', visit: 'v. 拜访；参观', shop: 'n. 商店', stories: 'n. 故事（story 复数）',
    weekend: 'n. 周末', recommends: 'v. 推荐（recommend 三单）', sails: 'v. 航行（sail 三单）',
    across: 'prep. 穿过', ocean: 'n. 海洋', adventure: 'n. 冒险', sold: 'v. 卖（sell 过去式）',
    cleaned: 'v. 打扫（clean 过去式）', moment: 'n. 片刻；时刻', doors: 'n. 门（door 复数）',
    answered: 'v. 回答（answer 过去式）', opens: 'v. 打开（open 三单）', different: 'adj. 不同的',
    world: 'n. 世界', kept: 'v. 保持（keep 过去式）', bought: 'v. 买（buy 过去式）',
    mystery: 'n. 悬疑；神秘', novel: 'n. 小说', page: 'n. 页', stop: 'v. 停止',
    outside: 'adv. 外面', noisy: 'adj. 嘈杂的', inside: 'adv. 里面', silent: 'adj. 寂静的',
    ship: 'n. 轮船', crossing: 'v. 穿越（cross -ing）', dark: 'adj. 黑暗的', sea: 'n. 海',
    night: 'n. 夜晚', close: 'v. 关闭', eyes: 'n. 眼睛（eye 复数）', brain: 'n. 大脑',
    begins: 'v. 开始（begin 三单）', strange: 'adj. 奇怪的', fly: 'v. 飞', mountains: 'n. 山（mountain 复数）',
    talk: 'v. 交谈', suddenly: 'adv. 突然', exam: 'n. 考试', experiences: 'n. 经历（experience 复数）',
    dreams: 'n. 梦（dream 复数）', scientists: 'n. 科学家（scientist 复数）', trying: 'v. 尝试（try -ing）',
    understand: 'v. 理解', famous: 'adj. 著名的', theory: 'n. 理论', organize: 'v. 组织；整理',
    memories: 'n. 记忆（memory 复数）', receive: 'v. 接收', millions: 'num. 百万', pieces: 'n. 片；条（piece 复数）',
    information: 'n. 信息', sorts: 'v. 分类（sort 三单）', important: 'adj. 重要的', rest: 'n. 其余；休息',
    sleep: 'v./n. 睡觉', remember: 'v. 记住', lessons: 'n. 课程（lesson 复数）', connects: 'v. 联系（connect 三单）',
    emotions: 'n. 情绪（emotion 复数）', worried: 'adj. 担心的', failing: 'v. 失败；不及格（fail -ing）',
    test: 'n. 测试', mind: 'n. 思维；头脑', safe: 'adj. 安全的', face: 'v. 面对 n. 脸',
    fears: 'n. 恐惧（fear 复数）', modern: 'adj. 现代的', research: 'n. 研究', machines: 'n. 机器（machine 复数）',
    sleeping: 'adj. 睡着的', experiment: 'n. 实验', woke: 'v. 唤醒（wake 过去式）', special: 'adj. 特别的',
    stage: 'n. 阶段', results: 'n. 结果（result 复数）', suggest: 'v. 表明；建议',
    people: 'n. 人们', problems: 'n. 问题（problem 复数）', daily: 'adj. 每日的', lives: 'n. 生活（life 复数）',
    work: 'v./n. 工作；运转'
  };

  // 阅读时不标注的虚词
  window.SeedStopwords = new Set(('the a an and or but of to in on at for with by from is are was were be been am ' +
    'i you he she it we they me him her us them my your his its our their this that these those as if so not ' +
    'no do does did done have has had will would can could may might should shall must up down out over under ' +
    'about into than then when while what which who whom whose how why where all any some more most other such ' +
    'only own same too very just also again once here there because before after during between each few both ' +
    'never always ever still yet let get got go went come came said says say know see saw look looked make take ' +
    'took give gave find found want wanted need needed like loved love use used first last one two three his hers').split(' '));
