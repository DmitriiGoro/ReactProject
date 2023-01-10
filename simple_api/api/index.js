const router = require("express").Router();
const { airlines } = require("./airlines");
const { aircraft } = require("./aircraft");
const { reply, getById, getByName, getByIataCode } = require("./utils");
const { iataCodes } = require("./iataCodes");

router.get("/airlines", (req, res, next) => {
  const { name, iata, limit } = req.query;

  let result = airlines;

  if (name) {
    result = getByName(airlines)(name, limit);
  } else if (iata) {
    result = getByIataCode(airlines)(iata, limit);
  }

  reply(res, result);
});

router.get("/aircraft", (req, res, next) => {
  const { id } = req.query;
  let result = aircraft;

  if (id) {
    result = getById(aircraft)(id);
  }
  reply(res, result);
});

router.get("/iataCodes", (req, res, next) => {
  reply(res, iataCodes);
});

// router.get("/aircraft", (req, res, next) => {
//   const { id, productId } = req.query;
//   let result = products;

//   if (id) {
//     const restaurant = getById(restaurants)(id);
//     if (restaurant) {
//       result = restaurant.menu.map(getById(result));
//     }
//   }

//   if (!id && productId) {
//     result = getById(result)(productId);
//   }
//   reply(res, result);
// });

// router.get("/reviews", (req, res, next) => {
//   const { id } = req.query;
//   let result = reviews;
//   if (id) {
//     const restaurant = getById(restaurants)(id);
//     if (restaurant) {
//       result = restaurant.reviews.map(getById(result));
//     }
//   }
//   reply(res, result);
// });

// router.get("/users", (req, res, next) => {
//   reply(res, users);
// });

module.exports = router;
