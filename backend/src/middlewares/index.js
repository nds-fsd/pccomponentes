const express = require('express');

const validatePassword = (password) => {
  const pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
  return pattern.test(password);
};

const validateEmail = (password) => {
  const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  return pattern.test(password);
};

const validateUser = (req, res, next) => {
  console.log('Request Type:', req.method);
  const user = req.body;

  if (user.name === undefined || user.name.length === 0) {
    res.status(400).send({ message: 'name required' });
    return;
  }
  if (user.password === undefined) {
    res.status(400).send({ message: 'password required' });
    return;
  }
  if (!validatePassword(user.password)) {
    res
      .status(400)
      .send({
        message:
          'password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
      });
    return;
  }
  if (user.email === undefined) {
    res.status(400).send({ message: 'email required' });
    return;
  }
  if (!validateEmail(user.email)) {
    res.status(400).send({ message: 'email format is not correct' });
    return;
  }

  next();
};

module.exports = {
  validateUser,
};
