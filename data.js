/* Content for Susu & Neko's Writing Workshop
   Based on SPPCS P.2 Writing 1 (My Favourite Place at School), Writing 2 (Rules / Places like home)
   and Writing 3 (A Magazine Article: My Favourite Season). */

window.TASKS = {
  place: {
    id: 'place',
    num: 1,
    title: 'My Favourite Place at School',
    module: 'Module 1 · Writing 1',
    color: 'red',
    guide: 'susu',
    intro: 'Write a paragraph with at least six sentences about your favourite place at school.',
    // Model paragraph from the English teacher, split into labelled parts
    model: {
      heading: 'My Favourite Place at School',
      by: 'Example by your English teacher',
      paragraphs: [[
        { t: 'My favourite place at school is the staff room.', tag: 'place' },
        { t: 'It is on the second floor.', tag: 'where' },
        { t: 'My colleagues and I work there.', tag: 'do' },
        { t: 'We mark children\u2019s homework and prepare for fun lessons.', tag: 'do' },
        { t: 'We also have meetings there.', tag: 'do' },
        { t: 'I like the staff room because it is big and comfortable and I can enjoy my students\u2019 work there too.', tag: 'why' }
      ]]
    },
    star: {
      heading: 'My Favourite Place at School',
      by: 'Clarice\u2019s writing (28/30)',
      paragraphs: [[
        { t: 'My favourite place at school is the computer room.', tag: 'place' },
        { t: 'It is on the first floor.', tag: 'where' },
        { t: 'My classmates and I create digital artworks using computers.', tag: 'do' },
        { t: 'We also have wonderful computer lessons together.', tag: 'do' },
        { t: 'My teachers teach me how to draw amazing artworks using a drawing programme on the computer.', tag: 'teachers' },
        { t: 'I like the computer room because it is big and wonderful and we can design beautiful pictures using digital art tools.', tag: 'why' },
        { t: 'I always feel very happy when I am there.', tag: 'feel' }
      ]]
    },
    tags: {
      place: { label: 'Which place?', c: 'c1' },
      where: { label: 'Where is it?', c: 'c2' },
      do: { label: 'What we do', c: 'c3' },
      teachers: { label: 'What teachers do', c: 'c4' },
      looks: { label: 'What it looks like', c: 'c6' },
      why: { label: 'Why I like it', c: 'c5' },
      feel: { label: 'How I feel', c: 'c7' }
    },
    // Sentence-order game
    order: [
      'My favourite place at school is the library.',
      'It is on the ground floor.',
      'It is big and bright, and there are many colourful books.',
      'My classmates and I read storybooks there.',
      'We also borrow books every week.',
      'My teachers tell us interesting stories.',
      'I like the library because it is quiet and comfortable.',
      'I always feel calm and happy when I am there.'
    ],
    // Planner for the writing frame
    plan: [
      { key: 'place', q: 'What is your favourite place at school?', frame: 'My favourite place at school is {a}.', chips: ['the library', 'the computer room', 'the school hall', 'the music room', 'the art room', 'the playground', 'the STEM room', 'my classroom'] },
      { key: 'where', q: 'Where is your favourite place?', frame: 'It is on {a}.', chips: ['the ground floor', 'the first floor', 'the second floor', 'the third floor', 'the fourth floor', 'the fifth floor'] },
      { key: 'looks', q: 'What does the place look like?', frame: 'It is {a}.', chips: ['big and bright', 'clean and tidy', 'colourful and comfortable', 'quiet and cosy', 'big and wonderful', 'cool and comfortable'] },
      { key: 'do1', q: 'What do you and your classmates do there? (Thing 1)', frame: 'My classmates and I {a} there.', chips: ['read storybooks', 'draw pictures', 'sing songs', 'play the recorder', 'play games', 'make models', 'create digital artworks', 'have lunch'] },
      { key: 'do2', q: 'What else do you do there? (Thing 2)', frame: 'We also {a}.', chips: ['borrow books every week', 'have computer lessons together', 'practise for the school concert', 'paint with bright colours', 'run and play ball games', 'do experiments together', 'watch shows'] },
      { key: 'teachers', q: 'What do your teachers do there?', frame: 'My teachers {a}.', chips: ['teach us how to draw amazing pictures', 'tell us interesting stories', 'teach us new songs', 'help us find good books', 'teach us how to use computers', 'play games with us'] },
      { key: 'why', q: 'Why do you like this place?', frame: 'I like {place} because {a}.', chips: ['it is quiet and comfortable', 'I can learn many new things there', 'I can play with my friends there', 'it is big and bright', 'I can read many interesting books', 'I can make beautiful artworks'] },
      { key: 'feel', q: 'How do you feel when you are there?', frame: 'I always feel {a} when I am there.', chips: ['very happy', 'calm and happy', 'excited', 'relaxed', 'proud'] }
    ],
    checklist: [
      'I wrote the title: My Favourite Place at School.',
      'I wrote at least six sentences.',
      'I said where the place is (on the ___ floor).',
      'I wrote at least two things we do there.',
      'I said why I like it and how I feel.',
      'Every sentence starts with a capital letter and ends with a full stop.',
      'I spelled the words correctly.'
    ],
    tips: [
      { tip: 'Say what the place looks like.', eg: 'It is big and bright. There are many computers.', from: 'Teacher asked: \u201cWhat does the room look like?\u201d' },
      { tip: 'Tell how you feel when you are there.', eg: 'I always feel very happy when I am there.', from: 'Teacher asked: \u201cHow do you feel when you are there?\u201d' },
      { tip: 'Use clear words, not just \u201cso\u201d.', eg: 'it is so wonderful \u2192 it is big and wonderful', from: 'Teacher wrote: \u201cnot clear!\u201d' },
      { tip: 'Teachers teach us HOW to do things.', eg: 'My teachers teach me how to draw.', from: 'Teacher added \u201chow\u201d.' },
      { tip: 'Give more details.', eg: 'What kinds of digital artworks do you like to draw?', from: 'Teacher\u2019s question in the margin' }
    ]
  },

  rules: {
    id: 'rules',
    num: 2,
    title: 'Rules in Places like Home',
    module: 'Module 1 · Writing 2',
    color: 'purple',
    guide: 'neko',
    intro: 'Think about places you see as \u2018home\u2019. Write TWO rules for each place and give a reason for each rule.',
    story: [
      { q: 'Why is the boy leaving?', opts: ['to travel', 'to study abroad', 'to work'], a: 1, say: 'The boy is leaving because he has to study abroad.' },
      { q: 'How does he feel?', opts: ['He feels happy.', 'He feels sad.', 'He feels angry.'], a: 1, say: 'He feels sad.' },
      { q: 'Who does he miss?', opts: ['his friends', 'his teacher', 'his family'], a: 2, say: 'He misses his family.' },
      { q: 'The dark sky and pouring rain mean\u2026', opts: ['the love from the family', 'the sadness and worries', 'the loneliness'], a: 1, say: 'The dark sky and pouring rain mean the sadness and worries.' },
      { q: 'The big waves mean\u2026', opts: ['the difficulties the man faces', 'the love from the family', 'the loneliness'], a: 0, say: 'The big waves mean the difficulties the man faces.' },
      { q: 'The snowy weather means\u2026', opts: ['the sadness and worries', 'the loneliness', 'the difficulties the man faces'], a: 1, say: 'The snowy weather means the loneliness.' },
      { q: 'The soup made by the young man\u2019s mum means\u2026', opts: ['the difficulties the man faces', 'the loneliness', 'the love from the family'], a: 2, say: 'The soup made by his mum means the love from the family.' },
      { q: 'Which one is NOT a challenge he faces?', opts: ['He has to do everything by himself.', 'He is not used to the weather.', 'He has too many friends.'], a: 2, say: 'He has to do everything by himself. He is not used to the weather or the food.' }
    ],
    // Model table from the worksheet + Clarice's corrected answers
    places: [
      { place: 'the park', rules: [
        { r: 'We must wait for our turns to go on the slide.', why: 'It is fair for everyone to get a chance to play.' },
        { r: 'We mustn\u2019t pick the flowers in the park.', why: 'They give food to bees and butterflies.' } ] },
      { place: 'the MTR platform', rules: [
        { r: 'We mustn\u2019t push on the MTR platform.', why: 'It is dangerous and people may fall and get hurt.' },
        { r: 'We must stand behind the yellow line.', why: 'It keeps us safe from the train.' } ] },
      { place: 'the library', rules: [
        { r: 'We must keep quiet in the library.', why: 'Others need a quiet place to read.' },
        { r: 'We mustn\u2019t eat or drink in the library.', why: 'It may make the place and the books dirty.' } ] },
      { place: 'the school', rules: [
        { r: 'We must listen to our teachers.', why: 'Therefore, we can stay focused and learn new things.' },
        { r: 'We mustn\u2019t run in the corridors.', why: 'We may fall and get hurt.' } ] }
    ],
    // Must / mustn't sort
    sort: [
      { s: 'wait for our turns', a: 'must' },
      { s: 'push on the platform', a: 'mustn\u2019t' },
      { s: 'keep quiet in the library', a: 'must' },
      { s: 'run in the corridors', a: 'mustn\u2019t' },
      { s: 'stand behind the yellow line', a: 'must' },
      { s: 'drop litter in the park', a: 'mustn\u2019t' },
      { s: 'listen to our teachers', a: 'must' },
      { s: 'pick the flowers', a: 'mustn\u2019t' },
      { s: 'line up in the corridor', a: 'must' },
      { s: 'spit in the park', a: 'mustn\u2019t' },
      { s: 'eat or drink on the train', a: 'mustn\u2019t' },
      { s: 'put the books back on the shelves', a: 'must' }
    ],
    // Rule -> reason match
    match: [
      { r: 'We mustn\u2019t push on the platform.', why: 'It is dangerous.' },
      { r: 'We must keep quiet in the library.', why: 'Others need a quiet place to read.' },
      { r: 'We must wait for our turns.', why: 'It is fair for everyone.' },
      { r: 'We mustn\u2019t pick the flowers.', why: 'They give food to bees and butterflies.' },
      { r: 'We mustn\u2019t run in the corridors.', why: 'We may fall and get hurt.' },
      { r: 'We mustn\u2019t drop litter.', why: 'It makes the place dirty.' }
    ],
    // Prepositions
    preps: [
      { s: 'We must line up ___ the corridor.', a: 'in' },
      { s: 'We mustn\u2019t eat or drink ___ the train.', a: 'on' },
      { s: 'We mustn\u2019t spit ___ the park.', a: 'in' },
      { s: 'We mustn\u2019t push ___ the platform.', a: 'on' },
      { s: 'We must stand ___ the yellow line.', a: 'behind' },
      { s: 'We must keep quiet ___ the library.', a: 'in' },
      { s: 'We must wait for our turns to go ___ the slide.', a: 'on' },
      { s: 'We must put the books back ___ the shelves.', a: 'on' }
    ],
    prepOpts: ['in', 'on', 'behind'],
    spell: ['litter', 'dangerous', 'platform', 'corridor', 'library', 'quiet', 'teachers', 'environment', 'weather', 'difficulties'],
    // Rule builder for planning
    buildPlaces: ['the park', 'the MTR station', 'the library', 'the school', 'home', 'the playground', 'the beach', 'the cinema'],
    ruleBank: {
      'the park': [
        { r: 'We must keep the park clean.', why: 'Everyone can enjoy a clean park.' },
        { r: 'We mustn\u2019t drop litter in the park.', why: 'It makes the park dirty.' },
        { r: 'We mustn\u2019t pick the flowers.', why: 'They give food to bees and butterflies.' },
        { r: 'We must wait for our turns to go on the slide.', why: 'It is fair for everyone to get a chance to play.' } ],
      'the MTR station': [
        { r: 'We mustn\u2019t push on the MTR platform.', why: 'It is dangerous and people may fall and get hurt.' },
        { r: 'We must stand behind the yellow line.', why: 'It keeps us safe from the train.' },
        { r: 'We mustn\u2019t eat or drink on the train.', why: 'It makes the train dirty.' },
        { r: 'We must let people get off the train first.', why: 'It is polite and we can get on quickly.' } ],
      'the library': [
        { r: 'We must keep quiet in the library.', why: 'Others need a quiet place to read.' },
        { r: 'We mustn\u2019t eat or drink in the library.', why: 'It may make the place and the books dirty.' },
        { r: 'We must put the books back on the shelves.', why: 'Others can find them easily.' },
        { r: 'We mustn\u2019t draw on the books.', why: 'Other people want to read nice, clean books.' } ],
      'the school': [
        { r: 'We must listen to our teachers.', why: 'Therefore, we can stay focused and learn new things.' },
        { r: 'We mustn\u2019t run in the corridors.', why: 'We may fall and get hurt.' },
        { r: 'We must line up in the corridor.', why: 'It keeps everyone safe and in order.' },
        { r: 'We must be kind to our classmates.', why: 'Everyone can feel happy at school.' } ],
      'home': [
        { r: 'We must help our parents do housework.', why: 'Our family can share the work.' },
        { r: 'We mustn\u2019t play with fire.', why: 'It is dangerous and we may get hurt.' },
        { r: 'We must tidy up our toys.', why: 'Our home is clean and tidy.' },
        { r: 'We mustn\u2019t shout at home.', why: 'It is noisy and our family needs a rest.' } ],
      'the playground': [
        { r: 'We must wait for our turns.', why: 'It is fair for everyone.' },
        { r: 'We mustn\u2019t push others on the slide.', why: 'They may fall and get hurt.' },
        { r: 'We must share the swings.', why: 'Everyone can have fun.' },
        { r: 'We mustn\u2019t climb on the fence.', why: 'It is dangerous.' } ],
      'the beach': [
        { r: 'We must swim near the lifeguard.', why: 'It keeps us safe in the sea.' },
        { r: 'We mustn\u2019t leave rubbish on the beach.', why: 'It hurts the fish and sea animals.' },
        { r: 'We must wear a sunhat.', why: 'The sun is very hot.' },
        { r: 'We mustn\u2019t swim when the red flag is up.', why: 'The sea is dangerous.' } ],
      'the cinema': [
        { r: 'We must keep quiet in the cinema.', why: 'Others want to enjoy the film.' },
        { r: 'We mustn\u2019t kick the seats.', why: 'It is rude to the people in front.' },
        { r: 'We must turn off our phones.', why: 'The light and sound disturb other people.' },
        { r: 'We mustn\u2019t leave rubbish on the floor.', why: 'It makes the cinema dirty.' } ]
    },
    checklist: [
      'Did you spell all the words correctly? (litter, not liter or little)',
      'Did you use must / mustn\u2019t correctly?',
      'Did you use prepositions correctly? (in the corridor, on the train)',
      'Did you give a relevant reason for each rule?',
      'Every sentence starts with a capital letter and ends with a full stop.'
    ],
    tips: [
      { tip: 'Every rule needs a reason.', eg: 'We mustn\u2019t push on the platform. (rule) It is dangerous. (reason)', from: 'Checklist for revising and editing' },
      { tip: 'Say what will happen.', eg: 'It is dangerous and people may fall and get hurt.', from: 'Teacher asked: \u201cWhat will happen if someone pushes us?\u201d' },
      { tip: 'Think of things too, not only people.', eg: 'It may make the place and the books dirty.', from: 'Teacher asked: \u201cWhat about the books?\u201d' },
      { tip: 'Use \u201cTherefore,\u201d instead of \u201cSo\u201d.', eg: 'Therefore, we can stay focused and learn new things.', from: 'Teacher changed \u201cSo\u201d to \u201cTherefore,\u201d' },
      { tip: 'Use \u201cthe\u201d before places.', eg: 'the MTR train station, the library', from: 'Teacher added \u201cthe\u201d' },
      { tip: 'Plural words end in -s.', eg: 'teachers, corridors', from: 'Teacher marked the missing -s' }
    ]
  },

  season: {
    id: 'season',
    num: 3,
    title: 'A Magazine Article: My Favourite Season',
    short: 'My Favourite Season',
    module: 'Module 2 · Writing 3',
    color: 'yellow',
    guide: 'both',
    intro: 'Write a magazine article about your favourite season: weather, food, activities, clothes, festival, why you like it and how you feel.',
    model: {
      heading: 'My Favourite Season',
      by: 'Article in the school magazine',
      paragraphs: [
        [ { t: 'My favourite season is autumn.', tag: 'season' },
          { t: 'Autumn is a wonderful season.', tag: 'season' } ],
        [ { t: 'It is windy and cool in autumn.', tag: 'weather' },
          { t: 'My friends and I usually eat fresh fruit.', tag: 'eat' },
          { t: 'We usually go hiking and fly kites, too.', tag: 'do' },
          { t: 'We usually wear sweaters and trousers.', tag: 'wear' },
          { t: 'During autumn, we celebrate the Mid-Autumn Festival.', tag: 'festival' },
          { t: 'We have mooncakes and play with lanterns.', tag: 'festival' } ],
        [ { t: 'I like this time of year very much because autumn and the Mid-Autumn Festival make me smile.', tag: 'why' },
          { t: 'I am happy when this season is here!', tag: 'feel' } ]
      ]
    },
    star: {
      heading: 'My Favourite Season',
      by: 'Clarice\u2019s writing, with the teacher\u2019s corrections',
      paragraphs: [
        [ { t: 'My favourite season is autumn.', tag: 'season' },
          { t: 'Autumn is a magical season.', tag: 'season' } ],
        [ { t: 'In autumn, it is cool and fresh.', tag: 'weather' },
          { t: 'I usually have a barbecue.', tag: 'eat' },
          { t: 'I wear a sweater and trousers.', tag: 'wear' },
          { t: 'I celebrate Halloween.', tag: 'festival' },
          { t: 'I go trick-or-treating and wear costumes.', tag: 'festival' } ],
        [ { t: 'I love autumn because the air is fresh and cool and I can play with my friends.', tag: 'why' },
          { t: 'I feel excited when this season is here.', tag: 'feel' } ]
      ]
    },
    tags: {
      season: { label: 'Which season?', c: 'c1' },
      weather: { label: 'Weather', c: 'c2' },
      eat: { label: 'Food', c: 'c6' },
      do: { label: 'Activities', c: 'c3' },
      wear: { label: 'Clothes', c: 'c4' },
      festival: { label: 'Festival', c: 'c8' },
      why: { label: 'Reasons', c: 'c5' },
      feel: { label: 'Feelings', c: 'c7' }
    },
    seasons: {
      spring: { name: 'spring', weather: ['warm and wet', 'warm and windy', 'warm and foggy'], eat: ['strawberries', 'fresh salad', 'Easter eggs'], act: ['see flowers blossom', 'see butterflies', 'listen to birds', 'grow flowers'], wear: ['light jackets', 'T-shirts', 'jeans', 'raincoats'], fest: ['Easter', 'Chinese New Year'] },
      summer: { name: 'summer', weather: ['hot and sunny', 'hot and wet', 'hot and humid'], eat: ['ice cream', 'ice lollies', 'watermelons', 'rice dumplings'], act: ['swim in the sea', 'build a sandcastle', 'go sunbathing', 'eat ice cream'], wear: ['T-shirts', 'shorts', 'sunhats', 'sunglasses', 'swimsuits'], fest: ['the Dragon Boat Festival'] },
      autumn: { name: 'autumn', weather: ['cool and dry', 'windy and cool', 'cool and fresh'], eat: ['mooncakes', 'fresh fruit', 'barbecue food'], act: ['have a barbecue', 'go on a picnic', 'see maple trees', 'fly a kite', 'go hiking'], wear: ['sweaters', 'trousers', 'jackets'], fest: ['the Mid-Autumn Festival', 'Halloween'] },
      winter: { name: 'winter', weather: ['cold and dry', 'cold and windy', 'very cold'], eat: ['hot pot', 'hot chocolate', 'hot soup', 'rice cakes'], act: ['drink hot chocolate', 'build a snowman', 'go skiing', 'go sledding'], wear: ['coats', 'scarves', 'gloves', 'woolly hats', 'boots'], fest: ['Christmas', 'Chinese New Year'] }
    },
    festivals: {
      'Easter': ['go on an Easter egg hunt', 'eat chocolate eggs'],
      'Chinese New Year': ['have a family reunion dinner', 'get red packets', 'visit our relatives'],
      'the Dragon Boat Festival': ['watch dragon boat races', 'eat rice dumplings'],
      'the Mid-Autumn Festival': ['play with lanterns', 'eat mooncakes', 'watch the full moon'],
      'Halloween': ['go trick-or-treating', 'wear costumes'],
      'Christmas': ['decorate the Christmas tree', 'see Christmas lights', 'give presents']
    },
    vocab: [
      { w: 'see flowers blossom', s: 'spring' }, { w: 'see butterflies', s: 'spring' }, { w: 'listen to birds', s: 'spring' }, { w: 'grow flowers', s: 'spring' },
      { w: 'swim in the sea', s: 'summer' }, { w: 'eat ice cream', s: 'summer' }, { w: 'eat ice lollies', s: 'summer' }, { w: 'go sunbathing', s: 'summer' }, { w: 'build a sandcastle', s: 'summer' },
      { w: 'have a barbecue', s: 'autumn' }, { w: 'go on a picnic', s: 'autumn' }, { w: 'see maple trees', s: 'autumn' }, { w: 'fly a kite', s: 'autumn' },
      { w: 'drink hot chocolate', s: 'winter' }, { w: 'build a snowman', s: 'winter' }, { w: 'go skiing', s: 'winter' }, { w: 'go sledding', s: 'winter' }
    ],
    festMatch: [
      { f: 'Chinese New Year\u2019s Eve', a: 'have family reunion dinner' },
      { f: 'Dragon Boat Festival', a: 'watch dragon boat races' },
      { f: 'Mid-Autumn Festival', a: 'play with lanterns' },
      { f: 'Easter', a: 'go on an Easter egg hunt' },
      { f: 'Halloween', a: 'go trick-or-treating' },
      { f: 'Christmas', a: 'decorate the Christmas tree' }
    ],
    // Which paragraph does it belong to?
    paraSort: [
      { s: 'My favourite season is summer.', p: 1 },
      { s: 'Summer is a wonderful season.', p: 1 },
      { s: 'It is hot and sunny in summer.', p: 2 },
      { s: 'I usually eat ice cream and watermelons.', p: 2 },
      { s: 'My family and I swim in the sea.', p: 2 },
      { s: 'I wear T-shirts and shorts.', p: 2 },
      { s: 'We celebrate the Dragon Boat Festival.', p: 2 },
      { s: 'I like summer because I can go to the beach.', p: 3 },
      { s: 'I feel happy when this season is here!', p: 3 }
    ],
    paraNames: { 1: 'Paragraph 1: Which season?', 2: 'Paragraph 2: Weather, food, activities, clothes, festival', 3: 'Paragraph 3: Why I like it and how I feel' },
    checklist: [
      'I wrote the title: My Favourite Season.',
      'I wrote about my favourite season.',
      'I used the weather words correctly.',
      'I wrote about what I eat, do and wear.',
      'I wrote about a festival and how I celebrate it.',
      'I said why I like the season and how I feel.',
      'I wrote three paragraphs and indented each one.',
      'I spelled the words correctly.'
    ],
    tips: [
      { tip: 'Mind your paragraphing.', eg: 'Paragraph 1: the season. Paragraph 2: details. Paragraph 3: why and feelings.', from: 'Teacher wrote: \u201cMind your paragraphing!\u201d' },
      { tip: 'Write full sentences, not just words.', eg: 'So fresh. \u2192 The air is very fresh.', from: 'Teacher corrected the table answer' },
      { tip: 'Finish your feeling sentence properly.', eg: 'I feel excited when this season is here.', from: 'Teacher corrected \u201cabout this\u201d' },
      { tip: 'Use \u201ca\u201d for one thing.', eg: 'I wear a sweater and trousers.', from: 'Teacher added \u201ca\u201d' },
      { tip: 'Add more details.', eg: 'What kinds of costumes do you wear? What else do you do in autumn?', from: 'Teacher\u2019s questions' },
      { tip: 'Rich words make writing shine.', eg: 'a magical season, cool and fresh', from: 'Teacher: \u201cGreat job using some rich vocabulary!\u201d' }
    ]
  }
};

