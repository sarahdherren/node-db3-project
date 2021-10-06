const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const validScheme = await Schemes.findById(id);
    if(!validScheme){
      next({
      status: 404,
      message: `scheme with scheme_id ${id} not found`
      });
    } else {
      req.scheme = validScheme;
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if(!scheme_name || typeof scheme_name !== "string" || !scheme_name.trim()) {
    next({
      status: 400,
      message: "invalid scheme_name"
    });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions } = req.body;
  if(!instructions || typeof instructions !== "string" || !instructions.trim()) {
    next({
      status: 400,
      message: "invalid step"
    });
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
