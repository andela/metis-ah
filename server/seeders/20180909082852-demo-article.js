const now = new Date();


module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [{
    slug: 'just-a-sample-article1',
    title: 'Just a Sample Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 1,
    rating: 1,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  },
  {
    slug: 'just-a-sample-article2',
    title: 'Another Sample Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 2,
    categoryId: 2,
    rating: 3,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  },
  {
    slug: 'just-a-sample-article3',
    title: 'Some other Sample Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 2,
    rating: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  },
  {
    slug: 'just-a-sample-article4',
    title: 'Just a  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 1,
    rating: 5,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 20)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 20))
  },
  {
    slug: 'just-a-sample-article5',
    title: 'Another  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 2,
    categoryId: 2,
    rating: 2,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 3)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 3))
  },
  {
    slug: 'just-a-sample-article6',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 2,
    rating: 5,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 4)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 4))
  },
  {
    slug: 'just-a-sample-article7',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 3,
    categoryId: 2,
    rating: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24))
  },
  {
    slug: 'just-a-sample-article8',
    title: 'Just a  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 1,
    rating: 1,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 8)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 8))
  },
  {
    slug: 'just-a-sample-article9',
    title: 'Another  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 3,
    categoryId: 2,
    rating: 0,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 10)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 10))
  },
  {
    slug: 'just-a-sample-article10',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 2,
    rating: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 5)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 5))
  },
  {
    slug: 'just-a-sample-article11',
    title: 'Another  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 3,
    categoryId: 2,
    rating: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 10)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 10))
  },
  {
    slug: 'just-a-sample-article12',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 4,
    categoryId: 2,
    rating: 5,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 6)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 6))
  },
  {
    slug: 'just-a-sample-article13',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 2,
    categoryId: 4,
    rating: 4,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 9)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 9))
  },
  {
    slug: 'just-a-sample-article14',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 5,
    categoryId: 2,
    rating: 1,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 8)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 8))
  },
  {
    slug: 'just-a-sample-article15',
    title: 'Some other  Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 2,
    rating: 5,
    createdAt: new Date(now - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date(now - (1000 * 60 * 60 * 24 * 30))
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Articles')
};