/* Fix-it Lab: mistakes from the red-pen corrections, plus common P.2 traps */
window.FIXES = [
  { task: 'place', wrong: 'it is on the first floor.', opts: ['It is on the first floor.', 'it is on the First Floor.', 'It is in the first floor.'], a: 0, why: 'A sentence starts with a capital letter. We say on the ___ floor.' },
  { task: 'place', wrong: 'My teachers teach me to draw amazing pictures.', opts: ['My teachers teach me how draw amazing pictures.', 'My teachers teach me how to draw amazing pictures.', 'My teachers teaches me to draw amazing pictures.'], a: 1, why: 'Teachers teach us how to do things.' },
  { task: 'place', wrong: 'We create digital art using computer.', opts: ['We create digital artworks using computers.', 'We create digital artwork using a computers.', 'We creates digital artworks using computers.'], a: 0, why: 'More than one: artworks, computers.' },
  { task: 'place', wrong: 'I like the computer room because it is so wonderful.', opts: ['I like the computer room because it is so so wonderful.', 'I like the computer room because so wonderful.', 'I like the computer room because it is big and wonderful.'], a: 2, why: 'The teacher said \u201cso\u201d is not clear. Use describing words.' },
  { task: 'place', wrong: 'My favourite place at school is the library', opts: ['My favourite place at school is the library.', 'my favourite place at school is the library.', 'My favourite place at school is library.'], a: 0, why: 'Remember the full stop at the end.' },
  { task: 'rules', wrong: 'We must listen to our teacher. So we can learn many new things.', opts: ['We must listen to our teachers. Therefore, we can stay focused and learn new things.', 'We must listen our teachers. So we learn.', 'We mustn\u2019t listen to our teachers. Therefore, we can learn.'], a: 0, why: 'Use \u201cTherefore,\u201d and plural \u201cteachers\u201d.' },
  { task: 'rules', wrong: 'We mustn\u2019t run in the corridor.', opts: ['We mustn\u2019t run on the corridors.', 'We mustn\u2019t run in the corridors.', 'We must\u2019t run in the corridors.'], a: 1, why: 'There are many corridors in school: corridors.' },
  { task: 'rules', wrong: 'We must stand behind the yellow line. It keeps us safe from the train.', opts: ['Good! The rule and the reason are both correct.', 'We mustn\u2019t stand behind the yellow line.', 'We must stand on the yellow line.'], a: 0, why: 'This rule and reason are just right.' },
  { task: 'rules', wrong: 'We mustn\u2019t drop liter in the park.', opts: ['We mustn\u2019t drop little in the park.', 'We mustn\u2019t drop litter in the park.', 'We mustn\u2019t drop litters on the park.'], a: 1, why: 'Spell it l-i-t-t-e-r.' },
  { task: 'rules', wrong: 'We mustn\u2019t eat or drink in the library. (no reason)', opts: ['Because.', 'It may make the place and the books dirty.', 'We must eat in the library.'], a: 1, why: 'Every rule needs a relevant reason.' },
  { task: 'rules', wrong: 'Name a place like home: MTR train station', opts: ['the MTR train station', 'a MTR train station', 'MTR Train Station'], a: 0, why: 'Use \u201cthe\u201d before places.' },
  { task: 'rules', wrong: 'the libary', opts: ['the library', 'the liberry', 'the librery'], a: 0, why: 'Spell it l-i-b-r-a-r-y.' },
  { task: 'season', wrong: 'I usally have a barbecue.', opts: ['I usually have a barbecue.', 'I usualy have a barbecue.', 'I usually have a barbecued.'], a: 0, why: 'Spell it u-s-u-a-l-l-y.' },
  { task: 'season', wrong: 'Wear sweaters.', opts: ['I wear a sweater and trousers.', 'I wear a sweaters.', 'Wear a sweater.'], a: 0, why: 'Write a full sentence. Use \u201ca\u201d for one sweater.' },
  { task: 'season', wrong: 'So fresh.', opts: ['So fresh air.', 'The air is very fresh.', 'Very fresh is the air.'], a: 1, why: 'Write a full sentence with who/what + is.' },
  { task: 'season', wrong: 'I feel excited about this season.', opts: ['I feel excited when this season is here.', 'I feel exciting when this season is here.', 'I excited when this season here.'], a: 0, why: 'This is how the teacher finished the feeling sentence.' },
  { task: 'season', wrong: 'it is cool and fresh in autumn.', opts: ['It is cool and fresh in autumn.', 'It is cool and fresh on autumn.', 'It cool and fresh in autumn.'], a: 0, why: 'Capital letter at the start. We say in autumn.' },
  { task: 'season', wrong: 'We celebrate the mid-autumn festival.', opts: ['We celebrate the Mid-Autumn Festival.', 'We celebrate the Mid-autumn festival.', 'We celebrates the Mid-Autumn Festival.'], a: 0, why: 'Festival names need capital letters.' }
];

