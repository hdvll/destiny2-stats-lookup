const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const router = express.Router();

// Initialize dotenv and set config
dotenv.config({ path: './config.env' });

// DESCRIPTION:
// Gets stats per character (provide full character id) or per profile (characterId = 0)
// Returns a response object with multiple objects for the various activities in the game

router.get('/:membershipType/:membershipId/:characterId', async (req, res) => {
  // /Destiny2/{membershipType}/Account/{destinyMembershipId}/Character/{characterId}/Stats/

  const baseUrl = process.env.API_Base_URL;
  const requestUrl = `${baseUrl}/Destiny2/${req.params.membershipType}/Account/${req.params.membershipId}/Character/${req.params.characterId}/Stats`;
  const config = {
    headers: {
      'X-API-Key': process.env.API_Key
    }
  };

  try {
    await axios
      .get(requestUrl, config)
      .then(result => res.json(result.data))
      .catch(err =>
        res.status(err.response.status).json({ error: err.response.data })
      );
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
