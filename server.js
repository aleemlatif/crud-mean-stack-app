import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './backend/models/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/Issues'); // Issues is the DB name here
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!!!');
});

// Retrieving All Issues
router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err)
      console.log(err);
    else
      res.json(issues);
  });
});

// Retrieving An Issue By ID
router.route('/issues/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => { console.log('Retrieving An Issue By ID: \n\r', err, issue);
    if (err)
      console.log(err);
    else
      res.json(issue);
  })
});

// Adding New Issues
router.route('/issues/add').post((req, res) => {
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).json({'issue': 'Added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});

// Updating Issues
router.route('/issues/update/:id').post((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue)
      return next(new Error('Could not load Document'));
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      console.log('Issue for update:', issue);

      issue.save().then(issue => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

// Deleting Issues
router.route('/issues/delete/:id').get((req, res) => {
  Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});

app.use('/', router);

app.get('/', (req, res) => res.send('Welcome to the CRUD App Homepage'));

app.listen(4000, () => console.log(`Express server running on port 4000`));
