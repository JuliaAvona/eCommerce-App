import styles from './AboutUs.module.scss';
import dev1 from '../../assets/img/ksenia.jpeg';

const Error = () => {
  return (
    <div>
      <h2 className={styles.title}>About Us</h2>
      <div className={styles.wrapper}>
        <div className={styles.onePerson}>
          <img className={styles.photo} src={dev1} alt="Ksenia Frontend Developer" />
          <h2 className={styles.name}>Agapitova Ksenia</h2>
          <p className={styles.job}>Frontend Developer</p>
          <div className={styles.links}>
            <div className={styles.gitLink}>
              <a href="https://github.com/kagapitova" target="_blank" rel="noreferrer">
                <img
                  src="https://static-00.iconduck.com/assets.00/github-icon-1024x1024-vu0m1lvh.png"
                  alt="github logo"
                  className={styles.logo}
                />
              </a>
            </div>
            <div className={styles.cvLink}>
              <a href="https://kagapitova.github.io/rsschool-cv/" target="_blank" rel="noreferrer">
                <img
                  src="https://play-lh.googleusercontent.com/jizj2XDjYxS1_fVtN-frMQAbnYpFpvwPy-GeEhBo4FE02662jsTEHCt6QfSSveWiNQ=w240-h480-rw"
                  alt="cv logo"
                  className={styles.logo}
                />
              </a>
            </div>
          </div>
          <h6 className={styles.info}>
            <h6>About</h6>
            Master in Financial Management and Capital Market, professional manager with good communication. 3 years of
            experience in a bank, now I am moving to it. I took project manager courses and software testing, took
            several JS courses and continue to study on my own at rs school.
          </h6>
        </div>
        <div className={styles.onePerson}>
          <img
            className={styles.photo}
            src="https://avatars.githubusercontent.com/u/51357619?v=4"
            alt="Aleksandr Frontend Developer"
          />
          <h2 className={styles.name}>Aleksandr Saliakhov</h2>
          <p className={styles.job}>Frontend Developer</p>
          <div className={styles.links}>
            <div className={styles.gitLink}>
              <a href="https://github.com/ZEROM22" target="_blank" rel="noreferrer">
                <img
                  src="https://static-00.iconduck.com/assets.00/github-icon-1024x1024-vu0m1lvh.png"
                  alt="github logo"
                  className={styles.logo}
                />
              </a>
            </div>
            <div className={styles.cvLink}>
              <a href="https://zerom22.github.io/rsschool-cv/cv" target="_blank" rel="noreferrer">
                <img
                  src="https://play-lh.googleusercontent.com/jizj2XDjYxS1_fVtN-frMQAbnYpFpvwPy-GeEhBo4FE02662jsTEHCt6QfSSveWiNQ=w240-h480-rw"
                  alt="cv logo"
                  className={styles.logo}
                />
              </a>
            </div>
          </div>
          <h6 className={styles.info}>
            <h6>About</h6>I am 26 y.o., currently working as SAP EWM technical support, but I aspire to become frontend
            developer. I have graduated with a technical degree, soon after I began working with SAP. I have been
            studying programming in my spare time since school and doing pet projects using technologies such as React,
            Bootstrap, MUI, NodeJS, Express, Socket.IO, Mongoose. As for now, I am studying at RS School. My main goal
            is to gain knowledge from experienced colleagues, who already have frontend work experience, and to close
            knowledge gaps.
          </h6>
        </div>
        <div className={styles.onePerson}>
          <img
            className={styles.photo}
            src="https://media.licdn.com/dms/image/C4E03AQFCkYHDHk5-WA/profile-displayphoto-shrink_400_400/0/1661884644136?e=1700697600&v=beta&t=2e_XlwF08ob1vQ8O-o3tOSQHgW_dl0j0xusliYFGFdY"
            alt="Julia Frontend Developer"
          />
          <h2 className={styles.name}>Julia Izbrodina</h2>
          <p className={styles.job}>Frontend Developer</p>
          <div className={styles.links}>
            <div className={styles.gitLink}>
              <a href="https://github.com/JuliaAvona" target="_blank" rel="noreferrer">
                <img
                  src="https://static-00.iconduck.com/assets.00/github-icon-1024x1024-vu0m1lvh.png"
                  alt="github logo"
                  className={styles.logo}
                />
              </a>
            </div>
            <div className={styles.cvLink}>
              <a href="https://juliaavona.github.io/rsschool-cv/" target="_blank" rel="noreferrer">
                <img
                  src="https://play-lh.googleusercontent.com/jizj2XDjYxS1_fVtN-frMQAbnYpFpvwPy-GeEhBo4FE02662jsTEHCt6QfSSveWiNQ=w240-h480-rw"
                  alt="cv logo"
                  className={styles.logo}
                />
              </a>
            </div>
          </div>
          <h6 className={styles.info}>
            <h6>About</h6>
            Hi there, I’m Julia. I’m from Saint Petersburg. Now live in Guadalajara, Mexico🇲🇽 . At the moment I’m
            studying at The Rolling Scopes School Javascript/Front-end (HTML/CSS/JS). 🔮 I believe that my ability to
            learn and gain new skills will lead me through this path of becoming a proficient Frontend Developer.
          </h6>
        </div>
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
      <img
        className={styles.teamworkImage}
        src="https://www.meme-arsenal.com/memes/0cd283595cadbd7c88eaf1d33c19e3e6.jpg"
        alt="teamwork meme"
      />
      <h2 className={styles.title}>Work done by RS School students</h2>
      <div className={styles.rsLinks}>
        <a href="https://www.linkedin.com/company/the-rolling-scopes-school/" target="_blank" rel="noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="linkedin logo"
            className={styles.logo}
          />
        </a>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img
            src="https://media.licdn.com/dms/image/D4D0BAQHrAfAcwkHG5Q/company-logo_200_200/0/1685703475236?e=1703116800&v=beta&t=FKN_dPTQMiKcXCNxsuEIFlrpJoEXeUUatJ0qdXcCNL8"
            alt="school logo"
            className={styles.logo}
          />
        </a>
        <a href="https://www.youtube.com/@RollingScopesSchool" target="_blank" rel="noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/1200px-YouTube_social_red_circle_%282017%29.svg.png"
            alt="youtube logo"
            className={styles.logo}
          />
        </a>
      </div>
    </div>
  );
};

export default Error;
