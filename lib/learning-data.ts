export type LearningCard = {
  id: string
  type: 'IDEA' | 'LIFE' | 'BOOK' | 'HISTORY' | 'TEACHING' | 'STORY'
  title: string
  source: string
  body: string
  time: string
  accent?: boolean
}

export const learningCards: LearningCard[] = [

  // ─── IDEAS ──────────────────────────────────────────────────────────────────

  {
    id: 'grace-is-power-not-permission',
    type: 'IDEA',
    title: 'Grace is power, not permission',
    source: 'Dietrich Bonhoeffer',
    body: 'Bonhoeffer spent his life arguing that cheap grace, grace without cost or change, is one of the most dangerous ideas in the modern church. Real grace, he wrote, is the kind that demands everything and gives back more than it asks. It does not excuse a life. It transforms one.',
    time: '2 min read',
  },
  {
    id: 'calling-is-discovered-not-assigned',
    type: 'IDEA',
    title: 'Calling is discovered, not assigned',
    source: 'Oswald Chambers',
    body: 'Chambers wrote that most people wait for a dramatic moment of calling that never comes. His argument was quieter: calling emerges through faithfulness in ordinary things. The question is not what God has destined you to do. It is whether you are paying attention to what is already in front of you.',
    time: '2 min read',
  },
  {
    id: 'doubt-is-not-the-opposite-of-faith',
    type: 'IDEA',
    title: 'Doubt is not the opposite of faith',
    source: 'C.S. Lewis',
    body: 'Lewis argued that the opposite of faith is not doubt but certainty sought on the wrong terms. Doubt, handled honestly, can sharpen belief rather than destroy it. In his own life, the questions he refused to avoid were the same ones that eventually brought him to faith.',
    time: '3 min read',
  },
  {
    id: 'holiness-is-not-performance',
    type: 'IDEA',
    title: 'Holiness is not performance',
    source: 'A.W. Tozer',
    body: 'Tozer was direct: the version of holiness that exhausts people is not biblical holiness. It is the management of appearances. Real holiness, he argued, is the quiet result of a life oriented toward God rather than toward the approval of other people. The difference shows, but not always in the ways we expect.',
    time: '2 min read',
  },
  {
    id: 'the-church-has-always-survived-its-crises',
    type: 'IDEA',
    title: 'The church has always survived its crises',
    source: 'Church History',
    body: 'Every generation has been convinced it is living through the worst moment in the history of the church. The Arian controversy nearly split the faith in the 4th century. The Reformation fractured it in the 16th. The church absorbed both and kept moving. History is not a reason for complacency but it is a reason against despair.',
    time: '3 min read',
  },

  // ─── LIVES ──────────────────────────────────────────────────────────────────

  {
    id: 'cs-lewis-from-atheist-to-apologist',
    type: 'LIFE',
    title: 'The man who argued himself into faith',
    source: 'C.S. Lewis',
    body: 'Lewis spent years as a committed atheist, and he was honest about it. His conversion was not an emotional experience. It was the slow collapse of every argument he had constructed against belief. He described arriving at faith reluctantly, as the most surprised convert in England. That honesty is what makes his writing still matter.',
    time: '4 min read',
  },
  {
    id: 'dietrich-bonhoeffer-cost-of-conviction',
    type: 'LIFE',
    title: 'The theologian who chose the gallows over silence',
    source: 'Dietrich Bonhoeffer',
    body: 'Bonhoeffer was a German pastor and theologian who had every reason to stay safe. He had contacts abroad, a reputation, and options. He returned to Germany anyway, joined the resistance against Hitler, and was executed at 39. He wrote The Cost of Discipleship in 1937. The title was autobiographical.',
    time: '4 min read',
  },
  {
    id: 'corrie-ten-boom-forgiveness-under-pressure',
    type: 'LIFE',
    title: 'She forgave the man who guarded her prison camp',
    source: 'Corrie ten Boom',
    body: 'Corrie ten Boom survived Ravensbrück concentration camp after her family was arrested for hiding Jewish people in their home. Years later she came face to face with one of her former guards at a speaking event. He asked for forgiveness. Her account of that moment, in The Hiding Place, is one of the most honest descriptions of what forgiveness actually costs.',
    time: '5 min read',
  },
  {
    id: 'oswald-chambers-unknown-until-dead',
    type: 'LIFE',
    title: 'He died at 43. His wife turned his notes into the most-read devotional in history',
    source: 'Oswald Chambers',
    body: 'Oswald Chambers never published My Utmost for His Highest. He died in 1917 from a burst appendix while serving as a chaplain in Egypt. His wife Biddy had spent years transcribing his lectures in shorthand. She compiled and published them after his death. The book has not gone out of print since 1927.',
    time: '3 min read',
  },
  {
    id: 'william-wilberforce-faith-as-public-action',
    type: 'LIFE',
    title: 'He spent 20 years losing before he won',
    source: 'William Wilberforce',
    body: 'Wilberforce introduced his first bill to abolish the British slave trade in 1791. It was defeated. He introduced it again. Defeated again. For two decades he kept returning. The Slave Trade Act finally passed in 1807. He spent the rest of his life working toward full emancipation, which came three days before he died in 1833. His faith was not the reason he felt good about the cause. It was the reason he did not stop.',
    time: '4 min read',
  },
  {
    id: 'fanny-crosby-blind-hymn-writer',
    type: 'LIFE',
    title: 'She was blind from six weeks old and wrote over 8,000 hymns',
    source: 'Fanny Crosby',
    body: 'Fanny Crosby lost her sight at six weeks old due to a medical error. She lived to 94 and wrote more hymns than any other person in Christian history, including Blessed Assurance and To God Be the Glory. She reportedly said she was grateful for her blindness because the first face she would ever see would be Jesus. Whether or not that quote is perfectly recorded, her life made it credible.',
    time: '3 min read',
  },
  {
    id: 'augustine-confessions-conversion',
    type: 'LIFE',
    title: 'The man who prayed "make me holy, but not yet"',
    source: 'Augustine of Hippo',
    body: 'Augustine wrote the first memoir in Western literature. Confessions is the account of a man who knew what he should do and kept choosing otherwise for years. His conversion came not through argument but through a child\'s voice, a page of scripture, and a moment in a garden. He became one of the most influential theologians in Christian history. The prayer "make me holy, but not yet" is from his own account of where he was before that day.',
    time: '5 min read',
  },
  {
    id: 'charles-spurgeon-prince-of-preachers',
    type: 'LIFE',
    title: 'He preached to 10 million people before radio existed',
    source: 'Charles Spurgeon',
    body: 'Spurgeon preached his first sermon at 16. By 19 he was the most popular preacher in London. By the end of his life his sermons had been translated into more languages than any other Christian writing outside the Bible. He also suffered severe depression and wrote about it openly at a time when no one in ministry did. His honesty about the darkness makes his faith in the light more credible, not less.',
    time: '4 min read',
  },

  // ─── BOOKS ──────────────────────────────────────────────────────────────────

  {
    id: 'mere-christianity-lewis',
    type: 'BOOK',
    title: 'Mere Christianity',
    source: 'C.S. Lewis',
    body: 'Lewis originally delivered these ideas as BBC radio talks during World War II, to a country exhausted by destruction and short on reasons for hope. The argument he makes for the reasonableness of Christian belief has not dated. Christianity Today called it the best case for orthodox Christianity in print. It was voted the most influential Christian book of the 20th century.',
    time: '5 min read',
  },
  {
    id: 'cost-of-discipleship-bonhoeffer',
    type: 'BOOK',
    title: 'The Cost of Discipleship',
    source: 'Dietrich Bonhoeffer',
    body: 'Written in 1937 while Bonhoeffer was running an illegal seminary in Nazi Germany, this book makes the case that a Christianity that costs nothing is worth nothing. The chapter on cheap grace has been cited by readers across every denomination as the thing that changed how they understood their faith. One reviewer wrote: it leaves you wondering why you ever thought compromise was an option.',
    time: '5 min read',
  },
  {
    id: 'pursuit-of-god-tozer',
    type: 'BOOK',
    title: 'The Pursuit of God',
    source: 'A.W. Tozer',
    body: 'Tozer wrote this book in one sitting on an overnight train. It shows: it reads with a focus and directness that most books take years to achieve. The central argument is that the Christian life is not a set of beliefs to hold but a relationship to pursue, and that most Christians have settled for far less than what is available to them. It is short, dense, and has never gone out of print.',
    time: '4 min read',
  },
  {
    id: 'confessions-augustine',
    type: 'BOOK',
    title: 'Confessions',
    source: 'Augustine of Hippo',
    body: 'Written around 400 AD, Confessions is not a theology textbook. It is a prayer. Augustine is talking directly to God about his own life, his failures, his restlessness, and the moment everything changed. It is the first autobiography in Western literature and one of the most quoted books in Christian history. The opening line, "our heart is restless until it rests in you," has been cited for 1,600 years because it keeps being true.',
    time: '5 min read',
  },
  {
    id: 'my-utmost-chambers',
    type: 'BOOK',
    title: 'My Utmost for His Highest',
    source: 'Oswald Chambers',
    body: 'Published in 1927, ten years after Chambers died, this is the best-selling Christian devotional of all time. Each entry is short, direct, and frequently uncomfortable. Chambers does not write to make you feel better. He writes to make you think more clearly about what you actually believe and whether you are living accordingly. The book was compiled from his lecture notes by his wife. He never saw it published.',
    time: '3 min read',
  },

  // ─── HISTORY ────────────────────────────────────────────────────────────────

  {
    id: 'council-of-nicaea-325ad',
    type: 'HISTORY',
    title: 'The meeting that defined what Christianity believes about Jesus',
    source: 'Church History · 325 AD',
    body: 'In 325 AD, Emperor Constantine called 300 bishops to Nicaea to settle one question: was Jesus fully God or a created being? The Arian position argued the latter. Athanasius, still a deacon at the time, argued the former with a ferocity that got him exiled five times. The council ruled in his favor. The Nicene Creed, still recited in churches today, is the result of that argument.',
    time: '4 min read',
  },
  {
    id: 'reformation-1517-luther',
    type: 'HISTORY',
    title: 'The document that split Western Christianity in two',
    source: 'Martin Luther · 1517',
    body: 'On October 31 1517, Martin Luther nailed 95 theses to the door of a church in Wittenberg. He was not trying to start a revolution. He was inviting a debate about the sale of indulgences, pieces of paper the church sold as reduction of punishment for sin. The debate got out of hand. Within three years Luther had been excommunicated and half of Europe was reconsidering what the church had the authority to say and sell.',
    time: '4 min read',
  },

  // ─── TEACHING ───────────────────────────────────────────────────────────────

  {
    id: 'smith-wigglesworth-faith-and-action',
    type: 'TEACHING',
    title: 'Faith that does not act is not faith',
    source: 'Smith Wigglesworth',
    body: 'Wigglesworth was an illiterate plumber from Bradford who taught himself to read using only the Bible. His central teaching was that faith is not a feeling you wait for but a decision you act on before the evidence arrives. He was blunt, sometimes abrasive, and the accounts of his ministry remain among the most documented of the 20th century healing revival. Love him or question him, the directness of his teaching has not softened with time.',
    time: '3 min read',
  },
]
