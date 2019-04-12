import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Switch } from 'react-router'

//components
import HomeHeader from './components/headerComponents/homeHeader'
import Header from './components/headerComponents/header'
import HomePage from './components/pages/home'
import ConnexionPage from './components/pages/connexion'
import InscriptionPage from './components/pages/inscription'
import LostPasswordPage from './components/pages/lostPassword'
import FilQuestionPage from './components/pages/filQuestion' 
import CreateQuestionPage from './components/pages/createQuestion'
import MyQuestionsPage from './components/pages/myQuestions'
import CreateQuestionnairePage from './components/pages/createQuestionnaire'
import MyQuestionnairesPage from './components/pages/myQuestionnaires'
import InfoPage from './components/pages/infos'
import ProfilePage from './components/pages/profile'
import DisplayQuestionPage from './components/pages/displayQuestion'
import UpdateQuestionPage from './components/pages/updateQuestion'
import DisplayQuestionnairePage from './components/pages/displayQuestionnaire'
import UpdateQuestionnairePage from './components/pages/updateQuestionnaire'
import UpdateProfilePage from './components/pages/updateProfile'
import CommentaryPage from './components/pages/commentary'


//includes css
import './Assets/css/default.min.css';
import './Assets/Vendor/bootstrap/css/bootstrap.min.css';
import './Assets/Vendor/font-awesome/css/font-awesome.min.css';
import './Assets/Vendor/bootstrap-social/bootstrap-social.css';
import './Assets/css/site.css';

//includes js
import './Assets/Vendor/jquery/jquery.min.js';
import './Assets/Vendor/bootstrap/js/bootstrap.min.js';

class App extends Component {
  render() 
  {
    return (
      <Router>
        <Switch>
          <Route path='/Logged' component={LoggedPage} />
          <Route path='/LogIn' component={UnloggedPage} />
        </Switch>
      </Router>
    );
  }
}

const UnloggedPage = () => {
  return (
    <React.Fragment>
      <HomeHeader />
      <Switch>
        <Route exact path='/LogIn' component={HomePage} />
        <Route exact path='/LogIn/Inscription' component={InscriptionPage} />
        <Route exact path='/LogIn/Connexion' component={ConnexionPage} />
        <Route exact path='/LogIn/LostPassword' component={LostPasswordPage} />
      </Switch>
    </React.Fragment>
  )
}

const LoggedPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/Logged/FilQuestion' component={FilQuestionPage} />
        <Route exact path='/Logged/CreateQuestion' component={CreateQuestionPage} />
        <Route exact path='/Logged/MyQuestions' component={MyQuestionsPage} />
        <Route exact path='/Logged/CreateQuestionnaire' component={CreateQuestionnairePage} />
        <Route exact path='/Logged/MyQuestionnaires' component={MyQuestionnairesPage} />
        <Route exact path='/Logged/Infos' component={InfoPage} />
        <Route exact path='/Logged/Profile/:id' component={ProfilePage} />
        <Route exact path='/Logged/Question/:id' component={DisplayQuestionPage} />
        <Route exact path='/Logged/UpdateQuestion/:id' component={UpdateQuestionPage} />
        <Route exact path='/Logged/Questionnaire/:id' component={DisplayQuestionnairePage} />
        <Route exact path='/Logged/UpdateQuestionnaire/:id' component={UpdateQuestionnairePage} />
        <Route exact path='/Logged/UpdateProfile' component={UpdateProfilePage} />
        <Route exact path='/Logged/Commentary/:id' component={CommentaryPage} />

      </Switch>
    </React.Fragment>
  )
}
export default App;