window.EXAMS = [
  { task: 'place', title: 'My Favourite Place at School', prompt: 'Write a paragraph about your favourite place at school. Write at least six sentences.', guide: ['What is your favourite place at school?', 'Where is it?', 'What does it look like?', 'What do you and your classmates do there? (two things)', 'What do your teachers do there?', 'Why do you like this place?', 'How do you feel when you are there?'] },
  { task: 'rules', title: 'Rules in Places like Home', prompt: 'Name three places which you see as \u2018home\u2019. Write TWO rules for each place and give a reason for each rule.', guide: ['Place 1: Rule 1 + reason', 'Place 1: Rule 2 + reason', 'Place 2: Rule 1 + reason', 'Place 2: Rule 2 + reason', 'Place 3: Rule 1 + reason', 'Place 3: Rule 2 + reason', 'Use must / mustn\u2019t and good prepositions.'] },
  { task: 'season', title: 'A Magazine Article: My Favourite Season', prompt: 'Your school magazine wants articles about seasons. Write an article about your favourite season in three paragraphs.', guide: ['Which season do you like most?', 'What is the weather like?', 'What do you usually eat?', 'What do you usually do? (two activities)', 'What do you usually wear? (two clothing items)', 'Which festival do you celebrate? How? (two activities)', 'Why do you like this season? How do you feel?'] }
];

