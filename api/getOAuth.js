const express = require("express");
const dotenv = require("dotenv");
const uuid = require("uuid");
const axios = require("axios");
const qs = require("query-string");

const router = express.Router();

// Initialize dotenv and set config
dotenv.config({ path: "./config.env" });

// Create the Bungie API data object
const apiObject = {
  apiKey: process.env.API_Key,
  clientId: process.env.OAuth_Client_ID,
  tokenURI: process.env.OAuth_Token_Endpoint,
  oAuthURI: process.env.OAuth_Auth_URL,
  apiRootPath: process.env.API_Base_URL,
  authHeader: `Basic ${new Buffer.from(
    process.env.OAuth_Client_ID + ":" + process.env.OAuth_Client_Secret
  ).toString("base64")}`
};

// Destructure variables from apiObject
const {
  apiKey,
  clientId,
  tokenURI,
  apiRootPath,
  authHeader,
  oAuthURI
} = apiObject;

// DESCRIPTION:
// Returns an object for redirection to Bungie's website for the authentication of the user
// The client must validate the state that is generated by the server as it is
// returned from Bungie after authentication.
router.get("/", (req, res) => {
  // Generate a stateId using uuid
  const state = uuid.v4();

  try {
    res.json({
      oAuthURI,
      clientId,
      responseType: "code",
      state
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DESCRIPTION:
// Request authentication token from Bungie using the code supplied in the
// callback from the OAuth URL (/api/oauth/).
// The client need to set the access_token in the header for requests to the server
router.get("/getOAuthToken/:code", async (req, res) => {
  const code = req.params.code;

  try {
    if (code) {
      const body = {
        code: code,
        grant_type: "authorization_code"
      };

      const config = {
        headers: {
          Authorization: `${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      await axios
        .post(tokenURI, qs.stringify(body), config)
        .then(result => res.json(result.data))
        .catch(err => {
          if (err.response.status) {
            return res.status(err.response.status).json({
              status: err.response.status,
              msg: err.response.data
            });
          }
          return res.json(err);
        });
    }
  } catch (error) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DESCRIPTION:
// Fetches the users Destiny memberships based on the access_token supplied in the header.
// This route returns an object of the membershipType, membershipId and Displayname. The client
// can use these in the same way it uses the data from the search results.
router.get("/getMemberShipData", async (req, res) => {
  const access_token = req.headers.access_token;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "x-api-key": process.env.API_Key
      }
    };

    const membershipURI = `${process.env.API_Base_URL}/User/GetMembershipsForCurrentUser/`;

    await axios
      .get(membershipURI, config)
      .then(result =>
        res.json({
          membershipId: result.data.Response.destinyMemberships[0].membershipId,
          membershipType:
            result.data.Response.destinyMemberships[0].membershipType,
          displayName: result.data.Response.destinyMemberships[0].displayName
        })
      )
      .catch(err => {
        if (err.response.status) {
          return res.status(err.response.status).json({
            status: err.response.status,
            msg: err.response.data
          });
        }
        return res.json(err);
      });
  } catch (error) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;