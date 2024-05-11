const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const con = require("../config/dbConfig").connection;

async function Login(req, res, err) {
    try {
      console.log("req.body",req.body);
      query = `select * from employee WHERE Email="${req.body.Email}"`;
      con.query(query, (err, result) => {
        if (err) {
          console.log("err", err);
          return res.status(500).send({ success: false, msg: err });
        }
        let data = result;
        if (data.length != 0) {
          bcrypt.compare(
            req.body.Password,
            data[0].Password,
            function (err, isMatch) {
              if (err) throw err;
              if (isMatch) {
                let info = {
                  id: data[0].Id,
                  username: data[0].FirstName,
                  email: data[0].Email,
                };
                var token = jwt.sign(info, "secret", { expiresIn: 86400 });
                console.log("token", token);
                res
                  .status(201)
                  .send({ success: true, data: info, token: "JWT " + token });
              } else {
                res.status(401).send({
                  success: false,
                  message: "Authenication failed, Wrong Password",
                });
              }
            }
          );
        } else {
          res.status(404).send({
            success: false,
            message: "Authenication failed, Wrong User",
          });
        }
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  }


  module.exports = {
    Login
  };