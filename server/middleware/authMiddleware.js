const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  try {
    // If the token format is 'Bearer <token>', extract the token
    const token = authHeader.split(" ")[1]; // split(" ") splite whatever there`s space  ["Bearer", "<token>"] parts[0]-> "Bearer", parts[1] -> "<token>"
    // console.log(token);
    // console.log(authHeader);
    const secret = process.env.JWT_SECRET;
    const { username, userid } = jwt.verify(token, secret);

    // Attach user info to the request object
    req.user = { username, userid };

    // Call next middleware
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleware;
