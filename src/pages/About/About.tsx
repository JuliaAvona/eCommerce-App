import styles from './About.module.scss';
import ksenia from '../../assets/img/ksenia.jpeg';
import julia from '../../assets/img/julia.jpg';
import aleksandr from '../../assets/img/aleksandr.jpg';
import mikita from '../../assets/img/mikita.jpg';
import viktoryia from '../../assets/img/viktoryia.jpg';

import meme from '../../assets/img/meme.jpg';

import rsschool from '../../assets/img/rsschool.jpg';
import youtube from '../../assets/img/youtube.png';
import linkedin from '../../assets/img/linkedin.png';

import Person from './Person/Person';

const About = () => {
  return (
    <div>
      <h2 className={styles.title}>About Us</h2>
      <div className={styles.wrapper}>
        <Person
          name="Agapitova Ksenia"
          job="Frontend Developer"
          githubLink="https://github.com/kagapitova"
          cvLink="https://kagapitova.github.io/rsschool-cv/"
          imgSrc={ksenia}
          info="Master in Financial Management and Capital Market, professional manager with good communication. 3 years of experience in a bank, now I am moving to it. I took project manager courses and software testing, took several JS courses and continue to study on my own at rs school."
        />

        <Person
          name="Aleksandr Saliakhov"
          job="Frontend Developer"
          githubLink="https://github.com/ZEROM22"
          cvLink="https://zerom22.github.io/rsschool-cv/cv"
          imgSrc={aleksandr}
          info="I am 26 y.o., currently working as SAP EWM technical support, but I aspire to become frontend developer. I
          have graduated with a technical degree, soon after I began working with SAP. I have been studying
          programming in my spare time since school and doing pet projects using technologies such as React,
          Bootstrap, MUI, NodeJS, Express, Socket.IO, Mongoose. As for now, I am studying at RS School. My main goal
          is to gain knowledge from experienced colleagues, who already have frontend work experience, and to close
          knowledge gaps."
        />

        <Person
          name="Julia Izbrodina"
          job="Frontend Developer"
          githubLink="https://github.com/JuliaAvona"
          cvLink="https://juliaavona.github.io/rsschool-cv/"
          imgSrc={julia}
          info="Hi there, I'm Julia. I'm from Saint Petersburg. Now live in Guadalajara, Mexico🇲🇽 . At the moment I’m
          studying at The Rolling Scopes School Javascript/Front-end (HTML/CSS/JS). 🔮 I believe that my ability to
          learn and gain new skills will lead me through this path of becoming a proficient Frontend Developer."
        />
      </div>
      <h2 className="title">Our mentors</h2>
      <div className={styles.wrapper}>
        <Person name="Mikita Liaukovich" imgSrc={mikita} />
        <Person name="Viktoryia Liaukovich" imgSrc={viktoryia} />
      </div>
      <h2 className={styles.title}>Contributions</h2>
      <div className={styles.contribution}>
        <br />
        In this project:
        <br />
        <br />
        - Ksenia created the Main page and product pages, as well as the Errors page. Ksenia also filled out product
        cards in commercetools.com.
        <br />
        <br />
        - Alexander created the Join page, shopping cart, navigation and set up the commercetools API.
        <br />
        <br />- Julia created the Login page, the Main page and set up product cards in commercetools.
      </div>
      <h2 className={styles.title}>Collaboration</h2>
      <div className={styles.contribution}>
        <br />
        For this project, a Telegram chat was created and weekly calls were made on Google Meet. A Kanban board was also
        organized in Jira. All of these actions contributed to the successful completion of this project.
        <br />
      </div>
      <img className={styles.teamworkImage} src={meme} alt="teamwork meme" />
      <h2 className={styles.title}>Work done by RS School students</h2>
      <div className={styles.rsLinks}>
        <a href="https://www.linkedin.com/company/the-rolling-scopes-school/" target="_blank" rel="noreferrer">
          <img src={linkedin} alt="linkedin logo" className={styles.logo} />
        </a>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img src={rsschool} alt="rsschool logo" className={styles.logo} />
        </a>
        <a href="https://www.youtube.com/@RollingScopesSchool" target="_blank" rel="noreferrer">
          <img src={youtube} alt="youtube logo" className={styles.logo} />
        </a>
      </div>
    </div>
  );
};

export default About;
