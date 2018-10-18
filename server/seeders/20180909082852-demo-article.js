const now = new Date();
const today = new Date(now);
const weekStartDate = new Date(today.setDate(today.getDate() - today.getDay()));
const weekstart = new Date(
  weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate(), 1
); // Add 1 hour

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [{
    slug: 'How-to-Have-a-Healthier-and-More-Productive-Home-Office',
    title: 'How to Have a Healthier and More Productive Home Office',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 1,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446192/pollution.jpg',
    rating: 1,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  },
  {
    slug: '10-Step-To-Successfully-Outsourcing-Your-Online-Business',
    title: '10 Step To Successfully Outsourcing Your Online Business',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 2,
    categoryId: 2,
    rating: 3,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446191/brain.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  },
  {
    slug: '6-Instant-Confidence-Boosters',
    title: '6 Instant Confidence Boosters',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 2,
    rating: 4,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446193/tech.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  },
  {
    slug: '21-Things-You-Should-Know',
    title: '21 Things You Should Know',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 1,
    rating: 5,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446191/brain.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 20)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 20))
  },
  {
    slug: 'How-I-Doubled-My-Money-With-Facebook-Ads',
    title: 'How I Doubled My Money With Facebook Ads',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 2,
    categoryId: 2,
    rating: 2,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446191/making-money.jpg',
    createdAt: weekstart,
    updatedAt: weekstart
  },
  {
    slug: '24-Rules-I-Follow-When-Creating-Successful-Websites',
    title: '24 Rules I Follow When Creating Successful Websites',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 2,
    rating: 5,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446191/learning.png',
    createdAt: weekstart,
    updatedAt: weekstart
  },
  {
    slug: 'Top-10-Facebook-Advertising-Mistakes-To-Avoid',
    title: 'Top 10 Facebook Advertising Mistakes To Avoid',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 3,
    categoryId: 2,
    rating: 4,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446191/family.jpg',
    createdAt: weekstart,
    updatedAt: weekstart
  },
  {
    slug: 'The-Ultimate-Guide-to-Making-Money-Online',
    title: 'The Ultimate Guide to Making Money Online',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 1,
    rating: 1,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446190/environment.jpg',
    createdAt: weekstart,
    updatedAt: weekstart
  },
  {
    slug: 'This-Blog-Post-Will-Make-You-More-Money-Guaranteed',
    title: 'This Blog Post Will Make you More Money Guarenteed',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 3,
    categoryId: 2,
    rating: 0,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446191/brain.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 10)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 10))
  },
  {
    slug: 'self-driving-cars-are-the-future',
    title: 'Self Drving Cars are the future',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 2,
    rating: 4,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446190/environment.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 5)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 5))
  },
  {
    slug: 'How-Apple-is-dominating-the-market',
    title: 'How Apple is dominating the market',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 3,
    categoryId: 2,
    rating: 4,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446190/environment.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 10)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 10))
  },
  {
    slug: 'Social-Meida-is-taking-your-life',
    title: 'Social Media is taking your life',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 2,
    rating: 5,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446193/tech.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 6)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 6))
  },
  {
    slug: 'The-Ultimate-Guide-to-Making-Money-Online',
    title: 'The Ultimate Guide to Making Money Online',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 2,
    categoryId: 4,
    rating: 4,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446192/pollution.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 9)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 9))
  },
  {
    slug: 'The-Ultimate-Guide-to-Making-Money-Online',
    title: 'The Ultimate Guide to Making Money Online',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 5,
    categoryId: 2,
    rating: 1,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446190/environment.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 8)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 8))
  },
  {
    slug: 'The-Ultimate-Guide-to-Making-Money-Online',
    title: 'The Ultimate Guide to Making Money Online',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 2,
    rating: 5,
    imageUrl: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1539446190/environment.jpg',
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Articles')
};
