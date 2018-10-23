const refineAndConcat = {
  /**
   * @method refine
   * @description Creates an object containing two arrays: array of ids and an
   * array of objects with the desired properties
   * @param {Object} array the array containing objects to destructure
   * @returns {Object} An object with two array properties
   */
  refine: array => array.reduce((acc, item) => {
    const {
      id, name, poster, description
    } = item;

    acc.uniqueCategories.push(id);
    acc.userInterests.push({
      id, name, poster, description
    });
    return acc;
  }, { uniqueCategories: [], userInterests: [] }),

  /**
   * @method concatUnique
   * @description Creates a new array with the values of the first array
   * and the destructured values of the second array. It ensures each values
   * copied from the second array are unique
   * @param {Object} unique the first array
   * @param {Object} array1 the first array
   * @param {Object} array2 the first array
   * @returns {Object} An object with two array properties
   */
  concatUnique: (unique, array1, array2) => array2.reduce((acc, item) => {
    if (acc.length < 10) {
      const {
        id, name, poster, description
      } = item.dataValues;

      if (!unique.includes(item.dataValues.id)) {
        acc.push({
          id, name, poster, description
        });
      }
    }
    return acc;
  }, [...array1])
};

export default refineAndConcat;
