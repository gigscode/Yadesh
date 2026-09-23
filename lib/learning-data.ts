export type LearningCard = {
  id: string
  type: 'FAITH' | 'MIRACLE' | 'IDEA' | 'LIFE' | 'BOOK' | 'HISTORY' | 'TEACHING' | 'STORY'
  title: string
  source: string
  body: string       // preview shown on the card
  fullBody: string[] // paragraphs shown on the detail page
  pullQuote: string  // one sentence to anchor the detail page
  takeaway: string   // one-line practical conclusion
  time: string
  accent?: boolean
}

export const learningCards: LearningCard[] = [

  // ─── FAITH & CONVICTIONS ───────────────────────────────────────────────────

  {
    id: 'grace-is-power-not-permission',
    type: 'FAITH',
    title: 'Grace is power, not permission',
    source: 'Dietrich Bonhoeffer',
    body: 'Bonhoeffer spent his life arguing that cheap grace, grace without cost or change, is one of the most dangerous ideas in the modern church. Real grace, he wrote, is the kind that demands everything and gives back more than it asks. It does not excuse a life. It transforms one.',
    pullQuote: 'Cheap grace is the deadly enemy of our church.',
    takeaway: 'Grace is not a license to stay the same. It is the force that makes change possible.',
    time: '2 min read',
    fullBody: [
      'Bonhoeffer coined the phrase "cheap grace" in 1937 and spent the rest of his short life living out its opposite. Cheap grace, he argued, is grace treated as a doctrine, a principle, a system, something the church dispenses without expecting anything in return. You believe, you receive, nothing changes. He called it the grace we bestow on ourselves.',
      'His argument was not that grace is conditional. It was that genuine grace is inherently transformative. When it encounters a human life it does not leave that life undisturbed. The person who has actually been reached by grace becomes someone different, not through effort, but because grace is not a transaction. It is an encounter.',
      'Bonhoeffer was writing to a German church that had largely made its peace with the Nazi regime. He watched pastors and congregations absorb the language of grace while accommodating injustice with extraordinary ease. His diagnosis was that cheap grace had made them spiritually numb. They had inoculated themselves against the real thing by accepting a diminished version.',
      'The practical consequence, in his view, was that discipleship had become optional. You could hold the right beliefs and live however you liked. This was not, he insisted, the faith of the New Testament. "When Christ calls a man," he wrote, "he bids him come and die." That is not a metaphor for inconvenience. It is a description of what genuine surrender to grace actually involves.',
      'The reason this still matters is not because Bonhoeffer was right about Germany. It is because the same mechanism is available in every generation. Grace can be held at arm\'s length, used as a category that explains everything and requires nothing. The question his writing forces is a simple one: has your understanding of grace changed how you live, or has it simply made you more comfortable where you are?',
    ],
  },

  {
    id: 'calling-is-discovered-not-assigned',
    type: 'FAITH',
    title: 'Calling is discovered, not assigned',
    source: 'Oswald Chambers',
    body: 'Chambers wrote that most people wait for a dramatic moment of calling that never comes. His argument was quieter: calling emerges through faithfulness in ordinary things. The question is not what God has destined you to do. It is whether you are paying attention to what is already in front of you.',
    pullQuote: 'The call of God is not a call to some special work; it is a call to be His.',
    takeaway: 'Stop waiting for the dramatic moment. Calling is usually found in the work already in front of you.',
    time: '2 min read',
    fullBody: [
      'Oswald Chambers had a particular irritation with what he called the "fever of fretting", the anxious waiting for God to hand down a specific assignment before a person would consent to move. He saw it everywhere and considered it a misunderstanding of how calling works.',
      'His position was that calling is not an appointment handed down from outside your life. It is something that crystallises from within it, through ordinary faithfulness. The person who is attentive, obedient in small things, and available tends to discover their calling by looking back, not by waiting for an announcement.',
      'Chambers was himself an example of this. He did not set out to write the most-read Christian devotional in history. He taught, he preached, he went where he was asked to go. His calling became clear to others after his death, when his wife assembled the notes of a life lived without spectacular direction.',
      'The practical implication is uncomfortable for anyone waiting to feel certain before acting. Chambers argued that the expectation of a dramatic calling experience often functions as a spiritual delay tactic, a way of deferring obedience until conditions feel more suitable. He thought conditions were rarely going to feel suitable.',
      'What he offered instead was this: be faithful in what is already before you. Pay attention. Respond. The shape of your life will become clearer through the movement than through the waiting. Most people, he wrote, are looking at the horizon when the call is standing directly in front of them.',
    ],
  },

  {
    id: 'doubt-is-not-the-opposite-of-faith',
    type: 'FAITH',
    title: 'Doubt is not the opposite of faith',
    source: 'C.S. Lewis',
    body: 'Lewis argued that the opposite of faith is not doubt but certainty sought on the wrong terms. Doubt, handled honestly, can sharpen belief rather than destroy it. In his own life, the questions he refused to avoid were the same ones that eventually brought him to faith.',
    pullQuote: 'Now that I am a Christian I do have moods in which the whole thing looks very improbable.',
    takeaway: 'Honest doubt engaged seriously is more productive than certainty that has never been tested.',
    time: '3 min read',
    fullBody: [
      'Lewis was unusually honest about the ongoing difficulty of faith for someone who had spent years arguing for it publicly. He did not pretend that conversion ended the questions. He wrote openly about moods in which belief seemed implausible, about the absence of God that can feel acute even after years of faith.',
      'His argument was careful: he distinguished between doubt as an intellectual problem and doubt as a mood. The two feel similar but are different things. A mood of doubt does not constitute a refutation of your beliefs any more than a mood of confidence constitutes their proof. Moods are not evidence.',
      'But he went further. He thought genuine intellectual doubt, the kind that refuses to accept easy answers and keeps pushing on weak points, was actually a form of intellectual honesty that faith should not fear. The questions he had wrestled with as an atheist were the same questions that, when he finally stopped avoiding them, pointed him somewhere he had not expected to go.',
      'The version of faith Lewis distrusted was the kind that needed to be protected from hard questions. He thought it was usually protecting not faith itself but a comfortable and un-examined version of it. Real faith, he argued, does not require the questions to stop. It survives them.',
      'For anyone whose faith has been disrupted by doubt, Lewis is useful not because he provides final answers but because he normalises the experience. He was one of the most influential Christian apologists of the 20th century and he never claimed the uncertainty went away. That is either alarming or reassuring, depending on where you are right now.',
    ],
  },

  {
    id: 'holiness-is-not-performance',
    type: 'FAITH',
    title: 'Holiness is not performance',
    source: 'A.W. Tozer',
    body: 'Tozer was direct: the version of holiness that exhausts people is not biblical holiness. It is the management of appearances. Real holiness, he argued, is the quiet result of a life oriented toward God rather than toward the approval of other people. The difference shows, but not always in the ways we expect.',
    pullQuote: 'God wills that we should push on into His presence and live our whole life there.',
    takeaway: 'If your holiness primarily serves your reputation, it is not holiness. It is theatre.',
    time: '2 min read',
    fullBody: [
      'Tozer had a particular sensitivity to the performative version of Christian life: the cultivation of the right appearance, the right vocabulary, the right associations. He considered it one of the most effective substitutes for genuine faith because it is so easy to confuse with the real thing, especially from the inside.',
      'His argument was that true holiness is not something you produce. It is something that results from proximity to God. A person who has actually spent time in the presence of holiness becomes, gradually and not always visibly, more holy. The change is real but it comes from the inside out, not from the outside in.',
      'The practical problem with performance-based holiness, Tozer argued, is that it orients a person toward audience rather than toward God. The question becomes "how does this look?" rather than "is this true?" Over time, the gap between the performance and the actual interior life becomes a source of exhaustion and spiritual emptiness.',
      'He was writing at a time when American evangelicalism was becoming increasingly public and programmatic. He watched it with some concern. The machinery of religious activity, he thought, could easily substitute for the thing it was supposed to support, the simple direct pursuit of God.',
      'His remedy was not a different program. It was less program. Silence, attentiveness, honesty about what is actually happening inside rather than what is being projected outside. The Pursuit of God, the book he is best known for, is essentially an extended argument that the most important work of a Christian life happens in the interior, and that most of us have settled for activity at the surface.',
    ],
  },

  {
    id: 'the-church-has-always-survived-its-crises',
    type: 'FAITH',
    title: 'The church has always survived its crises',
    source: 'Church History',
    body: 'Every generation has been convinced it is living through the worst moment in the history of the church. The Arian controversy nearly split the faith in the 4th century. The Reformation fractured it in the 16th. The church absorbed both and kept moving. History is not a reason for complacency but it is a reason against despair.',
    pullQuote: 'The blood of the martyrs is the seed of the church.',
    takeaway: 'The church has survived every crisis its critics were sure would finish it. That is worth remembering.',
    time: '3 min read',
    fullBody: [
      'Tertullian\'s observation that the blood of martyrs is the seed of the church was made in the 2nd century, during a period of active Roman persecution. He was noting something that kept proving true: the attempts to suppress Christianity tended to accelerate it. This was not a comfort the early church could have assumed in advance, but it is one they experienced repeatedly.',
      'The 4th century brought a different kind of crisis, not persecution from outside but serious theological division from within. Arius, a priest in Alexandria, taught that Jesus was a created being, subordinate to the Father, not fully divine. The argument spread rapidly across the empire. Entire regions of the church aligned with Arianism. The council at Nicaea in 325 AD settled the question officially, but Athanasius spent years being exiled and reinstated before the decision held.',
      'The Reformation in the 16th century was not a recovery from a crisis. It triggered one. Luther\'s challenge to the authority of Rome fractured Western Christianity in a way it has never fully reassembled. Whether that is viewed as catastrophe or correction depends on who you ask, but the church did not end. It diversified under pressure and kept moving.',
      'The 20th century brought its own confident predictions about the end of religion. Modernism, secularism, two world wars, the Holocaust, each was expected by some observers to finally exhaust the credibility of Christian faith. Instead, the century that produced the most sophisticated arguments against God also produced C.S. Lewis, Bonhoeffer, and the largest numerical growth of Christianity in history, primarily in the global south.',
      'None of this means the current moment is not serious. It means the correct response to a serious moment is not despair. The church has been here before, in worse versions. What it has not done, in any generation, is disappear.',
    ],
  },

  // ─── LIVES ──────────────────────────────────────────────────────────────────

  {
    id: 'cs-lewis-from-atheist-to-apologist',
    type: 'LIFE',
    title: 'The man who argued himself into faith',
    source: 'C.S. Lewis',
    body: 'Lewis spent years as a committed atheist, and he was honest about it. His conversion was not an emotional experience. It was the slow collapse of every argument he had constructed against belief. He described arriving at faith reluctantly, as the most surprised convert in England. That honesty is what makes his writing still matter.',
    pullQuote: 'I was brought in kicking, struggling, resentful, and darting my eyes in every direction for a chance to escape.',
    takeaway: 'Lewis came to faith not through emotion but through the honest failure of his arguments against it.',
    time: '4 min read',
    fullBody: [
      'C.S. Lewis was born in Belfast in 1898 and lost his mother to cancer when he was nine. He was sent to a series of English boarding schools, most of which he hated, and arrived at Oxford already disposed against the faith his childhood had offered him. By his early twenties he was a committed and confident atheist.',
      'What makes his trajectory unusual is that his conversion was primarily intellectual. He was not reached by an emotional experience, a personal crisis, or a compelling sermon. He was reached, slowly and against his will, by the failure of his own arguments. The materialist position he held was, he concluded, philosophically unsustainable. The experience of joy, a recurring inconsolable longing he had felt since childhood, pointed somewhere his materialism could not account for.',
      'His friends at Oxford included J.R.R. Tolkien and Hugo Dyson, both Christians, who engaged him in long conversations about mythology, meaning, and the nature of story. The conversation that is most often cited took place in 1931, during a late-night walk in Oxford. Tolkien argued that the story of Christ was not like other myths. It was the myth that had actually happened. Lewis found the argument unexpectedly compelling.',
      'He became a Christian in 1931 and an apologist almost immediately. Mere Christianity, The Problem of Pain, The Screwtape Letters, and a dozen other books followed over the next three decades. He reached readers who had never set foot in a church and readers who had left one, because he wrote from a position of having been outside and having come back with a reason.',
      'His later years brought fresh suffering: the death of his wife Joy to cancer in 1960, which he wrote about in A Grief Observed under a pseudonym. The book is as honest about the darkness of that year as anything he wrote. It did not resolve neatly. He stayed. That is the part of Lewis\'s story that tends to land hardest for people who have read everything else.',
    ],
  },

  {
    id: 'dietrich-bonhoeffer-cost-of-conviction',
    type: 'LIFE',
    title: 'The theologian who chose the gallows over silence',
    source: 'Dietrich Bonhoeffer',
    body: 'Bonhoeffer was a German pastor and theologian who had every reason to stay safe. He had contacts abroad, a reputation, and options. He returned to Germany anyway, joined the resistance against Hitler, and was executed at 39. He wrote The Cost of Discipleship in 1937. The title was autobiographical.',
    pullQuote: 'Silence in the face of evil is itself evil.',
    takeaway: 'Bonhoeffer did not die for an abstraction. He died because he believed the gospel required it.',
    time: '4 min read',
    fullBody: [
      'Dietrich Bonhoeffer was 27 years old when Hitler came to power in 1933. He was already a theologian of some reputation, having completed his doctoral dissertation at 21 and a second thesis at 24. He had studied in New York at Union Theological Seminary and had contacts and options that most German pastors did not.',
      'Within two days of Hitler\'s rise to power, Bonhoeffer gave a radio address questioning the cult of leadership building around the new chancellor. The broadcast was cut off mid-sentence. It was the beginning of a sustained and increasingly dangerous engagement with the regime that would not end until his death.',
      'He helped found the Confessing Church, the branch of German Christianity that refused to subordinate itself to Nazi ideology. He ran an illegal seminary at Finkenwalde from 1935 until the Gestapo shut it down in 1937. The Cost of Discipleship was written during this period. His students were being drafted, watched, and in some cases arrested.',
      'In 1939, with war approaching, Bonhoeffer was persuaded to travel to the United States. He was safe. He had lectures to give and colleagues who wanted him to stay. He lasted two weeks. He wrote to Reinhold Niebuhr explaining why he had decided to return: "I must live through this difficult period of our national history with the Christian people of Germany. I will have no right to participate in the reconstruction of Christian life in Germany after the war if I do not share the trials of this time with my people."',
      'He returned, joined the Abwehr resistance network as a double agent, and participated in the plot against Hitler. He was arrested in 1943. On April 9, 1945, three weeks before Germany surrendered. He was hanged at Flossenbürg concentration camp. He was 39. The doctor who witnessed his death later wrote that he had never seen a man die so entirely submissive to the will of God.',
    ],
  },

  {
    id: 'corrie-ten-boom-forgiveness-under-pressure',
    type: 'LIFE',
    title: 'She forgave the man who guarded her prison camp',
    source: 'Corrie ten Boom',
    body: 'Corrie ten Boom survived Ravensbrück concentration camp after her family was arrested for hiding Jewish people in their home. Years later she came face to face with one of her former guards at a speaking event. He asked for forgiveness. Her account of that moment, in The Hiding Place, is one of the most honest descriptions of what forgiveness actually costs.',
    pullQuote: 'Forgiveness is an act of the will, and the will can function regardless of the temperature of the heart.',
    takeaway: 'Forgiveness is not a feeling you wait for. It is a decision you make before the feeling follows.',
    time: '5 min read',
    fullBody: [
      'Corrie ten Boom was 52 years old when she was arrested by the Gestapo in 1944. She and her family had been hiding Jewish people in their home in Haarlem for two years. Up to 80 people at a time passed through a secret room built into a bedroom wall. When they were betrayed, the whole family was taken. Her father died in prison after ten days. Her sister Betsie died in Ravensbrück. Corrie survived because of what turned out to be a clerical error: she was released one week before all the women in her age group were sent to the gas chambers.',
      'After the war she travelled widely, speaking about what she had lived through. Her message centred on forgiveness as both a theological necessity and a psychological survival mechanism. She had watched Betsie, in the camp, arrive at a place of genuine love toward their captors. She found it almost incomprehensible and tried to understand it.',
      'The moment that became the centre of her most-quoted writing came in 1947, in Munich. She was speaking at a church and afterwards a man approached her, a former guard from Ravensbrück, one of the cruellest. He extended his hand and asked for her forgiveness. He said he had become a Christian.',
      'Her account of what happened in that moment is worth reading in full. She describes the inability to raise her hand, the cold numbness, and then the decision to pray for the ability to forgive even without the feeling. She reached out her hand. She describes the warmth that followed as something that did not come from her. It was, she wrote, the most difficult thing she had ever been asked to do, and also the clearest evidence she had ever experienced of something working through her that was not her own.',
      'The Hiding Place, published in 1971, has sold millions of copies. It remains one of the most direct accounts available of what it costs to live by the things you say you believe when those things require something genuinely difficult.',
    ],
  },

  {
    id: 'oswald-chambers-unknown-until-dead',
    type: 'LIFE',
    title: 'He died at 43. His wife turned his notes into the most-read devotional in history',
    source: 'Oswald Chambers',
    body: 'Oswald Chambers never published My Utmost for His Highest. He died in 1917 from a burst appendix while serving as a chaplain in Egypt. His wife Biddy had spent years transcribing his lectures in shorthand. She compiled and published them after his death. The book has not gone out of print since 1927.',
    pullQuote: 'My utmost for His highest: give the best you have to the highest you know.',
    takeaway: 'Some of the most lasting work is done by people who never see the outcome.',
    time: '3 min read',
    fullBody: [
      'Oswald Chambers was born in Aberdeen in 1874 and spent the first part of his adult life in a state of spiritual crisis. He trained as an artist, studied at a Bible college in Dunoon, and eventually underwent what he described as a complete interior transformation after a period of extended and painful seeking. The transformation came not through finding new answers but through a total surrender he had been resisting.',
      'He became a teacher and speaker, known for a directness that many found uncomfortable. He did not soften the demands of Christian faith to make them more palatable. He taught at Bible Training College in London from 1911, where his wife Biddy attended every lecture with a shorthand notebook. She transcribed everything.',
      'In 1915 Chambers went to Egypt as a YMCA chaplain, serving troops stationed there during the First World War. He died in November 1917 from a burst appendix, a condition that might have been treated had he not refused the hospital bed, insisting it be given to a wounded soldier. He was 43.',
      'Biddy spent the years after his death organising, editing, and preparing his lectures for publication. My Utmost for His Highest was first published in 1927, ten years after his death. It has been in continuous print ever since. In many years it is the bestselling Christian book in America.',
      'What Chambers would have made of this is impossible to know. He spent his ministry preparing others and accepting assignments that did not obviously lead anywhere public. He never had a large platform. He died in a military camp in Egypt, largely unknown outside the circles he had personally touched. The work that outlasted him was done by someone else. His only contribution was to live in a way that made the work worth preserving.',
    ],
  },

  {
    id: 'william-wilberforce-faith-as-public-action',
    type: 'LIFE',
    title: 'He spent 20 years losing before he won',
    source: 'William Wilberforce',
    body: 'Wilberforce introduced his first bill to abolish the British slave trade in 1791. It was defeated. He introduced it again. Defeated again. For two decades he kept returning. The Slave Trade Act finally passed in 1807. He spent the rest of his life working toward full emancipation, which came three days before he died in 1833. His faith was not the reason he felt good about the cause. It was the reason he did not stop.',
    pullQuote: 'So enormous, so dreadful, so irremediable did the trade\'s wickedness appear that my own mind was completely made up for abolition.',
    takeaway: 'Persistence on a right cause is itself a form of faithfulness, regardless of how long it takes.',
    time: '4 min read',
    fullBody: [
      'William Wilberforce was elected to Parliament at 21. He was wealthy, charming, well-connected, and at that point not particularly interested in the welfare of enslaved people. His conversion to serious Christian faith in 1785 changed the trajectory of his life in ways he did not immediately understand.',
      'He considered leaving politics for ministry. John Newton, the former slave trader who had written Amazing Grace, advised him otherwise. Newton told Wilberforce that God had raised him up for the good of the church and for the good of the nation, and that his place was Parliament. Wilberforce stayed.',
      'He began his parliamentary campaign against the slave trade in 1787. He gathered evidence, built alliances, endured personal attacks, and introduced bill after bill. The opposition was not merely commercial. It was systemic. The slave trade was the economic foundation of the British Empire\'s Atlantic operations. The people who profited from it were powerful and organised.',
      'The Slave Trade Act passed in 1807 after 20 years of effort. It banned British ships from participating in the slave trade but did not free the people already enslaved in British colonies. Wilberforce spent the remaining 26 years of his life working toward full emancipation. He retired from Parliament in 1825 but continued to write, advocate, and fundraise.',
      'The Slavery Abolition Act, which finally granted freedom to enslaved people across most of the British Empire, received royal assent on July 26, 1833. Wilberforce died three days later, on July 29. Whether he knew the bill had passed is not entirely certain. Whether it mattered to him by then is also not entirely clear. He had spent his adult life on this. The outcome was not the point. The faithfulness was.',
    ],
  },

  {
    id: 'fanny-crosby-blind-hymn-writer',
    type: 'LIFE',
    title: 'She was blind from six weeks old and wrote over 8,000 hymns',
    source: 'Fanny Crosby',
    body: 'Fanny Crosby lost her sight at six weeks old due to a medical error. She lived to 94 and wrote more hymns than any other person in Christian history, including Blessed Assurance and To God Be the Glory. She reportedly said she was grateful for her blindness because the first face she would ever see would be Jesus. Whether or not that quote is perfectly recorded, her life made it credible.',
    pullQuote: 'It seemed intended by the blessed providence of God that I should be blind all my life.',
    takeaway: 'What looks like limitation from the outside can be the very thing that focuses a life into something extraordinary.',
    time: '3 min read',
    fullBody: [
      'Frances Jane Crosby was born in 1820 in Putnam County, New York. At six weeks old she developed an eye inflammation. The doctor who treated her applied the wrong remedy. She was permanently blind before she was two months old. The doctor reportedly never recovered from his mistake and left the area. Fanny, by her own account, harboured no resentment toward him.',
      'She began writing poetry at eight. At fifteen she enrolled at the New York Institution for the Blind, where she eventually became a teacher. She was something of a celebrity student: she recited poetry before Congress, met several presidents, and was widely known in New York literary and religious circles.',
      'Her hymn-writing career began seriously in her forties, when she entered a collaborative relationship with composer William Bradbury. She wrote prolifically and quickly: she reportedly composed entire hymns in her head before dictating them, and could produce multiple finished pieces in a single sitting. At one point publishers asked her to use pseudonyms because her name appeared so frequently in hymnals that readers might assume the church had only one writer.',
      'Blessed Assurance, To God Be the Glory, Pass Me Not O Gentle Savior, Rescue the Perishing: these are among the approximately 8,000 hymns attributed to her, though some estimates run higher. Many were written under dozens of pen names at the request of publishers. The full count may never be known.',
      'She lived to 94 and kept writing almost until the end. She gave generously from the modest fees she earned and lived simply. When asked about her blindness she consistently refused to treat it as a tragedy. She said it had concentrated her mind on things that sighted people found easier to overlook. Whether or not she was right about the theology of her situation, the body of work she produced from within it is its own kind of answer.',
    ],
  },

  {
    id: 'augustine-confessions-conversion',
    type: 'LIFE',
    title: 'The man who prayed "make me holy, but not yet"',
    source: 'Augustine of Hippo',
    body: 'Augustine wrote the first memoir in Western literature. Confessions is the account of a man who knew what he should do and kept choosing otherwise for years. His conversion came not through argument but through a child\'s voice, a page of scripture, and a moment in a garden. He became one of the most influential theologians in Christian history. The prayer "make me holy, but not yet" is from his own account of where he was before that day.',
    pullQuote: 'Our heart is restless until it rests in You.',
    takeaway: 'The distance between knowing what is right and doing it is where most of us actually live. Augustine is evidence it can close.',
    time: '5 min read',
    fullBody: [
      'Augustine was born in 354 AD in Thagaste, in what is now Algeria. His mother Monica was a devout Christian. His father Patricius was not. Augustine received a Christian education but spent most of his young adult life deliberately moving away from it: he took a mistress at 17, fathered a son, pursued a career in rhetoric, and experimented with Manichaeism, a philosophical system that offered a more intellectually respectable framework than the Christianity he had grown up with.',
      'He was, by his own account, thoroughly aware of the gap between where he was and where he should be. The prayer "make me chaste and continent, but not yet" is his own. He records it not as a curiosity but as an honest description of a man who genuinely wanted both things at once, the pleasure he had and the peace he didn\'t.',
      'He eventually moved to Milan, where he came under the influence of Bishop Ambrose. Ambrose\'s preaching impressed him: here was Christianity presented with the intellectual seriousness that Augustine\'s Manichaean friends had claimed it lacked. He began reading Paul\'s letters. The arguments were moving him somewhere he was still resisting.',
      'The conversion moment came in a garden in Milan in 386 AD. Sitting in distress, he heard a child\'s voice, whether real or imagined he was never certain, repeating "take up and read." He opened Paul\'s letter to the Romans at random and read a passage about putting on Christ and making no provision for the desires of the flesh. Something shifted. He described it as the light of certainty flooding his heart.',
      'He became a bishop, a theologian, and arguably the single most influential thinker in Western Christianity. His writing shaped Catholic and Protestant theology alike. His City of God, his letters, his sermons: the output was enormous. But Confessions remains the most personal and the most read, because it is addressed not to posterity but to God, and it is honest about the years before the garden in a way that most spiritual autobiography is not.',
    ],
  },

  {
    id: 'charles-spurgeon-prince-of-preachers',
    type: 'LIFE',
    title: 'He preached to 10 million people before radio existed',
    source: 'Charles Spurgeon',
    body: 'Spurgeon preached his first sermon at 16. By 19 he was the most popular preacher in London. By the end of his life his sermons had been translated into more languages than any other Christian writing outside the Bible. He also suffered severe depression and wrote about it openly at a time when no one in ministry did. His honesty about the darkness makes his faith in the light more credible, not less.',
    pullQuote: 'I know what it is to be in the dark, and I know what it is to be brought out of it.',
    takeaway: 'Spurgeon\'s usefulness was not diminished by his suffering. In many cases, it was produced by it.',
    time: '4 min read',
    fullBody: [
      'Charles Haddon Spurgeon was born in Essex in 1834 and converted at 15 when, caught in a snowstorm, he ducked into a small Methodist chapel and heard a lay preacher deliver a short message on Isaiah 45:22: "Look unto me and be saved." He looked. He was 15.',
      'He preached his first sermon at 16, filling in for someone who had not shown up. He was invited back. Within a year he had a regular congregation. By 19 he had been called to New Park Street Chapel in London, one of the most prominent Baptist churches in the city. The congregation outgrew the building within months.',
      'He eventually moved to the Metropolitan Tabernacle, built to hold 5,500. It was routinely full. In an era before amplification, Spurgeon had a voice and a presence that contemporaries struggled to describe without resorting to superlatives. Weekly attendance across his ministry, calculated over his lifetime, is estimated at 10 million people.',
      'His sermons were transcribed weekly and distributed as pamphlets. They were translated into dozens of languages. He founded a pastor\'s college, an orphanage, and wrote prolifically. He also suffered attacks of severe depression throughout his adult life. He did not hide this. He preached about it from the pulpit, wrote about it in letters and sermons, and treated it as a real and serious part of his experience rather than a failure of faith.',
      'He died in 1892, worn out at 57. The depression, the physical ailments that accumulated through his fifties, the theological controversies he had navigated. He died in Mentone, France, where he had retreated for his health. His wife Susannah, who had been largely housebound for years with her own illness, lived another ten years. She had spent much of their marriage reading his sermons aloud rather than hearing them in person. He had found a way to make sure she never missed them.',
    ],
  },

  // ─── BOOKS ──────────────────────────────────────────────────────────────────

  {
    id: 'mere-christianity-lewis',
    type: 'BOOK',
    title: 'Mere Christianity',
    source: 'C.S. Lewis · 1952',
    body: 'Lewis originally delivered these ideas as BBC radio talks during World War II, to a country exhausted by destruction and short on reasons for hope. The argument he makes for the reasonableness of Christian belief has not dated. Christianity Today called it the best case for orthodox Christianity in print. It was voted the most influential Christian book of the 20th century.',
    pullQuote: 'If I find in myself desires which nothing in this world can satisfy, the only logical explanation is that I was made for another world.',
    takeaway: 'Lewis built a case for Christianity not from emotion but from the logic of human experience, and it still holds.',
    time: '5 min read',
    fullBody: [
      'Mere Christianity began as a series of radio broadcasts Lewis gave for the BBC between 1941 and 1944. Britain was at war. The talks were practical, unornate, and addressed to people who had no particular reason to believe anything was true. Lewis was not speaking to believers. He was speaking to anyone willing to follow an argument.',
      'The first section, "Right and Wrong as a Clue to the Nature of the Universe", starts not with scripture but with the observation that human beings quarrel. When they quarrel they appeal to a standard both parties are expected to recognise. That standard, Lewis argued, is not something any culture invented. It shows up everywhere, in every culture, in every era. He called it the Natural Law, and he used it as the opening premise of an argument for a moral lawgiver.',
      'From there the book moves through the case for theism, then for Christianity specifically, and then into its most practically influential section: the description of Christian behaviour and the nature of morality. The chapter on pride as the "great sin" has been cited by readers across denominational lines as the most uncomfortable and useful thing they have ever read.',
      'The book was never written as a book. Lewis assembled the radio talks into their final form and added connecting material. The result is unusually readable for apologetics, with the rhythm of spoken argument rather than written theology, and Lewis had a gift for analogy that makes abstract positions feel immediately concrete.',
      'It has been in print continuously since 1952. It has often been described as one of the books that brought many readers to Christian faith in the 20th century. Its influence on sceptical readers is reflected in the many testimonies published about it.',
    ],
  },

  {
    id: 'cost-of-discipleship-bonhoeffer',
    type: 'BOOK',
    title: 'The Cost of Discipleship',
    source: 'Dietrich Bonhoeffer · 1937',
    body: 'Written in 1937 while Bonhoeffer was running an illegal seminary in Nazi Germany, this book makes the case that a Christianity that costs nothing is worth nothing. The chapter on cheap grace has been cited by readers across every denomination as the thing that changed how they understood their faith. One reviewer wrote: it leaves you wondering why you ever thought compromise was an option.',
    pullQuote: 'When Christ calls a man, he bids him come and die.',
    takeaway: 'A faith that requires nothing of you is not the faith of the New Testament.',
    time: '5 min read',
    fullBody: [
      'Bonhoeffer wrote The Cost of Discipleship while running an underground seminary at Finkenwalde in 1935 to 37, after the Nazi regime had banned him from university teaching. His students were pastors in training for a church that was rapidly being co-opted by the state. The book was both theology and warning.',
      'The opening chapter on cheap grace and costly grace is the heart of the book and the section most frequently quoted. Cheap grace, Bonhoeffer writes, is "grace without discipleship, grace without the cross, grace without Jesus Christ, living and incarnate." It is the grace we grant ourselves, the assurance that God forgives without any expectation that the forgiven person will change.',
      'Costly grace is different. It is costly because it costs a person their life. It is grace because it gives a person their life back. The paradox is intentional. Bonhoeffer was not arguing that grace is earned. He was arguing that genuine grace is transformative by nature, and that a grace which leaves a person undisturbed has not actually been received.',
      'The second half of the book is an extended meditation on the Sermon on the Mount, not as an impossible ideal but as a description of what the life of a disciple actually looks like. Bonhoeffer read Matthew 5 to 7 with radical literalism and considerable discomfort. He thought the church had spent centuries finding sophisticated reasons not to do what it said.',
      'The book was written in a context of acute pressure. Bonhoeffer\'s students were young men who were about to be tested. The theology he taught them was not an academic exercise. It was preparation. Several of those students died in the war. Bonhoeffer died at Flossenbürg in 1945. The text has the weight of a document written by someone who intended to live by it.',
    ],
  },

  {
    id: 'pursuit-of-god-tozer',
    type: 'BOOK',
    title: 'The Pursuit of God',
    source: 'A.W. Tozer · 1948',
    body: 'Tozer wrote this book in one sitting on an overnight train. It shows: it reads with a focus and directness that most books take years to achieve. The central argument is that the Christian life is not a set of beliefs to hold but a relationship to pursue, and that most Christians have settled for far less than what is available to them. It is short, dense, and has never gone out of print.',
    pullQuote: 'Come near to the holy men and women of the past and you will soon feel the heat of their desire after God.',
    takeaway: 'Tozer\'s central claim: most Christians have settled for knowing about God rather than knowing God, and the distance between those two is entirely closeable.',
    time: '4 min read',
    fullBody: [
      'A.W. Tozer wrote The Pursuit of God on a train journey to Texas in 1948. He had no outline. He wrote the preface on his knees in the train\'s observation car. The book was finished before he arrived. It is 128 pages and has been in print continuously for over 75 years.',
      'The argument begins with a distinction Tozer considered foundational: the difference between possessing truth and being pursued by God. Orthodoxy, correct belief, is necessary but not sufficient. A person can hold entirely correct theological positions and still, in the most important sense, not know God. Tozer thought this was the normal condition of a large part of the church.',
      'He writes about the "veil" that separates the believer from the reality of God\'s presence, a veil he identifies not as unbelief but as the self, the ego, the habits of self-reference, the elaborate internal commentary that keeps a person\'s attention turned inward rather than upward. Tearing through this veil, he argues, is the work of the Christian life.',
      'Several chapters have become quoted widely enough to function almost independently: the chapter on the blessedness of possessing nothing, which argues that the only safe disposition toward any good thing is to hold it with an open hand; the chapter on the speaking voice of God, which argues that God is still speaking and that the problem is not reception but attention.',
      'Tozer was pastor of a church in Chicago for most of his ministry. He had no academic degree. He taught himself by reading voraciously and spending long hours in prayer. The Pursuit of God is the most complete record of what he found in those hours. It reads like a book written by someone who had been there and wanted to show others the way in.',
    ],
  },

  {
    id: 'confessions-augustine',
    type: 'BOOK',
    title: 'Confessions',
    source: 'Augustine of Hippo · ~400 AD',
    body: 'Written around 400 AD, Confessions is not a theology textbook. It is a prayer. Augustine is talking directly to God about his own life, his failures, his restlessness, and the moment everything changed. It is the first autobiography in Western literature and one of the most quoted books in Christian history. The opening line, "our heart is restless until it rests in you," has been cited for 1,600 years because it keeps being true.',
    pullQuote: 'You have made us for yourself, O Lord, and our heart is restless until it rests in You.',
    takeaway: 'Confessions is proof that the most useful spiritual writing comes from people who are honest about where they started.',
    time: '5 min read',
    fullBody: [
      'Augustine wrote Confessions around 397 to 400 AD, about a decade after his conversion. He was a bishop by then, a public figure with considerable theological authority. He wrote the book as a prayer, addressed directly to God, reviewing his life from childhood to his mid-thirties with striking and sometimes painful honesty.',
      'The opening sentence sets the tone: "You have made us for yourself, O Lord, and our heart is restless until it rests in You." It is the thesis of everything that follows. Augustine\'s account of his own restlessness: his sexual compulsion, his intellectual pride, his inability to commit to anything that required genuine self-surrender, is not a confession in the penitential sense. It is an exploration of why the things he reached for never satisfied what he was actually looking for.',
      'Books 1 to 9 cover his life up to and including his conversion and the death of his mother Monica, who spent decades praying for him. The relationship between Augustine and Monica is one of the most fully rendered mother-son relationships in ancient literature. Her faith in him was persistent to the point of being sometimes excessive. A bishop once told her, in an attempt to end the conversation, that it was impossible that the son of so many tears could be lost.',
      'Books 10 to 13 shift from autobiography to theology, an extended meditation on memory, time, and the nature of creation. These sections are less frequently quoted but contain some of Augustine\'s most original thinking, including his argument that time itself is a feature of creation rather than a container it exists within.',
      'The book has never stopped being read. It was copied by monks in the medieval period, printed in the first decades of the printing press, translated into every major language, and continues to appear on syllabi in philosophy, theology, and literature departments. Its persistence is not explained by its historical importance alone. It is explained by the fact that the restlessness Augustine describes, and the answer he eventually found, remains recognisably human sixteen centuries later.',
    ],
  },

  {
    id: 'my-utmost-chambers',
    type: 'BOOK',
    title: 'My Utmost for His Highest',
    source: 'Oswald Chambers · 1927',
    body: 'Published in 1927, ten years after Chambers died, this is the best-selling Christian devotional of all time. Each entry is short, direct, and frequently uncomfortable. Chambers does not write to make you feel better. He writes to make you think more clearly about what you actually believe and whether you are living accordingly. The book was compiled from his lecture notes by his wife. He never saw it published.',
    pullQuote: 'God engineers our circumstances as He sees fit.',
    takeaway: 'Chambers wrote to disturb complacency, not comfort it, and that is why the book has outlasted almost everything else in the genre.',
    time: '3 min read',
    fullBody: [
      'My Utmost for His Highest is structured as a daily devotional, with 366 entries, one for each day of the year. Each entry is short, usually less than 400 words, based on a single scripture verse, and written with a directness that most devotional literature deliberately avoids. Chambers was not trying to encourage you. He was trying to clarify your thinking and, where necessary, challenge your assumptions.',
      'The entries were assembled by his wife Biddy from transcripts of his talks and lectures, delivered primarily at Bible Training College in London between 1911 and 1915. She had attended every session with a shorthand notebook. After his death in Egypt in 1917 she spent years organising the material and preparing it for publication. The book appeared in 1927.',
      'What distinguishes My Utmost from other devotionals is its refusal to offer comfort as a primary product. Chambers believed that a Christianity focused on feeling better was a distorted Christianity. His entries regularly challenge readers to examine whether their spiritual life is built on genuine encounter with God or on the emotional residue of past experiences. The distinction matters, he argued, because the residue fades and you need to know what is underneath.',
      'Some of his most quoted passages deal with the relationship between circumstances and faith. He argued that God engineers circumstances, not to punish or reward but to develop. The discomfort you are in, his writing suggests, is more likely purposeful than accidental. Whether readers find this encouraging or disturbing tends to depend on their circumstances at the time of reading.',
      'The book has sold millions of copies and has been in continuous print since 1927. It was for many years the bestselling devotional in the American market. It is the kind of book people return to for decades, finding different entries relevant at different points. Chambers did not live to see any of this. His wife did. She outlived him by 49 years.',
    ],
  },

  // ─── HISTORY ────────────────────────────────────────────────────────────────

  {
    id: 'council-of-nicaea-325ad',
    type: 'HISTORY',
    title: 'The meeting that defined what Christianity believes about Jesus',
    source: 'Church History · 325 AD',
    body: 'In 325 AD, Emperor Constantine called 300 bishops to Nicaea to settle one question: was Jesus fully God or a created being? The Arian position argued the latter. Athanasius, still a deacon at the time, argued the former with a ferocity that got him exiled five times. The council ruled in his favor. The Nicene Creed, still recited in churches today, is the result of that argument.',
    pullQuote: 'Athanasius contra mundum: Athanasius against the world.',
    takeaway: 'The doctrine at the centre of Christian faith was settled not by consensus but by one man\'s refusal to yield when the majority disagreed.',
    time: '4 min read',
    fullBody: [
      'The Arian controversy began in Alexandria around 318 AD when a priest named Arius began teaching that the Son of God was not co-eternal with the Father but had been created, the first and greatest of all creatures, but a creature nonetheless. The formula attributed to him was "there was a time when he was not." The position spread rapidly because it was, in some ways, easier to comprehend than its alternative.',
      'Emperor Constantine, recently victorious and eager for unity across an empire he had just consolidated, called a council at Nicaea in 325 AD to settle the matter. Approximately 300 bishops attended. The debate was not a polite theological seminar. It involved personal confrontations, accusations, and at least one account of Arius being struck by Nicholas of Myra, the historical Santa Claus, though this story is disputed.',
      'Athanasius, the bishop\'s deacon at the time, was not a bishop and could not vote. He argued on the floor with a passion that made him enemies. His position, that the Son was of the same substance as the Father, homoousios, was adopted in the council\'s creed. Arius was condemned and exiled.',
      'The controversy did not end there. Over the following decades, various emperors favoured different positions, and Athanasius was exiled five times, sometimes by emperors, sometimes by councils that reversed Nicaea\'s decision. He spent a total of 17 years in exile. He is remembered by the phrase "Athanasius contra mundum, meaning Athanasius against the world.',
      'The Nicene Creed, finalised at the Council of Constantinople in 381 AD, is the form still recited in Catholic, Orthodox, Anglican, and many Protestant liturgies today. The line "God from God, Light from Light, true God from true God, begotten not made, of one substance with the Father" is the direct result of Athanasius\'s refusal to yield when the consensus was against him.',
    ],
  },

  {
    id: 'reformation-1517-luther',
    type: 'HISTORY',
    title: 'The document that split Western Christianity in two',
    source: 'Martin Luther · 1517',
    body: 'On October 31 1517, Martin Luther nailed 95 theses to the door of a church in Wittenberg. He was not trying to start a revolution. He was inviting a debate about the sale of indulgences, pieces of paper the church sold as reduction of punishment for sin. The debate got out of hand. Within three years Luther had been excommunicated and half of Europe was reconsidering what the church had the authority to say and sell.',
    pullQuote: 'Here I stand. I can do no other.',
    takeaway: 'The Reformation was started by one monk trying to have a theological debate, and accidentally changed the course of Western history.',
    time: '4 min read',
    fullBody: [
      'Martin Luther was 33 years old and an Augustinian monk when he nailed his 95 Theses to the door of the Castle Church in Wittenberg on October 31, 1517. The door functioned as a public notice board. Posting a list of propositions for academic debate was a standard procedure. Luther expected a debate among scholars.',
      'The theses focused primarily on the sale of indulgences, a practice by which the church offered remission of punishment for sin in exchange for money. Johann Tetzel, a Dominican friar, had been selling them with a slogan commonly paraphrased as: "As soon as the coin in the coffer rings, the soul from purgatory springs." Luther found this theologically indefensible and said so, in 95 numbered propositions.',
      'What happened next surprised everyone, including Luther. The printing press had been in operation in Europe for about 60 years. Someone translated the theses from Latin into German and printed them. Within weeks they had spread across Germany. Within months they were circulating across Europe. Luther had accidentally produced one of the first viral documents in the history of media.',
      'The church\'s response was to demand Luther recant. He refused. The debate escalated. In 1521 he was summoned before the Diet of Worms, an assembly convened by Emperor Charles V, and asked to withdraw his writings. His response, "Here I stand; I cannot do otherwise; God help me", is possibly the most famous sentence in the history of the Reformation, though historians debate the exact wording.',
      'He was excommunicated and declared an outlaw. He was hidden by sympathetic German princes and spent the time translating the New Testament into German, the version of the Bible that shaped the German language for centuries. The church he had not intended to split became the Lutheran church, and the larger Protestant movement he had not intended to found eventually encompassed hundreds of denominations across the world.',
    ],
  },

  // ─── TEACHING ───────────────────────────────────────────────────────────────

  {
    id: 'smith-wigglesworth-faith-and-action',
    type: 'TEACHING',
    title: 'Faith that does not act is not faith',
    source: 'Smith Wigglesworth',
    body: 'Wigglesworth was an illiterate plumber from Bradford who taught himself to read using only the Bible. His central teaching was that faith is not a feeling you wait for but a decision you act on before the evidence arrives. Accounts of his ministry are among the most widely circulated from the 20th century healing revival, though their documentation varies. Love him or question him, the directness of his teaching has not softened with time.',
    pullQuote: 'Great faith is the product of great fights. Great testimonies are the outcome of great tests.',
    takeaway: 'Faith is not the absence of difficulty. It is the decision to act as if the promise is true before the circumstances agree.',
    time: '3 min read',
    fullBody: [
      'Smith Wigglesworth was born in Menston, Yorkshire in 1859. He came from a poor family and began working in the fields at age six. He could not read. He was converted to faith early and encountered the Salvation Army in his teens, through which he developed a passion for evangelism that never left him.',
      'He trained as a plumber, married a woman named Polly who was a capable preacher, and ran a plumbing business in Bradford. Polly taught him to read. He used the Bible as his primary text and for many years, by his own account, would not read any other book: he was afraid that reading other people\'s interpretations might contaminate his direct engagement with the text.',
      'His public ministry began seriously in his forties, after what he described as an encounter with the Holy Spirit that changed how he prayed for others. He began travelling widely, first in Britain and then internationally, preaching and praying for healing. Accounts from his meetings were published by doctors, journalists, and church officials across multiple countries, though the claims vary in their documentation.',
      'His theology was simple and blunt: faith is not a feeling you cultivate. It is a decision you make in advance of the evidence. If God\'s word says something is true, you act on it as if it is true, before your circumstances confirm it. Waiting for the feeling is, in Wigglesworth\'s view, a failure of faith rather than an expression of it.',
      'He was not an easy person. He was direct to the point of abrasiveness and had little patience for what he considered half-measures in faith. He died in 1947 at 87, reportedly collapsing at a funeral service. He had apparently told people years earlier that he intended to die at a funeral, as he had always found it easier to raise people from the dead than to mourn them. Whether or not that story is precisely accurate, it captures something real about the way he lived.',
    ],
  },

  // ─── MIRACLES & SUPERNATURAL ENCOUNTERS ────────────────────────────────────

  {
    id: 'kenneth-hagin-believers-authority-healing',
    type: 'MIRACLE',
    title: "The Believer's Authority in Healing",
    source: 'Kenneth E. Hagin',
    body: "According to Kenneth Hagin's autobiographical account, he was bedridden as a teenager with a deformed heart and paralyzed body. He wrote that studying Mark 11:23-24 led him to step out of bed healed, and he spent sixty years teaching that God's healing power is available today.",
    pullQuote: 'Faith begins where the will of God is known.',
    takeaway: "God's healing power does not depend on human strength. It answers bold, humble trust in His Word.",
    time: '3 min read',
    fullBody: [
      'Kenneth E. Hagin was born with a deformed heart and an incurable blood disease. By age fifteen, doctors in McKinney, Texas, informed his family that he was bedridden and had only months to live.',
      'During sixteen months confined to bed, he read the Bible continuously. He reached Mark 11:23-24, where Jesus declared that whoever believes what they say will come to pass shall have whatever they say.',
      'He realized that believing precedes seeing. On an August morning in 1934, despite paralysis, he swung his legs over the bed, stood by faith, and his heart and body were instantly restored.',
      'Hagin spent the next sixty years ministering across the globe, teaching that divine healing is not a lottery, but a covenant inheritance purchased by Christ at Calvary.',
    ],
  },


  {
    id: 'andrew-wommack-grace-and-faith-healing',
    type: 'FAITH',
    title: 'Grace and Faith in Manifesting Healing',
    source: 'Andrew Wommack',
    body: 'Andrew Wommack transformed modern Christian thinking by showing that healing is not something God decides on a whim. Through Christ\'s finished work at the cross, healing has already been provided, and biblical faith simply reaches out to receive what grace has already supplied.',
    pullQuote: 'Faith does not force God to move. Faith receives what God has already provided through grace.',
    takeaway: 'Stop trying to convince God to heal. Rest in what Christ has already purchased and receive it with gratitude.',
    time: '3 min read',
    fullBody: [
      'For years, Andrew Wommack wrestled with the question of why some people receive healing while others do not. The prevailing belief was that God sovereignly chooses to heal some while allowing others to suffer to teach them lessons.',
      'Through intensive study of the Gospels and Paul\'s epistles, Wommack arrived at a liberating realization: God is not withholding healing. At the cross, Jesus bore our sicknesses just as He bore our sins (1 Peter 2:24).',
      'Grace made the provision two thousand years ago; faith is simply the hand that reaches out to take what has already been provided. Healing is therefore not a matter of begging an unwilling God, but of exercising authority over sickness in Jesus\' name.',
      'This revelation has produced countless testimonies of recovery from cancer, paralysis, and terminal illness worldwide, grounding believers in the unconditional goodness of God.',
    ],
  },

  // ─── BACKBONE ROSTER: HEALING & DIVINE HEALTH ───────────────────────────────

  {
    id: 'derek-prince-covenant-healing',
    type: 'TEACHING',
    title: 'Healing is a covenant right, not a lottery',
    source: 'Derek Prince',
    body: 'Derek Prince argued that healing is not something God randomly grants to some and withholds from others. In his reading of scripture, it is a covenant provision connected to forgiveness. Prince spent decades teaching believers to approach healing the way they approach salvation: not with performance or pleading but with knowledge of what he believed had already been secured.',
    pullQuote: 'The same sacrifice that provided forgiveness provided healing. You cannot logically accept one and reject the other.',
    takeaway: 'Healing is not a mystery to be solved. It is a provision to be received, on the same terms as every other promise in the covenant.',
    time: '3 min read',
    fullBody: [
      'Derek Prince came to the subject of healing not through a dramatic miracle but through careful study. His Cambridge training had made him instinctively suspicious of theological shortcuts, and he brought the same rigour to Isaiah 53 and Matthew 8:17 that he brought to every other passage. What he found, he argued, was not ambiguity but clarity.',
      'The argument begins with the atonement. Isaiah 53:4-5 states that the suffering servant bore our diseases and by his wounds we are healed. Matthew 8:17 quotes this passage explicitly in connection with Jesus healing the sick. Peter echoes it in 1 Peter 2:24. Prince\'s conclusion was that if the text means what it says, healing is not a sovereign option God exercises case by case. It is a provision already secured in the same redemptive event that secured forgiveness.',
      'He anticipated the obvious objection: why do people remain sick if healing is a covenant right? His answer was not that healing is guaranteed on demand but that the failure is consistently on the receiving end, not the giving end. Lack of knowledge, unconfessed sin, failure to act in faith, these are the variables, not the will of God. He was careful to say this without condemnation, but he would not soften the logical structure of his argument to make people more comfortable.',
      'The practical consequence of his teaching was to move people out of a posture of petition, asking God to do something he may or may not choose to do, into a posture of appropriation, laying hold of something that has already been done. That shift in posture, he argued, is not presumption. It is exactly what the New Testament models.',
      'Prince lived to 88 and was known throughout his ministry for his own robust health, which he did not claim as a personal achievement but as a natural consequence of taking God\'s word at face value. Whether or not you land where he did on every point, the rigour of his engagement with the text is worth sitting with.',
    ],
  },

  {
    id: 'reinhard-bonnke-fire-of-the-holy-spirit',
    type: 'TEACHING',
    title: 'The Holy Spirit is not a feeling. He is a fire.',
    source: 'Reinhard Bonnke',
    body: 'Reinhard Bonnke preached across Africa for decades to crowds of hundreds of thousands, and the consistent centre of his message was not technique or formula but the person and fire of the Holy Spirit. He argued that a church without the Holy Spirit\'s fire is a church that has lost its irreplaceable engine, and that the solution is never organizational but personal: surrender, invitation, and willingness to be changed.',
    pullQuote: 'Evangelism is not a human enterprise assisted by God. It is a divine enterprise that uses humans.',
    takeaway: 'The power that moved through the early church is the same power available now. The question is never whether it is available. It is whether we are willing.',
    time: '3 min read',
    fullBody: [
      'Bonnke\'s theology of the Holy Spirit was formed on the mission field rather than in a seminary. He had been theologically trained in Germany, but it was the African crusades that tested and shaped everything he believed about how God moves in human history. What he observed across decades of mass evangelism was that the Spirit\'s work was not evenly distributed: it was concentrated where hunger was concentrated.',
      'His central argument was that the Holy Spirit is not a supplement to the Christian life. He is the Christian life. The book of Acts, Bonnke argued, is not a historical curiosity about how the early church operated before the canon was closed. It is a template. The same Spirit who fell at Pentecost, who healed the lame man at the Beautiful Gate, who moved through Philip in Samaria, is present and available in exactly the same measure today.',
      'This is not an argument he made abstractly. He made it in stadiums and open fields across Nigeria, Ghana, Kenya, and Zimbabwe, and what happened in those places was, by his account, consistent evidence. The deaf heard. The lame walked. People who had never heard the gospel responded to it in tens of thousands at a single service. He did not attribute this to his own gifts or methods. He was consistent on this point to the point of tedium: the work was the Spirit\'s, not his.',
      'He was direct about what he considered the main obstacle in the Western church: respectability. The desire to present Christianity as reasonable, orderly, and socially acceptable had, in his view, produced a church that had managed to make the Holy Spirit feel unwelcome. The fire of Acts, he said, does not accommodate itself to the comfort levels of its host. It burns.',
      'His invitation was simple. Not a technique to master or a doctrine to accept but a personal surrender to the same Spirit who hovered over the waters at creation and fell on the disciples at Pentecost. He believed that surrender was still available to anyone willing to make it.',
    ],
  },

  // ─── BACKBONE ROSTER: KINGDOM LIVING & PURPOSE ──────────────────────────────

  {
    id: 'myles-munroe-kingdom-over-religion',
    type: 'TEACHING',
    title: 'Jesus did not come to start a religion. He came to restore a kingdom.',
    source: 'Myles Munroe',
    body: 'Myles Munroe spent his career making one argument: that the gospel of the kingdom is not primarily about getting people to heaven. It is about restoring God\'s original mandate for humanity to govern the earth. That reframe changes everything: what prayer is, what work means, what leadership requires, and why purpose matters more than success.',
    pullQuote: 'The greatest tragedy in life is not death. It is a life without purpose.',
    takeaway: 'You were not created to be religious. You were created to represent a king and govern a domain. Those are not the same thing.',
    time: '4 min read',
    fullBody: [
      'Munroe\'s foundational argument was that the church had largely preached a truncated gospel. The gospel of salvation, as typically presented, answers the question of what happens when you die. The gospel of the kingdom, as Jesus preached it, answers the much larger question of why you are alive. These are not the same gospel, and confusing them produces a Christianity that is personally comforting but publicly ineffective.',
      'He started with Genesis 1:26-28: God\'s original mandate to humanity was to be fruitful, multiply, fill the earth, and have dominion. This was not a performance target. It was a design specification. Human beings were made to be governors, representing heaven\'s values and authority in the earth. The fall did not cancel that mandate. It corrupted the governor.',
      'The cross, in Munroe\'s framework, was not primarily a rescue operation to extract souls from a burning world. It was a restoration of the original mandate. Christ, as the last Adam, recovered what the first Adam forfeited: the legitimate authority to govern the earth under God\'s kingship. The Spirit\'s indwelling is not a consolation prize for people waiting to leave. It is the reinstatement of the credentials needed to govern.',
      'The practical implications ran through everything he taught. Why work matters: because your occupation is a domain of governance, not merely a means of income. Why leadership is sacred: because authority exercised well reflects the character of the king whose name it carries. Why gifting must be developed rather than dormant: because buried potential is, in his famous formulation, the real wealth of the graveyard.',
      'He addressed presidents and parliaments with this framework, arguing that the dysfunction of nations was not primarily economic or political but spiritual: a crisis of purpose at the individual level, multiplied at scale. Whether or not every leader who heard him was persuaded, the framework was coherent, and the audiences kept requesting him back.',
    ],
  },

  {
    id: 'ew-kenyon-new-creation-identity',
    type: 'TEACHING',
    title: 'You are not a sinner trying to become righteous. You are a new creation.',
    source: 'E.W. Kenyon',
    body: 'E.W. Kenyon spent decades arguing that the church had systematically underread 2 Corinthians 5:17. When Paul says the one who is in Christ is a new creation, he does not mean a reformed character or an improved version of the old person. He means something has been replaced. The identity crisis at the centre of most Christian defeat, Kenyon argued, comes from living out of the old description rather than the new one.',
    pullQuote: 'You are what God says you are, not what your feelings, your past, or your circumstances say you are.',
    takeaway: 'Identity precedes behaviour. Trying to act like a new creation before you know you are one produces performance. Knowing who you are produces change.',
    time: '3 min read',
    fullBody: [
      'Kenyon was writing in an era when the dominant model of Christian growth was moral effort: you were a sinner saved by grace, and the ongoing project was to sin less. He had enormous respect for the sincerity of that effort. His problem was not with the motivation but with the starting premise. If you begin with the identity of a sinner trying to improve, you build on the wrong foundation.',
      'His argument was rooted in Paul\'s language in 2 Corinthians 5:17: "If anyone is in Christ, he is a new creation. The old has gone. The new has come." Kenyon read this as an ontological statement, a claim about what a person actually is, not what they are becoming. The new creation is not a spiritual aspiration. It is a present reality that faith must learn to inhabit.',
      'This had direct consequences for prayer, for confession, and for how a believer responds to sickness, failure, and condemnation. If you are a new creation, confessing the old identity is not humility. It is inaccuracy. Kenyon\'s insistence on speaking in line with scripture rather than in line with circumstances was not positive thinking dressed in religious language. It was, in his view, a commitment to saying what God says about a situation rather than what the situation says about itself.',
      'His framework influenced decades of subsequent teaching, including figures who acknowledged the debt and some who did not. The core insight, that the believer\'s primary problem is not sin management but identity confusion, has proven durable enough to outlast controversies about how far individual teachers extended it.',
      'The practical entry point Kenyon always returned to was simple: read the epistles with the question, "who does this say I am?" rather than "what does this tell me to do?" The doing, he argued, follows naturally once the being is settled. Most Christians reverse the order and wonder why the effort is exhausting.',
    ],
  },

  {
    id: 'joyce-meyer-renewing-the-mind',
    type: 'TEACHING',
    title: 'Your life follows your thoughts. Change what you think, change what you live.',
    source: 'Joyce Meyer',
    body: 'Joyce Meyer built one of the most practically influential teaching ministries of the last thirty years around a single Pauline instruction: be transformed by the renewing of your mind. Her argument is not self-help dressed as theology. It is that the battleground where most spiritual victories are won or lost is not circumstantial but mental, and that scripture gives specific tools to fight there.',
    pullQuote: 'You cannot have a positive life and a negative mind.',
    takeaway: 'What you meditate on consistently shapes what you see, feel, and choose. Romans 12:2 is not a suggestion. It is a description of how transformation actually works.',
    time: '3 min read',
    fullBody: [
      'Meyer\'s central text is Romans 12:2: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind." She has been teaching on this passage in various forms for over forty years, and the reason it has not exhausted itself as a subject is that the problem it addresses is inexhaustible: most people\'s thinking is shaped by everything except the word of God.',
      'Her personal history makes the teaching credible in a way that pure doctrine cannot achieve. She grew up in a home where severe abuse was the norm and shame, fear, and self-contempt were the operating system. When she came into genuine faith in her thirties, she discovered that the conversion had not automatically updated the mental patterns. She still thought like a victim, like someone who expected punishment, like someone who was not worth much. The theology said otherwise. The mind had not caught up.',
      'The process of catching up, she argues, is not passive. It requires deliberate replacement: identifying the thought patterns that contradict scripture, refusing to follow them, and substituting what God says. She is careful to distinguish this from denial: you are not pretending the difficulty is not real. You are choosing which voice you follow in response to it.',
      'Her critics sometimes classify this as shallow. Her response, implicit in the body of her work, is that there is nothing shallow about a woman who survived childhood sexual abuse and built a functioning, stable, fruitful life on the other side of it. The mechanism she teaches is the one she used. The results are documentable.',
      'The reach of Battlefield of the Mind, with over eight million copies sold, suggests the problem she identified is not unique to her context. Millions of people, in wildly different circumstances and cultures, have recognised the same war in their own thinking. That is not because the book is clever. It is because Romans 12:2 is accurate.',
    ],
  },

  // ─── BACKBONE ROSTER: BREAKTHROUGH & SPIRITUAL WARFARE ──────────────────────

  {
    id: 'derek-prince-spiritual-warfare-foundations',
    type: 'TEACHING',
    title: 'Spiritual warfare is not optional. You are already in it.',
    source: 'Derek Prince',
    body: 'Derek Prince taught spiritual warfare with the same precision he applied to every other area of scripture: carefully, with primary text as the foundation, and without the sensationalism that the subject tends to attract. His argument was not that warfare is the centre of the Christian life. It is that ignoring it is not neutrality. Ignorance does not exempt a person from a battle that is already in progress.',
    pullQuote: 'We are not fighting for victory. We are fighting from victory.',
    takeaway: 'The believer\'s posture in spiritual warfare is not desperate attack but authoritative enforcement of a victory already won at the cross.',
    time: '4 min read',
    fullBody: [
      'Prince\'s approach to spiritual warfare was shaped by two things: the careful exegesis he applied to everything, and the practical pastoral experience of watching people remain in bondage despite sincere faith and years of Christian activity. The gap between the two was, in his view, almost always explained by the same thing: the person did not understand the nature of the conflict they were in.',
      'His starting point was Ephesians 6:10-18, the most extended warfare passage in the New Testament. He noted that Paul does not tell the Ephesian believers to enter a battle. He tells them to stand in one. The implication is that the battle is not optional and has not been waiting for the believer to initiate it. It has been in progress since before their conversion. The relevant question is whether they will stand equipped or unequipped.',
      'The armour passages were not, for Prince, a metaphor for general Christian virtue. They were a description of specific spiritual realities: truth as a belt because deception is the enemy\'s primary weapon; righteousness as a breastplate because accusation targets the heart; the gospel of peace as footwear because the enemy\'s strategy is to keep believers unstable and rootless. He taught each piece with textual rigour and pastoral directness.',
      'His most quoted insight was the distinction between fighting for victory and fighting from victory. Colossians 2:15 states that through the cross, Christ disarmed the principalities and powers and made a public spectacle of them. The victory is past tense. The believer\'s role is not to achieve it but to enforce it, to apply in the present what was accomplished then.',
      'He was sober about the cost of ignorance. He had seen too many sincere, devoted Christians living in unnecessary defeat to be polite about it. The weapons are real, he argued, the enemy is real, and the authority of the believer in Christ is real. The only variable is knowledge and the willingness to act on it.',
    ],
  },

  {
    id: 'heidi-baker-love-as-warfare',
    type: 'TEACHING',
    title: 'The most powerful weapon in the darkest places is love that costs something',
    source: 'Heidi Baker',
    body: 'Heidi Baker has worked in some of the most broken environments on earth and her testimony consistently points to the same thing: the force that breaks through in those places is not spiritual aggression but love. Not sentiment, not program, not strategy. Costly, present, inconvenient love. She argues that this is not softness. It is the most confrontational thing you can bring into a place of darkness.',
    pullQuote: 'Love looks like something. It always has skin on.',
    takeaway: 'Breakthrough in the hardest places does not usually come through more intensity. It comes through more presence, more willingness to stop and stay.',
    time: '3 min read',
    fullBody: [
      'Baker\'s theology of breakthrough was formed in Mozambique in the late 1990s and early 2000s, during years when her ministry was operating on almost no resources in a country that had recently emerged from a devastating civil war. She had no money, no buildings, and no organizational infrastructure to speak of. What she had was a practice: stop for the one in front of you.',
      'The practice came from a vision she describes receiving at a conference in Toronto in 1998, in which she saw the face of Jesus overlaid with the face of a starving child in Africa. The image collapsed the distance between encounter with God and service to the vulnerable into a single thing. She returned to Mozambique with a different understanding of what the work was.',
      'Her teaching on love is careful to distinguish it from sentiment or niceness. The love she describes is specific: it sees an individual, it stops, it stays. In a culture of programs and scale, staying is countercultural. Most ministry moves on. She argued that the breakthrough she witnessed in Mozambique, the healings, the church growth, the transformation of communities, was directly correlated with the willingness to be present rather than efficient.',
      'The spiritual warfare dimension is this: the places most held by darkness are almost always also places marked by abandonment. People in those places have been left by family, state, church, and almost everyone else. When someone arrives and does not leave, the spiritual logic of abandonment is interrupted. She describes this interruption as a form of warfare more effective than any she has seen.',
      'She is not against confrontational prayer or authoritative declaration. She practises both. But she consistently places them within a larger framework of love that preceded and outlasts them. The weapons, she argues, work inside a relationship. Without it, they are just noise.',
    ],
  },

  {
    id: 'adeboye-prayer-as-strategy',
    type: 'TEACHING',
    title: 'Prayer is not the preparation for the work. Prayer is the work.',
    source: 'Enoch Adeboye',
    body: 'Enoch Adeboye has led one of the world\'s largest church networks for over forty years, and the single practice he has pointed to most consistently as the foundation of everything else is prayer. Not prayer as a warm-up to ministry activity, but prayer as the primary work itself. He argues that what looks like organizational growth from the outside is the visible result of an invisible prayer infrastructure that most observers never account for.',
    pullQuote: 'If you want to see God move in the open, you must learn to meet Him in secret.',
    takeaway: 'The scale of what God does through a life is almost always proportional to the depth of what happens between that person and God in private.',
    time: '3 min read',
    fullBody: [
      'Adeboye came from a background as a mathematician, and his approach to almost everything, including prayer, has a methodical quality. He does not teach prayer as an emotional experience to be pursued but as a discipline to be structured and sustained. His personal practice has included regular extended periods of fasting and prayer throughout his ministry, which he has described not as spiritual heroism but as simple maintenance: the work requires it.',
      'His argument for prayer as the primary work begins with the nature of the problems the church is addressing. Poverty, sickness, family breakdown, national corruption: these are, in his framework, not primarily sociological problems with spiritual dimensions. They are spiritual realities with sociological manifestations. Addressing the manifestation without the root is, he argues, like cutting weeds without pulling them.',
      'The annual RCCG Holy Ghost Congress, which regularly draws five million people to Lagos, is framed not primarily as an evangelistic event but as a prayer meeting at scale. Adeboye\'s consistent message to those gatherings is that the power to change Nigeria and the African continent is not located in its governments or its resources but in the prayers of its people. He means this with precision, not as a religious platitude.',
      'He has been direct about what he believes explains the numerical growth of the RCCG under his leadership. It is not his organisational ability, though that is considerable. It is not the quality of the preaching across thousands of parishes, though that has improved. It is the prayer. Specifically, the night vigils, the fasting seasons, and the culture of personal prayer that he has modelled and maintained since the beginning.',
      'For anyone looking at the results and trying to understand the mechanism, his testimony offers a consistent answer. The work was done in the dark, before anyone saw it. That is not mysticism. It is, in his view, simply how the kingdom operates.',
    ],
  },

  {
    id: 'charles-and-frances-hunter-how-to-heal-sick',
    type: 'MIRACLE',
    title: 'How to Heal the Sick: Every Believer\'s Call',
    source: 'Charles and Frances Hunter',
    body: 'Known affectionately as "The Happy Hunters", Charles and Frances traveled the world holding massive Healing Explosions. They demonstrated that healing was never intended to be the exclusive gift of superstar preachers, but the normal birthright of every ordinary believer who dares to lay hands on the sick in faith.',
    pullQuote: 'God never called us to be spectators. He told every believer to lay hands on the sick.',
    takeaway: 'You do not need a special platform to pray for the sick. God uses ordinary hands surrendered in faith.',
    time: '3 min read',
    fullBody: [
      'Charles and Frances Hunter were an ordinary couple who had a radical encounter with the Holy Spirit later in life. Instead of keeping the supernatural at arm\'s length, they took Jesus\' commission in Mark 16 literally: "These signs shall follow them that believe; they shall lay hands on the sick, and they shall recover."',
      'They began filling arenas and stadiums across continents, not to show off their own gifts, but to train tens of thousands of regular church members to minister healing with simplicity and boldness.',
      'During their famous "Healing Explosions", hundreds of trained local believers would lay hands on people who were ill. The Hunters reported healings of blindness, deafness, spinal damage, and severe arthritis; these accounts should be read in their historical and ministry context.',
      'Their legacy permanently demystified the miraculous: if you are a believer with hands and a heart that loves people, the Holy Spirit can flow through you anywhere, from a hospital bedside to a grocery store aisle.',
    ],
  },
]
