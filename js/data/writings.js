/* ============ 种子数据：作文课程 6 课 ============ */
window.SeedWritings = [
    {
      id: 'w1', title: '自我介绍', level: '零基础', icon: '👋',
      summary: '最常见的开头作文：姓名、年龄、家庭、爱好',
      points: ['开头打招呼，介绍姓名和年龄', '介绍家庭（有几个人）', '说说自己的爱好', '结尾表达愿望或感谢', '全文用一般现在时'],
      patterns: [
        { en: 'My name is...', zh: '我的名字叫……' },
        { en: 'I am ... years old.', zh: '我……岁了。' },
        { en: 'There are ... people in my family.', zh: '我家有……口人。' },
        { en: 'I like ... very much.', zh: '我非常喜欢……' },
        { en: 'I want to make friends with you.', zh: '我想和你们交朋友。' }
      ],
      sample: [
        'Hello, everyone! My name is Li Ming. I am thirteen years old. I am a student in Grade Seven. There are three people in my family: my father, my mother and I.',
        'I like reading and playing basketball. I also like English, and I want to make friends with you. Thank you!'
      ],
      sampleZh: [
        '大家好！我叫李明，今年 13 岁，是七年级的学生。我家有三口人：爸爸、妈妈和我。',
        '我喜欢看书和打篮球。我也喜欢英语，我想和你们交朋友。谢谢大家！'
      ],
      guided: [
        { prompt: 'Hello, everyone! My name ____.（填 is）', answer: 'is', zh: '我的名字叫……' },
        { prompt: 'I am ____ years old.（填数字英文，如 thirteen）', answer: 'thirteen', zh: '我……岁了。' },
        { prompt: 'I like ____ very much.（填爱好，如 reading）', answer: 'reading', zh: '我非常喜欢……' }
      ]
    },
    {
      id: 'w2', title: '我的家庭', level: '零基础', icon: '🏠',
      summary: 'There be 句型 + 职业表达的入门作文',
      points: ['用 There are ... people in my family 开头', '逐一介绍家人：职业 + 工作地点', '说说家人平时做什么', '结尾表达对家的爱'],
      patterns: [
        { en: 'There are ... people in my family.', zh: '我家有……口人。' },
        { en: 'My father is a doctor.', zh: '我爸爸是医生。' },
        { en: 'She teaches Chinese in a middle school.', zh: '她在一所中学教语文。' },
        { en: 'I love my family very much.', zh: '我非常爱我的家。' }
      ],
      sample: [
        'There are four people in my family: my father, my mother, my sister and I. My father is a doctor. He works in a hospital. My mother is a teacher. She teaches Chinese in a middle school.',
        'My sister and I are students. We often help our parents do housework. I love my family very much.'
      ],
      sampleZh: [
        '我家有四口人：爸爸、妈妈、姐姐和我。爸爸是医生，在医院工作。妈妈是老师，在一所中学教语文。',
        '姐姐和我都是学生。我们经常帮父母做家务。我非常爱我的家。'
      ],
      guided: [
        { prompt: 'There ____ four people in my family.（填 are）', answer: 'are', zh: '复数用 there are' },
        { prompt: 'My father is a ____.（填职业，如 doctor）', answer: 'doctor', zh: '我爸爸是……' },
        { prompt: 'I ____ my family very much.（填 love）', answer: 'love', zh: '我非常爱我的家。' }
      ]
    },
    {
      id: 'w3', title: '我的一天', level: '零基础', icon: '🏫',
      summary: '用时间线写一天：一般现在时实战',
      points: ['按时间顺序写：起床→上学→上课→放学→睡觉', '时间用 at：at six thirty', '交通方式用 by：by bike / by bus', '注意三单：如果写别人，动词要加 s'],
      patterns: [
        { en: 'I usually get up at six thirty.', zh: '我通常六点半起床。' },
        { en: 'Classes begin at eight.', zh: '八点开始上课。' },
        { en: 'After school, I play basketball with my friends.', zh: '放学后，我和朋友们打篮球。' },
        { en: 'I go to bed at nine thirty.', zh: '我九点半睡觉。' }
      ],
      sample: [
        'I usually get up at six thirty. Then I have breakfast and go to school by bike. Classes begin at eight. We have four classes in the morning and two in the afternoon.',
        'After school, I play basketball with my friends. I do my homework in the evening. I go to bed at nine thirty. What a busy day!'
      ],
      sampleZh: [
        '我通常六点半起床，然后吃早饭，骑自行车去上学。八点开始上课，上午四节课，下午两节课。',
        '放学后，我和朋友们打篮球。晚上我写作业，九点半睡觉。多么忙碌的一天啊！'
      ],
      guided: [
        { prompt: 'I usually get up ____.（填时间，如 at six thirty）', answer: 'at', zh: '时间前用 at（答案含 at 即可）' },
        { prompt: 'After school, I ____ with my friends.（填活动，如 play basketball）', answer: 'play', zh: '放学后我……' },
        { prompt: 'I go to bed ____ nine thirty.', answer: 'at', zh: '几点几分前用 at' }
      ]
    },
    {
      id: 'w4', title: '我的爱好', level: '基础', icon: '🎨',
      summary: '学会写「为什么喜欢」，作文立刻加分',
      points: ['点明爱好是什么', '什么时候开始的（一般过去时）', '写清楚 1-2 个喜欢的原因', '结尾升华：爱好带给你什么'],
      patterns: [
        { en: 'My hobby is reading.', zh: '我的爱好是阅读。' },
        { en: 'I started reading when I was seven years old.', zh: '我七岁开始读书。' },
        { en: 'Reading makes me happy.', zh: '阅读让我快乐。' },
        { en: 'In my free time, I often go to the library.', zh: '空闲时我常去图书馆。' }
      ],
      sample: [
        'My hobby is reading. I started reading when I was seven years old. I read books for half an hour every day.',
        'Reading makes me happy and brings me knowledge. Books are like good friends. In my free time, I often go to the school library. Reading is the best part of my day.'
      ],
      sampleZh: [
        '我的爱好是阅读。我七岁开始读书，现在每天读半小时书。',
        '阅读让我快乐，也带给我知识。书就像好朋友。空闲时我常去学校图书馆。阅读是我一天中最美好的时光。'
      ],
      guided: [
        { prompt: 'My hobby is ____.（填爱好，如 reading）', answer: 'reading', zh: '我的爱好是……' },
        { prompt: '____ makes me happy.（填爱好）', answer: 'Reading', zh: '……让我快乐。' },
        { prompt: 'In my free time, I often ____.（填活动）', answer: 'read', zh: '空闲时我经常……' }
      ]
    },
    {
      id: 'w5', title: '我的好朋友', level: '基础', icon: '⭐',
      summary: '外貌 + 性格 + 一件小事，人物作文三步走',
      points: ['介绍朋友姓名年龄', '外貌：tall, short hair...', '性格：friendly, kind, helpful...', '写一件一起做的事', '结尾：有这样的朋友很幸运'],
      patterns: [
        { en: 'My best friend is Wang Fang.', zh: '我最好的朋友是王芳。' },
        { en: 'She is friendly and always ready to help others.', zh: '她很友好，总是乐于助人。' },
        { en: 'She is good at English.', zh: '她擅长英语。' },
        { en: 'I am lucky to have a friend like her.', zh: '有这样的朋友我很幸运。' }
      ],
      sample: [
        'My best friend is Wang Fang. She is thirteen years old, and she is in my class. She is tall and has long hair. She is friendly and always ready to help others.',
        'She is good at English, and she often helps me with it. We often read books and play games together. I am lucky to have a friend like her.'
      ],
      sampleZh: [
        '我最好的朋友是王芳。她 13 岁，和我同班。她个子高，留长发。她很友好，总是乐于助人。',
        '她英语很好，经常帮助我。我们常一起看书、做游戏。有这样的朋友我很幸运。'
      ],
      guided: [
        { prompt: 'My best friend is ____.（填名字）', answer: 'is', zh: '我最好的朋友是……' },
        { prompt: 'He/She is good at ____.（填擅长的事）', answer: 'English', zh: '他/她擅长……' },
        { prompt: 'We often ____ together.（填活动）', answer: 'play', zh: '我们经常一起……' }
      ]
    },
    {
      id: 'w6', title: '我的梦想', level: '基础', icon: '🌟',
      summary: 'want to be + because + will，层次分明的结尾作文',
      points: ['开头：每个人都有梦想', '说出梦想职业：I want to be a doctor', '写原因（为什么），可以是一个小故事', '为了梦想你会怎么做：To make my dream come true, I will...', '结尾谚语加分：Where there is a will, there is a way.'],
      patterns: [
        { en: 'My dream is to be a doctor.', zh: '我的梦想是成为一名医生。' },
        { en: 'I want to help people like them.', zh: '我想像他们一样帮助别人。' },
        { en: 'To make my dream come true, I will study hard.', zh: '为了实现梦想，我会努力学习。' },
        { en: 'Where there is a will, there is a way.', zh: '有志者事竟成。' }
      ],
      sample: [
        'Everyone has a dream. My dream is to be a doctor. When my grandmother was ill, the doctors helped her get better. I want to help people like them.',
        'To make my dream come true, I will study hard, especially science and English. I believe that where there is a will, there is a way.'
      ],
      sampleZh: [
        '每个人都有梦想。我的梦想是成为一名医生。奶奶生病时，医生们帮助她好了起来。我想像他们一样去帮助别人。',
        '为了实现梦想，我会努力学习，尤其是科学和英语。我相信，有志者事竟成。'
      ],
      guided: [
        { prompt: 'My dream is to be ____.（填职业）', answer: 'doctor', zh: '我的梦想是成为……' },
        { prompt: 'To make my dream come true, I will ____.（填做法）', answer: 'study', zh: '为了实现梦想，我会……' }
      ]
    }
  ];
