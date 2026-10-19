/* ============ 种子数据：语法课程 30 课 ============ */
window.SeedGrammar = [
    {
      id: 'g0', title: '字母与拼读入门', level: '零基础', icon: '🔤',
      summary: '26 个字母、元音辅音、大小写规则',
      sections: [
        {
          h: '26 个字母', body: '英语一共有 26 个字母，每个字母有大小写两种写法：\nAa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm\nNn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz\n其中 A、E、I、O、U 这 5 个叫「元音字母」，其余 21 个叫「辅音字母」。',
          examples: [
            { en: 'Aa is for apple.', zh: 'Aa 是 apple（苹果）的开头。' },
            { en: 'Bb is for book.', zh: 'Bb 是 book（书）的开头。' },
            { en: 'Cc is for cat.', zh: 'Cc 是 cat（猫）的开头。' }
          ]
        },
        {
          h: '简单拼读', body: '把辅音和元音拼在一起就能读出单词：\nc - a - t → cat（猫）\nd - o - g → dog（狗）\np - e - n → pen（笔）\n先认字母，再练拼读，这是零基础学英语的第一步。',
          examples: [
            { en: 'c-a-t → cat', zh: '猫' },
            { en: 'd-o-g → dog', zh: '狗' },
            { en: 'b-u-s → bus', zh: '公共汽车' }
          ]
        },
        {
          h: '大小写规则', body: '三条基本规则：\n1. 句子的第一个字母要大写；\n2. 人名、地名永远大写；\n3. 「我」(I) 在任何位置都大写。',
          examples: [
            { en: 'Lily and I are good friends.', zh: '莉莉和我是好朋友。（人名和 I 都大写）' },
            { en: 'I live in Beijing.', zh: '我住在北京。（地名大写）' }
          ]
        }
      ],
      tips: ['字母「i」单独出现（表示“我”）永远写成大写 I。', '英语句号是实心点「.」，不是中文的「。」'],
      exercises: [
        { type: 'choice', prompt: '下面哪一组全是元音字母？', options: ['A E I O U', 'a b c d e', 'A B C D E', 'p q r s t'], answer: 0, explain: '元音字母只有 5 个：A E I O U。' },
        { type: 'fill', prompt: '拼读 k-æ-t 读出来是哪个单词？（写小写）', answer: 'cat', explain: 'k-æ-t 拼读出来就是 cat（猫）。' },
        { type: 'choice', prompt: '句子的第一个字母应该？', options: ['大写', '小写', '随便', '加下划线'], answer: 0, explain: '句首字母必须大写。' },
        { type: 'fill', prompt: '「我和莉莉是朋友。」翻译中「我」要用大写 ___，填这个字母。', answer: 'I', explain: '「我」永远大写，写作 I。' }
      ]
    },
    {
      id: 'g1', title: 'be 动词：am / is / are', level: '零基础', icon: '🧩',
      summary: '英语里第一个要学的动词',
      sections: [
        {
          h: 'be 动词是什么', body: 'be 动词的意思是「是」，它有三种样子：am、is、are。\n口诀：我用 am，你用 are，is 连着他她它；单数 is，复数 are。',
          examples: [
            { en: 'I am a student.', zh: '我是一名学生。' },
            { en: 'You are my friend.', zh: '你是我的朋友。' },
            { en: 'She is my mother.', zh: '她是我的妈妈。' },
            { en: 'They are teachers.', zh: '他们是老师。（复数用 are）' }
          ]
        },
        {
          h: '否定式：加 not', body: '在 be 动词后面加 not 就是「不是」：\nam not / is not (isn\'t) / are not (aren\'t)',
          examples: [
            { en: "I'm not late.", zh: '我没有迟到。' },
            { en: "It isn't a dog.", zh: '它不是狗。' },
            { en: "We aren't at home.", zh: '我们不在家。' }
          ]
        },
        {
          h: '疑问式：be 动词提前', body: '把 be 动词搬到句子最前面，句尾用问号，就变成一般疑问句。\n回答也要用 be 动词：Yes, I am. / No, it isn\'t.',
          examples: [
            { en: 'Are you a student?', zh: '你是学生吗？— Yes, I am. 是的。' },
            { en: 'Is she your sister?', zh: '她是你姐姐吗？— No, she isn\'t. 不是。' }
          ]
        }
      ],
      tips: ['I am 缩写成 I\'m，但 I am not 不能缩写成 I amn\'t。', '常见错误：I is ❌ → I am ✔'],
      exercises: [
        { type: 'fill', prompt: 'I ___ a middle school student.', answer: 'am', explain: '我用 am。' },
        { type: 'fill', prompt: 'They ___ in the classroom.', answer: 'are', explain: 'they 是复数，用 are。' },
        { type: 'choice', prompt: '"她是我的妈妈" 应该说：She ___ my mother.', options: ['is', 'am', 'are', 'be'], answer: 0, explain: 'she 是第三人称单数，用 is。' },
        { type: 'fill', prompt: '___ you from Beijing?', answer: 'Are', explain: '疑问句 be 动词提前；you 配 are。' }
      ]
    },
    {
      id: 'g2', title: '人称代词与物主代词', level: '零基础', icon: '👥',
      summary: '我/你/他/她/它 和 我的/你的/他的',
      sections: [
        {
          h: '人称代词（谁）', body: '我 I / 你 you / 他 he / 她 she / 它 it\n我们 we / 你们 you / 他们 they\n作主语时用这些词，放动词前面。',
          examples: [
            { en: 'He is my brother.', zh: '他是我哥哥。' },
            { en: 'We are classmates.', zh: '我们是同学。' },
            { en: 'It is a cat.', zh: '它是一只猫。' }
          ]
        },
        {
          h: '形容词性物主代词（谁的）', body: '我的 my / 你的 your / 他的 his / 她的 her / 它的 its\n我们的 our / 你们的 your / 他们的 their\n后面必须跟名词：my book（我的书）、her name（她的名字）。',
          examples: [
            { en: 'This is my book.', zh: '这是我的书。' },
            { en: 'Her name is Lily.', zh: '她的名字叫莉莉。' },
            { en: 'We love our school.', zh: '我们爱我们的学校。' }
          ]
        }
      ],
      tips: ['its（它的）没有撇号；it\'s = it is（它是）。', 'he→his，she→her，千万别混。'],
      exercises: [
        { type: 'fill', prompt: '___ (I) favorite color is blue.（填物主代词）', answer: 'My', explain: '「我的」用 my。' },
        { type: 'fill', prompt: 'This is Lily. ___ is twelve years old.', answer: 'She', explain: '指 Lily 用 she。' },
        { type: 'choice', prompt: '"他们的老师" 是：___ teacher', options: ['They', 'Their', 'Them', 'Theirs'], answer: 1, explain: '后面有名词 teacher，用形容词性物主代词 their。' },
        { type: 'choice', prompt: '"这是他的书包"：This is ___ bag.', options: ['he', 'him', 'his', 'he\'s'], answer: 2, explain: '「他的」用 his。' }
      ]
    },
    {
      id: 'g3', title: '名词单复数', level: '零基础', icon: '🔢',
      summary: '一个还是多个？加 s 的规则',
      sections: [
        {
          h: '复数的基本规则', body: '表示两个及以上要用复数：\n1. 一般直接加 s：book→books, apple→apples\n2. 以 s/x/ch/sh 结尾加 es：box→boxes, bus→buses, watch→watches\n3. 辅音字母+y 结尾：变 y 为 i 加 es：city→cities, family→families\n4. 以 f/fe 结尾：多变 ves：knife→knives, leaf→leaves',
          examples: [
            { en: 'I have two pens.', zh: '我有两支钢笔。' },
            { en: 'There are three boxes on the desk.', zh: '桌子上有三个盒子。' },
            { en: 'Many families live here.', zh: '许多家庭住在这里。' }
          ]
        },
        {
          h: '常见不规则复数', body: 'man→men 男人\nwoman→women 女人\nclass 中的 person→people 人\nchild→children 小孩\nfoot→feet 脚\ntooth→teeth 牙齿\n这些要单独背！',
          examples: [
            { en: 'There are forty students in our class.', zh: '我们班有四十个学生。' },
            { en: 'The children are playing games.', zh: '孩子们在玩游戏。' },
            { en: 'I brush my teeth every morning.', zh: '我每天早上刷牙。' }
          ]
        }
      ],
      tips: ['sheep（羊）、deer（鹿）单复数同形：one sheep, two sheep。', 'people 本身就是复数，不说 peoples（除非指“多个民族”）。'],
      exercises: [
        { type: 'fill', prompt: 'box 的复数是 ___', answer: 'boxes', explain: 'x 结尾加 es。' },
        { type: 'fill', prompt: 'child 的复数是 ___', answer: 'children', explain: 'child→children，不规则，要背。' },
        { type: 'choice', prompt: 'I have two ___.', options: ['apple', 'apples', 'apples', 'applees'], answer: 1, explain: '两个以上用复数 apples。' },
        { type: 'fill', prompt: 'family 的复数是 ___（提示：辅音+y）', answer: 'families', explain: '变 y 为 i 加 es。' }
      ]
    },
    {
      id: 'g4', title: '冠词：a / an / the', level: '零基础', icon: '📌',
      summary: '一个用 a 还是 an？',
      sections: [
        {
          h: 'a 和 an', body: '表示「一个」时用 a 或 an：\n辅音音素开头用 a：a book, a dog, a useful book\n元音音素开头用 an：an apple, an egg, an English book\n注意：看发音，不看字母！hour 的 h 不发音，所以是 an hour。',
          examples: [
            { en: 'I have a pen and an eraser.', zh: '我有一支钢笔和一块橡皮。' },
            { en: 'She eats an apple every day.', zh: '她每天吃一个苹果。' },
            { en: 'It takes an hour to get there.', zh: '到那儿要一个小时。' }
          ]
        },
        {
          h: '定冠词 the', body: 'the 表示「这个/那个」，双方都知道或独一无二的东西：\nthe sun 太阳 / the moon 月亮 / the earth 地球\n第二次提到的人或物也用 the。',
          examples: [
            { en: 'The sun rises in the east.', zh: '太阳从东边升起。' },
            { en: 'I see a cat. The cat is white.', zh: '我看见一只猫。那只猫是白色的。' }
          ]
        }
      ],
      tips: ['零基础阶段先记住：第一次提到用 a/an，再说它用 the。', 'an 后面的单词开头读音必须是元音，如 an hour，但 a university（u 发 /ju:/）。'],
      exercises: [
        { type: 'fill', prompt: '___ apple a day keeps the doctor away.', answer: 'An', explain: 'apple 元音开头，用 an。' },
        { type: 'fill', prompt: 'I have ___ eraser in my pencil box.', answer: 'an', explain: 'eraser 元音开头。' },
        { type: 'choice', prompt: '"月亮" 应该说：___ moon', options: ['A', 'An', 'The', '不填'], answer: 2, explain: '独一无二的天体用 the。' },
        { type: 'fill', prompt: 'This is ___ useful book.（a 或 an）', answer: 'a', explain: 'useful 发音是 /ju:/ 开头，辅音音素，用 a。' }
      ]
    },
    {
      id: 'g5', title: '一般现在时与三单', level: '初中核心', icon: '⭐',
      summary: '习惯、事实，第三人称单数 +s',
      sections: [
        {
          h: '什么时候用', body: '一般现在时表示经常发生的动作或客观事实。\n常见标志词：always, usually, often, sometimes, every day。',
          examples: [
            { en: 'I go to school every day.', zh: '我每天上学。' },
            { en: 'The earth goes around the sun.', zh: '地球绕着太阳转。（客观事实）' }
          ]
        },
        {
          h: '第三人称单数（三单）', body: '主语是 he / she / it 或单个人名时，动词要加 s 或 es（和名词复数规则一样）：\nlike→likes, watch→watches, go→goes, study→studies\n特殊的：have→has。',
          examples: [
            { en: 'She gets up at six.', zh: '她六点起床。' },
            { en: 'Tom goes to school by bike.', zh: '汤姆骑自行车上学。' },
            { en: 'He has lunch at 12:00.', zh: '他 12 点吃午饭。' }
          ]
        },
        {
          h: '否定与疑问', body: '非三单用 do not (don\'t)，三单用 does not (doesn\'t)，后面动词用原形！\n疑问句 Do / Does 放句首。',
          examples: [
            { en: "I don't like coffee.", zh: '我不喜欢咖啡。' },
            { en: "He doesn't like coffee.", zh: '他不喜欢咖啡。（like 用原形）' },
            { en: 'Does she like music?', zh: '她喜欢音乐吗？' }
          ]
        }
      ],
      tips: ['doesn\'t / Does 后面的动词必须还原成原形，这是考试最常见考点！', 'have 的三单是 has。'],
      exercises: [
        { type: 'fill', prompt: 'She ___ (go) to school by bike.', answer: 'goes', explain: '三单，go→goes。' },
        { type: 'fill', prompt: 'He ___ (have) lunch at 12.', answer: 'has', explain: 'have 的三单是 has。' },
        { type: 'choice', prompt: '___ she like music?', options: ['Do', 'Does', 'Is', 'Are'], answer: 1, explain: '三单疑问用 Does。' },
        { type: 'fill', prompt: 'I ___ (not like) winter.（缩写）', answer: "don't like", explain: '非三单否定用 don\'t + 原形。' }
      ]
    },
    {
      id: 'g6', title: '现在进行时', level: '初中核心', icon: '🏃',
      summary: '正在做的事：be + V-ing',
      sections: [
        {
          h: '结构和标志词', body: '结构：be 动词 (am/is/are) + 动词ing\n表示「正在做某事」。\n标志词：now, Look!, Listen!。',
          examples: [
            { en: 'I am reading a book now.', zh: '我现在正在看书。' },
            { en: 'Look! The boys are playing basketball.', zh: '看！男孩们正在打篮球。' },
            { en: "Listen! Someone is singing.", zh: '听！有人在唱歌。' }
          ]
        },
        {
          h: 'ing 怎么加', body: '三条规则：\n1. 一般直接加：read→reading, play→playing\n2. 以不发音 e 结尾去 e 加：write→writing, make→making\n3. 重读闭音节双写末尾字母：run→running, swim→swimming, sit→sitting',
          examples: [
            { en: 'She is making a cake.', zh: '她在做蛋糕。（make→making）' },
            { en: 'He is running fast.', zh: '他跑得很快。（run→running）' }
          ]
        }
      ],
      tips: ['like / love / want 这类「心情/状态」动词一般不用进行时。', '别忘 be 动词：He running ❌ → He is running ✔'],
      exercises: [
        { type: 'fill', prompt: 'Look! It ___ (rain) outside.', answer: 'is raining', explain: 'is + raining。' },
        { type: 'fill', prompt: 'They ___ (swim) in the river now.', answer: 'are swimming', explain: 'swim 双写 m 加 ing。' },
        { type: 'fill', prompt: 'She ___ (write) a letter now.', answer: 'is writing', explain: 'write 去e加ing。' },
        { type: 'choice', prompt: 'Listen! Someone ___.', options: ['sings', 'is singing', 'sing', 'singing'], answer: 1, explain: 'Listen 是标志词，用进行时。' }
      ]
    },
    {
      id: 'g7', title: '一般过去时', level: '初中核心', icon: '🕐',
      summary: '昨天的事：动词过去式',
      sections: [
        {
          h: '什么时候用', body: '表示过去发生的动作，标志词：yesterday, last week, ... ago, in 2020。',
          examples: [
            { en: 'I visited my grandma yesterday.', zh: '我昨天看望了奶奶。' },
            { en: 'We had a good time last week.', zh: '上周我们玩得很开心。' }
          ]
        },
        {
          h: '过去式怎么变', body: '规则变化：\n一般 +ed：visit→visited, play→played\n以 e 结尾 +d：live→liked→liked（live→lived）\n辅音+y：变 i 加 ed：study→studied\n重读闭音节双写：stop→stopped\n\n常见不规则（必背）：\ngo→went, have→had, do→did, see→saw, eat→ate, buy→bought, take→took, come→came, get→got',
          examples: [
            { en: 'She bought a new pen yesterday.', zh: '她昨天买了一支新钢笔。' },
            { en: 'He studied hard last year.', zh: '他去年学习很努力。' }
          ]
        },
        {
          h: '否定与疑问', body: '用 didn\'t + 动词原形，疑问用 Did + 主语 + 原形：\nI didn\'t go to school yesterday.\nDid you watch TV last night?',
          examples: [
            { en: "She didn't go to school yesterday.", zh: '她昨天没去上学。（go 用原形！）' },
            { en: 'Did you do your homework?', zh: '你做作业了吗？' }
          ]
        }
      ],
      tips: ['didn\'t 后面必须用动词原形：didn\'t went ❌ → didn\'t go ✔', 'was / are 的过去式是 was / were。'],
      exercises: [
        { type: 'fill', prompt: 'I ___ (go) to the park last Sunday.', answer: 'went', explain: 'go 的过去式是 went。' },
        { type: 'fill', prompt: 'She ___ (buy) a new pen yesterday.', answer: 'bought', explain: 'buy→bought。' },
        { type: 'choice', prompt: 'He ___ TV last night.', options: ["doesn't watch", "didn't watch", "didn't watched", "not watched"], answer: 1, explain: "过去时否定 didn't + 原形 watch。" },
        { type: 'fill', prompt: 'We ___ (have) a good time last week.', answer: 'had', explain: 'have→had。' }
      ]
    },
    {
      id: 'g8', title: '一般将来时', level: '初中核心', icon: '🚀',
      summary: '明天的事：will / be going to',
      sections: [
        {
          h: '两种说法', body: '1. will + 动词原形：I will help you. 我会帮你。\n2. be going to + 动词原形：I am going to visit Beijing. 我打算去北京。\n标志词：tomorrow, next week, soon, in the future。',
          examples: [
            { en: 'It will rain tomorrow.', zh: '明天会下雨。' },
            { en: 'We are going to have a picnic next Sunday.', zh: '下周日我们要去野餐。' },
            { en: 'She will be a teacher in the future.', zh: '她将来会成为一名老师。' }
          ]
        },
        {
          h: '否定与疑问', body: 'will not = won\'t。\n疑问把 Will 提前：Will you come tomorrow? Yes, I will. / No, I won\'t.',
          examples: [
            { en: "I won't be late again.", zh: '我不会再迟到了。' },
            { en: 'Will it be sunny tomorrow?', zh: '明天会是晴天吗？' }
          ]
        }
      ],
      tips: ['will 后面必须跟动词原形：will goes ❌ → will go ✔', 'be going to 里 be 随人称变化：I am / he is / they are going to。'],
      exercises: [
        { type: 'fill', prompt: 'We ___ (visit) the museum tomorrow.（用 will）', answer: 'will visit', explain: 'will + 原形。' },
        { type: 'choice', prompt: 'She ___ going to buy a book.', options: ['am', 'is', 'are', 'be'], answer: 1, explain: 'she 配 is。' },
        { type: 'fill', prompt: 'It will ___ (be) sunny tomorrow.', answer: 'be', explain: 'will 后用原形 be。' },
        { type: 'choice', prompt: '"我不会再迟到了"：I ___ be late again.', options: ['will', "won't", 'don\'t', 'am not'], answer: 1, explain: 'will not 缩写 won\'t。' }
      ]
    },
    {
      id: 'g9', title: '比较级与最高级', level: '初中进阶', icon: '📈',
      summary: '更高的 / 最高的',
      sections: [
        {
          h: '比较级：两者比较', body: '规则：\n一般 +er：tall→taller\n以 e 结尾 +r：nice→nicer\n重读闭音节双写：big→bigger, thin→thinner\n辅音+y 变 i 加 er：happy→happier\n多音节词前面加 more：more beautiful\n句型：A ... + 比较级 + than + B',
          examples: [
            { en: 'Tom is taller than Jim.', zh: '汤姆比吉姆高。' },
            { en: 'This box is bigger than that one.', zh: '这个箱子比那个大。' },
            { en: 'English is more interesting than math.', zh: '英语比数学有趣。' }
          ]
        },
        {
          h: '最高级：三者以上', body: 'the + 最高级，常与 in / of 短语连用：\ntall→the tallest, big→the biggest\n多音节：the most beautiful\n不规则：good/well→better→best；bad→worse→worst；many/much→more→most',
          examples: [
            { en: 'She is the best student in our class.', zh: '她是我们班最好的学生。' },
            { en: 'It is the biggest city in China.', zh: '它是中国最大的城市。' }
          ]
        }
      ],
      tips: ['比较级后面用 than，不要写成 then（然后）。', '最高级前面别忘了 the。'],
      exercises: [
        { type: 'fill', prompt: 'This box is ___ (big) than that one.', answer: 'bigger', explain: 'big 双写 g 加 er。' },
        { type: 'fill', prompt: 'He is the ___ (tall) boy in our class.', answer: 'tallest', explain: 'the + tallest。' },
        { type: 'choice', prompt: 'good 的比较级是？', options: ['gooder', 'better', 'more good', 'best'], answer: 1, explain: 'good→better→best，不规则。' },
        { type: 'fill', prompt: 'Math is ___ (easy) than English for me.', answer: 'easier', explain: '辅音+y：easy→easier。' }
      ]
    },
    // ---------- 小学组（配套词库 b7 小学必备词汇） ----------
    {
      id: 'gs1', title: 'There be 句型', level: '小学', icon: '🏫',
      summary: '表达"某地有某物"，配套词库：小学必备词汇',
      sections: [
        {
          h: 'There is / There are', body: 'There be 句型表示"某个地方存在某个东西"：\nThere is + 单数名词或不可数名词\nThere are + 复数名词\n它和 have 不同：have 表示"某人拥有"，There be 表示"某处有"。',
          examples: [
            { en: 'There is a cat under the tree.', zh: '树下有一只猫。' },
            { en: 'There are three apples on the table.', zh: '桌上有三个苹果。' },
            { en: 'There is some bread on the plate.', zh: '盘子里有一些面包。' }
          ]
        },
        {
          h: '就近原则与疑问句', body: '离 be 动词最近的名词决定用 is 还是 are：\nThere is a bed and two windows in the room.\n疑问句把 be 提到句首：\nIs there a pear in the bag? — Yes, there is.\nAre there any monkeys in the zoo? — No, there aren\'t.',
          examples: [
            { en: 'Is there a cake in the box?', zh: '盒子里有蛋糕吗？' },
            { en: 'How many flowers are there in the garden?', zh: '花园里有多少朵花？' }
          ]
        }
      ],
      tips: ['不可数名词（water, bread, juice）永远用 There is。', '否定句在 be 后加 not：There isn\'t a door in this wall.'],
      exercises: [
        { type: 'choice', prompt: '"桌上有一个橘子" 应该说：There ___ an orange on the table.', options: ['is', 'are', 'am', 'have'], answer: 0, explain: 'an orange 是单数，用 There is。' },
        { type: 'fill', prompt: 'There ___ five birds in the tree.（树上有五只鸟）', answer: 'are', explain: 'five birds 是复数，用 are。' },
        { type: 'choice', prompt: 'There ___ some juice in the glass.', options: ['is', 'are', 'have', 'be'], answer: 0, explain: 'juice 是不可数名词，用 is。' },
        { type: 'fill', prompt: '把句子变成疑问句：___ there a tiger in the zoo?', answer: 'Is|is', explain: '疑问句把 Is 提到句首。' }
      ]
    },
    {
      id: 'gs2', title: '情态动词 can', level: '小学', icon: '💪',
      summary: '表达"会、能"，配套词库：小学必备词汇',
      sections: [
        {
          h: 'can + 动词原形', body: 'can 表示"会、能、可以"，后面必须接动词原形：\n肯定句：主语 + can + 动词原形\ncan 没有人称和数的变化，任何主语后面都是 can。',
          examples: [
            { en: 'The monkey can climb the tree.', zh: '猴子会爬树。' },
            { en: 'Birds can sing and fly.', zh: '鸟会唱歌和飞。' },
            { en: 'I can see the sun and the moon.', zh: '我能看见太阳和月亮。' }
          ]
        },
        {
          h: '否定句和疑问句', body: '否定式：can + not = can\'t（不会）\n疑问式：Can 提到句首\nCan you open the window? — Yes, I can. / No, I can\'t.',
          examples: [
            { en: "Pigs can't fly.", zh: '猪不会飞。' },
            { en: 'Can you close the door, please?', zh: '请你关上门好吗？' }
          ]
        }
      ],
      tips: ['can 后面永远用动词原形，不加 to 也不加 s：The bird can sing.（不是 can sings）', 'can\'t 是 cannot 的缩写形式。'],
      exercises: [
        { type: 'choice', prompt: 'The bird ___ sing very well.', options: ['can', 'cans', 'to can', 'caning'], answer: 0, explain: 'can 后接动词原形 sing。' },
        { type: 'fill', prompt: '大象不会飞：Elephants ___ fly.', answer: "can't|cannot|can not", explain: "否定式用 can't 或 cannot。" },
        { type: 'choice', prompt: '___ you open the window, please?', options: ['Can', 'Are', 'Do', 'Is'], answer: 0, explain: '情态动词 can 提前构成疑问句。' },
        { type: 'fill', prompt: 'The little girl can ___ (draw) a flower.', answer: 'draw', explain: 'can 后用动词原形。' }
      ]
    },
    {
      id: 'gs3', title: '特殊疑问句', level: '小学', icon: '❓',
      summary: 'what / where / who / how many，配套词库：小学必备词汇',
      sections: [
        {
          h: '常见疑问词', body: 'what 问事物：What\'s this? — It\'s an orange.\nwhere 问地点：Where is the cat? — It\'s on the bed.\nwho 问人：Who is that girl? — She is my sister.\nhow many 问数量：How many pears are there? — There are five.',
          examples: [
            { en: 'What is your friend\'s name?', zh: '你朋友叫什么名字？' },
            { en: 'Where do you live?', zh: '你住在哪里？' },
            { en: 'How many students are there in your class?', zh: '你们班有多少个学生？' }
          ]
        },
        {
          h: '疑问句语序', body: '特殊疑问句语序：疑问词 + be / 助动词 + 主语 + 其他\nWhere is your grandma? \nWhat does your brother like?\n回答要针对疑问词：问 what 用事物回答，问 who 用人回答。',
          examples: [
            { en: 'Who teaches you English? — Miss Li does.', zh: '谁教你们英语？——李老师。' }
          ]
        }
      ],
      tips: ['how many 后面接可数名词复数：How many windows...？', 'What\'s = What is，口语中最常用。'],
      exercises: [
        { type: 'choice', prompt: '— ___ is the cat? — It\'s under the bed.', options: ['Where', 'What', 'Who', 'How many'], answer: 0, explain: '问地点用 where。' },
        { type: 'fill', prompt: '— ___ many ducks are there on the river? — Ten.', answer: 'How|how', explain: 'How many 询问可数名词数量。' },
        { type: 'choice', prompt: '— ___ is that boy? — He is my brother.', options: ['Who', 'What', 'Where', 'When'], answer: 0, explain: '问人用 who。' },
        { type: 'choice', prompt: '— What are those? — ___ are grapes.', options: ['They', 'It', 'There', 'These'], answer: 0, explain: '复数事物用 they 回答。' }
      ]
    },
    {
      id: 'gs4', title: '祈使句', level: '小学', icon: '🙋',
      summary: '表示请求或命令，配套词库：小学必备词汇',
      sections: [
        {
          h: '动词原形开头', body: '祈使句表示请求、命令或建议，没有主语，动词用原形：\nClose the door, please. 请关门。\nOpen the window. 打开窗户。\n句末或句中加 please 更礼貌。',
          examples: [
            { en: 'Drink more water every day.', zh: '每天多喝水。' },
            { en: 'Look at the blackboard, please.', zh: '请看黑板。' },
            { en: 'Come in and sit down.', zh: '进来坐下。' }
          ]
        },
        {
          h: '否定祈使句 Don\'t', body: '否定式在动词原形前加 Don\'t：\nDon\'t be late for school. 上学不要迟到。\nDon\'t open the door. 不要开门。',
          examples: [
            { en: "Don't eat too much cake.", zh: '不要吃太多蛋糕。' },
            { en: "Don't play in the street.", zh: '不要在街上玩耍。' }
          ]
        }
      ],
      tips: ['祈使句动词永远用原形：Open the door.（不是 Opens）', "否定用 Don't + 动词原形。"],
      exercises: [
        { type: 'choice', prompt: '___ the window, please. It\'s hot.', options: ['Open', 'Opens', 'Opening', 'To open'], answer: 0, explain: '祈使句用动词原形开头。' },
        { type: 'fill', prompt: '不要关门：___ close the door.', answer: "Don't|Do not|dont", explain: "否定祈使句用 Don't。" },
        { type: 'choice', prompt: '哪个句子正确？', options: ["Don't run in the classroom.", "Doesn't run in the classroom.", 'Not run in the classroom.', "Don't running in the classroom."], answer: 0, explain: "Don't + 动词原形。" },
        { type: 'fill', prompt: 'Please ___ (water) the flowers, Lily.', answer: 'water', explain: '祈使句用动词原形。' }
      ]
    },
    // ---------- 初中拓展组（配套词库 b8 初中课标必备词汇） ----------
    {
      id: 'gx1', title: '动名词作宾语', level: '初中拓展', icon: '🎯',
      summary: 'avoid / suggest / enjoy / finish + doing，配套词库：初中课标必备词汇',
      sections: [
        {
          h: '哪些动词后接 doing', body: '有些动词后面必须接动名词（动词-ing）作宾语，不能接不定式：\nenjoy doing 喜欢做……\nfinish doing 完成做……\nsuggest doing 建议做……\navoid doing 避免做……\nkeep doing 一直做……\nmind doing 介意做……',
          examples: [
            { en: 'Try to avoid making the same mistake.', zh: '尽量避免犯同样的错误。' },
            { en: 'I suggest going out for a walk.', zh: '我建议出去散散步。' },
            { en: 'She enjoys reading and never stops learning.', zh: '她喜欢阅读，从不停止学习。' }
          ]
        },
        {
          h: '介词后也用 doing', body: '介词（in / of / about / for / by...）后面的动词一律用 -ing 形式：\nbe good at swimming 擅长游泳\ninstead of watching TV 而不是看电视\nThank you for helping me.',
          examples: [
            { en: 'He is interested in collecting stamps.', zh: '他对集邮感兴趣。' },
            { en: 'You can improve your English by practicing every day.', zh: '你可以通过每天练习来提高英语。' }
          ]
        }
      ],
      tips: ['口诀：喜欢享受（enjoy）完成（finish）建议（suggest）避免（avoid）坚持（keep），后面全用 doing。', 'forget / remember / stop 后接 doing 和 to do 意思不同，初中阶段先记住常见搭配。'],
      exercises: [
        { type: 'choice', prompt: 'Try to avoid ___ the same mistake.', options: ['making', 'to make', 'make', 'made'], answer: 0, explain: 'avoid 后接动名词 making。' },
        { type: 'fill', prompt: 'I suggest ___ (go) to the museum by bus.', answer: 'going', explain: 'suggest doing sth。' },
        { type: 'choice', prompt: 'When did you finish ___ your homework?', options: ['doing', 'to do', 'do', 'did'], answer: 0, explain: 'finish doing 表示"做完某事"。' },
        { type: 'fill', prompt: 'Thank you for ___ (help) me with my English.', answer: 'helping', explain: '介词 for 后用 -ing 形式。' }
      ]
    },
    {
      id: 'gx2', title: '现在完成时', level: '初中拓展', icon: '⏳',
      summary: 'have/has + 过去分词，配套词库：初中课标必备词汇',
      sections: [
        {
          h: '基本结构', body: '现在完成时表示过去发生的动作对现在有影响：\n主语 + have/has + 过去分词\n第三人称单数用 has，其他用 have。\n常用时间词：already（已经）、yet（还）、just（刚刚）、ever/never（曾/从未）、since/for（自从/长达）。',
          examples: [
            { en: 'I have already completed the form.', zh: '我已经填好了表格。' },
            { en: 'She has arrived in Beijing.', zh: '她已经到达北京了。' },
            { en: 'Have you finished your homework yet?', zh: '你完成作业了吗？' }
          ]
        },
        {
          h: 'have been to 与 have gone to', body: 'have been to 去过（已经回来）：\nHe has been to London twice. 他去过伦敦两次。\nhave gone to 去了（还没回来）：\nHe has gone to London. 他去伦敦了（现在不在这儿）。',
          examples: [
            { en: 'We have learned English for five years.', zh: '我们学英语已经五年了。' },
            { en: 'I have never seen such a bright star.', zh: '我从未见过这么亮的星星。' }
          ]
        }
      ],
      tips: ['现在完成时不能和明确的过去时间连用，不能说 I have seen it yesterday。', '不规则动词的过去分词要单独记：complete→completed，go→gone，see→seen。'],
      exercises: [
        { type: 'choice', prompt: 'She ___ Beijing twice.', options: ['has been to', 'has gone to', 'have been to', 'went to'], answer: 0, explain: '"去过"用 has been to。' },
        { type: 'fill', prompt: 'I have ___ (complete) my homework.', answer: 'completed', explain: 'complete 的过去分词是 completed。' },
        { type: 'choice', prompt: 'We have learned this word ___.', options: ['already', 'yesterday', 'tomorrow', 'last night'], answer: 0, explain: '现在完成时与 already 连用，不与过去时间连用。' },
        { type: 'fill', prompt: 'My father ___ (arrive) in Shanghai just now.（用现在完成时）', answer: 'has arrived', explain: '第三人称单数用 has + 过去分词。' }
      ]
    },
    {
      id: 'gx3', title: '让步与条件状语从句', level: '初中拓展', icon: '🔗',
      summary: 'although / if 引导的从句，配套词库：初中课标必备词汇',
      sections: [
        {
          h: 'although 引导让步状语从句', body: 'although（虽然、尽管）引导的从句表示让步：\nAlthough it was late, he kept working.\n注意：although 不能和 but 连用，二者只能选一个。',
          examples: [
            { en: 'Although he is young, he has great ability.', zh: '虽然他年纪小，但能力很强。' },
            { en: 'Although autumn is cold, we still love it.', zh: '虽然秋天冷，我们仍然喜欢它。' }
          ]
        },
        {
          h: 'if 引导条件状语从句', body: 'if（如果）引导的条件句遵循"主将从现"：\n主句用将来时，从句用一般现在时。\nIf you keep trying, you will succeed.\n其他常用连词：because（因为）、so（所以）、when（当……时）。',
          examples: [
            { en: 'If it rains tomorrow, we will stay at home.', zh: '如果明天下雨，我们就待在家里。' },
            { en: "We'll arrange a time to meet if you are free.", zh: '如果你有空，我们会安排时间见面。' }
          ]
        }
      ],
      tips: ['中文说"虽然……但是……"，英文 although 和 but 只能留一个。', 'if 从句用一般现在时表将来，不要写成 if it will rain。'],
      exercises: [
        { type: 'choice', prompt: '___ he was tired, he continued to work.', options: ['Although', 'Because', 'So', 'But'], answer: 0, explain: '表示"虽然"用 although。' },
        { type: 'fill', prompt: 'If it ___ (rain) tomorrow, we will stay at home.', answer: 'rains', explain: '主将从现：从句用一般现在时 rains。' },
        { type: 'choice', prompt: "We'll arrange a meeting ___ you are free.", options: ['if', 'although', 'because', 'so'], answer: 0, explain: '表示条件"如果"用 if。' },
        { type: 'choice', prompt: '下面哪句是对的？', options: ['Although it rained, we went out.', 'Although it rained, but we went out.', 'Though but it rained, we went out.', 'Although it rained so we went out.'], answer: 0, explain: 'although 不能与 but 连用。' }
      ]
    },
    {
      id: 'gx4', title: '被动语态', level: '初中拓展', icon: '🔄',
      summary: 'be + 过去分词，"被、由"，配套词库：初中课标必备词汇',
      sections: [
        {
          h: '基本结构', body: '被动语态表示主语是动作的承受者：\n主语 + be + 过去分词 (+ by 执行者)\n一般现在时：am/is/are + done\n一般过去时：was/were + done\n不知道或不必说明谁做动作时，常用被动。',
          examples: [
            { en: 'Free textbooks are provided by the school.', zh: '学校免费提供课本。' },
            { en: 'The bridge was built in 1990.', zh: '这座桥建于 1990 年。' },
            { en: 'English is spoken in many countries.', zh: '许多国家都说英语。' }
          ]
        },
        {
          h: '含情态动词的被动', body: '情态动词 + be + 过去分词：\nThe work must be completed today. 这项工作必须今天完成。\nThe school rules should be followed by every student.',
          examples: [
            { en: 'The environment should be protected by everyone.', zh: '环境应该由每个人来保护。' },
            { en: 'This tradition is still passed down today.', zh: '这一传统至今仍在传承。' }
          ]
        }
      ],
      tips: ['只有及物动词（后面能接宾语的动词）才有被动语态。', 'be 随时态和主语变化，后面的过去分词不变。'],
      exercises: [
        { type: 'choice', prompt: 'The bridge ___ in 1990.', options: ['was built', 'is built', 'built', 'builds'], answer: 0, explain: '过去时间的被动用 was built。' },
        { type: 'fill', prompt: 'The classroom ___ (clean) every day.', answer: 'is cleaned', explain: '一般现在时被动：is + cleaned。' },
        { type: 'choice', prompt: 'The decision must ___ by the teacher.', options: ['be made', 'make', 'made', 'is made'], answer: 0, explain: '情态动词后用 be + 过去分词。' },
        { type: 'fill', prompt: 'English ___ (speak) in many countries.', answer: 'is spoken', explain: 'is + spoken（speak 的过去分词）。' }
      ]
    },
    // ---------- 七年级组（配套词库 b9 人教七年级必备） ----------
    {
      id: 'gp1', title: 'do / does 疑问句与否定句', level: '七年级', icon: '🍎',
      summary: '一般现在时的提问和否定，配套词库：人教七年级必备',
      sections: [
        {
          h: 'Do / Does 疑问句', body: '一般现在时提问要借助动词 do 或 does：\n主语是第三人称单数（he/she/it）用 Does，其余用 Do。\nDoes 后面的动词要变回原形。\n回答：Yes, I do. / No, she doesn\'t.',
          examples: [
            { en: 'Do you like hamburgers?', zh: '你喜欢汉堡包吗？' },
            { en: 'Does she play tennis after school?', zh: '她放学后打网球吗？' },
            { en: 'What time do you go to school?', zh: '你几点上学？' }
          ]
        },
        {
          h: "don't / doesn't 否定句", body: "否定句在动词前加 don't 或 doesn't：\nI/You/We/They + don't + 动词原形\nHe/She/It + doesn't + 动词原形\ndoesn't 后面的动词用原形，不加 s。",
          examples: [
            { en: "I don't eat chicken for dinner.", zh: '我晚餐不吃鸡肉。' },
            { en: "She doesn't like salad.", zh: '她不喜欢沙拉。' },
            { en: "We don't have history on Monday.", zh: '我们星期一没有历史课。' }
          ]
        }
      ],
      tips: ["does/don't/doesn't 后面的动词永远是原形：She doesn't likes ❌ → She doesn't like ✔", '提问用 Do 还是 Does，看主语，不看动词。'],
      exercises: [
        { type: 'choice', prompt: '___ you like strawberries?', options: ['Do', 'Does', 'Are', 'Is'], answer: 0, explain: '主语 you 用 Do 提问。' },
        { type: 'fill', prompt: 'She ___ like salad.（否定句）', answer: "doesn't|does not", explain: "第三人称单数否定用 doesn't。" },
        { type: 'choice', prompt: 'What ___ he do on weekends?', options: ['does', 'do', 'is', 'are'], answer: 0, explain: '第三人称单数 he 用 does。' },
        { type: 'fill', prompt: '___ your parents watch TV in the evening?', answer: 'Do|do', explain: 'parents 是复数，用 Do。' }
      ]
    },
    {
      id: 'gp2', title: '频度副词', level: '七年级', icon: '📈',
      summary: 'always / usually / often / sometimes / never，配套词库：人教七年级必备',
      sections: [
        {
          h: '频度副词的位置', body: '频度从高到低：always 总是 → usually 通常 → often 经常 → sometimes 有时 → hardly ever 几乎不 → never 从不。\n位置口诀：实义动词之前，be 动词之后。\nHe usually goes to school by bus. / She is always happy.',
          examples: [
            { en: 'We often play soccer after school.', zh: '我们经常放学后踢足球。' },
            { en: 'He hardly ever watches TV.', zh: '他几乎不看电视。' },
            { en: 'I never eat hamburgers for breakfast.', zh: '我早餐从不吃汉堡包。' }
          ]
        },
        {
          h: 'How often 提问', body: '对频度提问用 How often，回答可以用次数 + 时间段：\ntwice a week 一周两次\nthree times a month 一月三次\nevery day 每天',
          examples: [
            { en: 'How often do you exercise?', zh: '你多久锻炼一次？' },
            { en: 'How often does she eat fruit? — Three times a week.', zh: '她多久吃一次水果？——一周三次。' }
          ]
        }
      ],
      tips: ['频度副词放实义动词前面：usually goes ✔（不是 goes usually）', '次数的表达：一次 once，两次 twice，三次及以上用 数字 + times。'],
      exercises: [
        { type: 'choice', prompt: 'He ___ goes to school by bus.', options: ['usually', 'go', 'usual', 'quick'], answer: 0, explain: 'usually 是频度副词，修饰动词。' },
        { type: 'fill', prompt: 'I exercise ___ a week.（一周两次）', answer: 'twice', explain: '一周两次用 twice a week。' },
        { type: 'choice', prompt: '___ often do you eat vegetables?', options: ['How', 'What', 'When', 'Where'], answer: 0, explain: 'How often 询问频度。' },
        { type: 'fill', prompt: '把 usually 放进句子：She ___ helps her mom cook dinner.', answer: 'usually', explain: '频度副词放实义动词之前。' }
      ]
    },
    {
      id: 'gp3', title: '可数与不可数名词', level: '七年级', icon: '🥗',
      summary: 'some / any / many / much，配套词库：人教七年级必备',
      sections: [
        {
          h: '可数与不可数', body: '可数名词有复数形式：hamburgers, tomatoes, strawberries, vegetables。\n不可数名词没有复数：chicken（鸡肉）, fruit, time, homework, music。\nmany + 可数名词复数；much + 不可数名词。',
          examples: [
            { en: 'How many hamburgers do you want?', zh: '你想要几个汉堡包？' },
            { en: 'How much chicken do you need?', zh: '你需要多少鸡肉？' },
            { en: 'How much time do we have?', zh: '我们还有多少时间？' }
          ]
        },
        {
          h: 'some 与 any', body: 'some 用于肯定句；any 用于否定句和疑问句。\nI want some fruit. 肯定句用 some\nDo you have any chicken? 疑问句用 any\nI don\'t have any money. 否定句用 any',
          examples: [
            { en: 'There are some tomatoes in the salad.', zh: '沙拉里有一些西红柿。' },
            { en: 'Do we have any vegetables in the fridge?', zh: '冰箱里还有蔬菜吗？' }
          ]
        }
      ],
      tips: ['fruit / homework / music / chicken（鸡肉）常作不可数名词，不加 s。', '希望对方回答 Yes 的请求句可以用 some：Would you like some tea?'],
      exercises: [
        { type: 'choice', prompt: 'How ___ strawberries do you want?', options: ['many', 'much', 'long', 'often'], answer: 0, explain: 'strawberries 是可数复数，用 many。' },
        { type: 'fill', prompt: 'Do you have ___ fruit?', answer: 'any', explain: '疑问句用 any。' },
        { type: 'choice', prompt: 'I want ___ chicken for dinner.', options: ['some', 'any', 'many', 'a'], answer: 0, explain: '肯定句用 some。' },
        { type: 'fill', prompt: 'How ___ time do we have?', answer: 'much', explain: 'time 不可数，用 much。' }
      ]
    },
    {
      id: 'gp4', title: '时间与地点介词 at / on / in', level: '七年级', icon: '⏰',
      summary: 'at 时刻、on 某天、in 较长时间，配套词库：人教七年级必备',
      sections: [
        {
          h: '时间介词', body: 'at + 具体时刻：at seven, at noon\non + 某天或某天的上午/下午：on Monday, on June 15th, on Sunday morning\nin + 年、月和泛指的早中晚：in 2026, in June, in the morning',
          examples: [
            { en: 'The party begins at seven in the evening.', zh: '晚会晚上七点开始。' },
            { en: 'My birthday is on June 15th.', zh: '我的生日在六月十五日。' },
            { en: 'We have four lessons in the morning.', zh: '我们上午有四节课。' }
          ]
        },
        {
          h: '地点介词', body: 'at + 小地点：at school, at home, at the bus stop\nin + 大地点或内部：in Beijing, in the classroom\non + 表面：on the table, on the wall',
          examples: [
            { en: 'We have lunch at school.', zh: '我们在学校吃午饭。' },
            { en: 'There are some books on the table.', zh: '桌上有一些书。' },
            { en: 'My uncle lives in a big city.', zh: '我叔叔住在一座大城市。' }
          ]
        }
      ],
      tips: ['特指某天的上午/下午用 on：on Sunday morning ✔（不用 in）', '口诀：at 点、on 天、in 长段（年月早中晚）。'],
      exercises: [
        { type: 'choice', prompt: 'The train leaves ___ seven thirty.', options: ['at', 'on', 'in', 'for'], answer: 0, explain: '具体时刻用 at。' },
        { type: 'fill', prompt: "We don't go to school ___ Sunday.", answer: 'on', explain: '星期几用 on。' },
        { type: 'choice', prompt: 'I get up ___ six ___ the morning.', options: ['at; in', 'on; in', 'in; at', 'at; on'], answer: 0, explain: 'at six in the morning。' },
        { type: 'fill', prompt: 'My sister was born ___ June.', answer: 'in', explain: '月份用 in。' }
      ]
    },
    // ---------- 八年级组（配套词库 b10 人教八年级必备） ----------
    {
      id: 'gp5', title: '情态动词 should', level: '八年级', icon: '🚲',
      summary: '用 should 提建议，配套词库：人教八年级必备',
      sections: [
        {
          h: 'should + 动词原形', body: 'should 表示"应该"，后接动词原形，没有人称变化。\n否定式 shouldn\'t 表示"不应该"。\n常用于健康话题：生病、休息、饮食建议。',
          examples: [
            { en: 'You should drink more water.', zh: '你应该多喝水。' },
            { en: 'He has a fever, so he should stay in bed and rest.', zh: '他发烧了，所以应该卧床休息。' },
            { en: "You shouldn't eat too much chocolate.", zh: '你不应该吃太多巧克力。' }
          ]
        },
        {
          h: '其他建议句型', body: 'Why don\'t you + 动词原形? 你为什么不……呢？\nYou\'d better + 动词原形. 你最好……\nHow about + doing? ……怎么样？',
          examples: [
            { en: "Why don't you see a dentist and check your teeth?", zh: '你为什么不去看看牙医检查牙齿呢？' },
            { en: 'How about going to bed early tonight?', zh: '今晚早点睡觉怎么样？' }
          ]
        }
      ],
      tips: ['should 后接动词原形：should have a rest ✔（不是 to have）', "提建议常用 Why don't you + 动词原形 = Why not + 动词原形。"],
      exercises: [
        { type: 'choice', prompt: 'You look tired. You should ___ a good rest.', options: ['have', 'to have', 'having', 'has'], answer: 0, explain: 'should 后接动词原形。' },
        { type: 'fill', prompt: 'He has a headache. He ___ take any medicine without asking a doctor.（不该）', answer: "shouldn't|should not", explain: '不该做用 shouldn\'t。' },
        { type: 'choice', prompt: 'Why ___ you go to bed earlier?', options: ["don't", 'not', "doesn't", "aren't"], answer: 0, explain: "Why don't you 提建议。" },
        { type: 'fill', prompt: 'You should brush your ___ twice a day.（tooth 的复数）', answer: 'teeth', explain: 'tooth 的复数是 teeth。' }
      ]
    },
    {
      id: 'gp6', title: '动词不定式 to do', level: '八年级', icon: '🎯',
      summary: 'want / hope / plan to do，谈论梦想，配套词库：人教八年级必备',
      sections: [
        {
          h: '不定式作宾语', body: 'want / hope / plan / decide 后面接 to do（动词不定式）：\nwant to do 想要做……\nhope to do 希望做……\nplan to do 计划做……\ndecide to do 决定做……',
          examples: [
            { en: 'I want to become a pilot in the future.', zh: '我将来想成为一名飞行员。' },
            { en: 'He hopes to study at a good university.', zh: '他希望上一所好大学。' },
            { en: 'She plans to move to Shanghai next year.', zh: '她计划明年搬到上海。' }
          ]
        },
        {
          h: '不定式表目的', body: 'to do 还可以表示目的（为了……）：\nI ride a bicycle to school to save time.\nHe works hard to make his dream come true.\n疑问词 what to do / where to go 也常见。',
          examples: [
            { en: 'They build new schools to help children study.', zh: '他们修建新学校来帮助孩子们学习。' },
            { en: 'Please tell me what to do next.', zh: '请告诉我接下来做什么。' }
          ]
        }
      ],
      tips: ['want/hope/plan/decide 后接 to do，不接 doing。', 'to do 表目的可以放在句末，回答 Why 提问。'],
      exercises: [
        { type: 'choice', prompt: 'I want ___ an engineer in the future.', options: ['to be', 'be', 'being', 'am'], answer: 0, explain: 'want to do 结构。' },
        { type: 'fill', prompt: 'He hopes ___ (win) the competition.', answer: 'to win', explain: 'hope to do。' },
        { type: 'choice', prompt: 'She decided ___ a new bicycle.', options: ['to buy', 'buying', 'buy', 'bought'], answer: 0, explain: 'decide to do。' },
        { type: 'fill', prompt: 'They save money ___ (build) a new school.', answer: 'to build', explain: '目的用 to do。' }
      ]
    },
    {
      id: 'gp7', title: '不规则动词过去式', level: '八年级', icon: '⏪',
      summary: 'win→won / build→built / begin→began，配套词库：人教八年级必备',
      sections: [
        {
          h: '常见不规则动词', body: '一般过去时中动词要变过去式，不规则动词要单独记忆：\nwin→won 赢，build→built 建造，begin→began 开始\ndrink→drank 喝，grow→grew 生长，forget→forgot 忘记\nleave→left 离开，hear→heard 听见',
          examples: [
            { en: 'Our team won the basketball game yesterday.', zh: '我们队昨天赢了篮球赛。' },
            { en: 'They built a new library last year.', zh: '他们去年建了一座新图书馆。' },
            { en: 'The movie began at seven thirty.', zh: '电影七点半开始了。' }
          ]
        },
        {
          h: '更多高频不规则动词', body: 'go→went，eat→ate，run→ran，buy→bought\nsell→sold，sing→sang，swim→swam，drive→drove\n注意：否定和疑问句用 did + 动词原形。',
          examples: [
            { en: 'He drove to work this morning.', zh: '他今天早上开车上班。' },
            { en: 'I bought some sandwiches and ate them on the train.', zh: '我买了一些三明治，在火车上吃了。' },
            { en: 'Did you win the competition?', zh: '你赢得比赛了吗？' }
          ]
        }
      ],
      tips: ['过去时肯定句用过去式；疑问和否定句用 did/didn\'t + 原形。', '不规则动词要逐个记牢，中考必考。'],
      exercises: [
        { type: 'fill', prompt: 'Our team ___ (win) the game last Friday.', answer: 'won', explain: 'win 的过去式是 won。' },
        { type: 'choice', prompt: 'He ___ to work by car yesterday.', options: ['drove', 'drives', 'driving', 'driven'], answer: 0, explain: 'drive 的过去式是 drove。' },
        { type: 'fill', prompt: 'I ___ (forget) to bring my umbrella yesterday.', answer: 'forgot', explain: 'forget 的过去式是 forgot。' },
        { type: 'choice', prompt: 'She ___ up at six this morning.', options: ['got', 'gets', 'get', 'getting'], answer: 0, explain: 'get 的过去式是 got。' }
      ]
    },
    {
      id: 'gp8', title: 'must 与 have to', level: '八年级', icon: '🚦',
      summary: '表达"必须"，配套词库：人教八年级必备',
      sections: [
        {
          h: 'must + 动词原形', body: 'must 表示"必须"，后接动词原形。\nmustn\'t 不是"不必"，而是"禁止"。\n"不必"要用 don\'t have to / needn\'t。',
          examples: [
            { en: 'You must finish your homework before dinner.', zh: '你必须在晚饭前完成作业。' },
            { en: "Passengers must check the time before the train leaves.", zh: '乘客必须在火车出发前确认时间。' },
            { en: "We mustn't throw rubbish on the floor.", zh: '我们禁止往地上扔垃圾。' }
          ]
        },
        {
          h: 'have to 的用法', body: 'must 表示主观上的必须；have to 表示客观条件"不得不"。\nhave to 有人称和时态变化：he has to / they had to。\nIt\'s raining, so we have to stay at home.',
          examples: [
            { en: 'She has to take the medicine on time.', zh: '她必须按时吃药。' },
            { en: 'I had to walk home because I missed the bus.', zh: '我错过了公交车，只好走路回家。' }
          ]
        }
      ],
      tips: ["mustn't = 禁止；don't have to = 不必，两者意思完全不同。", 'must 没有过去式，过去"必须"要用 had to。'],
      exercises: [
        { type: 'choice', prompt: 'You ___ be quiet in the library.', options: ['must', 'musts', 'to must', 'musting'], answer: 0, explain: 'must 后接动词原形。' },
        { type: 'fill', prompt: "It's late. I ___ go home now.（客观必须）", answer: 'have to|must', explain: '客观条件用 have to。' },
        { type: 'choice', prompt: "You ___ swim in this river. It's dangerous!", options: ["mustn't", "don't have to", "needn't", "couldn't"], answer: 0, explain: '表示禁止用 mustn\'t。' },
        { type: 'fill', prompt: 'Passengers ___ check their tickets before getting on.', answer: 'must', explain: '一般性规则用 must。' }
      ]
    },
    // ---------- 九年级组（配套词库 b11 人教九年级必备） ----------
    {
      id: 'gp9', title: '定语从句 who / which / that', level: '九年级', icon: '🎓',
      summary: '用一个句子修饰名词，配套词库：人教九年级必备',
      sections: [
        {
          h: 'that / which 修饰事物', body: '定语从句紧跟在名词（先行词）后面修饰它。\n先行词是事物时用 that 或 which：\nI like music that I can dance to. 我喜欢能随之跳舞的音乐。\nThis is a symbol that means good luck.',
          examples: [
            { en: 'The book that tells Chinese customs is interesting.', zh: '那本讲中国习俗的书很有意思。' },
            { en: 'I bought a product that I saw online.', zh: '我买了我在网上看到的一款产品。' }
          ]
        },
        {
          h: 'who 修饰人', body: '先行词是人时用 who（或 that）：\nThe man who helped me is my teacher.\nStudents who work hard will succeed.\n注意：从句动词和先行词保持一致。',
          examples: [
            { en: 'She is the girl who won first prize in the competition.', zh: '她就是在比赛中获得一等奖的女孩。' },
            { en: 'People who recycle rubbish protect the environment.', zh: '回收垃圾的人是在保护环境。' }
          ]
        }
      ],
      tips: ['先行词是人用 who，是物用 that/which。', '从句动词的数跟先行词：a book that tells...（单数），books that tell...（复数）。'],
      exercises: [
        { type: 'choice', prompt: 'I like music ___ I can dance to.', options: ['that', 'who', 'what', 'whom'], answer: 0, explain: '先行词 music 是物，用 that。' },
        { type: 'fill', prompt: 'The woman ___ teaches us English is very kind.', answer: 'who|that', explain: '先行词是人，用 who。' },
        { type: 'choice', prompt: 'Do you know the boy ___ won the award?', options: ['who', 'which', 'what', 'whom'], answer: 0, explain: '修饰人用 who。' },
        { type: 'fill', prompt: 'This is a book ___ tells the beauty of nature.', answer: 'that|which', explain: '修饰物用 that 或 which。' }
      ]
    },
    {
      id: 'gp10', title: '宾语从句', level: '九年级', icon: '💬',
      summary: 'think / believe / wonder + 从句，配套词库：人教九年级必备',
      sections: [
        {
          h: '陈述语序', body: '宾语从句放在动词后面，必须用陈述语序（主语在前、动词在后）：\nI believe you can do it well.\nI wonder what will happen next.\nI don\'t know where he lives.',
          examples: [
            { en: 'Could you tell me how I can get to the market?', zh: '你能告诉我怎么去市场吗？' },
            { en: 'I wonder why he was late for the ceremony.', zh: '我想知道他为什么典礼迟到了。' }
          ]
        },
        {
          h: '时态呼应', body: '主句是现在时，从句根据需要选时态；\n主句是过去时，从句一般要用过去相关时态：\nHe said he would lend me his dictionary.\nShe asked if the bottle was empty.',
          examples: [
            { en: 'I wonder if it will rain tomorrow.', zh: '我想知道明天会不会下雨。' },
            { en: 'The teacher said that practice makes perfect.', zh: '老师说熟能生巧。（客观真理可用现在时）' }
          ]
        }
      ],
      tips: ['宾语从句不用疑问语序：I wonder where is he ❌ → where he is ✔', 'if / whether 表示"是否"，也用陈述语序。'],
      exercises: [
        { type: 'choice', prompt: 'I wonder ___.', options: ['where he lives', 'where does he live', 'where he live', 'he lives where'], answer: 0, explain: '宾语从句用陈述语序。' },
        { type: 'fill', prompt: 'I believe you ___ finish the task well.（填原形助动词）', answer: 'can|will', explain: '主句现在时，从句用原来的时态。' },
        { type: 'choice', prompt: 'She asked if the bottle ___ empty.', options: ['was', 'is', 'will be', 'be'], answer: 0, explain: '主句过去时，从句用过去时。' },
        { type: 'fill', prompt: 'Could you tell me where I can ___ (buy) fresh vegetables?', answer: 'buy', explain: '从句中 can 后用动词原形。' }
      ]
    },
    {
      id: 'gp11', title: 'used to do 过去常常', level: '九年级', icon: '🕰️',
      summary: '过去的习惯，现在不再，配套词库：人教九年级必备',
      sections: [
        {
          h: '基本用法', body: 'used to + 动词原形，表示过去常常做某事或过去的状态，现在已改变：\nI used to throw rubbish everywhere, but now I recycle it.\nHe used to be shy, but now he is confident.',
          examples: [
            { en: 'There used to be a small market here.', zh: '这里过去有一个小市场。' },
            { en: 'People used to write letters, but now they send messages online.', zh: '人们过去写信，现在网上发消息。' }
          ]
        },
        {
          h: '否定与疑问', body: '否定式：didn\'t use to do（注意 used 变回 use）\n疑问式：Did you use to do...?\nDid you use to play soccer after school? — Yes, I did.',
          examples: [
            { en: "She didn't use to like coffee, but she drinks it every day now.", zh: '她过去不喜欢咖啡，但现在每天喝。' }
          ]
        }
      ],
      tips: ['used to + 动词原形（过去常常）；be used to doing（习惯于），两者完全不同。', 'didn\'t 和 Did 后面的 used 要变回原形 use。'],
      exercises: [
        { type: 'choice', prompt: 'I ___ throw rubbish everywhere, but now I recycle it.', options: ['used to', 'use to', 'am used to', 'using to'], answer: 0, explain: '过去常常用 used to。' },
        { type: 'fill', prompt: 'He ___ (use) to live in the countryside.', answer: 'used', explain: 'used to do 结构。' },
        { type: 'choice', prompt: '___ you use to swim in the river?', options: ['Did', 'Do', 'Are', 'Were'], answer: 0, explain: '疑问句用 Did ... use to。' },
        { type: 'fill', prompt: "People didn't ___ (use) to shop online.", answer: 'use', explain: "didn't 后用动词原形 use。" }
      ]
    },
    {
      id: 'gp12', title: '感叹句 What / How', level: '九年级', icon: '✨',
      summary: '表达强烈感情，配套词库：人教九年级必备',
      sections: [
        {
          h: 'What 感叹句', body: '感叹部分是名词时用 What：\nWhat + a/an + 形容词 + 单数名词 + 主语 + 谓语！\nWhat a beautiful city! / What an interesting experiment!\n不可数名词和复数名词前不加冠词：What sweet strawberries!',
          examples: [
            { en: 'What a lovely panda!', zh: '多么可爱的熊猫啊！' },
            { en: 'What good news it is!', zh: '多么好的消息啊！' }
          ]
        },
        {
          h: 'How 感叹句', body: '感叹部分是形容词或副词时用 How：\nHow + 形容词/副词 + 主语 + 谓语！\nHow beautiful the West Lake is!\nHow fast he runs!',
          examples: [
            { en: 'How thankful I am for your help!', zh: '我对你的帮助多么感激啊！' },
            { en: 'How clever the girl is!', zh: '这个女孩多么聪明啊！' }
          ]
        }
      ],
      tips: ['看感叹的中心词：中心是名词用 What，是形容词/副词用 How。', 'What a/an 看名词单复数和可数性：What a lovely panda（单数可数）；What sweet strawberries（复数）。'],
      exercises: [
        { type: 'choice', prompt: '___ a beautiful symbol the panda is!', options: ['What', 'How', 'What a', 'How a'], answer: 0, explain: 'What + a + 形容词 + 单数名词。' },
        { type: 'fill', prompt: '___ clever the girl is!', answer: 'How|how', explain: 'How + 形容词。' },
        { type: 'choice', prompt: '___ an interesting experiment we did!', options: ['What', 'How', 'What a', 'Why'], answer: 0, explain: 'an interesting experiment 是名词短语，用 What。' },
        { type: 'fill', prompt: '___ sweet the strawberries are!', answer: 'How|how', explain: 'How + 形容词 + 主语 + 谓语。' }
      ]
    }
  ];
