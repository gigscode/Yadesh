
==================================================
1. PRODUCT POSITIONING
==================================================

Yadesh is a personalized Christian micro-learning and discovery platform.

Core promise:

"Five minutes can change what you know."

Yadesh helps Christians use small moments to discover meaningful ideas, stories, teachings, people, books, testimonies, and history.

Yadesh is NOT:
- a generic Bible app
- a church website
- a sermon streaming platform
- a Christian social network
- a motivational quote app
- a miracle-only website
- merely a Christian book-summary app

Yadesh IS:
- a modern Christian learning platform
- a discovery engine for Christian knowledge
- an editorial experience
- a source-aware knowledge archive
- a connected network of people, books, ideas, stories, teachings and history

Core product loop:

DISCOVER → LEARN → SAVE → GO DEEPER → RETURN

==================================================
2. IMPORTANT UX PRINCIPLE
==================================================

The authenticated app must immediately help the user learn something.

The first question the app should answer is:

"What is worth learning right now?"

The app should feel useful within 5 seconds of opening.

==================================================
3. RESPONSIVE PRODUCT ARCHITECTURE
==================================================

Create two responsive experiences.

DESKTOP:
Use a persistent left sidebar navigation.

MOBILE:
Use a fixed bottom navigation.

Desktop navigation:

==================================================
4. HOME SCREEN
==================================================

Authenticated Home should contain:

Top greeting:
"Good evening"

Then:

"What do you want to explore?"

Topic chips:
Faith
Prayer
Healing
Leadership
Revival
Holy Spirit
Calling
Discipline
Christian Living
Ministry

Add a time selector:

"How much time do you have?"

[30 sec] [2 min] [5 min] [10+ min]

This is a major Yadesh product feature.

The feed should adapt to the selected time.

==================================================
5. CONTINUE LEARNING
==================================================

If the user has unfinished content, show:

CONTINUE LEARNING

Large horizontal card containing:
- title
- person/book
- progress
- estimated time remaining
- Continue button

Example:

"The Authority of the Believer"
Kenneth E. Hagin
8 min remaining

[Continue]

==================================================
6. FOR YOU FEED
==================================================

Create a personalized content feed.

Section title:

"Today's learning"

or

"Ideas worth returning to."

Content should NOT be dominated by miracles/healing.

Create a healthy mixture of:

IDEA
STORY
BOOK
LIFE
HISTORY
TESTIMONY
TEACHING
STUDY

Each card should clearly show its content type.

Example:

IDEA
Faith grows through practice

Kenneth E. Hagin

Short editorial explanation.

[Read for 2 min]

Save icon

==================================================
7. CONTENT CARD DESIGN
==================================================

Cards should contain:

CONTENT TYPE
PERSON / SOURCE
TITLE
Short explanation
Estimated reading time
Optional Scripture/theme
Source indicator
Save action

Use visual hierarchy.

Do not overload cards.

Avoid giant blocks of text.

Use expandable content where appropriate.

==================================================
8. CONTENT DETAIL EXPERIENCE
==================================================

When a user opens content, create a premium reading experience.

Structure:

CONTENT TYPE

TITLE

PERSON / AUTHOR

Estimated reading time

THE IDEA

Short, clear explanation.

WHY IT MATTERS

Explain the practical or spiritual significance.

THE STORY / CONTEXT

Relevant context.

SCRIPTURE / THEME

Use a lilac contextual card.

SOURCE

Clearly identify the source.

Example:

Book:
Growing Up, Spiritually

Author:
Kenneth E. Hagin

Chapter:
...

[Read source]

Persistent actions:

Save
Share

==================================================
9. YADESH DEPTH LADDER
==================================================

Make "Go deeper" a core interaction throughout the product.

Every content item should allow the user to move from:

30 SEC
Discover the idea

↓

2 MIN
Understand the lesson

↓

5 MIN
Explore the story

↓

PERSON
Understand the life

↓

BOOK
Explore the larger teaching

↓

SOURCE
Read the original context

Create a visually elegant "Go deeper" component.

This should become one of Yadesh's signature UX patterns.

==================================================
10. PEOPLE
==================================================

