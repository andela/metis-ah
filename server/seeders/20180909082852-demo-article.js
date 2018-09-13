module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [{
    slug: 'just-a-sample-article',
    title: 'Just a Sample Article',
    description: 'This is a seed article used for testing purposes',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui eros, tristique nec mollis et, dapibus eu nisl. Phasellus ultricies semper lorem sit amet tempor. Donec sed eros quis ante lobortis dapibus. Vestibulum eu sem lacus. Cras sagittis non velit at molestie. Aliquam volutpat rutrum neque vulputate accumsan. Donec eu purus nisi. Nam varius sodales quam, in aliquet tortor rutrum sed. Nullam suscipit, magna at rutrum porta, risus justo varius eros, et lacinia justo libero id quam. Curabitur fringilla porttitor ultrices. Ut a luctus risus. Etiam eget bibendum justo. Curabitur dolor nisi, porttitor eu scelerisque ac, consequat et odio. Duis dui enim, dignissim rutrum vestibulum et, lacinia vitae ex. Proin ut sem euismod, vestibulum sapien a, porta nibh.

    Etiam tellus leo, tincidunt ac leo quis, placerat fermentum ligula. Praesent tellus enim, ultrices in justo ut, rhoncus auctor justo. Donec nec tellus lectus. Vivamus sapien lorem, maximus quis ornare et, sollicitudin sit amet sapien. Aenean euismod a justo quis bibendum. Etiam feugiat massa ut metus hendrerit commodo. Fusce quis sodales diam. Pellentesque mattis mauris ac ornare vestibulum.

    Fusce hendrerit, nisi non pretium accumsan, velit ipsum tempus turpis, in ullamcorper nisi tortor sit amet nibh. Praesent id tortor erat. Praesent odio massa, congue eu commodo eu, fermentum eget nibh. Nulla eu tellus lectus. Nam sed pellentesque metus. Vestibulum odio nisl, efficitur blandit ipsum a, imperdiet vestibulum tortor. Nullam commodo nisi elit, eleifend pellentesque sem sagittis ut. Sed sit amet convallis lectus. Suspendisse a massa vitae sem iaculis finibus ut vel mauris. Praesent et viverra ex, non molestie lorem.`,
    userId: 1,
    categoryId: 1,
    createdAt: '2018-09-09',
    updatedAt: '2018-09-09'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