window.STICKERS = [
  { id: 'place-model', name: 'Great Reader', task: 'place', icon: 'book', col: '#ff8fa3' },
  { id: 'place-order', name: 'Order Expert', task: 'place', icon: 'blocks', col: '#ffb4a2' },
  { id: 'place-plan', name: 'Place Writer', task: 'place', icon: 'school', col: '#ff6b81' },
  { id: 'rules-story', name: 'Story Detective', task: 'rules', icon: 'boat', col: '#b9a3ff' },
  { id: 'rules-sort', name: 'Rule Star', task: 'rules', icon: 'star', col: '#9b7fd1' },
  { id: 'rules-match', name: 'Reason Finder', task: 'rules', icon: 'heart', col: '#d0b8ff' },
  { id: 'rules-prep', name: 'Preposition Pro', task: 'rules', icon: 'arrow', col: '#c3a6f5' },
  { id: 'rules-spell', name: 'Super Speller', task: 'rules', icon: 'pencil', col: '#a78bfa' },
  { id: 'rules-plan', name: 'Safety Hero', task: 'rules', icon: 'shield', col: '#8b6fd6' },
  { id: 'season-model', name: 'Magazine Reader', task: 'season', icon: 'leaf', col: '#ffc857' },
  { id: 'season-vocab', name: 'Season Sorter', task: 'season', icon: 'sun', col: '#ffd166' },
  { id: 'season-fest', name: 'Festival Fan', task: 'season', icon: 'lantern', col: '#ff9f43' },
  { id: 'season-para', name: 'Paragraph Pro', task: 'season', icon: 'para', col: '#f6b93b' },
  { id: 'season-plan', name: 'Article Author', task: 'season', icon: 'news', col: '#ffb347' },
  { id: 'fixit', name: 'Fix-it Champion', task: 'fix', icon: 'wand', col: '#5ec4a7' },
  { id: 'exam', name: 'Exam Ready', task: 'exam', icon: 'trophy', col: '#4fb3d9' }
];