People are not simple profile pages.

They are knowledge hubs.

Create:

/people

Cards for ministers, authors, missionaries and Christian historical figures.

Person detail page:

Name
Lifespan / current status
Known for
Short biography

"What can you learn from this life?"

Topics

Ideas
Stories
Books
Teachings
Testimonies
Historical context
Related people
Sources

Example people can include:

Smith Wigglesworth
John G. Lake
Kathryn Kuhlman
Kenneth E. Hagin
Lester Sumrall
Oral Roberts
A.A. Allen
David Oyedepo
E.A. Adeboye

Do not imply endorsement or theological agreement simply by inclusion.

==================================================
11. BOOKS
==================================================

Create /books.

Use a premium editorial book grid.

Each book page should include:

Book cover
Title
Author
Publication information
Short description

"What you'll learn"

Key ideas

Related people

Related topics

Related stories

Source information

[Start learning]

[Save]

==================================================
12. EXPLORE
==================================================

Explore should feel visual and editorial rather than like a database.

Header:

"Explore"

Subheading:

"What are you hungry to learn?"

Sections:

Topics
People
Books
Stories
Teachings
Testimonies
History

Use cards, grids and horizontal collections.

==================================================
13. SEARCH
==================================================

Build a global search experience.

Search results should be grouped by entity:

TOPICS
PEOPLE
BOOKS
IDEAS
STORIES
TEACHINGS
TESTIMONIES
HISTORY

Example:

Search: "healing"

Results:

Topic: Healing

People:
Smith Wigglesworth
John G. Lake
Oral Roberts

Books:
...

Ideas:
...

Stories:
...

Testimonies:
...

==================================================
14. SAVED / PERSONAL LIBRARY
==================================================

Use simple language.

Do NOT use "Save to Altar" as the primary button.

Use:

"Save"

After saving:

"Saved to your library"

Saved page:

Your Library

Continue reading
Saved ideas
Saved people
Saved books
Reading queue

Allow saved content to be available offline as a PWA feature.

==================================================
15. ONBOARDING
==================================================

Create optional onboarding.

Maximum 3 screens.

Screen 1:

"What do you want to learn?"

Topic selection.

Screen 2:

"Who would you like to learn from?"

Person selection.

Screen 3:

"How much time do you usually have?"

30 seconds
2 minutes
5 minutes
10+ minutes

CTA:

"Build my feed"

Also provide:

"Skip for now"

Never force onboarding.

==================================================
16. PWA
==================================================

Build the UI as a genuine installable PWA.

Include:

Responsive mobile-first layout
Safe-area support
Offline-friendly saved content
Install prompt
App-like navigation
Fast loading states
Skeleton states
Empty states
Error states
Accessible touch targets
Mobile bottom navigation
Desktop sidebar
Keyboard accessibility

For install messaging use:

"Keep Yadesh close."

"Install Yadesh for quick access to your daily learning."

==================================================
17. DESIGN SYSTEM
==================================================

Preserve the existing color language.

Primary background:
Warm off-white

Primary text:
Near-black

Primary accent:
Electric lime

Secondary accent:
Periwinkle / violet

Contextual:
Soft lilac

Occasional:
Coral

Do not use all colors equally.

The interface should remain mostly:
OFF-WHITE + BLACK

with lime and violet acting as intentional accents.

Avoid:
- gradients everywhere
- excessive glassmorphism
- generic SaaS blue
- excessive shadows
- excessive rounded pills
- overly colorful cards
- generic AI dashboard styling
==================================================
20. SOURCE / TRUST SYSTEM
==================================================

Yadesh is source-aware.

Every source-sensitive content item should show where the information comes from.

Use labels such as:

DIRECT QUOTE
PARAPHRASE
REPORTED TESTIMONY
HISTORICAL ACCOUNT
EDITORIAL NOTE

When describing supernatural claims, clearly distinguish a person's reported testimony from independently established fact.

Use language such as:

"According to..."
"X recorded..."
"X reported..."
"The testimony states..."
"The historical record describes..."

Never visually present every supernatural claim as independently verified.

The UI should communicate:

