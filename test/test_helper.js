var time = require('timekeeper');

module.exports = {
  /**
   * `freeze` is a utility function that freezes the time for the duration
   * of the execution of `callback`.
   * 
   * @param  {Function} callback A function to execute. During the execution
   *                             new Date() will be frozen to the callback
   *                             parameter `time`.
   */
  freeze: function (callback) {
    var currentTime = new Date();

    time.freeze(currentTime);
    callback(currentTime);
    time.reset();
  }
}
