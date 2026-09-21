export interface BookSummary {
  id: string
  title: string
  author: string
  year?: string
  category: 'FAITH' | 'MIRACLE' | 'TEACHING' | 'LIFE' | 'BOOK'
  readTime: string
  bigIdea: string
  pullQuote: string
  takeaways: { number: string; title: string; explanation: string }[]
  summaryParagraphs: string[]
  application: string
}

export const bookSummaries: BookSummary[] = [
  {
    id: 'the-authority-of-the-believer',
    title: 'The Authority of the Believer',
    author: 'Kenneth E. Hagin',
    year: '1967',
    category: 'FAITH',
    readTime: '4 min read',
    bigIdea: 'Christians do not need to beg God for authority over darkness and sickness; Jesus already defeated the enemy and delegated His legal authority to every believer on earth.',
    pullQuote: 'The authority that belongs to Christ also belongs to the Church, because the Church is His body.',
    takeaways: [
      {
        number: '01',
        title: 'Seated with Christ',
        explanation: 'According to Ephesians 1 and 2, when Christ was raised from the dead and seated at the Father\'s right hand far above all demonic power, believers were raised and seated with Him.',
      },
      {
        number: '02',
        title: 'Authority Must Be Exercised',
        explanation: 'God will not force sickness or demonic oppression to leave your home or body while you remain passive. You must speak the Word and exercise the authority delegated to you.',
      },
      {
        number: '03',
        title: 'The Power Behind the Badge',
        explanation: 'Just as a small traffic officer stops massive trucks not by physical muscle but by the legal power of the state, a believer stands against spiritual attacks backed by the almighty name of Jesus.',
      },
    ],
    summaryParagraphs: [
      'Kenneth E. Hagin wrote this seminal classic after decades of personal study and supernatural encounters. His central premise challenged passive religion: many Christians plead with God in prayer to do things that God has already commanded the believer to do using the name of Jesus.',
      'Drawing extensively from Paul\'s prayers in Ephesians, Hagin explains that the resurrection was the ultimate demonstration of God\'s power. Christ stripped principalities and powers of their authority. Crucially, Paul reveals that believers are the body of Christ on earth. If the Head has authority, the body shares that exact same jurisdiction.',
      'Hagin illustrates this with the analogy of a police officer. When a traffic officer raises his hand, speeding trucks halt immediately. The driver stops not because the officer is physically stronger than a ten-ton vehicle, but because the officer carries the full backing of government authority. In the spiritual realm, the believer\'s badge is the name of Jesus.',
      'The book concludes with an urgent call to action: stop tolerating defeat, sickness, and spiritual oppression as though God willed them. Stand up, know your legal rights in the New Covenant, and command the adversary to loose his hold in Jesus\' name.',
    ],
    application: 'Identify any area in your life where you have been passively waiting for God to act, and begin speaking the Word of God with boldness and authority in the name of Jesus.',
  },

  {
    id: 'the-pursuit-of-god',
    title: 'The Pursuit of God',
    author: 'A.W. Tozer',
    year: '1948',
    category: 'TEACHING',
    readTime: '4 min read',
    bigIdea: 'True spirituality is not religious busywork or theological head knowledge; it is the raw, unhurried pursuit of God Himself through an intimate, lived encounter.',
    pullQuote: 'To have found God and still to pursue Him is the soul\'s paradox of love.',
    takeaways: [
      {
        number: '01',
        title: 'Possessing Nothing',
        explanation: 'Spiritual freedom begins when we release the compulsive desire to own and protect things, placing all our treasures into God\'s hands as Abraham did with Isaac.',
      },
      {
        number: '02',
        title: 'Removing the Veil',
        explanation: 'The veil separating humanity from God was torn at Calvary. The only veil that remains is the thick fabric of our own self-will, self-love, and pride.',
      },
      {
        number: '03',
        title: 'God Is Always Speaking',
        explanation: 'God is not silent; He is continuously filling the universe with His living voice. We fail to hear Him simply because our minds are crowded with worldly noise.',
      },
    ],
    summaryParagraphs: [
      'A.W. Tozer penned The Pursuit of God in a single overnight train journey from Chicago to Texas in the late 1940s. Written on his knees in a small compartment, the book pulses with prophetic urgency, warning against the creeping intellectualism and mechanical religion taking over modern churches.',
      'Tozer diagnoses a severe spiritual sickness: modern Christians have substituted doctrinal orthodoxy for an actual relationship with God. We memorize truths about Him, attend church services about Him, and debate theology about Him, while our hearts remain cold and distant from His actual presence.',
      'He argues that knowing God requires personal, conscious experience. Just as the physical senses perceive light, sound, and taste, the human spirit possesses spiritual senses that can truly perceive and enjoy the presence of God when cleansed by the Holy Spirit.',
      'The remedy Tozer offers is total simplicity: surrender your reputation, dismantle your internal idols, quiet your frantic schedules, and pursue the living God until His presence becomes the single governing reality of your life.',
    ],
    application: 'Set aside ten minutes today without your phone or to-do list, simply sitting in quietness to acknowledge God\'s presence and seek His face.',
  },

  {
    id: 'how-to-heal-the-sick',
    title: 'How to Heal the Sick',
    author: 'Charles and Frances Hunter',
    year: '1981',
    category: 'MIRACLE',
    readTime: '4 min read',
    bigIdea: 'Healing is not a specialized gift reserved for famous evangelists; it is the practical calling and birthright of every ordinary believer who follows Jesus\' command in Mark 16.',
    pullQuote: 'God did not give us hands just to fold them in church; He gave us hands to lay on the sick.',
    takeaways: [
      {
        number: '01',
        title: 'The Great Commission Command',
        explanation: 'In Mark 16:17-18, Jesus promised that signs will follow those who believe, specifically stating that believers will lay hands on the sick and they will recover.',
      },
      {
        number: '02',
        title: 'Simple and Practical Faith',
        explanation: 'Ministering healing requires no special vocal inflection, religious theatrics, or emotional hype. It operates through calm, confident obedience to God\'s Word.',
      },
      {
        number: '03',
        title: 'Releasing the Anointing',
        explanation: 'The power of the Holy Spirit resides within every believer. When hands are laid in faith, that divine power is transmitted to heal broken bodies and restore tissues.',
      },
    ],
    summaryParagraphs: [
      'Charles and Frances Hunter, affectionately remembered as "The Happy Hunters", spent decades traveling worldwide conducting massive Healing Explosions in sports arenas and convention centers. Rather than operating as solo miracle-workers, their entire mission was to train ordinary Christians to minister divine healing.',
      'In How to Heal the Sick, they demystify what many have turned into an intimidating mystery. They systematically address the physical anatomy of diseases, spiritual roots of affliction, and biblical patterns of laying on of hands, commanding fever to leave, and ministering with compassion.',
      'The Hunters emphasize that doubt often stems from overcomplicating God\'s instructions. Jesus never commanded believers to pray to God asking Him if it was His will to heal; He told His disciples to go and heal the sick, cast out devils, and cleanse the lepers.',
      'Through thousands of verified medical miracles, from restoring hearing in deaf ears to growing out shortened limbs, the Hunters prove that God\'s supernatural power is active wherever believers dare to step out of their comfort zones.',
    ],
    application: 'The next time a friend, family member, or coworker mentions a physical pain or illness, offer simply and humbly: "Can I pray for you right now?" and lay hands on them in faith.',
  },

  {
    id: 'good-morning-holy-spirit',
    title: 'Good Morning, Holy Spirit',
    author: 'Benny Hinn',
    year: '1990',
    category: 'FAITH',
    readTime: '4 min read',
    bigIdea: 'The Holy Spirit is not an impersonal force, mist, or theological abstraction; He is a real, sensitive, loving person who longs for daily communion with every believer.',
    pullQuote: 'The Holy Spirit is longing for you to say, "Good morning, Holy Spirit, let us walk together today."',
    takeaways: [
      {
        number: '01',
        title: 'A Living Person',
        explanation: 'The Holy Spirit has an intellect, a will, and emotions. He can be grieved, loved, obeyed, and enjoyed as a constant companion.',
      },
      {
        number: '02',
        title: 'The Secret to Power',
        explanation: 'Spiritual power is not something you produce by striving; it is the natural fragrance of spending uninterrupted time in the presence of the Holy Spirit.',
      },
      {
        number: '03',
        title: 'Fellowship over Asking',
        explanation: 'True prayer is not simply presenting a list of requests to heaven, but entering into deep, sweet fellowship and quiet dialogue with the third person of the Trinity.',
      },
    ],
    summaryParagraphs: [
      'Good Morning, Holy Spirit chronicles the dramatic spiritual transformation of a young immigrant from Jaffa, Israel, who experienced a life-changing encounter in a Kathryn Kuhlman service in Pittsburgh.',
      'Benny Hinn describes how his understanding of prayer shifted from cold religious repetition to vibrant daily conversation with the Holy Spirit. Waking up each morning, he began greeting the Holy Spirit as a close, present friend, inviting Him to guide every thought and step.',
      'The book breaks down the biblical role of the Holy Spirit as the Comforter, Teacher, and Counselor who reveals Jesus to our hearts. It explains how ministering to God in worship creates an atmosphere where the Spirit loves to abide and manifest His healing presence.',
      'For believers seeking revival in their personal prayer lives, this book serves as a warm, inspiring invitation to move beyond dry ritual into sweet communion with the living God.',
    ],
    application: 'When you wake up tomorrow, take five seconds before looking at your phone to say, "Good morning, Holy Spirit, lead my steps today."',
  },

  {
    id: 'growing-up-spiritually',
    title: 'Growing Up, Spiritually',
    author: 'Kenneth E. Hagin',
    year: '1976',
    category: 'TEACHING',
    readTime: '4 min read',
    bigIdea: 'Just as humans progress from babyhood through childhood to adulthood, every believer must consciously grow from spiritual infancy into mature spiritual authority.',
    pullQuote: 'God does not expect you to stay a spiritual baby forever; He expects you to grow into mature love and authority.',
    takeaways: [
      {
        number: '01',
        title: 'The Three Stages of Growth',
        explanation: 'Spiritual development mirrors physical growth: Babyhood (innocent but easily hurt), Childhood (curious but unstable), and Manhood (grounded in love and Word).',
      },
      {
        number: '02',
        title: 'The Mark of Maturity',
        explanation: 'True spiritual maturity is not measured by the gifts you demonstrate or the knowledge you possess, but by how consistently you walk in divine love.',
      },
      {
        number: '03',
        title: 'Feeding on the Meat of the Word',
        explanation: 'Infants survive on milk, but adults need solid food. Growing up requires leaving shallow milk behind to study, meditate on, and obey deeper truths.',
      },
    ],
    summaryParagraphs: [
      'In Growing Up, Spiritually, Kenneth E. Hagin addresses one of the greatest tragedies in the modern church: believers who have been born again for thirty years but still think, act, and react like spiritual toddlers.',
      'Hagin identifies the telltale signs of spiritual babyhood: extreme self-centeredness, easily offended feelings, envy, strife, and an inability to digest solid scriptural truth without choke.',
      'He explains that spiritual age does not automatically advance with chronological age or church attendance. A person can sit in church pews for decades and remain an infant unless they deliberately feed on the Word of God and practice walking in agape love.',
      'The mature believer, Hagin demonstrates, is one who takes responsibility for their spiritual atmosphere, refuses to take offense, and exercises spiritual authority with quiet confidence and humility.',
    ],
    application: 'Examine your recent reactions: whenever you feel offended, jealous, or eager to defend your ego, recognize it as spiritual babyhood and choose to respond in mature love.',
  },

  {
    id: 'the-cost-of-discipleship',
    title: 'The Cost of Discipleship',
    author: 'Dietrich Bonhoeffer',
    year: '1937',
    category: 'FAITH',
    readTime: '4 min read',
    bigIdea: 'Grace is free, but it is never cheap; real faith demands the surrender of your entire life to Jesus Christ and gives back far more than it ever costs.',
    pullQuote: 'When Christ calls a man, he bids him come and die.',
    takeaways: [
      {
        number: '01',
        title: 'Costly Grace vs Cheap Grace',
        explanation: 'Cheap grace is the preaching of forgiveness without repentance, baptism without discipline, and grace without the cross. Costly grace calls us to follow Jesus.',
      },
      {
        number: '02',
        title: 'Single-Minded Obedience',
        explanation: 'Faith without immediate, practical obedience is an illusion. The first step of discipleship is always a concrete act of leaving something behind.',
      },
      {
        number: '03',
        title: 'The Sermon on the Mount',
        explanation: 'Jesus\' commands in Matthew 5 to 7 are not impossible ethical ideals for another age; they are the everyday lifestyle of those who belong to His kingdom.',
      },
    ],
    summaryParagraphs: [
      'Dietrich Bonhoeffer wrote The Cost of Discipleship while directing an underground seminary for the Confessing Church in Nazi Germany. Witnessing established state churches compromise with Hitler\'s totalitarian regime, Bonhoeffer realized that a diluted gospel had robbed believers of their moral backbone.',
      'His critique of "cheap grace" remains one of the most blistering in Christian literature. Cheap grace, he argued, is grace treated as a commercial commodity: forgiveness dispensed on demand without any expectation of personal transformation or loyalty to Christ.',
      'In contrast, costly grace is the treasure hidden in the field, for which a person will gladly sell all they have. It is costly because it costs a man his life, and it is grace because it gives him the only true life.',
      'Bonhoeffer lived out every word of his theology, eventually being martyred in a Nazi concentration camp in 1945 at age 39, leaving a legacy of uncompromised Christian integrity.',
    ],
    application: 'Ask yourself honestly: in what area of your life have you treated God\'s grace as an excuse for comfort rather than a summons to radical obedience?',
  },
]

export function getBookSummaryById(id: string): BookSummary | undefined {
  return bookSummaries.find((b) => b.id === id)
}
