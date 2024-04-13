const express = require('express')
const router = express.Router()
const multer = require('multer');
const AuthController = require('../controllers/AuthController')
const changePassword = require('../controllers/AuthController')
const profile = require('../controllers/menteeRoute')
const mentorCreateProfile = require('../controllers/mentorRoute')
const verifyToken = require('../middleware/isAuthenticated')
const profileMentee = require('../controllers/DisplayMentee')
const singleMentee = require('../controllers/singleMentee')
const singleMentor = require('../controllers/singleMentor')
const profileMentors = require('../controllers/DisplayMentor')
const discussinContent = require('../controllers/CreateDiscusion')
const discusionForum = require('../controllers/DisplayDiscussion')
const discussionLikes = require('../controllers/LikeDiscuions')
const addComment= require('../controllers/CommentPlusDiscussion')
const MentorsBookedSession = require('../controllers/SessionPerMentor')
const Booking = require('../controllers/CreateSession')
const Rejection= require('../controllers/CreateSession')
const Accept = require('../controllers/CreateSession')
const MenteeSessions = require('../controllers/MeetingPerMentee')
const { isAdmin } = require('../middleware/isAdmin');
const AdminRoles = require('../controllers/adminChangeRoles');
const Users = require('../controllers/GetUsers')
const Mentee = require('../controllers/MenteeProfile')
const Mentor = require('../controllers/MentorProfile')
const Interest = require('../controllers/InterestsNotification')
const GetMenteeInterests= require('../controllers/InterestsPerMentee')

const storage=multer.diskStorage({});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image"))
    {
cb(null,true);
    }
    else{
        cb("invalid image file!",false);
    }
};

const uploads=multer({storage,fileFilter});


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/change-password',  verifyToken, changePassword.changePassword )
router.post('/mentee', verifyToken, uploads.single("photo"), profile.menteeProfile)
router.post('/mentor', verifyToken, uploads.single("photo"), mentorCreateProfile.mentorProfile)
router.get('/profiles', profileMentee.ProfilesOfMentee)
router.get('/mentees/:menteeId', singleMentee.menteeInfo);
router.get('/mentors/:mentorId', singleMentor.mentorInfo);
router.get ('/all-mentors', profileMentors.ProfilesOfMentor)
router.post('/booking', verifyToken, Booking.SessionBooking)
router.get('/mentor-sessions/:mentorId', MentorsBookedSession.GetMentorSessions)
router.post('/:sessionId/reject', verifyToken, Rejection.RejectSession);
router.post('/:sessionId/accept', verifyToken, Accept.AcceptSession);
router.get('/mentee-sessions/:menteeId', MenteeSessions.GetMenteeMeetings)
router.post('/:menteeId/notify-interest', verifyToken, Interest.postInterest);
router.get('/mentee-notifications/:menteeId', verifyToken, GetMenteeInterests.getMenteeInterests);



//DISCUSSION BOARD 
router.post('/discussion', verifyToken, discussinContent.CreateDiscussion)
router.get ('/forum', discusionForum.displayDiscussion)
router.post('/likes', verifyToken, discussionLikes.likes)
router.post('/comment-to-discussion', verifyToken, addComment.addCommentToDiscussion)
router.put('/admin-dashboard/:userId', verifyToken, isAdmin, AdminRoles.UpdateRole)
router.get('/platform-users/', verifyToken, isAdmin, Users.getAllUsers)
router.get('/mentee-profile/', verifyToken, Mentee.menteeProfile)
router.get('/mentor-profile/', verifyToken, Mentor.mentorProfile)


module.exports = router

