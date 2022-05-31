var express = require('express');
var router = express.Router();
var axios = require('axios').default

axios.defaults.headers.common['Authorization'] = 'token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNDg1OCwiZXhwIjoxNjU0MDQzNjU4fQ.RwpEwWhPi0rJDWhiuYalwWCdZX0f4j2__NdyMk_KJV4LypnVWBXdYJDBtZibcZW3MvpH1WoLcqZbNa7ShvYbYoSEeorJ_qIA1vk4DuXmv4lGC6L8WIDiiyra-GZkLRUDn4YUCbqrmkoSn2r6gLdKoVxbI2FlIGyhVF5v8CbP4I6dY-bieXhR8rgdLHq-rwAIhukzN92stfrvTirPuyl8oz8T4AcS7UnY9k-NsHONAXf_TVDA6JhoryY8u6nMdqFS8NaTTDmqe6qSgsnpOCENGpcoxI-7XpCvuGy1Wb3Uq7zIq4L0dsXYIIxld9d3ajPIgR4pp4kB3ns2bsO4clfCdg'


router.get('/', function (req, res, next) {
  res.render('index', {})
});

router.get('/termosIndice', function (req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice')
    .then(resp => {
      res.render('termos', { termos: resp.data })
    })
    .catch(error => {
      res.render('error', { error: error })
    })
});

router.get('/classes', function (req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1')
    .then(resp => {
      res.render('classes', { classes: resp.data })
    })
    .catch(error => {
      res.render('error', { error: error })
    })
});

router.get('/classes/:class', function (req, res, next) {
  var class_id = req.params.class
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + class_id)
    .then(resp => {
      res.render('classe', { classe: resp.data })
    })
    .catch(error => {
      res.render('error', { error: error })
    })
})

module.exports = router;