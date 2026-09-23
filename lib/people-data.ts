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
    shortBio: 'An uneducated Yorkshire plumber who could not read until his wife taught him using the Bible, Smith Wigglesworth became one of the best-known figures of the Pentecostal movement. Biographical accounts report that he prayed for people who were said to have returned to life.',
    eyewitnessStory: {
      title: 'The Raising of Mrs. Clarke in Bradford',
      account: 'According to the account attributed to Wigglesworth, in 1914 he was summoned to the home of Mrs. Clarke in Bradford after she had succumbed to illness and had been pronounced dead by her attending doctor. The account says that after he prayed, her breath returned and she walked across the room. It was later described as corroborated by local doctors and church members.',
      primarySource: 'Smith Wigglesworth, Ever Increasing Faith (1924), Chapter: Power of the Name',
      sourceContext: 'Firsthand account attributed to Wigglesworth, with reported corroboration in contemporary church records.',
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
    shortBio: 'A successful businessman turned missionary, John G. Lake pioneered revival work in South Africa and later founded the Spokane Healing Rooms in Washington State, where supporters reported many healings.',
    eyewitnessStory: {
      title: 'The Bubonic Plague Immunity Demonstration',
      account: 'During the catastrophic bubonic plague outbreak in South Africa in 1910, thousands were dying and colonial doctors were terrified to touch the bodies. Lake and his team volunteered to bury the deceased without masks or protective equipment. Baffled British doctors asked Lake what medicine he was taking to survive. Lake responded: "The law of the Spirit of life in Christ Jesus has made me free from the law of sin and death. If you place the foam from a dying plague victim on my hand under a microscope, you will see the germs die immediately." The physicians performed the test: the microscopic bacteria died instantly upon touching Lake\'s skin.',
      primarySource: 'John G. Lake, Adventures in God (1921), Chapter: The Law of Life',
      sourceContext: 'Firsthand autobiographical account corroborated by local colonial medical personnel.',
    },
    keyFacts: [
      {
        factTitle: 'Reported Healings in Spokane',
        detail: 'Between 1915 and 1920, supporters of the Spokane Healing Rooms reported more than 100,000 healings. The figure and related civic claims should be read as historical claims from the movement, not as independently verified medical totals.',
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
      sourceContext: 'Firsthand account described in Kuhlman\'s book, with reported physician documentation from Franklin, Pennsylvania.',
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
      account: 'According to Andrew Wommack\'s account, in November 2001 he and his wife Jamie received a call from a Colorado hospital saying their son Peter had stopped breathing and had been pronounced dead. Wommack wrote that after prayer, Peter\'s breathing and heartbeat returned, and that he left the hospital days later without brain damage.',
      primarySource: 'Andrew Wommack, God Wants You Well (2006) and Gospel Truth Archives',
      sourceContext: 'Personal testimony attributed to Wommack, with medical and family records cited by the ministry.',
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

  // ─── BACKBONE ROSTER ──────────────────────────────────────────────────────

  {
    id: 'derek-prince',
    name: 'Derek Prince',
    lifespan: '1915 to 2003',
    role: 'Bible Teacher, Theologian, and Pioneer of Deliverance Ministry',
    coreQuote: 'The new birth is not the end of the journey. It is the beginning.',
    shortBio: 'A Cambridge-educated philosopher who encountered God while serving as a British Army medic in World War II, Derek Prince became one of the most rigorous and widely trusted Bible teachers of the 20th century, with a legacy spanning over 100 books and teaching that has reached every continent.',
    eyewitnessStory: {
      title: 'His Own Encounter with God in an Army Barrack Room',
      account: 'In 1941, Derek Prince was stationed as a British Army medic in a barrack room in Scarborough, England. A confirmed agnostic trained at Eton and Cambridge, he had brought with him a Bible as a philosophical text. One night, alone in the room, while reading through the New Testament as an academic exercise, he encountered what he later described as a personal, undeniable visitation. He did not seek it. He was not at a church service or a revival meeting. He simply found himself prostrate on the floor, weeping, with a certainty he could not explain rationally, that the Jesus of the New Testament was real and present. He rose from that encounter a converted man. He said for the rest of his life that no argument had persuaded him. Something had simply happened.',
      primarySource: 'Derek Prince, How I Came to Know God (audio series) and Shaping History Through Prayer and Fasting (1973)',
      sourceContext: 'Firsthand autobiographical account consistent across multiple published testimonies and interviews.',
    },
    keyFacts: [
      {
        factTitle: 'Double First at Cambridge',
        detail: 'Prince earned a double first in Classics at Cambridge and was elected a Fellow of King\'s College before his conversion, giving his subsequent Bible teaching an unusual depth of linguistic and philosophical rigour.',
      },
      {
        factTitle: 'Father to Eight Adopted Daughters',
        detail: 'He and his first wife Lydia adopted eight daughters of various nationalities in Israel and Kenya, a decision he described as one of the most formative experiences of his faith.',
      },
      {
        factTitle: 'Over 100 Books and 4,000 Recorded Messages',
        detail: 'His teaching archive spans over 4,000 recorded messages distributed across more than 100 countries in over 60 languages, making him one of the most widely distributed Bible teachers in history.',
      },
    ],
    booksAuthored: [
      'Shaping History Through Prayer and Fasting',
      'They Shall Expel Demons',
      'Blessing or Curse: You Can Choose',
      'Spiritual Warfare',
      'The Spirit-Filled Believer\'s Handbook',
    ],
  },

  {
    id: 'myles-munroe',
    name: 'Myles Munroe',
    lifespan: '1954 to 2014',
    role: 'Kingdom Theologian, Leadership Teacher, and Bestselling Author',
    coreQuote: 'The wealthiest places in the world are not gold mines or oil fields or farmlands. They are cemeteries, because there lie buried inventions, books, songs, and solutions that were never released.',
    shortBio: 'Born in poverty in the Bahamas, Myles Munroe became one of the most influential kingdom theology teachers in the world, reframing the gospel around purpose, identity, and the restoration of God\'s original mandate for humanity, with particular resonance across Africa and the global diaspora.',
    eyewitnessStory: {
      title: 'From a Nassau Ghetto to the United Nations Podium',
      account: 'Myles Munroe grew up in one of the poorest communities in Nassau, Bahamas, one of eleven children in a household with limited resources and no expectation of global influence. Through a personal encounter with Christ as a teenager and a conviction that the gospel was about far more than heaven after death, he began developing what would become kingdom theology: the idea that God\'s original mandate was for human beings to govern the earth under His authority, and that the fall had not cancelled that mandate but the cross had restored it. He eventually addressed the United Nations, the European Parliament, and leaders of over 120 nations, arguing that the greatest threat to any country is not poverty or war but the death of potential in its citizens.',
      primarySource: 'Myles Munroe, Rediscovering the Kingdom (2004) and The Purpose and Power of God\'s Glory (2003)',
      sourceContext: 'Drawn from published biographical material and consistent across multiple documented public addresses.',
    },
    keyFacts: [
      {
        factTitle: 'Addressed Leaders in Over 120 Nations',
        detail: 'Munroe was in consistent demand as a leadership consultant and speaker before heads of state, government bodies, and international organisations, applying kingdom principles to national development.',
      },
      {
        factTitle: 'Founded Bahamas Faith Ministries International',
        detail: 'He built one of the Caribbean\'s most influential ministry organisations and trained thousands of leaders through the International Leadership Training Institute.',
      },
      {
        factTitle: 'Died on Mission',
        detail: 'On November 9, 2014, Munroe and his wife Ruth died in a plane crash while travelling to his own leadership conference in Grand Bahama. He was 60. The conference theme that year was "The Future of Leadership".',
      },
    ],
    booksAuthored: [
      'In Pursuit of Purpose',
      'Rediscovering the Kingdom',
      'Understanding Your Potential',
      'The Purpose and Power of God\'s Glory',
      'Kingdom Principles',
    ],
  },

  {
    id: 'reinhard-bonnke',
    name: 'Reinhard Bonnke',
    lifespan: '1940 to 2019',
    role: 'Evangelist and Pioneer of African Mass Crusade Ministry',
    coreQuote: 'Africa shall be saved.',
    shortBio: 'A German evangelist who felt called to Africa as a child, Reinhard Bonnke conducted very large Christian gatherings across the African continent. His organisation reported crowds exceeding 1.6 million at a single service and about 79 million decisions for Christ during his ministry.',
    eyewitnessStory: {
      title: 'Daniel Ekechukwu Raised from the Dead in Nigeria, 2001',
      account: 'On November 30, 2001, Nigerian pastor Daniel Ekechukwu died following severe injuries from a road accident near Owerri, Nigeria. A death certificate was issued by the attending physician. His body was embalmed by morticians and placed in a coffin for burial. His wife Nneka refused to accept the death, transporting the coffin to a church where Reinhard Bonnke was scheduled to preach. After extended prayer by the congregation and Bonnke\'s team over the sealed coffin, witnesses reported that Daniel began breathing again and eventually sat up. He walked out of the building. The incident was subsequently filmed in a documentary and the death certificate, physician records, and mortician documentation have been presented as corroborating evidence. The case remains one of the most documented alleged post-mortem restorations in contemporary Christianity.',
      primarySource: 'Raised from the Dead (2002), documentary produced by Full Flame GmbH. Supporting documentation includes Owerri General Hospital records and mortician affidavit.',
      sourceContext: 'Presented through film, medical records, and witness testimonies. Classified as a reported miracle account.',
    },
    keyFacts: [
      {
        factTitle: '79 Million Recorded Decisions for Christ',
        detail: 'Christ for All Nations, the organisation Bonnke founded, reported approximately 79 million decisions for Christ across Africa during his crusade ministry.',
      },
      {
        factTitle: 'Called to Africa at Age Ten',
        detail: 'Bonnke reported that as a ten-year-old child in Germany he heard a clear inner impression that Africa was his mission field. He described it as the defining moment of his vocation.',
      },
      {
        factTitle: 'Crowds of 1.6 Million at a Single Service',
        detail: 'His organisation reported that a Lagos crusade in the early 2000s drew more than 1.6 million people in a single evening service, among the largest gatherings claimed in Christian evangelism.',
      },
    ],
    booksAuthored: [
      'Evangelism by Fire',
      'Holy Spirit: Are We Flammable or Fireproof?',
      'Taking Action',
      'Even Greater',
    ],
  },

  {
    id: 'heidi-baker',
    name: 'Heidi Baker',
    lifespan: '1959 to Present',
    role: 'Missionary, Revivalist, and Founder of Iris Global',
    coreQuote: 'Love looks like something.',
    shortBio: 'An American missionary who moved to Mozambique in the mid-1990s amid chaos and collapsed infrastructure, Heidi Baker built one of the most remarkable grassroots mission movements in the contemporary church, planting over 10,000 churches across Mozambique and surrounding nations while caring personally for thousands of orphaned children.',
    eyewitnessStory: {
      title: 'The Deaf Man Who Heard at Zimpeto, Mozambique',
      account: 'During a feeding programme at Zimpeto in the late 1990s, shortly after Heidi and Rolland Baker had been expelled from their rented property and were operating out of a collapsed structure with hundreds of orphaned children, a man who had been deaf and mute from birth was brought forward during a simple open-air meeting. Heidi prayed for him with no elaborate ritual. Those present reported that the man began to speak, repeating words he had never heard. Local villagers who knew him confirmed he had been without hearing his entire life. The incident was described by Heidi as ordinary: she said that what shocked her was not the miracle but the tenderness with which God treated the man in that moment. The account is documented in her autobiography and corroborated by Rolland Baker\'s records of the early Mozambique work.',
      primarySource: 'Heidi Baker, Compelled by Love (2008) and Always Enough (2003)',
      sourceContext: 'Firsthand account corroborated by Rolland Baker and multiple Mozambican witnesses. Classified as a reported miracle account.',
    },
    keyFacts: [
      {
        factTitle: 'Over 10,000 Churches Planted in Mozambique',
        detail: 'Iris Global, the organisation Heidi and Rolland Baker founded, has planted over 10,000 churches across Mozambique and neighbouring nations, almost entirely through local indigenous leaders trained by the ministry.',
      },
      {
        factTitle: 'PhD in Systematic Theology from King\'s College London',
        detail: 'Heidi holds a doctorate in systematic theology from King\'s College London, a combination of rigorous academic formation and frontline mission that is unusual in contemporary charismatic circles.',
      },
      {
        factTitle: 'Personally Cared for Thousands of Orphans',
        detail: 'Beyond the organisational work, Heidi and Rolland personally raised and cared for hundreds of children who were brought to their compound, often arriving severely malnourished.',
      },
    ],
    booksAuthored: [
      'Always Enough',
      'Compelled by Love',
      'Birthing the Miraculous',
      'Expecting Miracles',
    ],
  },

  {
    id: 'enoch-adeboye',
    name: 'Enoch Adejare Adeboye',
    lifespan: '1942 to Present',
    role: 'General Overseer, Redeemed Christian Church of God',
    coreQuote: 'If you follow God completely, He will take you to places you never dreamed possible.',
    shortBio: 'Born into poverty in rural Nigeria and trained as a mathematician at the University of Lagos, Enoch Adeboye became the General Overseer of the Redeemed Christian Church of God in 1981 and has since overseen its expansion to over 197 countries, making it one of the most globally distributed church networks in history.',
    eyewitnessStory: {
      title: 'From Lagos University Lecturer to Leading a Global Movement',
      account: 'In the 1970s Enoch Adeboye was a university lecturer in mathematics in Lagos, a man of considerable intellectual ambition, with no intention of entering full-time ministry. His wife had become a member of the Redeemed Christian Church of God, then a small Yoruba-speaking congregation founded by Josiah Akindayomi. Adeboye accompanied her to a service primarily out of obligation. Over the following months, through a series of personal encounters and a deepening sense of conviction, he was converted and then called. When Akindayomi died in 1980, a sealed letter he had written was opened: it named Adeboye, not an ordained minister, as his successor. What followed was one of the most remarkable organisational expansions in the history of African Christianity.',
      primarySource: 'Enoch Adeboye, The Open Heavens Daily Devotional (continuous publication) and multiple authorised biographies',
      sourceContext: 'Drawn from published biographical accounts and RCCG institutional records.',
    },
    keyFacts: [
      {
        factTitle: 'RCCG Now Present in 197 Countries',
        detail: 'Under Adeboye\'s leadership the Redeemed Christian Church of God has grown from a small Lagos congregation to a network present in 197 countries, with tens of thousands of parishes.',
      },
      {
        factTitle: 'Holy Ghost Congress Attendance Exceeds 5 Million',
        detail: 'The annual RCCG Holy Ghost Congress in Lagos consistently draws attendance figures exceeding five million people, making it one of the largest annual religious gatherings on earth.',
      },
      {
        factTitle: 'Doctorate in Mathematics',
        detail: 'Adeboye holds a PhD in Applied Mathematics, a background he credits with shaping his methodical approach to scripture study and organisational structure.',
      },
    ],
    booksAuthored: [
      'Open Heavens Daily Devotional',
      'The Miracle of the Tithe',
      'God\'s Generals for Kids',
    ],
  },

  {
    id: 'william-kumuyi',
    name: 'William Folorunso Kumuyi',
    lifespan: '1941 to Present',
    role: 'Founder of Deeper Life Bible Church, Holiness-Charismatic Teacher',
    coreQuote: 'Holiness is not optional. It is the nature of God reproduced in the believer.',
    shortBio: 'A mathematics lecturer at the University of Lagos who began a small Bible study group of fifteen students in 1973, William Kumuyi built Deeper Life Bible Church into one of Nigeria\'s largest and most disciplined church movements, known for its uncompromising emphasis on personal holiness and rigorous scripture teaching.',
    eyewitnessStory: {
      title: 'The Bible Study That Became a Movement of 150,000',
      account: 'In 1973, William Kumuyi was a mathematics lecturer at the University of Lagos who had been deeply impacted by a personal encounter with God and a conviction that the Nigerian church needed to return to the practical disciplines of holiness and scripture. He invited fifteen university students to his apartment for a Bible study. He had no intention of founding a denomination. Over the following decade, through weekly studies that grew in intensity and reputation, people began travelling long distances to attend. By the mid-1980s, Deeper Life Bible Church had grown to over 150,000 members and was holding its meetings in a purpose-built auditorium in Lagos. The growth came almost entirely through the reputation of the teaching, which was systematic, unadorned, and demanding.',
      primarySource: 'Deeper Life Bible Church institutional records and Kumuyi, Dynamics of Holiness (1983)',
      sourceContext: 'Drawn from published church history and multiple documented biographical sources.',
    },
    keyFacts: [
      {
        factTitle: 'Started with Fifteen Students',
        detail: 'Deeper Life Bible Church traces its origin to a 1973 apartment Bible study with fifteen University of Lagos students. There was no founding vision for a church, only a commitment to serious scripture engagement.',
      },
      {
        factTitle: 'Consistently Ranked Among Nigeria\'s Most Respected Leaders',
        detail: 'Kumuyi has for decades been cited in Nigerian public surveys as one of the most trusted and scandal-free figures in the country\'s religious landscape, attributed largely to his consistent emphasis on financial integrity and personal accountability.',
      },
      {
        factTitle: 'International Miracle Crusades in Over 75 Countries',
        detail: 'His evangelistic crusades were held across Africa, Europe, and Asia, drawing large crowds and reports of physical healing.',
      },
    ],
    booksAuthored: [
      'Dynamics of Holiness',
      'The Full Gospel',
      'Showers of Blessing',
    ],
  },

  {
    id: 'ew-kenyon',
    name: 'E.W. Kenyon',
    lifespan: '1867 to 1948',
    role: 'Pioneer Bible Teacher and Foundational Voice of Faith Teaching',
    coreQuote: 'What I confess, I possess.',
    shortBio: 'Essek William Kenyon was a New England pastor, educator, and writer whose early 20th century teaching on the believer\'s identity in Christ, the authority of the name of Jesus, and the relationship between confession and reality became the theological foundation on which much of the later charismatic and Word of Faith movements were built.',
    eyewitnessStory: {
      title: 'A Revelation of the New Creation That Changed His Teaching',
      account: 'In the early years of his ministry in New England, Kenyon was a pastor and educator wrestling with what he saw as a gap between the doctrinal statements of the church and the lived experience of its members. Christians who affirmed correct beliefs appeared to live in persistent defeat, sickness, and fear. Studying the Pauline epistles with close attention, particularly 2 Corinthians 5:17 and Ephesians chapters 1 to 3, he arrived at a conviction that the church had functionally ignored one of the most significant realities of the New Testament: that the person who is in Christ is genuinely a new creation, not metaphorically but ontologically. The consequences of that identity, he argued, included authority, access, and a relationship to sickness, sin, and circumstance that most Christians had never been taught to inhabit. He spent the rest of his life trying to close that gap through writing and teaching.',
      primarySource: 'E.W. Kenyon, The New Kind of Love (1927) and The Father and His Family (1916)',
      sourceContext: 'Drawn from Kenyon\'s published works and consistent biographical accounts from the Kenyon Gospel Publishing Society.',
    },
    keyFacts: [
      {
        factTitle: 'Founded Bethel Bible Institute in 1900',
        detail: 'Kenyon founded one of the early Bible training institutes in the northeastern United States, providing formal theological education outside the mainstream denominational seminaries.',
      },
      {
        factTitle: 'His Books Remain in Print Over 75 Years After His Death',
        detail: 'Works including The Father and His Family, The Two Kinds of Faith, and In His Presence have remained continuously in print, a testament to the enduring influence of his foundational framework.',
      },
      {
        factTitle: 'Largely Unknown Outside Charismatic Circles',
        detail: 'Despite his theological influence on millions, Kenyon remains relatively obscure in academic church history, a recognition gap that scholars have increasingly begun to address.',
      },
    ],
    booksAuthored: [
      'The Father and His Family',
      'The Two Kinds of Faith',
      'In His Presence',
      'The New Kind of Love',
      'Identification: A Romance in Redemption',
    ],
  },

  {
    id: 'joyce-meyer',
    name: 'Joyce Meyer',
    lifespan: '1943 to Present',
    role: 'Bible Teacher, Author, and Founder of Joyce Meyer Ministries',
    coreQuote: 'You cannot have a positive life and a negative mind.',
    shortBio: 'Joyce Meyer overcame severe childhood trauma and years of personal struggle to become one of the most listened-to Bible teachers in the world, with a particular gift for translating scripture into practical daily application that has resonated with millions of women and men across every continent.',
    eyewitnessStory: {
      title: 'The Morning in the Car When Everything Changed',
      account: 'In 1976, Joyce Meyer was a deeply unhappy young woman, a churchgoer who had endured years of childhood sexual abuse by her father and was carrying unresolved wounds into her marriage and faith. One ordinary morning, driving to work in St. Louis, she had what she described as a direct encounter with the Holy Spirit that she was not seeking and had not prepared for. She pulled over. She wept. She described hearing an inner clarity, not a voice exactly but a settled knowing, that she was loved, that her past did not define her, and that God had a purpose for her life that was larger than her pain. She went home that day and began reading her Bible with a hunger she had not previously felt. She has described that morning as the turning point from a religion she was maintaining to a relationship she was inhabiting. The ministry that eventually grew from that turning point now reaches an estimated five million people daily through television, radio, and social media.',
      primarySource: 'Joyce Meyer, Battlefield of the Mind (1995) and Beauty for Ashes (1994)',
      sourceContext: 'Firsthand autobiographical account consistent across multiple published books and interviews.',
    },
    keyFacts: [
      {
        factTitle: 'Reaches an Estimated Five Million People Daily',
        detail: 'Joyce Meyer Ministries broadcasts across more than 100 countries, with daily television and radio reaching an estimated five million people in over 60 languages.',
      },
      {
        factTitle: 'Battlefield of the Mind Has Sold Over Eight Million Copies',
        detail: 'Her 1995 book on renewing the mind remains one of the bestselling Christian books in history, with translations in dozens of languages and consistent placement on bestseller lists for over two decades.',
      },
      {
        factTitle: 'Hand of Hope Humanitarian Work',
        detail: 'The humanitarian arm of her ministry, Hand of Hope, operates feeding programmes, medical clinics, and anti-trafficking initiatives in over 100 countries.',
      },
    ],
    booksAuthored: [
      'Battlefield of the Mind',
      'Beauty for Ashes',
      'The Power of Being Thankful',
      'Do Yourself a Favor: Forgive',
      'Living Beyond Your Feelings',
    ],
  },
]

export function getPersonProfileById(id: string): PersonProfile | undefined {
  return peopleProfiles.find((p) => p.id === id)
}

