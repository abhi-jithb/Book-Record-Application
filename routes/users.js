const express = require("express");
const router = express.Router();
const { users } = require('../data/users.json');
/**
  * Route: /users
  * Method: GET
  * Description:Get all users
  * Access:Public
  * Parameters:none
 */

const { Router } = require("express");

//http://localhost:8081/users
router.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
  * Route: /users/:id
  * Method: GET
  * Description:Get single user bi their id
  * Access:Public
  * Parameters:Id
 */
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found ❌❌❌",
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Found ✅",
        data: user,
    });
});

/**
  * Route: /users
  * Method: POST
  * Description: Create a new user
  * Access:Public
  * Parameters: None
 */
router.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscritionDate } = req.body;
    const user = users.find((each) => each.id == id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User with the ID exist",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscritionDate,
    });
    return res.status(201).json({
        success: true,
        message: "User Added Successfully✅",
        data: users,
    });
});

/**
  * Route: /users/:id
  * Method: PUT
  * Description: Update user by their id
  * Access: Public
  * Parameters: Id
 */
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found ❌❌❌",
        })
    }
    const updateUserData = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
    });
    return res.status(200).json({
        success: true,
        message: "Updated Successfully✅",
        data: updateUserData,
    });

});


/**
  * Route: /users/:id
  * Method: DELETE
  * Description: Deleting user by their id
  * Access: Public
  * Parameters: ID
 */
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found ❌❌❌",
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: "User Deleted Successfully✅",
        data: users,
    });
});


/**
  * Route: /users/subscription-details/:id
  * Method: GET
  * Description:Get all user subscription details
  * Access:Public
  * Parameters:ID
 */
router.get("/users/subscription-details/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User with this id doesn't exist ❌",
        });
    };
    // Get DAYS
    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            //To get the current Date
            date = new Date();
        } else {
            // getting date on a basis of data variable
            date = new Date(data);
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    };
    // Subscription Type
    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };
});

module.exports = router;
