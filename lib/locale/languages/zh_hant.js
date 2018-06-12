export const zh_hant = {
  common: {
    loading: '加載中',
    ok: '確認',
    okMsg: '確定',
    signOut: '登出',
    cancel: '取消',
    confirm: '確定',
    repeat: '重複',
    never: '不重複',
    delete: '刪除',
    start: '開始時間:',
    end: '結束時間:',
    addTimeSlot: '新增時段',
    next: '繼續',
    submit: '提交',
    search: '搜尋',
    duplicate: '複製',
  },
  error: {
    API_CODE_DB_ERROR: "數據庫出錯",
    API_CODE_DB_NOT_FOUND: "找不到數據庫",

    API_CODE_USER_NOT_FOUND: "找不到此用戶",
    API_CODE_TARGET_USER_NOT_FOUND: "找不到此用戶",
    API_CODE_INVALID_PARAMS: "輸入無效",

    API_CODE_ACC_DUPLICATE_USERNAME: "此用戶名稱已被使用",
    API_CODE_ACC_DUPLICATE_EMAIL: "此電郵已被使用",
    API_CODE_ACC_INVALID_FIELDS: "輸入無效",
    API_CODE_ACC_INCORRECT_PASSWORD: "密碼不正確",
    API_CODE_ACC_ALREADY_LINKED_AWS_ID: "用戶已經存在",
    API_CODE_ACC_EMAIL_NOT_VERIFIED: "電郵未被確認",
    API_CODE_ACC_NOT_LINKED_AWS_ID: "找不到此用戶",
    API_CODE_ACC_INCORRECT_USERNAME: "用戶名稱不正確",

    API_CODE_ACC_UNAUTHORIZED: "賬戶未經授權",

    FACEBOOK_LOGIN_CANCEL: "取消Facebook登入",
    FACEBOOK_LOGIN_FAIL: "Facebook登入失敗",
    FACEBOOK_GET_PROFILE_FAIL: "無法獲取Facebook資料",
    FACEBOOK_GET_PICTURE_FAIL: "無法獲取Facebook頭象",
  },
  alert: {
    pleaseAnswer: '請先回答問題',
  },
  progressBar: {
    stepToGo: '還有${remainStep}步...'
  },
  giveComment: {
    title: '寫評語',
    text: {
      punctualityRating: '守時',
      environmentRating: '環境',
      attitudeRating: '態度',
      professionRating: '專業',
      comment: '寫評語',
      placeholder: '點擊這裹輸入內容'
    }
  },
  uploadPhoto: {
    title: '上載圖片',
    deletePhotoSentence: '確定刪除此圖片?',
    cannotAddmoreThanFour: '你最多只能上載4張相片',
    text: {
      selectPhotoFrom: '選取相片來源',
      takePhoto: '影相',
      selectFromCameraRoll: '從相片庫中選取',
    },
  },
  tutionFee: {
    title: '學費',
    text: {
      perLesson: '每堂',
      perSemester: '每學期',
      price: '價格',
    },
  },
  contact: {
    title: '聯絡資料',
    text: {
      contactNumber: '聯絡電話',
      notification1: '備註: 你的聯絡資料',
      notification2: '只會',
      notification3: '顯示給你的學生'
    },
  },
  newsfeed: {
    title: '動態', 
    text:{
      perSemester: '學期',
      perLesson: '堂',
      search: '搜尋',
      comment: '個評語',
      showMoreClasses: '顯示更多...',
    }
  },
  advancedSearch: {
    title: '進階搜尋',
    text: {
      category: '分類',
      classCategory: '課堂類別',
      skillCategory: '技能類別',
      selectChargeType: '-- 請選擇收費類型 --',
      tutionFee: '學費',
      below: '低於',
      any: '任何',
      lowToHigh: '由低至高',
      highToLow: '由高至低',
      classTime: '課堂時間',
      perSemester: '每學期',
      perLesson: '每堂',
    },
  },
  searchClass: {
    title: '搜尋',
    advanced: '進階搜尋',
    districtSearch: '搜尋地區...',
    classSearch: '搜尋課堂名稱, 類別 或 技能...'
  },
  searchResult: {
    title: '所有結果',
    label: {
      noResult: '找不到符合要求的結果',
      selectSortingType: '-- 請選擇排序類型 --',
      ascfee: '以價錢由低至高排列',
      desfee: '以價錢由高至低排列',
      asctotalRatings: '以評分由低至高排列',
      destotalRatings: '以評分由高至低排列',
      asctotalComments: '以留言由少至多排列',
      destotalComments: '以留言由多至少排列',
    },
    placeholder: {
      typeHere: '搜尋...',
      currentLocation: '當前位置',
    },
  },
  profileSetting: {
    title: '個人檔案',
    text: {
      editIcon: '點擊更改',
      name: '姓名',
      website: '個人網站',
      email: '電郵',
      myCity: '我的城市',
      introduction: '個人簡介',
      changePw: '更改密碼',
      phone: '手提電話',
    },
  },
  changePw: {
    title: '更改密碼',
    text: {
      currentPw: '密碼',
      newPw: '新密碼',
      confirmPw: '重複新密碼',
    },
  },
  history: {
    title: '記錄',
    favourite: '喜好',
    history: '記錄',
  },
  search: {
    title: '搜尋',
  },
  schedule: {
    title: '行程'
  },
  profile: {
    title: '我',
    text: {
      login: '登入',
      signUpOrLogin: '註冊或登入',
      signUp:'註冊',
      comments: '留言',
      notifications: '通知',
      applyToBeTutor: '成為導師',
      settings: '設定',
      switchMode: {
        learner: '切換到導師模式',
        tutor: '切換到學員模式',
      },
      viewClasses: {
        learner: '檢視所有已報讀的課堂',
        tutor: '檢視所有已建立的課堂'
      },
      createTutor: '新增導師',
      manageTutor: '管理導師',
    }
  },
  signin:{
    title: '歡迎回來',
    text:{
      signIn:{
        label:'用電郵登入'
      },
      signUp:{
        label: '註冊'
      },
      next: {
        label: '繼續'
      }
    },
    textInput: {
      email: {
        label: '電子信箱',
        placeholder: '請輸入電子信箱',
      },
      password: {
        label: '密碼:',
        placeholder: '請輸入密碼'
      },
    },
  },
  login: {
    title: '歡迎回來',
    textInput: {
      username: {
        label: '用戶名稱:',
        placeholder: '請輸入用戶名稱',
      },
      password: {
        label: '密碼:',
        placeholder: '請輸入密碼'
      },
    },
    text:{
      signIn:{
        label: '登入'
      },
      register:{
        label: '註冊'
      },
    }
  },
  signUp:{
    title: {
      tutor: '註冊為教練',
      learner: '註冊為學員',
      selfIntro: '個人簡介',
      profession: '專業',
      experience: '年資',
      achievement: '個人成就',
    },
    textInput:{
      skill: {
        label:'技能',
        placeholder:'技能'
      },
      email:{
        label:'電子信箱',
        placeholder:'電子信箱',
      },
      password:{
        label:'密碼',
        placeholder:'密碼',
      },
      username: {
        label: '用戶名稱:',
        placeholder: '用戶名稱',
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
        label:'區號',
        placeholder:'區號',
      },
      phoneNumber:{
        label:'電話號碼',
        placeholder:'電話號碼',
      },
    },
    text:{
      verifyCodePlaceholder: {
        label:'驗證碼'
      },
      verifyCode: {
        label: '請檢查你的電郵，並輸入驗證碼：'
      },
      upload: {
        label:'＋ 證明文件'
      },
      chooseUserType:{
        label:'請問你想註冊為…'
      },
      selfIntroduction:{
        label:'你是誰? (自我介紹)'
      },
      profession:{
        label:'你的專業是什麼?'
      },
      experience: {
        label:'你有多少年經驗?'
      },
      achievement: {
        label:'你有什麼成就?'
      },
      company: {
        label: '機構'
      },
      tutor: {
        label:'導師'
      },
      learner: {
        label:'學員'
      },
      signUp:{
        label:'註冊',
      },
      agreement:{
        label:'透過註冊，表示你已經同意A+的服務條款及私隱政策。',
      },
    },
  },
  forgotPassword:{
    title:'忘記密碼',
    text:{
      forgotPassword: '忘記密碼？',
      forgotPasswordEmail:'請輸入你的電子信箱來尋找你的帳號。',
       confirm:{
        label:'確定'
      }
    }
  },
  tutorDetail:{
    title: '課堂詳情',
    text:{
      punctualityRating: '守時',
      environmentRating: '環境',
      attitudeRating: '態度',
      professionRating: '專業',
      classDescription: '課程描述',
      rating: '評分: ',
      applied: {
        label: '已報讀'
      },
      applyNow:{
        label:'立即參加',
      },
      giveComment: {
        label: '寫評語'
      },
      tutor: '導師',
      comment: '評語',
      allStudent: '所有學生',
      viewAllStudent: '檢視所有學生',
      verifiedBy: '官方認可',
    },
    textInput:{
      email:{
        placeholder: '電子信箱'
      }
    },
  },
  tutorInfo: {
    text: {
      introduction: '課堂簡介',
      mainCourse: '主要課堂',
    }
  },
  settings: {
    title: '設定',
    language: '語言',
    version: '版本',
    changePw: '修改密碼',
  },
  language: {
    title: '語言',
    message: {
      changeLanguage: '語言設置已更改'
    }
  },
  classList: {
    title: '課程',
    createClasses: '建立你的課堂',
    duplicateClass: '複製呢個班?',
    deleteClass: '刪除呢個班?',
  },
  category: {
    title: '類別',
    types: {
      education: '教育及學習',
      music: '音樂',
      sports: '運動',
      beauty: '美容',
      designAndDevelopment: '設計與開發',
      petTraining: '寵物訓練',
      carDriving: '汽車駕駛',
      interestClasses: '興趣班',
      personal: '個人及生活',
      photography: '拍攝及製作',
      recover: '舒緩及治療',
      talent: '技能增值',
      stem: 'STEM',
    }
  },
  repeat: {
    title: '重復',
    label: {
      until: '直到',
      everyDay: '每日',
      everyWeek: '每星期',
      everyTwoWeek: '每兩星期',
      everyMonth: '每月',
      neverRepeat: '不重復',
    }
  },
  skill: {
    title: '專長',
    types: {
      education: {
        cantonese: '廣東話',
        english: '英語',
        mandarin: '普通話'
      },
      music: {
        guitar: '結他',
        piano: '鋼琴',
        saxophone: '薩克管'
      },
      sports: {
        badminton: '羽毛球',
        football: '足球',
        swimming: '游泳',
        dartsTraining: '飛鏢訓練',
      },
      beauty: {
        nail: '美甲',
        tattoo: '紋身',
      },
      designAndDevelopment: {
        graphic: '平面設計',
        web: '網頁開發',
        mobile: 'APP開發',
        game: '遊戲開發',
      },
      petTraining: {
        cat: '貓貓訓練',
        dog: '狗狗訓練'
      },
      carDriving: {
        carDriving: '汽車駕駛',
      },
      interestClasses: {
        dancing: '舞蹈',
        audioVisualLessons: '影音製作課程',
        kidsAndToddlers: '兒童與幻兒'
      },
      personal: {
        personalFinance: '個人理財',
        emergencyAndSurvival: '急救與求生技能',
        fortuneTelling: '星相運程',
      },
      photography: {
        videoEditors: '影視製作',
        photoshopEditing: '相片編輯',
      },
      recover: {
        recovery: '復原療程',
        massageAndAcupressure: '推拿按摩',
      },
      talent: {
        leadershipAndManagement: '領導及管理',
        professionalSKills: '職場技能',
      },
      stem: {
        science: '科學',
        technology: '技術',
        engineering: '工程',
        mathematics: '數學',
      }
    },
  },
  calendar: {
    title: '請輸入您的課程計劃',
  },
  assignTutor: {
    title: '指派教練',
  },
  classAddress: {
    title: '上堂地點',
    label: {
      onSite: '上門'
    }
  },
  classSummary: {
    title: '核對資料',
    label: {
      title: '標題',
      description: '詳情',
      category: '類別',
      skill: '課程',
      time: '時間',
      address: '地點',
      contact: '聯絡電話',
      fee: '價格',
      perSemester: '/每學期',
      perLesson: '/每堂',
      alertMsg: '此課堂已有學生，不能更改此欄!',
      deleteMsg: '此課堂已有學生，不能刪除!'
    },
  },
  classDescription: {
    title: '課程描述',
    question: {
      titleMsg: "請問課程的標題是?",
      descriptionMsg: '你怎麼描述這個課程? (選填)',
    },
  },
  classType: {
    title: '課程類別',
     question: {
      typeMsg: '請選擇課程種類',
    }
  },
  icon: {
    beauty: '美容',
    carDriving: '駕駛',
    designAndDevelopment: '設計與開發',
    education: '教育與學習',
    interestClass: '興趣班',
    music: '音樂',
    personal: '個人及生活',
    petTraining: '寵物訓練',
    photography: '攝影',
    recover: '舒緩及治療',
    sport: '運動',
    talent: '技能培訓',
    stem: 'STEM',
  },
  appliedClassNoti: {
    text: {
      successMsg: '你已成功報班!',
      thanksMsg: '感謝你使用 MyTutor!',
      viewMyRecord: '檢視我的記錄',
      continueFindClass: '繼續報班',
    },
  },
  appliedClassList: {
    title: '已報讀的課堂',
    exploreClasses: '探索所有課堂',
  },
  payment: {
    text: {
      paymentMethod: '請選擇支付方式'
    },
  },
  createTutor: {
    title: '新增導師',
    editTutor: '編輯導師',
    text: {
      tutorName: '導師姓名',
      email: '電郵',
      phone: '聯絡電話',
      introduction: '導師簡介',
      website: '網頁',
    },
  },
  manageTutor: {
    title: '管理導師',
    text: {
      addATutor: '新增導師',
      deleteTutor: '移除導師'
    }
  }
}