export const zh_hans = {
  common: {
    loading: '加载中',
    ok: '确认',
    okMsg: '确定',
    signOut: '登出',
    cancel: '取消',
    confirm: '确定',
    delete: '删除',
    repeat: '重复',
    never: '不重复',
    start: '开始时间',
    end: '结束时间:',
    addTimeSlot: '新增时段',
    next: '继续',
    submit: '提交',
    search: '搜寻',
    duplicate: '复制',
    goToShop: '去金币商店',
    reset: '重置',
  },
  error: {
    API_CODE_DB_ERROR: "数据库出错",
    API_CODE_DB_NOT_FOUND: "找不到数据库",

    API_CODE_USER_NOT_FOUND: "找不到此用户",
    API_CODE_TARGET_USER_NOT_FOUND: "找不到此用户",
    API_CODE_INVALID_PARAMS: "输入无效",

    API_CODE_ACC_DUPLICATE_USERNAME: "此用户名称已被使用",
    API_CODE_ACC_DUPLICATE_EMAIL: "此电邮已被使用",
    API_CODE_ACC_INVALID_FIELDS: "输入无效",
    API_CODE_ACC_INCORRECT_PASSWORD: "密码不正确",
    API_CODE_ACC_ALREADY_LINKED_AWS_ID: "用户已经存在",
    API_CODE_ACC_EMAIL_NOT_VERIFIED: "电邮未被确认",
    API_CODE_ACC_NOT_LINKED_AWS_ID: "找不到此用户",
    API_CODE_ACC_INCORRECT_USERNAME: "用户名称不正确",

    API_CODE_ACC_UNAUTHORIZED: "账户未经授权",

    FACEBOOK_LOGIN_CANCEL: "取消Facebook登入",
    FACEBOOK_LOGIN_FAIL: "Facebook登入失败",
    FACEBOOK_GET_PROFILE_FAIL: "无法获取Facebook资料",
    FACEBOOK_GET_PICTURE_FAIL: "无法获取Facebook头象",
  },
  alert: {
    pleaseAnswer: '请先回答问题',
  },
  progressBar: {
    stepToGo: "'还有' + remainStep + '步...'"
  },
  giveComment: {
    title: '写评语',
    text: {
      punctualityRating: '守时',
      environmentRating: '环境',
      attitudeRating: '态度',
      professionRating: '专业',
      comment: '写评语',
      placeholder: '点击这裹输入内容',
    }
  },
  uploadPhoto: {
    title: '上载图片',
    deletePhotoSentence: '确定删除此图片?',
    cannotAddmoreThanFour: '你最多只能上载4张相片',
    text: {
      selectPhotoFrom: '选取相片来源',
      takePhoto: '拍照',
      selectFromCameraRoll: '从相片库中选取',
    },
  },
  tutionFee: {
    title: '学费',
    text: {
      perLesson: '每堂',
      perSemester: '每学期',
      price: '价格',
    },
  },
  contact: {
    title: '联络资料',
    text: {
      contactNumber: '联络电话',
      notification1: '备注：你的联络资料',
      notification2: '只会',
      notification3: '显示给你的学生'
    },
  },
  newsfeed: {
    title: '新闻',
    text:{
      perSemester: '学期',
      perLesson: '堂',
      search: '搜寻',
      comment: '个评语',
      showMoreClasses: '显示更多...',
    }
  },
  advancedSearch: {
    title: '进阶搜寻',
    text: {
      category: '分类',
      classCategory: '课堂类别',
      skillCategory: '技能类别',
      selectChargeType: '-- 请选择收费类型 --',
      tutionFee: '学费',
      below: '低于',
      any: '任何',
      lowToHigh: '由低至高',
      highToLow: '由高至低',
      classTime: '课堂时间',
      perSemester: '每学期',
      perLesson: '每堂'
    },
  },
  searchClass: {
    title: '搜寻',
    advanced: '进阶搜寻',
    districtSearch: '搜寻地区...',
    classSearch: '搜寻课堂名称, 类别 或 技能...'
  },
  searchResult: {
    title: '所有结果',
    label: {
      noResult: '找不到符合要求的结果',
      selectSortingType: '-- 请选择排序类型 --',
      ascfee: '以价钱由低至高排列',
      desfee: '以价钱由高至低排列',
      asctotalRatings: '以评分由低至高排列',
      destotalRatings: '以评分由高至低排列',
      asctotalComments: '以留言由少至多排列',
      destotalComments: '以留言由多至少排列',
    },
    placeholder: {
      typeHere: '搜寻 ...',
      currentLocation: '当前位置',
    },
  },
  profileSetting: {
    title: '个人档案',
    text: {
      editIcon: '点击更改',
      name: '姓名',
      website: '个人网站',
      email: '电邮',
      myCity: '我的城市',
      introduction: '个人简介',
      changePw: '更改密码',
      phone: '手提电话',
    },
  },
  changePw: {
    title: '更改密码',
    text: {
      currentPw: '密码',
      newPw: '新密码',
      confirmPw: '重复新密码',
    },
  },
  history: {
    title: '历史',
    favourite: '喜好',
    history: '历史'
  },
  search: {
    title: '搜索',
  },
  schedule: {
    title: '行程',
  },
  profile: {
    title: '我的',
    text: {
      login: '登录',
      signUpOrLogin: '注册或登入',
      signUp:'注册',
      comments: '留言',
      notifications: '通知',
      applyToBeTutor: '成为导师',
      settings: '设定',
      switchMode: {
        learner: '切换到导师模式',
        tutor: '切换到学员模式',
      },
      viewClasses: {
        learner: '检视所有已报读的课堂',
        tutor: '检视所有已建立的课堂'
      },
      createTutor: '新增导师',
      manageTutor: '管理导师',
      balance: '我的余额',
      checkCoins: {
        learner: '我的金币',
        tutor: '我的金币'
      },
    }
  },
  balance:{
    title: '我的余额',
    upTo: '截至',
    withdraw: '提款',
  },
  withdraw:{
    title: '提款',
    text: {
      bankAccountName: '持卡人姓名:',
      bankName: '银行: ',       
      bankAccount: '银行户口: ',       
      amount: '金额($): ',       
      confirm: '确认',       
      cancel: '取消',
    }   
  },
  withdrawRecord:{
    title: '记录',
    text:{
      processing: '处理中',
      approved: '已授权',
      rejected: '已拒绝',
      bankAccountName: '持卡人姓名:',
      bankName: '银行: ',       
      bankAccount: '银行户口: ', 
    }
  },
  signin:{
    title: '欢迎回来',
    text:{
      signIn:{
        label:'登入'
      },
      signUp:{
        label:'注册'
      },
      next:{
        label:'继续'
      }
    },
    textInput: {
      email: {
        label: '用户名',
        placeholder: '请输入用户名',
      },
      password: {
        label: '密码:',
        placeholder: '请输入密码'
      },
    },
  },
  login: {
    title: '欢迎回来',
    textInput: {
      username: {
        label: '用户名:',
        placeholder: '请输入用户名',
      },
      password: {
        label: '密码:',
        placeholder: '请输入密码'
      },
    },
    text:{
      signIn:{
        label: '登入'
      },
      register:{
        label: '注册'
      },
    }
  },
  signUp:{
    title: {
      tutor: '注册为教练',
      learner: '注册为学员',
      selfIntro: '其他',
      profession: '专业',
      experience: '年资',
      achievement: '个人成就',
      displayName: '机构名称',
      introduction: '介绍',
      logo: '图标',
      slogan: '标语',
      banner: '横幅广告',
    },
    textInput:{
      skill: {
        label:'技能',
        placeholder:'技能'
      },
      email:{
        label:'电子信箱',
        placeholder:'电子信箱',
      },
      password:{
        label:'密码',
        placeholder:'密码',
      },
      username: {
        label: '用户名:',
        placeholder: '用户名',
      },
      lastName:{
        label:'姓氏',
        placeholder:'姓氏',
      },
      firstName:{
        label:'名字',
        placeholder:'名字',
      },
      countryCode:{
        label:'区号',
        placeholder:'区号',
      },
      phoneNumber:{
        label:'电话号码',
        placeholder:'电话号码',
      },
    },
    text:{
      verifyCodePlaceholder: {
        label:'验证码'
      },
      verifyCode: {
        label: '请检查你的电邮，并输入验证码：'
      },
      upload: {
        label:'＋ 证明文件'
      },
      chooseUserType:{
        label:'请问你想注册为…'
      },
      selfIntro:{
        label:'告诉我们更多...\n(自我介绍)'
      },
      profession:{
        label:'你的专业是什么?'
      },
      experience: {
        label:'你有多少年经验?'
      },
      achievement: {
        label:'你有什么成就?'
      },
      company: {
        label: '机构'
      },
      tutor: {
        label:'导师'
      },
      learner: {
        label:'学员'
      },
      signUp:{
        label:'注册',
      },
      displayName: {
        label: '机构名称',
      },
      introduction: {
        label: '简单介绍一下你的机构',
      },
      logo: {
        label: '请上传机构的图标',
      },
      slogan: {
        label: "请写下标语",
      },
      banner: {
        label: '请上传横幅广告',
      },
      agreement:{
        label1:'透过注册，表示你已经同意A+的',
        label2: '服务条款及私隐政策'
      },
    },
  },
  forgotPassword:{
    title:'忘记密码',
    text:{
      forgotPassword: '忘记密码？',
      forgotPasswordEmail: '请输入你的电子信箱来寻找你的帐号。',
      confirm:{
        label:'确定',
      },
    },
    textInput:{
      email:{
        placeholder: '电子信箱',
      },
    },
  },
  classDetail:{
    title: '课堂详情',
    text:{
      punctualityRating: '守时',
      environmentRating: '环境',
      attitudeRating: '态度',
      professionRating: '专业',
      classDescription: '课程描述',
      rating: '评分: ',
      applied: {
        label: '已报读'
      },
      applyNow:{
        label:'立即参加',
      },
      giveComment: {
        label: '写评语'
      },
      tutor: '导师',
      comment: '评语',
      allStudent: '所有学生',
      viewAllStudent: '检视所有学生',
      verifiedBy: '官方认可',
    }
  },
  tutorInfo: {
    text: {
      introduction: '简介',
      achievement: '成就',
      experience: '经验(年)',
      profession: '专业',
      mainCourse: '主要课堂',
    }
  },
  settings: {
    title: '设定',
    language: '语言',
    version: '版本',
    changePw: '修改密码',
  },
  language: {
    title: '语言',
    message: {
      changeLanguage: '语言设置已更改'
    }
  },
  classList: {
    title: '课程',
    createClasses: '建立你的课堂',
    duplicateClass: '复制这个课堂?',
    deleteClass: '删除这个课堂?',
    tutorCreateClassMessage: '你确定要使用30个金币来建立课堂嗎？',
    companyCreateClassMessage: '你确定要建立课堂嗎？',
    tutorCreateClassNotEnoughCoinsMessage: '你的金币不足',
  },
  category: {
    title: '类别',
    types: {
      education: '教育及学习',
      music: '音乐',
      sports: '运动',
      beauty: '美容',
      designAndDevelopment: '设计与开发',
      petTraining: '宠物训练',
      carDriving: '汽车驾驶',
      interestClasses: '兴趣班',
      personal: '个人及生活',
      photography: '拍摄及制作',
      recover: '舒缓及治疗',
      talent: '技能增值',
      stem: 'STEM',
    }
  },
  repeat: {
    title: '重复',
    label: {
      until: '直到',
      everyDay: '每日',
      everyWeek: '每周',
      everyTwoWeek: '每两周',
      everyMonth: '每月',
      neverRepeat: '不重复',
    }
  },
  skill: {
    title: '专长',
    types: {
      education: {
        cantonese: '广东话',
        english: '英语',
        mandarin: '普通话'
      },
      music: {
        guitar: '结他',
        piano: '钢琴',
        saxophone: '萨克管'
      },
      sports: {
        badminton: '羽毛球',
        football: '足球',
        swimming: '游泳',
        dartsTraining: '飞镖训练',
      },
      beauty: {
        nail: '美甲',
        tattoo: '纹身',
      },
      designAndDevelopment: {
        graphic: '平面设计',
        web: '网页开发',
        mobile: 'APP开发',
        game: '游戏开发',
      },
      petTraining: {
        cat: '猫猫训练',
        dog: '狗狗训练'
      },
      carDriving: {
        carDriving: '汽车驾驶',
      },
      interestClasses: {
        dancing: '舞蹈',
        audioVisualLessons: '影音制作课程',
        kidsAndToddlers: '儿童与幻儿'
      },
      personal: {
        personalFinance: '个人理财',
        emergencyAndSurvival: '急救与求生技能',
        fortuneTelling: '星相运程',
      },
      photography: {
        videoEditors: '影视制作',
        photoshopEditing: '相片编辑',
      },
      recover: {
        recovery: '复原疗程',
        massageAndAcupressure: '推拿按摩',
      },
      talent: {
        leadershipAndManagement: '领导及管理',
        professionalSKills: '职场技能',
      },
      stem: {
        science: '科学',
        technology: '技术',
        engineering: '工程',
        mathematics: '数学',
      }
    },
  },
  calendar: {
    title: '请输入您的课程计划',
  },
  assignTutor: {
    title: '指派教练',
  },
  classAddress: {
    title: '上堂地点',
    label: {
      onSite: '上门'
    }
  },
  classSummary: {
    title: '核对资料',
    label: {
      title: '标题',
      description: '详情',
      category: '类别',
      skill: '课程',
      time: '时间',
      address: '地点',
      contact: '联络电话',
      fee: '价格',
      perSemester: '/每学期',
      perLesson: '/每堂',
      alertMsg: '此课堂已有学生，不能更改此栏!',
      deleteMsg: '此课堂已有学生，不能删除!'
    },
  },
  classDescription: {
    title: '课程描述',
    question: {
      titleMsg: "请问课程的标题是?",
      descriptionMsg: '你怎么描述这个课程? (选填)',
    },
  },
  classType: {
    title: '课程类别',
    question: {
      typeMsg: '请选择课程种类',
    }
  },
  icon: {
    beauty: '美容',
    carDriving: '驾驶',
    designAndDevelopment: '设计与开发',
    education: '教育与学习',
    interestClass: '兴趣班',
    music: '音乐',
    personal: '个人及生活',
    petTraining: '宠物训练',
    photography: '摄影',
    recover: '舒缓及治疗',
    sport: '运动',
    talent: '技能培训',
    stem: 'STEM',
  },
  appliedClassNoti: {
    text: {
      successMsg: '你已成功报班!',
      thanksMsg: '感谢你使用 MyTutor!',
      viewMyRecord: '检视我的记录',
      continueFindClass: '继续报班',
    },
  },
  appliedClassList: {
    title: '已报读的课堂',
    exploreClasses: '探索所有课堂',
  },
  payment: {
    text: {
      paymentMethod: '请选择支付方式'
    },
  },
  createTutor: {
    title: '新增导师',
    editTutor: '编辑导师',
    text: {
      tutorName: '导师姓名',
      email: '电邮',
      phone: '联络电话',
      selfIntro: '其他',
      profession: '专业',
      experience: '年资',
      achievement: '个人成就',
      website: '网页',
    },
  },
  verifyCode: {
    title: '验证邮箱',
    label: '请检查你的电邮，并输入验证码：',
    resend: '重新发送',
    delayResend: "delay + '秒后重新发送'",
  },
  manageTutor: {
    title: '管理导师',
    text: {
      addATutor: '新增导师',
      deleteTutor: '移除导师'
    }
  },
  coin: {
    title: '金币', 
    text: {
      purchasedCoinRemain: '钱包结余',
      freeCoinRemain: '免费金币',
      purchase: '储值',
      purchasedHistory: '金币记录',
      time: '时间',
      content: '内容',
      coins: '金币',
      action: '操作',
    },
  },
  terms: {
    title: '条款及细则',
    body: 
  `APlus 使用条款及细则

此乃一份阁下作为「APlus」 (下称「本程式」) 之使用者与本程式的拥有人Genkon Technology Limited（下称「Genkon Tech」、「我们」、「我们的」或「我们」）之间的协议(下称「本协议」)。当阁下安装、複製或使用本程式，及/或于移动设备上点击 「下载」 按钮将本程式下载至阁下的移动设备时，即已同意遵守本协议所述之条款及细则。如果阁下不同意被这些条款及细则所约束，请勿下载本程式及/或立刻将本程式从阁下的移动设备移除以终止此协议。

第一部分 (一般条款及条件)

1.  定义
在本协议内， 某些专用词语之解释如下：
(a) 「内容」 - 即文本、图像、标志、声带、影像、数据彙编、版面、程式码（包括目标代码及源代码）、软件及任何其他资料。
(b) 「会员」 - 即透过本程式的登记程序，登记成为此计划的会员的人士。
(c) 「此计划」 - 即APlus会员计划，当中包括基本会员计划及导师会员计划。
(d) 「补习导师」- 即于本程式张贴补习广告及提供其补习服务的人。
(e) 「寻求补习服务者」- 即经本程式寻找补习服务的人（学生及/或家长）。
(f) 「用护」- 没有在本程式登记而使用本程式的人。

2.  授权
(a) Genkon Tech在此授权阁下一个人、有限、非专有、不可转让、 可撤销的许可于一部主要为阁下使用的移动设备上使用本程式之单一拷贝。此协议直至终止前皆为有效。阁下可以随时移除本程式及销毁本程式于阁下拥有的移动设备上的所有複本以终止本协议。
(b) 当阁下终止本协议时，你同意立即移除本程式及销毁所有本程式的複本以及所有关联文件及材料。Genkon Tech保留当阁下违反本协议之任何条款时随时终止本协议的权利。
(c) Genkon Tech保留权利随时更改、更正及/或改善本程式、停止提供本程式予阁下或任何使用者、或于本程式设立任何使用限制而不作另行通知。

3.  本程式之拥有权
Genkon Tech提供此程式予所有人的同时，我们保留所有本程式内的内容的权利、所有权和权益(包括版权)。禁止任何在未有得到Genkon Tech事先书面同意下将本程式或其中载有的材料抄袭至阁下的设备及/或伺服器，或更改或重用本程式的文本或图像。 Genkon Tech保留所有在本协议中未有明确授予阁下之权利。

阁下只可以使用本程式作个人用途，包括消闲，社会用途或以教师或学生身份作教学用途。阁下特别同意不会：
(a) 使用本程式之内容作商业用途 (补习导师在本程式刊登广告除外)； 及/或
(b) 有系统地複製本程式之内容以製作任何形式的汇集，资料库等。如获得Genkon Tech书面授权则不在此限。

4.  本程式之连结
本程式可能含有连接至由第三方所提供的其他网站及资源。这些连结仅为阁下提供资料及/或更方便的连结而设，我们对那些网站或资源的内容并无控制权，亦不会为他们或阁下因使用那些网站或资源时产生的任何损失负责。本程式提供那些连结亦不表示我们认可那些网站或资源或其操控者。

5.  免责条款
(a) 本程式由我们在「现有状况」或「现可提供」的基础上提供。我们抑或我们的附属机构不会作出任何形式的陈述或保证，明示或暗示本程式操作之准确性、充分性或完整性。在最大限度的法律许可范围内，我们及我们的附属机构否认作出任何担保、明示或暗示。Genkon Tech对任何因为包括但不限于ISP设备故障、推送伺服器故障、主机设备故障、通信网路故障、电源故障、自然事件、战争或法律的限制及审查等外部原因造成本程式之中断或失效概不负责。
(b) Genkon Tech并不担保本程式所载的功能不会受到干扰或无任何缺陷及/或错误，亦不担保缺陷会被纠正或本程式或提供本程式的伺服器不受电脑病毒或其他有害软件影响。

6.  法律责任的限制
(a) 在最大限度的法律许可范围内，Genkon Tech不承担任何因为使用本程式或任何本程式包含之内容所引起之任何直接或间接之损失或损坏、可预见的或其他包括间接、相应而生的、特别或惩罚性的损害。用护应清楚瞭解使用本程式及其内容均需自行承担风险。
(b) 不论是在线及离线的情况，Genkon Tech不承担用护或会员的任何行为。所有用护及会员在此明确同意不向Genkon Tech或我们的联营公司追究任何透过使用本程式所得到的指令，建议的法律责任。若寻求补习服务者及补习导师之间出现任何纠纷或因使用服务而引起任何纠纷，与该等纠纷有关或因而引起的所有责任、索偿、索求、赔偿金（实质或间接）， 不论属何性质，已知及未知、怀疑与否、已公开及未公开者，Genkon Tech一概毋须负上有关法律责任。

7.  弥偿
阁下同意弥偿予Genkon Tech及承担一切因使用本程式时违反本条款及细则而引起的所有责任，索赔。

8.  其他
(a) 豁免：Genkon Tech未能行使或执行此协议所赋予的权利和补偿不应诠释为放弃该权利和补偿。任何放弃本协议所赋予的权利和补偿的行动，只有在有Genkon Tech签署作实的书面豁免书的情况下方视为有效。
(b) 修改：Genkon Tech可随时对本协议作出修订以修改本协议。 有些条款及条件所列出的规定亦可能由我们的网站中的其他地方所公佈的规定和通告所取代。Genkon Tech将会尽合理的能力去肯定所有重大修改皆会以这当的方式通知阁下，例如在网站上公佈有关安排。阁下亦有责任并同意定期查阅有关条款及条件以知悉我们所作的任何修改。若阁下于有关条款及条件修改后仍继续使用本程式则代表阁下同意及接受有关修改。如果阁下不接受有关修改，请停止使用本程式。
(c) 可分割：若根据任何法律法规，本协议的任何条款被认为不合法、无效或不可执行，该被判为无效的条款将被视为可从本协议分割而不损害其他馀下条款的有效性及可执行性。
(d) 转让： 本协议以及一切本协议所赋予的权利和许可，阁下皆不可转移或转让，惟Genkon Tech则可以随意转让。
(e) 完整协议：这是阁下与Genkon Tech之间为标的事项所定下的完整协议，除有双方署名之书面改动，或是由Genkon Tech对本协议所作出的改动外，不会有任何更改。
(f) 管辖法律及仲裁：本协议受中华人民共和国香港特别行政区(下称「香港」)法律管辖，并按香港法律阐释。阁下同意任何与本协议或Genkon Tech有关之法律行动只得向香港的法院提出，而阁下同意受香港法院的专属管辖。
(g) 语言 -本协议的英文与中文版本如有任何牴触，概以英文版本为准。

第二部分 (会籍)

9.  会籍的登记，暂停及终止
(a) 要成为此计划的会员，您须透过本程式的登记程序登记并提供某些个人资料。
(b) 此计划这用于十八岁或以上人士。如您的年龄在十八岁以下而希望成为会员，您需在完成会员登记程序前得到父母或监护人的同意。当您完成会员登记程序，即代表您确认您已经事先得到您父母或监护人的同意。
(c) 在我们独立抉定的情况下，我们可拒绝您的申请。
(d) 我们保留在任何时间，在我们独立抉定的情况下，暂停或取消阁下会籍，或／和暂停或终止会员进入本本程式的权利。

10. Genkon Tech、寻求补习服务者及补习导师之间的关系
本程式仅为一个平台，让寻求补习服务者及补习导师进行相互配对。Genkon Tech不惨予所有用护（寻求补习服务者及补习导师）之间的相互配对，Genkon Tech及补习导师之间的关系谨受本条款及细则所规范，并不存在僱佣关系。

11. 寻求补习服务者及补习导师的行为
(a) 教学质素、时间安排，法律上的义务或导师任何其他服务，并不在Genkon Tech控制范围之内。寻求补习服务者的诚信，责任或其任何行动亦不在Genkon Tech控制范围之内。
(b) 不论寻求补习服务者及补习导师在公共，私人或离线的互动，Genkon Tech不代表及不交涉双方透过使用本程式，向对方提供服务之这用性，可靠性及这时性。

12. 本程式内的帖子及内容
(a) Genkon Tech有权撤回任何违反本条款和细则及有损Genkon Tech或本程式名誉的帖子。不论该帖子是由用护张贴的或是来自其他地方。
(b) Genkon Tech可以监察张贴于本程式的补习广告，留言及通过本程式的通讯。Genkon Tech并有权自行抉定删除及/或阻止此类帖子或通讯。

`,
privacy:
`第三部分 收集个人资料声明

13. 与个人资料(私隐)条例(「条例」)有关的告示
(a) 要成为此计划之会员，您必须向我们提供您的个人资料(「个人资料」)。如您不能或不愿意提供全面及准确的个人资料，我们可能不能向您提供或继续提供此计划下之服务。
(b) 我们时刻将您的个人资料保密处理。我们有关收集、使用、保存、披露、转移、保密及查阅个人资料的政策及常规，均符合香港法例规定，并已载于此声明。
(c) 您同意，您向我们提供的有关个人资料可由我们使用及保存作为：
i. 处理您的会员申请； ii. 向您提供此计划之服务；
iii. 进行数据排序及分析，使我们能理解您的特点及购买行为，向您提供更符合您需要的其它服务；
iv. 过向您提供定期信息，包括此计划及其奖赏的详情；
v. 此计划的正常管理、运作及保养；
vi. 设计我们及我们的联营公司供您使用而提供的新服务，或改善现有服务；
vii. 调查投诉、备受怀疑的可疑交易及研究服务改善措施；
viii. 防止及侦测罪行；
ix. 根据法例作出披露；
x.  综合性行为分析。
(d) 我们拟使用您的个人资料(包括但不限于您的名字、电话号码及电邮地址及您在本程式上向我们提供的其他资料) 在下列有关事项向您作直接捉销用途(无论通过邮件、电邮、电话、短讯、透过本程式本身或阁下的移动设备的通知中心所发出的通知或类似形式)：
i. 由我们或我们的联营公司所提供的优惠及推广；
ii. 我们联同第三方商护向会员提供的下列种类产品或服务优惠及推广：
• 零售产品或服务；
• 金融、保险、银行及信用卡；
• 运输、旅游及住宿；
• 体育、消閒、康乐及娱乐；
• 电讯产品及服务；
• 电子商务(包括交易及付款平台及网上拍卖)
请注意，除非取到您的同意，否则我们不能如上述般使用您的个人资料。
(e) 我们可能披露及转移(无论在香港或海外) 我们公司为上述第(c)及(d) 段所述的目的而使用、持有、处理或保留您个人资料的权利予向我们负有保密责任的代理人、承办商，及在合併或转让(无论是资产或股权)时我们任何实际或建议受让人，以向我们提供管理、数据分析、市场推广及研究、电讯服务、专业服务或其他类似的服务。
(f) 您有权：
i.  查核我们是否持有您任何个人资料；
ii. 查阅我们持有您个人资料；
iii.  要求我们更正任何不正确的个人资料；
iv. 确定我们就个人资料(不时)採取的政策及常规，以及我们持有的个人资料之类别；
v.  随时要求不再收到我们发来的直接宣传资料。
如欲提出任何上述的要求，请电邮致：hello@genkontech.com。
(g) 根据有关条例，我们有权对查阅个人资料的要求收取合理的处理费用。
(h) 本第13条条款并不限制条例所保障您享受的权利。
  `
  }
}
