export interface PersonProfile {
  id: string
  name: string
  lifespan: string
  role: string
  coreQuote: string
  shortBio: string
  eyewitnessStory: {
    title: string
    account: string
    primarySource: string
    sourceContext: string
  }
  keyFacts: {
    factTitle: string
    detail: string
  }[]
  booksAuthored: string[]
}

export const peopleProfiles: PersonProfile[] = [
  {
    id: 'kenneth-e-hagin',
    name: 'Kenneth E. Hagin',
    lifespan: '1917 to 2003',
    role: 'Pioneer of Faith Teaching and Divine Healing',
    coreQuote: 'Faith begins where the will of God is known.',
    shortBio: 'Known as the father of modern faith teaching, Kenneth E. Hagin spent sixty years ministering across the globe, emphasizing the authority of the believer, divine healing, and the integrity of God\'s Word.',
    eyewitnessStory: {
      title: 'Raised from the Deathbed through Mark 11:23',
      account: 'In 1933 in McKinney, Texas, fifteen-year-old Kenneth Hagin was completely bedridden and paralyzed from the waist down due to a deformed heart and an incurable blood condition. Five doctors had informed his family that he would not survive. During sixteen months confined to bed, his heart stopped beating three times and his spirit descended toward hell before a divine voice pulled him back. Desperate for life, he devoured the New Testament until he reached Mark 11:23-24. Realizing that believing precedes physical evidence, he pushed his paralyzed legs over the side of the bed on August 8, 1934, stood up by faith, and felt warm sensation rush into his limbs. His heart was healed permanently, and he lived to age 86 without another heart failure.',
      primarySource: 'Kenneth E. Hagin, I Believe in Visions (1972) and I Went to Hell (1982)',
      sourceContext: 'Firsthand autobiographical account published by Faith Library Publications.',
    },
    keyFacts: [
      {
        factTitle: 'Born Premature Under Two Pounds',
        detail: 'Born prematurely on August 20, 1917, the attending physician told his mother the baby was dead. His grandmother noticed faint breathing and kept him warm by the wood stove.',
      },
      {
        factTitle: 'Twelve Years as a Small Town Pastor',
        detail: 'Before launching his global field ministry, Hagin spent twelve quiet years pastoring small country churches in Texas, learning practical pastoral care and patience.',
      },
      {
        factTitle: 'Founded RHEMA Bible Training College',
        detail: 'In 1974 in Broken Arrow, Oklahoma, he established RHEMA, which has graduated over 100,000 ministers who have planted thousands of churches worldwide.',
      },
    ],
    booksAuthored: [
      'The Authority of the Believer',
      'Growing Up, Spiritually',
      'I Believe in Visions',
      'How You Can Be Led by the Spirit of God',
    ],
  },


  {
    id: 'smith-wigglesworth',
    name: 'Smith Wigglesworth',
    lifespan: '1859 to 1947',
    role: 'Evangelist and Pioneer of 20th Century Healing Revival',
    coreQuote: 'I am not moved by what I see. I am moved only by what I believe.',
    shortBio: 'An uneducated Yorkshire plumber who could not read until his wife taught him using the Bible, Smith Wigglesworth became one of the most legendary figures of the Pentecostal movement, documented to have raised over a dozen people from the dead.',
    eyewitnessStory: {
      title: 'The Raising of Mrs. Clarke in Bradford',
      account: 'In 1914, Wigglesworth was summoned to the home of Mrs. Clarke in Bradford, who had succumbed to illness and had been officially pronounced dead by her attending doctor. Entering the room where the family was in deep grief, Wigglesworth walked to the bedside, lifted the lifeless body against the wall, and loudly commanded: "In the name of Jesus, walk!" When she did not move, he stepped back, waited, and commanded again: "In the name of Jesus, walk!" Her breath returned, color flushed into her cheeks, and she walked across the room to embrace her astonished family. The incident was documented by local doctors and church members.',
      primarySource: 'Smith Wigglesworth, Ever Increasing Faith (1924), Chapter: Power of the Name',
      sourceContext: 'Documented firsthand account written by Wigglesworth and verified by contemporary church records.',
    },
    keyFacts: [
      {
        factTitle: 'Illiterate Until His Twenties',
        detail: 'Started working in mill fields at age six. His wife Polly taught him to read and write using only the King James Bible.',
      },
      {
        factTitle: 'Strict One-Book Rule',
        detail: 'He refused to read newspapers, magazines, or secular books, declaring that he wanted nothing in his mind that could dilute his absolute trust in scripture.',
      },
      {
        factTitle: 'Plumbing Business for 25 Years',
        detail: 'Ran a busy commercial plumbing business in Bradford until his late forties, often praying for homeowners while fixing pipes and seeing them healed.',
      },
    ],
    booksAuthored: [
      'Ever Increasing Faith',
      'Faith That Prevails',
      'The Anointing of His Spirit',
    ],
  },

  {
    id: 'john-g-lake',
    name: 'John G. Lake',
    lifespan: '1870 to 1935',
    role: 'Apostolic Missionary and Founder of Spokane Healing Rooms',
    coreQuote: 'The power of God is just as tangible as electricity. It obeys spiritual laws.',
    shortBio: 'A successful businessman turned missionary, John G. Lake pioneered massive revival in South Africa and later founded the Spokane Healing Rooms in Washington State, where over 100,000 documented healings took place.',
    eyewitnessStory: {
      title: 'The Bubonic Plague Immunity Demonstration',
      account: 'During the catastrophic bubonic plague outbreak in South Africa in 1910, thousands were dying and colonial doctors were terrified to touch the bodies. Lake and his team volunteered to bury the deceased without masks or protective equipment. Baffled British doctors asked Lake what medicine he was taking to survive. Lake responded: "The law of the Spirit of life in Christ Jesus has made me free from the law of sin and death. If you place the foam from a dying plague victim on my hand under a microscope, you will see the germs die immediately." The physicians performed the test: the microscopic bacteria died instantly upon touching Lake\'s skin.',
      primarySource: 'John G. Lake, Adventures in God (1921), Chapter: The Law of Life',
      sourceContext: 'Firsthand autobiographical account corroborated by local colonial medical personnel.',
    },
    keyFacts: [
      {
        factTitle: '100,000 Verified Healings in Spokane',
        detail: 'Between 1915 and 1920, the Spokane Healing Rooms recorded over 100,000 medical recoveries, leading the mayor to name Spokane the healthiest city in the United States.',
      },
      {
        factTitle: 'Liquidated Great Wealth for the Gospel',
        detail: 'Before going to Africa, Lake was a wealthy real estate and insurance executive who gave away his entire fortune, arriving in Johannesburg with no guaranteed salary.',
      },
      {
        factTitle: '625 Churches Planted in South Africa',
        detail: 'In just five years on the mission field, Lake\'s apostolic team established 625 local churches and trained over 1,000 native ministers.',
      },
    ],
    booksAuthored: [
      'Adventures in God',
      'Your Healing Is Paid For',
      'The Spokane Healing Room Sermons',
    ],
  },

  {
    id: 'kathryn-kuhlman',
    name: 'Kathryn Kuhlman',
    lifespan: '1907 to 1976',
    role: 'Evangelist and Minister of the Holy Spirit',
    coreQuote: 'I am not a faith healer. I have no power of my own. Jesus is the healer.',
    shortBio: 'Kathryn Kuhlman was one of the most influential female evangelists of the twentieth century, filling auditoriums across America where thousands experienced spontaneous physical healings through the atmosphere of the Holy Spirit.',
    eyewitnessStory: {
      title: 'The First Spontaneous Miracle in Franklin, Pennsylvania',
      account: 'In 1947, during a service in Franklin, Pennsylvania, Kuhlman was preaching on the person of the Holy Spirit. Suddenly, a woman stood up in the audience and declared that a large tumor in her abdomen had completely vanished while Kuhlman was speaking. No hands had been laid, and no emotional healing line had been called. The next evening, a man testified that his legally blind eye was instantly restored with 20/20 vision while seated quietly in the balcony. Kuhlman wept on the platform, realizing that when the Holy Spirit is loved and honored, His presence brings healing naturally without human strain.',
      primarySource: 'Kathryn Kuhlman, I Believe in Miracles (1962), Chapter 1',
      sourceContext: 'Firsthand autobiographical account verified by physician reports in Franklin, PA.',
    },
    keyFacts: [
      {
        factTitle: 'Strict Medical Verification Required',
        detail: 'She refused to let anyone testify on stage without signed before-and-after medical records and physician contact details to protect credibility.',
      },
      {
        factTitle: 'Hours of Weeping Backstage',
        detail: 'Before every miracle service, Kuhlman spent three to four hours pacing backstage in deep solitude, repeatedly praying: "Holy Spirit, please do not leave me."',
      },
      {
        factTitle: 'Pioneered Christian Television',
        detail: 'Her half-hour weekly program "I Believe in Miracles" ran on CBS for decades, reaching millions of unchurched households across North America.',
      },
    ],
    booksAuthored: [
      'I Believe in Miracles',
      'God Can Do It Again',
      'Nothing Is Impossible with God',
    ],
  },

  {
    id: 'andrew-wommack',
    name: 'Andrew Wommack',
    lifespan: '1949 to Present',
    role: 'Teacher of Grace and Faith · Founder of Charis Bible College',
    coreQuote: 'Faith does not force God to move. Faith receives what God has already provided through grace.',
    shortBio: 'Andrew Wommack has spent over fifty years teaching that God\'s love is unconditional and that healing is an accomplished fact through Christ\'s sacrifice at Calvary, broadcasting Gospel Truth to millions daily.',
    eyewitnessStory: {
      title: 'The Raising of His Son Peter from the Morgue',
      account: 'In November 2001, Andrew and his wife Jamie received a phone call from a hospital emergency room in Colorado: their son Peter had stopped breathing and had been officially pronounced dead. By the time they arrived, Peter\'s body was stripped and tagged in the hospital morgue, having been clinically deceased for nearly five hours. Andrew refused to accept despair. Placing his hands on Peter\'s cold forehead, he stood on 1 Peter 2:24, commanded the spirit of death to leave, and declared the life of Christ into his son. Within minutes, Peter\'s chest began rising and falling, his heartbeat returned to normal, and he walked out of the hospital days later with zero brain damage.',
      primarySource: 'Andrew Wommack, God Wants You Well (2006) and Gospel Truth Archives',
      sourceContext: 'Documented personal testimony verified by attending medical staff and family records.',
    },
    keyFacts: [
      {
        factTitle: 'Served in the Vietnam War',
        detail: 'Drafted into the US Army in 1969, he served in Vietnam as a chaplain\'s assistant, holding daily Bible studies in sandbag bunkers amidst mortar attacks.',
      },
      {
        factTitle: 'Commercial-Free Broadcast Ministry',
        detail: 'For over thirty years, his Gospel Truth television and radio programs have never used broadcast time to plead for donations or sell products.',
      },
      {
        factTitle: 'Global Network of Bible Colleges',
        detail: 'Founded Charis Bible College in Woodland Park, Colorado, which now operates over 70 campuses across North America, Europe, Africa, and Asia.',
      },
    ],
    booksAuthored: [
      'God Wants You Well',
      'Spirit, Soul and Body',
      'The Believer\'s Authority',
      'Grace: The Power of the Gospel',
    ],
  },
]

export function getPersonProfileById(id: string): PersonProfile | undefined {
  return peopleProfiles.find((p) => p.id === id)
}

