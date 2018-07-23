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
    goToShop: 'Go to Shop',
    reset: 'Reset',
    tutor: 'Tutor',
    class: 'Class',
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
    stepToGo: "remainStep + ' steps to go...'"
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
  maxNumberOfStudent: {
    title: 'Number of student',
    text: {
      maxNum: 'Max.: ',
      ppl: 'ppl',
    }
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
      introduction: 'Other',
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
      balance: 'Balance',
      checkCoins: {
        learner: 'My coins',
        tutor: 'My coins'
      },
    },
  },
  balance:{
    title: 'Balance',
    pending: 'Pending: ',
    withdraw: 'Withdraw money',
  },
  withdraw:{
    title: 'Withdraw',
    text: {
      bankAccountName: 'Full name: ',
      bankName: 'Bank: ',
      bankAccount: 'Bank account: ',
      amount: 'Amount($): ',
      confirm: 'Confirm',
      cancel: 'Cancel',
    }
  },
  withdrawRecord:{
    title: 'Record',
    text:{
      processing: 'Processing',
      approved: 'Approved',
      rejected: 'Rejected',
      bankAccountName: 'Name: ',
      bankName: 'Bank: ',
      bankAccount: 'Bank account: ',
    }
  },
  signin:{
    title: 'Welcome back',
    text:{
      signIn:{
        label:'Sign in'
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
        label: 'Username',
        placeholder: 'Username',
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
      displayName: 'Organization Name',
      introduction: 'Introduction',
      logo: 'Logo',
      slogan: 'Slogan',
      banner: 'Banner',
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
        label: 'Company'
      },
      tutor: {
        label:'Tutor'
      },
      learner: {
        label:'Learner'
      },
      signUp: {
        label:'Sign up',
      },
      displayName: {
        label: 'Organization Name',
      },
      introduction: {
        label: 'Give us a brief introduction about your organization',
      },
      logo: {
        label: 'Please upload the logo of your organization',
      },
      slogan: {
        label: "What's the slogan of your organization",
      },
      banner: {
        label: 'Please upload the banner of your organization',
      },
      agreement:{
        label1:'By Signing up you agree to our ',
        label2: 'Terms & Conditions and Privacy Policy'
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
      organization: 'Organization',
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
    title: 'Language',
    message: {
      changeLanguage: 'You have successfully change the language'
    }
  },
  classList: {
    title: 'Your Classes',
    createClasses: 'Create your own classes',
    duplicateClass: 'Are you sure duplicate this class?',
    deleteClass: 'Are you sure delete this class?',
    tutorCreateClassMessage: 'Are you sure to create a class? It will cost 30 coins',
    companyCreateClassMessage: 'Are you sure to create a class?',
    tutorCreateClassNotEnoughCoinsMessage: 'You do not have enough coins',
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
      maxStudent: 'Max.',
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
      selfIntro: 'Other',
      profession: 'Profession',
      experience: 'Experience (Years)',
      achievement: 'Achievement',
      website: 'Website',
    },
  },
  verifyCode: {
    title: 'Verify Email',
    label: 'Please insert the verify code from your Email:',
    resend: 'Resend',
    delayResend: "'Resend in ' + delay + ' s'",
  },
  manageTutor: {
    title: 'Manage Tutor',
    text: {
      addATutor: 'Add a tutor',
      deleteTutor: 'Delete tutor'
    }
  },
  coin: {
    title: 'Coins', 
    text: {
      purchasedCoinRemain: 'Remain coins',
      freeCoinRemain: 'Free coins',
      purchase: 'Purchase',
      purchasedHistory: 'Coins record',
      time: 'Time',
      content: 'Content',
      coins: 'Coins',
      action: 'Action',
    },
  },
  terms: {
    title: 'Terms and Conditions',
    body: 
  `TERMS AND CONDITIONS FOR APLUS
  
This agreement ('this Agreement') applies as between you, the user of the 'APlus' (the 'Application') and Genkon Technology Limited ('Genkon Tech', 'we', 'our' or 'us'), the owner of this Application. Your agreement to comply with and be bound by these terms and conditions is deemed to occur upon your installing, copying or otherwise using the Application and/or by clicking the 'DOWNLOAD' button of the Application for downloading the Application to your mobile device. If you do not agree to be bound by these Terms and Conditions, you should not download the Application and/or please terminate this Agreement immediately by removing the Application from your mobile device.

PART I (GENERAL TERMS AND CONDITIONS)

1.  DEFINITIONS
In this Agreement, meaning of certain terms shall be as follows:-
(a) 'Content' means text, graphic images, logos, icons, sound clips, video clips, data compilations, page layout, underlying code (including object and source codes), software and any other materials.
(b) 'Member' means a person who has completed the membership registration procedure of the Program within the Application.
(c) 'Program' means the APlus membership program which includes Basic Membership and Tutor Membership.
(d) 'Tutor' means a person that providing tuition services in the areas advertised by the Tutor on the Application.
(e) 'Tutor Seeker' means a person that seeking tuition services through the Application.
(f) 'User' means a person that using the Application whether or not he has registered as a Member.

2.  GRANT OF LICENCE
(a) Genkon Tech hereby grants to you a personal, limited, non-exclusive, non-transferable, revocable licence to use a single copy of the Application on a single mobile device primarily used by you. This Agreement is effective until terminated. You may terminate this Agreement at any time by uninstalling the Application and destroying all copies of the Application in your possession.
(b) Upon any termination, you agree to immediately uninstall the Application and destroy all copies of the Application, any accompanying documentation, and all other associated materials. Genkon Tech reserves the right to terminate this Agreement at any time if you are in breach of any of the terms of this Agreement.
(c) Genkon Tech may, at any time and without giving notice to you, make changes, corrections and/or improvements to the Application, stop providing the Application or features of the Application to you or to users generally, or create usage limits for the Application.

3.  OWNERSHIP OF THE APPLICATION
While Genkon Tech provides the Application to anyone, we retain all right, title and interest (including copyright) on all Content in and to the Application. Any act of 'mirroring' the Application or the materials contained therein on your device and/or server without the prior written permission of Genkon Tech, or modifying or re-using the text or graphics on the Application is prohibited. Genkon Tech reserves all rights not expressly granted under this Agreement.
You may use the Application for personal purposes only, which includes recreational use, social use and use in education as a student or teacher. Specifically you agree that you will not:
(a) use the Content of the Application for commercial purposes (other than posting advertisements by Tutors); and/or
(b) systematically copy the Content from the Application with a view to creating or compiling any form of comprehensive collection, compilation, directory or database unless given express written permission to do so by Genkon Tech.

4.  LINKS FROM THE APPLICATION
The Application may contain links to other sites and resources provided by third parties. These links are provided for your information and/or easy access only. We have no control over the contents of those sites or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. The inclusion of a link to another site from the Application does not imply any endorsement of the sites or resources themselves or of those in control of them.

5.  DISCLAIMERS
(a) The Application is provided by us on an 'as is' and 'as available' basis. Neither Genkon Tech nor Our Affiliates make any representations or warranties of any kind, express or implied, as to the operation of the Application or the accuracy, adequacy and completeness of the Content or products included on the Application, regardless such Content is provided by Genkon Tech, Members (including but no limited to Tutors) or any other third parties. To the full extent permissible by applicable law, we and Our Affiliates disclaim all warranties, express or implied thereof. Genkon Tech accepts no liability for any disruption or non-availability of the Application resulting from external causes including, but not limited to, ISP equipment failure, push server failure, host equipment failure, communications network failure, power failure, natural events, acts of war or legal restrictions and censorship. No part of this Application is intended to constitute advice and the Content of this Application should not be relied upon when making any decisions or taking any action of any kind.
(b) Genkon Tech does not warrant that the functions contained in the Application will be uninterrupted or free of defects and/or faults, that defects will be corrected, or that the Application or the server that makes it available is free of viruses or other harmful components.

6.  LIMITATION OF LIABILITY
(a) To the maximum extent permitted by law, Genkon Tech accepts no liability for any direct or indirect loss or damage, foreseeable or otherwise, including any indirect, consequential, special or exemplary damages arising from the use of the Application or any information contained therein. You should be aware that you use the Application and its Content at your own risk.
(b) Genkon Tech is not responsible for the conduct, whether online or offline, of any User. You hereby expressly agree not to hold Genkon Tech liable for any instruction, advice or services delivered which originated through the Application. Genkon Tech and Our Affiliates expressly disclaims any liability whatsoever for any damage, suits, claims, and/or controversies that have arisen or may arise, whether known or unknown therefrom.

7.  INDEMNITY
You hereby agree to indemnify us and/or Our Affiliates against all liabilities, claims and expenses that may arise from any breach of these Terms and Conditions or through use of the Application.

8.  MISCELLANEOUS
(a) Waiver - The failure of Genkon Tech to exercise or enforce any right or provision of this Agreement will not constitute a waiver of such right or provision. Any waiver of any provision of this Agreement will be effective only if in writing and signed by Genkon Tech.
(b) Variation - Genkon Tech may revise this Agreement at any time by amending them. Some of the provisions contained in these Terms and Conditions may also be superseded by provisions or notices published elsewhere in the Application. Genkon Tech will use reasonable efforts to ensure that any important changes will be notified to you by an appropriate method. However, it is your responsibility to check the terms and conditions regularly to take notice of any changes we make, and you agree to do so. Your continued use of the Application after any changes to the terms and conditions will constitute your acceptance of such change. If you do not agree with any changes or additions we make, please refrain from using the Application.
(c) Severability - If any provision of this Agreement shall be unlawful, void, or for any reason unenforceable under any enactment or rule of law, then that provision will be deemed severable from this Agreement and will not affect the validity and enforceability of any remaining provisions.
(d) Assignment - This Agreement, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by Genkon Tech without restriction.
(e) Entire Agreement - This is the entire agreement between you and Genkon Tech relating to the subject matter herein and will not be modified except in writing, signed by both parties, or by a change to this Agreement by Genkon Tech.
(f) Governing Law and Jurisdiction - This Agreement will be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region of the People's Republic of China ('Hong Kong'). You agree that any action at law or in equity arising out of or relating to this Agreement or Genkon Tech will be filed only in the courts in and for Hong Kong, and you hereby submit to exclusive jurisdiction of the Hong Kong courts.
(g) Language - In the event that there is any inconsistency between the English and Chinese version of this Agreement, the English version shall prevail.

PART II (MEMBERSHIP)

9.  REGISTRATION, SUSPENSION AND TERMINATION OF MEMBERSHIP
(a) To become a Member, you will need to complete the registration procedure in this Application and provide certain personal data. Membership is divided into two tiers. Tutors will be entitled as Tutor Membership; and Tutor Seekers will be entitled as Basic Membership.
(b) The Program is open to individuals aged 18 or above. If you are under 18 years and wish to become a Member, you will need your parent's or legal guardian's consent before completing the registration. By completing the registration, you confirm that you have already obtained your parent's or legal guardian's consent.
(c) We may decline your registration under the circumstances as may be determined by us in our sole discretion.
(d) We reserve the right to suspend or terminate your membership and your access to the Application at any time at our sole discretion without prior notice to you.

10. RELATIONSHIP BETWEEN Genkon Tech, TUTOR SEEKS AND TUTORS
The Application is a platform for enabling the connection between Tutor Seekers and/or individuals Tutors. Genkon Tech does not take part in the interaction nor matching between Tutor Seekers and Tutors. The relationship between Genkon Tech and Tutors are solely governed by these Terms and Conditions and there is no employer and employee relationship between Genkon Tech and individual Tutors.

11. BEHAVIOUR OF TUTORS AND TUTOR SEEKERS
(a) Genkon Tech does not have control over the quality, timing, legality or any other aspect whatsoever of the services actually delivered by the Tutors, nor of the integrity, responsibility or any of the actions whatsoever of the Tutor Seekers.
(b) Genkon Tech makes no representations about the suitability, reliability, timeliness, and accuracy of the services provided by Tutors to Tutor Seekers through the Application whether in public, private or offline interactions.

12. POSTINGS AND MATERIALS ON THE APPLICATION
(a) Genkon Tech reserves the right to withdraw any material on the Application, whether based on information received from Members or others, to be capable of breaching any part of these Terms and Conditions, or to bring us or our Affiliates into disrepute.
(b) Genkon Tech may monitor postings to the Application and communications through the Application and have the right to delete and/or block such postings or communications at our sole discretion.

`,
privacy:
`PART III PERSONAL INFORMATION COLLECTION STATEMENT (‘PICS’)

13. NOTICE RELATING TO THE PERSONAL DATA (PRIVACY) ORDINANCE
(THE 'ORDINANCE')
(a) In order for you to become a Member, it is necessary for you to provide us with your personal information ('Personal Data'). If you are unable or unwilling to provide us with complete and correct Personal Data, we may not be able to provide or continue to provide the services under the Program to you.
(b) We shall keep your Personal Data confidential at all times. Our policies and practices with respect to the collection, use, retention, disclosure, transfer, security and access of Personal Data will be in accordance with the laws of Hong Kong and are as set out in this PICS.
(c) You agree that all the Personal Data provided by you to us and all information relating to the use of the Application may be used and retained by us for:
i.  processing your application for membership;
ii. providing you with the services under the Program;
iii.  carrying out data sorting and analysis to enable us to better understand your characteristics and behaviour and to provide other services better tailored to your needs;
iv. providing you with regular communications from us with details of the Program and its benefits;
v.  the normal management, operation and maintenance of the Program;
vi. designing new or improving existing services provided by us or Our Affiliates;
vii.  investigation of complaints, suspected suspicious transactions and research for service improvement;
viii. prevention or detection of crime;
ix. disclosure as required by law;
x.  aggregated behavioral analysis.
(d) We would also like to use your Personal Data (including but not limited to your name, telephone number and email address and other information you have provided to us in the registration procedure) for direct marketing to you (whether by post, email, phone, SMS, notification via the Application itself or the notification centre of your mobile device or the like) in relation to:
i.  offers and promotions from us and our Affiliates;
ii.  other offers and promotions from the third party merchants that we cooperate with to provide benefits to the Members in relation to the following types of products or services:
• Retail goods or services;
• Financial, insurance, banking and credit cards;
• Transportation, travel and accommodation;
• Sports, leisure, recreation and entertainment;
• Telecommunications products and services
• E-commerce (including trading and payment platforms and online auctions)
Please note that we cannot so use your Personal Data unless we have received your consent.
(e) We may disclose and transfer (whether in Hong Kong or abroad) to our agents or contractors under a duty of confidentiality to us who provide administrative, data processing, research and marketing, distribution, telecommunications, professional or other similar services to us and to any of our actual or proposed assignees or transferees of our rights with respect to you in connection with a merger, sale or transfer (whether of assets or shares), to use, hold, process or retain such Personal Data for the purposes mentioned in (c) and (d) above on our behalf.
(f) You have the right to:
i.  check whether we hold any of your Personal Data;
ii. access your Personal Data held by us;
iii.  require us to correct any Personal Data which is inaccurate;
iv. ascertain our policies and practices (from time to time) in relation to Personal Data and the type of Personal Data held by us;
v.  opt out from receiving direct marketing materials from us at any time.
vi. Any request in relation to the above shall be in writing (sent by email) and addressed to :hello@genkontech.com
(g) In accordance with the Ordinance, we have the right to charge you a reasonable fee for the processing of any Personal Data access request.
(h) Nothing in this clause 13 shall limit your rights under the Ordinance.
  `
  }
}
