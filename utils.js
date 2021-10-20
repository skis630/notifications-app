

const callback = (err, result) => {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
}

const between = (min, max) => {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }


module.exports = {
    callback,
    between
}