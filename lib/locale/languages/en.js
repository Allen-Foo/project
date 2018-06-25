// en.js

export const en = {
  common: {
    loading: 'Loading',
    ok: 'OK',
    okMsg: 'OK',
    signOut: 'Sign out',
    cancel: 'Cancel',
    confirm: 'Confirm',
    repeat: 'Repeat',
    never: 'Never',
    delete: 'Delete',
    start: 'Start from',
    end: 'End at',
    addTimeSlot: 'Add timeslot',
    next: 'Next',
    submit: 'Submit',
    search: 'Search',
    duplicate: 'Duplicate',
  },
  error: {
    API_CODE_DB_ERROR: "Databasae error",
    API_CODE_DB_NOT_FOUND: "Database not found",

    API_CODE_USER_NOT_FOUND: "User not found",
    API_CODE_TARGET_USER_NOT_FOUND: "User not found",
    API_CODE_INVALID_PARAMS: "Invalid input",

    API_CODE_ACC_DUPLICATE_USERNAME: "User name has been used",
    API_CODE_ACC_DUPLICATE_EMAIL: "Email has been used",
    API_CODE_ACC_INVALID_FIELDS: "Invalid input",
    API_CODE_ACC_INCORRECT_PASSWORD: "Incorrect password",
    API_CODE_ACC_ALREADY_LINKED_AWS_ID: "User already exists",
    API_CODE_ACC_EMAIL_NOT_VERIFIED: "This email has not been verified",
    API_CODE_ACC_NOT_LINKED_AWS_ID: "User not found",
    API_CODE_ACC_INCORRECT_USERNAME: "Incorrect username",

    API_CODE_ACC_UNAUTHORIZED: "Account unauthorized.",

    FACEBOOK_LOGIN_CANCEL: "Facebook login canceled",
    FACEBOOK_LOGIN_FAIL: "Facebook login failed",
    FACEBOOK_GET_PROFILE_FAIL: "Failed to retrieve facebook profile",
    FACEBOOK_GET_PICTURE_FAIL: "Failed to retrieve facebook profile picture",
  },
  alert: {
    pleaseAnswer: 'Please answer the question',
  },
  progressBar: {
    stepToGo: '${remainStep} steps to go...'
  },
  giveComment: {
    title: 'Comments',
    text: {
      punctualityRating: 'Punctuality',
      environmentRating: 'Environment',
      attitudeRating: 'Attitude',
      professionRating: 'Profession',
      comment: 'Comment',
      placeholder: 'Click here to give comments'
    }
  },
  uploadPhoto: {
    title: 'Upload photos',
    deletePhotoSentence: 'Are you sure want to delete?',
    cannotAddmoreThanFour: 'You can upload at most four photos',
    text: {
      selectPhotoFrom: 'Select photo from',
      takePhoto: 'Take Photo',
      selectFromCameraRoll: 'Select from camera roll',
    },
  },
  tutionFee: {
    title: 'Tution Fee',
    text: {
      perLesson: 'Per lesson',
      perSemester: 'Per semester',
      price: 'Tution Fee'
    },
  },
  contact: {
    title: 'Contact information',
    text: {
      contactNumber: 'Contact number',
      notification1: 'P.S. Your contact infromation will',
      notification2: ' ONLY ',
      notification3: 'display to your stduent'
    },
  },
  newsfeed: {
    title: 'NewsFeed', 
    text:{
      perSemester: 'semester',
      perLesson: 'lesson',
      search: 'Search',
      comment: 'Review',
      showMoreClasses: 'Show more classes...',
    }
  },
  advancedSearch: {
    title: 'Advanced search',
    text: {
      category: 'Categories',
      classCategory: 'Class Category',
      skillCategory: 'Skill Category',
      selectChargeType: '-- Please select charge type --',
      tutionFee: 'Tution fee',
      below: 'Below',
      any: 'Any',
      lowToHigh: 'From Low to High',
      highToLow: 'From High to Low',
      classTime: 'Class time',
      perSemester: 'Per semester',
      perLesson: 'Per lesson'
    },
  },
  searchClass: {
    title: 'search',
    advanced: 'Advanced',
    districtSearch: 'Search district...',
    classSearch: 'Search Class name, Category or Skill...',
  },
  searchResult: {
    title: 'All Results',
    label: {
      noResult: 'No Results Found',
      selectSortingType: '-- Please select sorting type --',
      ascfee: 'Tution Fee from low to high',
      desfee: 'Tution Fee from high to low',
      asctotalRatings: 'Rating from  low to high',
      destotalRatings: 'Rating from  high to low',
      asctotalComments: 'Comments from less to more',
      destotalComments: 'Comments from more to less',
    },
    placeholder: {
      typeHere: 'Type Here ...',
      currentLocation: 'Current Location',
    },
  },
  profileSetting: {
    title: 'Profile setting',
    text: {
      editIcon: 'Click to edit icon',
      name: 'Name',
      website: 'Website',
      email: 'Email',
      myCity: 'My city',
      introduction: 'Introduction',
      changePw: 'Change password',
      phone: 'Mobile',
    },
  },
  changePw: {
    title: 'Change password',
    text: {
      currentPw: 'Current password',
      newPw: 'New password',
      confirmPw: 'Confirm password',
    },
  },
  history: {
    title: 'History',
    favourite: 'Favourite',
    history: 'History',
  },
  search: {
    title: 'Search',
  },
  schedule: {
    title: 'Schedule',
  },
  profile: {
    title: 'Profile',
    text: {
      login: 'Login',
      signUpOrLogin: 'Sign Up or login',
      signUp:'Sign up',
      comments: 'Comments',
      notifications: 'Notifications',
      applyToBeTutor: 'Apply to be Tutor',
      settings: 'Settings',
      switchMode: {
        learner: 'Switch to tutor mode',
        tutor: 'Switch to learner mode',
      },
      viewClasses: {
        learner: 'View all applied classes',
        tutor: 'View all created classes'
      },
      createTutor: 'Create tutor',
      manageTutor: 'Manage tutor',
    },
  },
  signin:{
    title: 'Welcome back',
    text:{
      signIn:{
        label:'Sign in with Email'
      },
      signUp:{
        label:'Sign up'
      },
      next:{
        label:'Next'
      }
    },
    textInput: {
      email: {
        label: 'Email',
        placeholder: 'Email',
      },
      password: {
        label: 'Password',
        placeholder: 'Password'
      },
    },
  },
  login: {
    title: 'Welcome back',
    textInput: {
      username: {
        label: 'Username:',
        placeholder: 'Username',
      },
      password: {
        label: 'Password',
        placeholder: 'Password'
      },
    },
    text:{
      signIn:{
        label: 'Sign in',
      },
      register:{
        label: 'Register'
      },
    }
  },
  signUp:{
    title: {
      tutor: 'Register as Tutor',
      learner: 'Register as Learner',
      selfIntro: 'Other',
      profession: 'Profession',
      experience: 'Years of experience',
      achievement: 'Achievement',
    },
    textInput:{
      skill: {
        label:'Skills',
        placeholder:'Skills'
      },
      email:{
        label:'Email',
        placeholder:'Email',
      },
      password:{
        label:'Password',
        placeholder:'Password',
      },
      username:{
        label:'Username',
        placeholder:'Username'
      },
      lastName:{
        label:'Lastname',
        placeholder:'Last Name',
      },
      firstName:{
        label:'Firstname',
        placeholder:'First Name',
      },
      countryCode:{
        label:'Country Code',
        placeholder:'Country Code',
      },
      phoneNumber:{
        label:'Phone Number',
        placeholder:'Phone Number',
      },
    },
    text:{
      verifyCodePlaceholder: {
        label:'Verify Code'
      },
      verifyCode: {
        label: 'Please insert the verify code from your Email:'
      },
      upload: {
        label:'+ Supporting document'
      },
      chooseUserType:{
        label:'What kind of users are you want to become...'
      },
      selfIntro:{
        label:'Tell us more...\n(Optional)'
      },
      profession:{
        label:'What is your profession?'
      },
      experience: {
        label:'Years of experience'
      },
      achievement: {
        label:'Tell us about your greatest achievement...'
      },
      company: {
        label: 'company'
      },
      tutor: {
        label:'tutor'
      },
      learner: {
        label:'Learner'
      },
      signUp:{
        label:'Sign up',
      },
      agreement:{
        label:'透過註冊，表示你已經同意A+的服務條款及私隱政策。',
      },
    },
  },
  forgotPassword:{
    title:'ForgotPassword',
    text:{
      forgotPassword: 'Forgot password?',
      forgotPasswordEmail:'Please insert your email to reset password.',
      confirm:{
        label:'Confirm'
      }
    },
    textInput:{
      email:{
        placeholder: 'Email'
      }
    }
  },
  classDetail:{
    title: 'Class detail',
    text:{
      punctualityRating: 'Punctuality',
      environmentRating: 'Environment',
      attitudeRating: 'Attitude',
      professionRating: 'Profession',
      classDescription: 'Class Description',
      rating: 'Rating: ',
      applied: {
        label: 'Applied'
      },
      applyNow: {
        label: 'APPLY NOW'
      },
      giveComment: {
        label: 'Give comment'
      },
      tutor: 'Tutor',
      comment: 'Comments',
      allStudent: 'All student',
      viewAllStudent: 'View all student',
      verifiedBy: 'Official verified',
    }
  },
  tutorInfo: {
    text: {
      introduction: 'Introduction',
      achievement: 'Achievement',
      experience: 'Experience (Years)',
      profession: 'Profession',
      mainCourse: 'Main course',
    }
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    version: 'Version',
    changePw: 'Change password',
    
  },
  language: {
    title: 'language',
    message: {
      changeLanguage: 'You have successfully change the language'
    }
  },
  classList: {
    title: 'Your Classes',
    createClasses: 'Create your own classes',
    duplicateClass: 'Are you sure duplicate this class?',
    deleteClass: 'Are you sure delete this class?',
  },
  category: {
    title: 'Category',
    types: {
      education: 'Education',
      music: 'Music',
      sports: 'Sports',
      beauty: 'Beauty',
      designAndDevelopment: 'Design and Development',
      petTraining: 'Pet training',
      carDriving: 'Car driving',
      interestClasses: 'Interest class',
      personal: 'Peronal',
      photography: 'Photography',
      recover: 'Recover',
      talent: 'Talent',
      stem: 'STEM',
    },
  },
  repeat: {
    title: 'Repeat',
    label: {
      until: 'Until',
      everyDay: 'Every Day',
      everyWeek: 'Every Week',
      everyTwoWeek: 'Every Two Weeks',
      everyMonth: 'Every Month',
      neverRepeat: 'Never Repeat',
    }
  },
  skill: {
    title: 'Talent',
    types: {
      education: {
        cantonese: 'Cantonese',
        english: 'English',
        mandarin: 'Mandarin'
      },
      music: {
        guitar: 'Guitar',
        piano: 'Piano',
        saxophone: 'Saxophone',
      },
      sports: {
        badminton: 'Badminton',
        football: 'Football',
        swimming: 'Swimming',
        dartsTraining: 'Darts Training'
      },
      beauty: {
        nail: 'Nail care',
        tattoo: 'Tattoo services',
      },
      designAndDevelopment: {
        graphic: 'Graphic design',
        web: 'Web development',
        mobile: 'Mobile app development',
        game: 'Games development',
      },
      petTraining: {
        cat: 'Cat training',
        dog: 'Dog training'
      },
      carDriving: {
        carDriving: 'Car driving',
      },
      interestClasses: {
        dancing: 'Dancing',
        audioVisualLessons: 'Audio visual lessons',
        kidsAndToddlers: 'Kids and Toddlers'
      },
      personal: {
        personalFinance: 'Personal finance',
        emergencyAndSurvival: 'Emergency and Survival',
        fortuneTelling: 'Fortune telling',
      },
      photography: {
        videoEditors: 'Video editors',
        photoshopEditing: 'Photoshop editing',
      },
      recover: {
        recovery: 'Recovery',
        massageAndAcupressure: 'Massage and Acupressure',
      },
      talent: {
        leadershipAndManagement: 'Leadership and Management',
        professionalSKills: 'Professinal skills',
      },
      stem: {
        science: 'Science',
        technology: 'Technology',
        engineering: 'Engineering',
        mathematics: 'Mathematics',
      }
    },
  },
  calendar: {
    title: 'Select Class Schedule',
  },
  assignTutor: {
    title: 'Assign Tutor',
  },
  classAddress: {
    title: 'Class address',
    label: {
      onSite: 'On site'
    }
  },
  classSummary: {
    title: 'Verify',
    label: {
      title: 'Title',
      description: 'Details',
      category: 'Category',
      skill: 'Skill',
      time: 'Time',
      address: 'Address',
      contact: 'Contact',
      fee: 'Fee',
      perSemester: '/ semester',
      perLesson: '/ lesson',
      alertMsg: 'This field cannot be EDITED because the class already have student!',
      deleteMsg: 'This class cannot be DELETED because the class already have student!'
    },
  },
  classDescription: {
    title: 'Class Description',
    question: {
      titleMsg: "What's the title of this course?",
      descriptionMsg: 'How do you discribe this course? (optional)',
    },
  },
  classType: {
    title: 'Class Type',
    question: {
      typeMsg: 'Please choose the class type',
    }
  },
  icon: {
    beauty: 'Beauty',
    carDriving: 'Car Driving',
    designAndDevelopment: 'Design & Development',
    education: 'Education',
    interestClass: 'Interest Classes',
    music: 'Music',
    personal: 'Personal',
    petTraining: 'Pet Training',
    photography: 'Photography',
    recover: 'Recover',
    sport: 'Sport',
    talent: 'Talent',
    stem: 'STEM',
  },
  appliedClassNoti: {
    text: {
      successMsg: 'You have joined the class successfully!',
      thanksMsg: 'Thank you for using MyTutor!',
      viewMyRecord: 'View my record',
      continueFindClass: 'Continue find class',
    },
  },
  appliedClassList: {
    title: 'Applied Classes',
    exploreClasses: 'Explore Classes',
  },
  payment: {
    text: {
      paymentMethod: 'Please select payment method'
    },
  },
  createTutor: {
    title: 'Create Tutor',
    editTutor: 'Edit Tutor',
    text: {
      tutorName: 'Tutor name',
      email: 'Email',
      phone: 'Contact',
      introduction: 'Introduction',
      website: 'Website',
    },
  },
  verifyCode: {
    title: 'Verify Email',
    label: 'Please insert the verify code from your Email:',
    resend: 'Resend',
    delayResend: 'Resend in ${delay} s',
  },
  manageTutor: {
    title: 'Manage Tutor',
    text: {
      addATutor: 'Add a tutor',
      deleteTutor: 'Delete tutor'
    }
  }
}
