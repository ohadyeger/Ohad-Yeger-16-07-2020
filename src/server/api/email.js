const Email = require("../model/Email");

const mongoose = require("mongoose");

module.exports = (app) => {
  app.get("/api/email/getall", function (req, res) {
    console.log("fetching all Emails!");
    Email.find().exec((err, data) => {
      if (err) {
        console.log("failed to retrieve emails");
        res.status(500).json({
          error: err,
        });
      } else {
        console.log("retrieving emails successful");
        res.send(data).end();
      }
    });
  });

  app.post("/api/email/write", function (req, res, next) {
    const { senderId, receiverId, subject, message } = req.body;
    console.log(req.body);
    const emailId = new mongoose.Types.ObjectId();
    const creationDate = new Date();
    const newEmail = new Email({
      _id: emailId,
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      subject: subject,
      creationDate: creationDate,
    });
    newEmail
      .save()
      .then((result) => {
        res.send(result).end();
      })
      .catch((err) => {
        res.status(500).send({
          error: err,
        });
      });
  });
  app.delete("/api/email/delete/:id", function (req, res) {
    Email.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        Email.find().exec((err, alldata) => {
          if (err) {
            console.log("failed to retrieve emails");
            res.status(500).json({
              error: err,
            });
          } else {
            console.log("retrieving emails successful");
            res.send(alldata).end();
          }
        });
        // res.send(data);
        // console.log("deleted id: " + _id);
      }
    });
  });
};