"Read. Verify. Remember."

==================================================
21. SCRIPTURE CARDS
==================================================

Scripture should support the content rather than overwhelm it.

Use soft lilac cards.

Show:

SCRIPTURE

Short verse

Reference

Avoid making the entire app look like a Bible app.

==================================================
22. EMPTY STATES
==================================================

Create beautiful empty states.

Example:

No saved ideas yet.

"Start collecting the things worth remembering."

[Explore learning]

Another:

Nothing here yet.

"Your next five minutes could change what you know."

[Start learning]

==================================================
23. INTERACTION DESIGN
==================================================

Use subtle microinteractions.

Examples:

Save animation
Progress animation
Card expansion
Smooth topic filtering
Reading progress
Source expansion
Go deeper transitions

Keep animations restrained.

Yadesh should feel calm and intentional, not gamified.

==================================================
24. DESKTOP LAYOUT
==================================================

Use a centered content canvas.

Recommended maximum content width:
1200–1400px.

Sidebar:
240–260px.

Content should breathe.

Do not reproduce the extremely narrow mobile-like column seen in the current desktop presentation.

Use a responsive 12-column grid.

==================================================
25. MOBILE LAYOUT
==================================================

Mobile is first-class.

Use:

16–20px horizontal padding.

Bottom navigation.

Large readable typography.

Cards optimized for thumb interaction.

No horizontal overflow.

Respect iOS safe areas.

Make buttons at least comfortable touch size.

==================================================
26. PUBLIC HOMEPAGE
==================================================

Preserve the existing marketing direction.

Hero:

CHRISTIAN MICRO-LEARNING

"Five minutes can change what you know."

Subheading:

"Discover powerful ideas, stories, and lessons from Christian books, ministers, biographies, and the history of the faith one meaningful piece at a time."

Buttons:

[Start learning]
[Explore the archive]

Small editorial line:

"READ. VERIFY. REMEMBER."

Keep the visual style dramatic and editorial.

==================================================
27. PUBLIC HOMEPAGE SECTIONS
==================================================

After the hero:

"What are you exploring?"

Topic chips.

Then:

"Today's learning"

Mixed content cards.

Then:

"Go deeper"

30 sec → 2 min → Source

Then:

"Learn from a life"

People.

Then:

"The archive"

Books / Stories / Teachings / Testimonies / History.

Then waitlist:

"Keep learning with intention."

==================================================
28. IMPORTANT UX CORRECTIONS TO THE EXISTING DESIGN
==================================================

Do not make the entire product revolve around:
- healing
- miracles
- testimonies

These are content categories, not the whole product.

The current Smith Wigglesworth / John G. Lake / Kathryn Kuhlman content should remain as examples, but mix them with:

Book ideas
Leadership lessons
Faith lessons
Prayer
Christian discipline
Calling
Holy Spirit
Mission
Evangelism
Biographies
Church history
Revival history
Christian living

Do not make "The Power" and "The Crucible" primary navigation concepts.

Use clearer functional language first.

Examples:

For You
Latest
Deep Dive
Recommended

Editorial language can still exist inside collections.

==================================================
29. MICROCOPY
==================================================

Prefer:

Start learning
Read for 2 min
Explore this person
Read the source
Go deeper
Save
Saved to your library
Continue learning
Explore
View all

Avoid confusing actions such as:

Enter the archive
Save to Altar
Choose your pressure

unless they are used as secondary editorial language.

==================================================
30. FINAL DESIGN FEEL
==================================================

The final product should feel like:

A premium Christian editorial publication
+
a modern micro-learning app
+
a personal knowledge library
+
a source-aware digital archive

It should NOT feel like:

a generic church website
a Bible app
a social network
a SaaS dashboard
a quote app
a generic AI-generated website

Make the interface feel calm, intelligent, premium, spiritual, editorial and highly intentional.

Most importantly:

DESIGN FOR THE HABIT:

"I HAVE FIVE MINUTES.
GIVE ME SOMETHING WORTH LEARNING."


Use realistic Yadesh content rather than lorem ipsum.

Build reusable components and a coherent design system so the application can scale to thousands of pieces of content.
