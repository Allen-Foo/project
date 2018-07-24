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
    goToShop: '去金幣商店',
    reset: '重置',
    tutor: '導師',
    class: '課程',
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
  ribbon: {
    sale: '優惠課程',
    full: '已滿額',
    new: '新課程',
    expired: '已完結',
  },
  progressBar: {
    stepToGo: "'還有' + remainStep + '步...'"
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
  maxNumberOfStudent: {
    title: '學生人數',
    text: {
      maxNum: '人數上限: ',
      ppl: '人',
    }
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
      balance: '我的餘額',
      checkCoins: {
        learner: '我的金幣',
        tutor: '我的金幣'
      },
    }
  },
  balance:{
    title: '我的餘額',
    pending: '即將到賬: ',
    withdraw: '提款',
  },
  withdraw:{
    title: '提款',
    text: {
      bankAccountName: '持卡人姓名:',
      bankName: '銀行: ',
      bankAccount: '銀行戶口: ',
      amount: '金額($): ',
      confirm: '確認',
      cancel: '取消',
    }
  },
  withdrawRecord:{
    title: '記錄',
    text:{
      processing: '處理中',
      approved: '已授權',
      rejected: '已拒絕',
      bankAccountName: '持卡人姓名:',
      bankName: '銀行: ',
      bankAccount: '銀行戶口: ',
    }
  },
  signin:{
    title: '歡迎回來',
    text:{
      signIn:{
        label:'登入'
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
        label: '用戶名稱',
        placeholder: '請輸入用戶名稱',
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
      selfIntro: '其他',
      profession: '專業',
      experience: '年資',
      achievement: '個人成就',
      displayName: '機構名稱',
      introduction: '介紹',
      logo: '圖標',
      slogan: '標語',
      banner: '橫幅廣告',
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
        label:'告訴我們更多...\n(自我介紹)'
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
      displayName: {
        label: '機構名稱',
      },
      introduction: {
        label: '簡單介紹壹下妳的機構',
      },
      logo: {
        label: '請上傳機構的圖標',
      },
      slogan: {
        label: "請寫下標語",
      },
      banner: {
        label: '請上傳橫幅廣告',
      },
      agreement:{
        label1:'透過註冊，表示你已經同意A+的',
        label2: '服務條款及私隱政策'
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
  classDetail:{
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
      introduction: '簡介',
      achievement: '成就',
      experience: '經驗(年)',
      profession: '專業',
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
    tutorCreateClassMessage: '你確定要使用30個金幣來建立課堂嗎？',
    companyCreateClassMessage: '你確定要建立課堂嗎？',
    tutorCreateClassNotEnoughCoinsMessage: '你的金幣不足',
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
      maxStudent: '人數上限',
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
      selfIntro: '其他',
      profession: '專業',
      experience: '年資',
      achievement: '個人成就',
      website: '網頁',
    },
  },
  verifyCode: {
    title: '驗證電郵',
    label: '請檢查你的電郵，並輸入驗證碼：',
    resend: '重新發送',
    delayResend: "delay + '秒後重新發送'",
  },
  manageTutor: {
    title: '管理導師',
    text: {
      addATutor: '新增導師',
      deleteTutor: '移除導師'
    }
  },
  coin: {
    title: '金幣', 
    text: {
      purchasedCoinRemain: '錢包結餘',
      freeCoinRemain: '免費金幣',
      purchase: '儲值',
      purchasedHistory: '金幣記錄',
      time: '時間',
      content: '內容',
      coins: '金幣',
      action: '操作',
    },
  },
  terms: {
    title: '條款及細則',
    body:
  `APlus 使用條款及細則

此乃一份閣下作為「APlus」 (下稱「本程式」) 之使用者與本程式的擁有人Genkon Technology Limited（下稱「Genkon Tech」、「我們」、「我們的」或「我們」）之間的協議(下稱「本協議」)。當閣下安裝、複製或使用本程式，及/或於移動設備上點擊 「下載」 按鈕將本程式下載至閣下的移動設備時，即已同意遵守本協議所述之條款及細則。如果閣下不同意被這些條款及細則所約束，請勿下載本程式及/或立刻將本程式從閣下的移動設備移除以終止此協議。

第一部分 (一般條款及條件)

1.  定義
在本協議內， 某些專用詞語之解釋如下：
(a) 「內容」 - 即文本、圖像、標誌、聲帶、影像、數據彙編、版面、程式碼（包括目標代碼及源代碼）、軟件及任何其他資料。
(b) 「會員」 - 即透過本程式的登記程序，登記成為此計劃的會員的人士。
(c) 「此計劃」 - 即APlus會員計劃，當中包括基本會員計劃及導師會員計劃。
(d) 「補習導師」- 即於本程式張貼補習廣告及提供其補習服務的人。
(e) 「尋求補習服務者」- 即經本程式尋找補習服務的人（學生及/或家長）。
(f) 「用戶」- 沒有在本程式登記而使用本程式的人。

2.  授權
(a) Genkon Tech在此授權閣下一個人、有限、非專有、不可轉讓、 可撤銷的許可於一部主要為閣下使用的移動設備上使用本程式之單一拷貝。此協議直至終止前皆為有效。閣下可以隨時移除本程式及銷毀本程式於閣下擁有的移動設備上的所有複本以終止本協議。
(b) 當閣下終止本協議時，你同意立即移除本程式及銷毀所有本程式的複本以及所有關聯文件及材料。Genkon Tech保留當閣下違反本協議之任何條款時隨時終止本協議的權利。
(c) Genkon Tech保留權利隨時更改、更正及/或改善本程式、停止提供本程式予閣下或任何使用者、或於本程式設立任何使用限制而不作另行通知。

3.  本程式之擁有權
Genkon Tech提供此程式予所有人的同時，我們保留所有本程式內的內容的權利、所有權和權益(包括版權)。禁止任何在未有得到Genkon Tech事先書面同意下將本程式或其中載有的材料抄襲至閣下的設備及/或伺服器，或更改或重用本程式的文本或圖像。 Genkon Tech保留所有在本協議中未有明確授予閣下之權利。

閣下只可以使用本程式作個人用途，包括消閑，社會用途或以教師或學生身份作教學用途。閣下特別同意不會：
(a) 使用本程式之內容作商業用途 (補習導師在本程式刊登廣告除外)； 及/或
(b) 有系統地複製本程式之內容以製作任何形式的匯集，資料庫等。如獲得Genkon Tech書面授權則不在此限。

4.  本程式之連結
本程式可能含有連接至由第三方所提供的其他網站及資源。這些連結僅為閣下提供資料及/或更方便的連結而設，我們對那些網站或資源的內容並無控制權，亦不會為他們或閣下因使用那些網站或資源時產生的任何損失負責。本程式提供那些連結亦不表示我們認可那些網站或資源或其操控者。

5.  免責條款
(a) 本程式由我們在「現有狀況」或「現可提供」的基礎上提供。我們抑或我們的附屬機構不會作出任何形式的陳述或保證，明示或暗示本程式操作之準確性、充分性或完整性。在最大限度的法律許可範圍內，我們及我們的附屬機構否認作出任何擔保、明示或暗示。Genkon Tech對任何因為包括但不限於ISP設備故障、推送伺服器故障、主機設備故障、通信網路故障、電源故障、自然事件、戰爭或法律的限制及審查等外部原因造成本程式之中斷或失效概不負責。
(b) Genkon Tech並不擔保本程式所載的功能不會受到干擾或無任何缺陷及/或錯誤，亦不擔保缺陷會被糾正或本程式或提供本程式的伺服器不受電腦病毒或其他有害軟件影響。

6.  法律責任的限制
(a) 在最大限度的法律許可範圍內，Genkon Tech不承擔任何因為使用本程式或任何本程式包含之內容所引起之任何直接或間接之損失或損壞、可預見的或其他包括間接、相應而生的、特別或懲罰性的損害。用戶應清楚瞭解使用本程式及其內容均需自行承擔風險。
(b) 不論是在線及離線的情況，Genkon Tech不承擔用戶或會員的任何行為。所有用戶及會員在此明確同意不向Genkon Tech或我們的聯營公司追究任何透過使用本程式所得到的指令，建議的法律責任。若尋求補習服務者及補習導師之間出現任何糾紛或因使用服務而引起任何糾紛，與該等糾紛有關或因而引起的所有責任、索償、索求、賠償金（實質或間接）， 不論屬何性質，已知及未知、懷疑與否、已公開及未公開者，Genkon Tech一概毋須負上有關法律責任。

7.  彌償
閣下同意彌償予Genkon Tech及承擔一切因使用本程式時違反本條款及細則而引起的所有責任，索賠。

8.  其他
(a) 豁免：Genkon Tech未能行使或執行此協議所賦予的權利和補償不應詮釋為放棄該權利和補償。任何放棄本協議所賦予的權利和補償的行動，只有在有Genkon Tech簽署作實的書面豁免書的情況下方視為有效。
(b) 修改：Genkon Tech可隨時對本協議作出修訂以修改本協議。 有些條款及條件所列出的規定亦可能由我們的網站中的其他地方所公佈的規定和通告所取代。Genkon Tech將會盡合理的能力去肯定所有重大修改皆會以適當的方式通知閣下，例如在網站上公佈有關安排。閣下亦有責任並同意定期查閱有關條款及條件以知悉我們所作的任何修改。若閣下於有關條款及條件修改後仍繼續使用本程式則代表閣下同意及接受有關修改。如果閣下不接受有關修改，請停止使用本程式。
(c) 可分割：若根據任何法律法規，本協議的任何條款被認為不合法、無效或不可執行，該被判為無效的條款將被視為可從本協議分割而不損害其他餘下條款的有效性及可執行性。
(d) 轉讓： 本協議以及一切本協議所賦予的權利和許可，閣下皆不可轉移或轉讓，惟Genkon Tech則可以隨意轉讓。
(e) 完整協議：這是閣下與Genkon Tech之間為標的事項所定下的完整協議，除有雙方署名之書面改動，或是由Genkon Tech對本協議所作出的改動外，不會有任何更改。
(f) 管轄法律及仲裁：本協議受中華人民共和國香港特別行政區(下稱「香港」)法律管轄，並按香港法律闡釋。閣下同意任何與本協議或Genkon Tech有關之法律行動只得向香港的法院提出，而閣下同意受香港法院的專屬管轄。
(g) 語言 -本協議的英文與中文版本如有任何牴觸，概以英文版本為準。

第二部分 (會籍)

9.  會籍的登記，暫停及終止
(a) 要成為此計劃的會員，您須透過本程式的登記程序登記並提供某些個人資料。
(b) 此計劃適用於十八歲或以上人士。如您的年齡在十八歲以下而希望成為會員，您需在完成會員登記程序前得到父母或監護人的同意。當您完成會員登記程序，即代表您確認您已經事先得到您父母或監護人的同意。
(c) 在我們獨立決定的情況下，我們可拒絕您的申請。
(d) 我們保留在任何時間，在我們獨立決定的情況下，暫停或取消閣下會籍，或／和暫停或終止會員進入本本程式的權利。

10. Genkon Tech、尋求補習服務者及補習導師之間的關係
本程式僅為一個平台，讓尋求補習服務者及補習導師進行相互配對。Genkon Tech不參予所有用戶（尋求補習服務者及補習導師）之間的相互配對，Genkon Tech及補習導師之間的關係謹受本條款及細則所規範，並不存在僱傭關係。

11. 尋求補習服務者及補習導師的行為
(a) 教學質素、時間安排，法律上的義務或導師任何其他服務，並不在Genkon Tech控制範圍之內。尋求補習服務者的誠信，責任或其任何行動亦不在Genkon Tech控制範圍之內。
(b) 不論尋求補習服務者及補習導師在公共，私人或離線的互動，Genkon Tech不代表及不交涉雙方透過使用本程式，向對方提供服務之適用性，可靠性及適時性。

12. 本程式內的帖子及內容
(a) Genkon Tech有權撤回任何違反本條款和細則及有損Genkon Tech或本程式名譽的帖子。不論該帖子是由用戶張貼的或是來自其他地方。
(b) Genkon Tech可以監察張貼於本程式的補習廣告，留言及通過本程式的通訊。Genkon Tech並有權自行決定刪除及/或阻止此類帖子或通訊。

`,
privacy:
`第三部分 收集個人資料聲明

13. 與個人資料(私隱)條例(「條例」)有關的告示
(a) 要成為此計劃之會員，您必須向我們提供您的個人資料(「個人資料」)。如您不能或不願意提供全面及準確的個人資料，我們可能不能向您提供或繼續提供此計劃下之服務。
(b) 我們時刻將您的個人資料保密處理。我們有關收集、使用、保存、披露、轉移、保密及查閱個人資料的政策及常規，均符合香港法例規定，並已載於此聲明。
(c) 您同意，您向我們提供的有關個人資料可由我們使用及保存作為：
i. 處理您的會員申請； ii. 向您提供此計劃之服務；
iii. 進行數據排序及分析，使我們能理解您的特點及購買行為，向您提供更符合您需要的其它服務；
iv. 過向您提供定期信息，包括此計劃及其獎賞的詳情；
v. 此計劃的正常管理、運作及保養；
vi. 設計我們及我們的聯營公司供您使用而提供的新服務，或改善現有服務；
vii. 調查投訴、備受懷疑的可疑交易及研究服務改善措施；
viii. 防止及偵測罪行；
ix. 根據法例作出披露；
x.  綜合性行為分析。
(d) 我們擬使用您的個人資料(包括但不限於您的名字、電話號碼及電郵地址及您在本程式上向我們提供的其他資料) 在下列有關事項向您作直接捉銷用途(無論通過郵件、電郵、電話、短訊、透過本程式本身或閣下的移動設備的通知中心所發出的通知或類似形式)：
i. 由我們或我們的聯營公司所提供的優惠及推廣；
ii. 我們聯同第三方商戶向會員提供的下列種類產品或服務優惠及推廣：
• 零售產品或服務；
• 金融、保險、銀行及信用卡；
• 運輸、旅遊及住宿；
• 體育、消閒、康樂及娛樂；
• 電訊產品及服務；
• 電子商務(包括交易及付款平台及網上拍賣)
請注意，除非取到您的同意，否則我們不能如上述般使用您的個人資料。
(e) 我們可能披露及轉移(無論在香港或海外) 我們公司為上述第(c)及(d) 段所述的目的而使用、持有、處理或保留您個人資料的權利予向我們負有保密責任的代理人、承辦商，及在合併或轉讓(無論是資產或股權)時我們任何實際或建議受讓人，以向我們提供管理、數據分析、市場推廣及研究、電訊服務、專業服務或其他類似的服務。
(f) 您有權：
i.  查核我們是否持有您任何個人資料；
ii. 查閱我們持有您個人資料；
iii.  要求我們更正任何不正確的個人資料；
iv. 確定我們就個人資料(不時)採取的政策及常規，以及我們持有的個人資料之類別；
v.  隨時要求不再收到我們發來的直接宣傳資料。
如欲提出任何上述的要求，請電郵致：hello@genkontech.com。
(g) 根據有關條例，我們有權對查閱個人資料的要求收取合理的處理費用。
(h) 本第13條條款並不限制條例所保障您享受的權利。
  `
  }
}
